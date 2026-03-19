import type { APIRoute } from "astro";
import { getAllPages } from "@lib/groq/page";
import { getAllBlogPosts, getAllCategories } from "@lib/groq/blogPost";
import { getAllServices } from "@lib/groq/service";
import { getAllDeliveryAreas } from "@lib/groq/deliveryArea";

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site?.href.replace(/\/$/, "") ?? "";

  const [
    pagesNl,
    pagesEn,
    postsNl,
    postsEn,
    servicesNl,
    servicesEn,
    deliveryAreasNl,
    deliveryAreasEn,
    categoriesNl,
    categoriesEn,
  ] = await Promise.all([
    getAllPages("nl"),
    getAllPages("en"),
    getAllBlogPosts("nl"),
    getAllBlogPosts("en"),
    getAllServices("nl"),
    getAllServices("en"),
    getAllDeliveryAreas("nl"),
    getAllDeliveryAreas("en"),
    getAllCategories("nl"),
    getAllCategories("en"),
  ]);

  const urls: string[] = [`${baseUrl}/`, `${baseUrl}/en/`];

  for (const page of pagesNl) {
    if (page.path && page.path !== "home-nl") {
      urls.push(`${baseUrl}/${page.path}/`);
    }
  }
  for (const page of pagesEn) {
    if (page.path && page.path !== "home-en") {
      urls.push(`${baseUrl}/en/${page.path}/`);
    }
  }
  for (const post of postsNl) {
    if (post.urlPath) urls.push(`${baseUrl}${post.urlPath}/`);
  }
  for (const post of postsEn) {
    if (post.urlPath) urls.push(`${baseUrl}${post.urlPath}/`);
  }
  for (const service of servicesNl) {
    if (service.urlPath) urls.push(`${baseUrl}${service.urlPath}/`);
  }
  for (const service of servicesEn) {
    if (service.urlPath) urls.push(`${baseUrl}${service.urlPath}/`);
  }
  for (const area of deliveryAreasNl) {
    if (area.urlPath) urls.push(`${baseUrl}${area.urlPath}/`);
  }
  for (const area of deliveryAreasEn) {
    if (area.urlPath) urls.push(`${baseUrl}${area.urlPath}/`);
  }
  for (const cat of categoriesNl) {
    if (cat.urlPath) urls.push(`${baseUrl}${cat.urlPath}/`);
  }
  for (const cat of categoriesEn) {
    if (cat.urlPath) urls.push(`${baseUrl}${cat.urlPath}/`);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${url}</loc></url>`).join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=3600",
    },
  });
};
