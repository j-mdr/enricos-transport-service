import { sanityClient } from "@lib/sanityClient";
import type { Locale } from "@config/siteSettings.json";

const pageFields = `
  title,
  description,
  layout,
  image { asset->, alt },
  seo,
  blocks[] { _type, ... }
`;

export async function getPageBySlug(slug: string, locale: Locale) {
  return sanityClient.fetch(
    `*[_type == "page" && slug.current == $slug && language == $locale][0]{ ${pageFields} }`,
    { slug, locale },
  );
}

export async function getAllPages(locale: Locale) {
  return sanityClient.fetch(
    `*[_type == "page" && language == $locale && slug.current != null]{ "slug": slug.current, ${pageFields} }`,
    { locale },
  );
}