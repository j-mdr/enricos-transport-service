export const prerender = false;
import { TURNSTILE_SECRET_KEY, STATICFORMS_ACCESS_KEY } from "astro:env/server";

interface ContactPayload {
  "cf-turnstile-response": string;
  formTitle?: string;
  emailSubject?: string;
  replyToField?: string;
  senderNameFields?: string[];
  fields: Record<string, string | boolean>;
  file?: { name: string; data: string; type: string } | null;
}

export async function POST({
  request,
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
  const fields = body.fields ?? {};
  const file = body.file ?? null;

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

  const replyTo = (fields[body.replyToField ?? "email"] as string) ?? "";
  const senderName = (body.senderNameFields ?? [])
    .map((f) => fields[f] ?? "")
    .join(" ")
    .trim();
  const subject = body.emailSubject ?? `Nieuw formulier: ${body.formTitle ?? "Contact"}`;

  // Build StaticForms payload
  const payload: Record<string, unknown> = {
    accessKey: STATICFORMS_ACCESS_KEY,
    subject,
    replyTo,
    name: senderName,
    $fields: Object.keys(fields),
    ...fields,
  };

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
