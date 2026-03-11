import { TURNSTILE_SECRET_KEY, STATICFORMS_ACCESS_KEY } from "astro:env/server";

interface PartnerPayload {
  "cf-turnstile-response": string;
  firstName: string;
  lastName: string;
  company: string;
  location: string;
  email: string;
  phone: string;
  vehicleType: string;
  availability: string;
  niwo?: boolean;
  adr?: boolean;
  transportInsurance?: boolean;
  message?: string;
}

export async function POST({
  request,
}: {
  request: Request;
  locals: App.Locals;
}): Promise<Response> {
  let body: PartnerPayload;
  try {
    body = (await request.json()) as PartnerPayload;
  } catch {
    return json({ error: "Ongeldig verzoek" }, 400);
  }

  const turnstileToken = body["cf-turnstile-response"] ?? "";
  const firstName = body.firstName ?? "";
  const lastName = body.lastName ?? "";
  const company = body.company ?? "";
  const location = body.location ?? "";
  const email = body.email ?? "";
  const phone = body.phone ?? "";
  const vehicleType = body.vehicleType ?? "";
  const availability = body.availability ?? "";
  const niwo = body.niwo ? "Ja" : "Nee";
  const adr = body.adr ? "Ja" : "Nee";
  const transportInsurance = body.transportInsurance ? "Ja" : "Nee";
  const message = body.message ?? "";

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
  const payload: Record<string, unknown> = {
    accessKey: STATICFORMS_ACCESS_KEY,
    subject: `Nieuwe onderaannemer aanmelding van ${firstName} ${lastName}`,
    replyTo: email,
    name: `${firstName} ${lastName}`,
    $fields: [
      "firstName",
      "lastName",
      "company",
      "location",
      "email",
      "phone",
      "vehicleType",
      "availability",
      "niwo",
      "adr",
      "transportInsurance",
      "message",
    ],
    firstName,
    lastName,
    company,
    location,
    email,
    phone,
    vehicleType,
    availability,
    niwo,
    adr,
    transportInsurance,
    message,
  };

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
