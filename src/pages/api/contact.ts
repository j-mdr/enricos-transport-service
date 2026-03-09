export const prerender = false;

export async function POST({ request }: { request: Request }): Promise<Response> {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return json({ error: "Ongeldig verzoek" }, 400);
  }

  const turnstileToken = formData.get("cf-turnstile-response") as string;
  const firstName = (formData.get("firstName") as string) ?? "";
  const lastName = (formData.get("lastName") as string) ?? "";
  const email = (formData.get("email") as string) ?? "";
  const description = (formData.get("description") as string) ?? "";
  const file = formData.get("file") as File | null;

  // Verify Cloudflare Turnstile token
  const turnstileResult = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret: import.meta.env.TURNSTILE_SECRET_KEY,
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
    accessKey: import.meta.env.STATICFORMS_ACCESS_KEY,
    subject: `Nieuw contactformulier van ${firstName} ${lastName}`,
    replyTo: email,
    name: `${firstName} ${lastName}`,
    $fields: ["firstName", "lastName", "email", "description"],
    firstName,
    lastName,
    email,
    message: description,
  };

  // Attach file if present
  if (file && file.size > 0) {
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    payload.$attachments = [
      {
        filename: file.name,
        data: btoa(binary),
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
