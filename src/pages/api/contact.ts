interface ContactPayload {
  "cf-turnstile-response": string;
  firstName: string;
  lastName: string;
  email: string;
  description: string;
  file?: { name: string; data: string; type: string } | null;
}

export async function POST({
  request,
  locals,
}: {
  request: Request;
  locals: App.Locals;
}): Promise<Response> {
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return json({ error: "Ongeldig verzoek" }, 400);
  }

  const turnstileToken = body["cf-turnstile-response"] ?? "";
  const firstName = body.firstName ?? "";
  const lastName = body.lastName ?? "";
  const email = body.email ?? "";
  const description = body.description ?? "";
  const file = body.file ?? null;

  const { TURNSTILE_SECRET_KEY, STATICFORMS_ACCESS_KEY } = locals.runtime.env;

  // Verify Cloudflare Turnstile token
  const turnstileResult = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret: TURNSTILE_SECRET_KEY,
      response: turnstileToken,
    }),
  });
  const turnstileData = (await turnstileResult.json()) as { success: boolean };
  if (!turnstileData.success) {
    return json({ error: "Turnstile verificatie mislukt" }, 400);
  }

  // Build StaticForms payload
  // The recipient email is configured in your StaticForms dashboard (linked to the access key).
  const payload: Record<string, unknown> = {
    accessKey: STATICFORMS_ACCESS_KEY,
    subject: `Nieuw contactformulier van ${firstName} ${lastName}`,
    replyTo: email,
    name: `${firstName} ${lastName}`,
    $fields: ["firstName", "lastName", "email", "description"],
    firstName,
    lastName,
    email,
    message: description,
  };

  // Attach file if present (file.data is already base64-encoded)
  if (file && file.data) {
    payload.$attachments = [
      {
        filename: file.name,
        data: file.data,
        contentType: file.type || "application/octet-stream",
      },
    ];
  }

  const sfResponse = await fetch("https://api.staticforms.xyz/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!sfResponse.ok) {
    return json({ error: "Formulier versturen mislukt" }, 500);
  }

  const sfData = (await sfResponse.json()) as { success?: boolean; error?: string };
  if (sfData.error) {
    return json({ error: sfData.error }, 500);
  }

  return json({ success: true }, 200);
}

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
