export const prerender = false;
import { TURNSTILE_SECRET_KEY, STATICFORMS_ACCESS_KEY } from "astro:env/server";


interface QuotePayload {
  "cf-turnstile-response": string;
  firstName: string;
  lastName: string;
  email: string;
  postalCodeFrom: string;
  postalCodeTo: string;
  cargoType: string;
  otherCargo?: string;
  sizeWeight: string;
  transportDate: string;
  urgent?: boolean;
}

export async function POST({ request }: { request: Request }): Promise<Response> {
  let body: QuotePayload;
  try {
    body = (await request.json()) as QuotePayload;
  } catch {
    return json({ error: "Ongeldig verzoek" }, 400);
  }

  const turnstileToken = body["cf-turnstile-response"] ?? "";
  const firstName = body.firstName ?? "";
  const lastName = body.lastName ?? "";
  const email = body.email ?? "";
  const postalCodeFrom = body.postalCodeFrom ?? "";
  const postalCodeTo = body.postalCodeTo ?? "";
  const cargoType = body.cargoType ?? "";
  const otherCargo = body.otherCargo ?? "";
  const sizeWeight = body.sizeWeight ?? "";
  const transportDate = body.transportDate ?? "";
  const urgent = body.urgent ? "Ja" : "Nee";

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
    subject: `Nieuwe offerteaanvraag van ${firstName} ${lastName}`,
    replyTo: email,
    name: `${firstName} ${lastName}`,
    $fields: [
      "firstName",
      "lastName",
      "email",
      "postalCodeFrom",
      "postalCodeTo",
      "cargoType",
      "otherCargo",
      "sizeWeight",
      "transportDate",
      "urgent",
    ],
    firstName,
    lastName,
    email,
    postalCodeFrom,
    postalCodeTo,
    cargoType,
    otherCargo,
    sizeWeight,
    transportDate,
    urgent,
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
