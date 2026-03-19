import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  const url = new URL(context.request.url);

  // API routes en studio: nooit cachen
  if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/studio/")) {
    response.headers.set("Cache-Control", "no-store");
    return response;
  }

  // HTML pagina's: 5 min fresh, daarna stale-while-revalidate 24u
  if (response.headers.get("content-type")?.includes("text/html")) {
    response.headers.set("Cache-Control", "public, s-maxage=300, stale-while-revalidate=86400");
  }

  return response;
});
