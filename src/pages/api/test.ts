export const prerender = false;

export function GET(): Response {
  return new Response(JSON.stringify({ ok: true, message: "API werkt!" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
