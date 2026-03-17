import type { APIRoute } from "astro";
import { sanityClient } from "@lib/sanityClient";
import { getRobotsQuery } from "@lib/groq/settings";

const DEFAULT_ROBOTS = (sitemapURL: URL) => `User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = async ({ site }) => {
  const sitemapURL = new URL("sitemap-index.xml", site);
  const robots = await sanityClient.fetch(getRobotsQuery);
  return new Response(robots?.trim() ? robots : DEFAULT_ROBOTS(sitemapURL));
};
