import { sanityClient } from "@lib/sanityClient";
import type { Locale } from "@config/siteSettings.json";

const serviceFields = `
  title,
  description,
  image { asset->, alt },
  seo,
  content
`;

export async function getServiceBySlug(slug: string, locale: Locale) {
  return sanityClient.fetch(
    `*[_type == "service" && slug.current == $slug && language == $locale][0]{ ${serviceFields} }`,
    { slug, locale },
  );
}

export async function getAllServices(locale: Locale) {
  return sanityClient.fetch(
    `*[_type == "service" && language == $locale && slug.current != null && draft != true]{ "slug": slug.current, ${serviceFields} }`,
    { locale },
  );
}