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
  const postalCodeFrom = (formData.get("postalCodeFrom") as string) ?? "";
  const postalCodeTo = (formData.get("postalCodeTo") as string) ?? "";
  const cargoType = (formData.get("cargoType") as string) ?? "";
  const otherCargo = (formData.get("otherCargo") as string) ?? "";
  const sizeWeight = (formData.get("sizeWeight") as string) ?? "";
  const transportDate = (formData.get("transportDate") as string) ?? "";
  const urgent = (formData.get("urgent") as string) ?? "";

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
  const payload: Record<string, unknown> = {
    accessKey: import.meta.env.STATICFORMS_ACCESS_KEY,
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
