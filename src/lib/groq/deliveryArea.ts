import { sanityClient } from "@lib/sanityClient";
import type { Locale } from "@config/siteSettings.json";

const deliveryAreaFields = `
  title,
  description,
  image { asset->, alt },
  seo,
  content
`;

export async function getDeliveryAreaBySlug(slug: string, locale: Locale) {
  return sanityClient.fetch(
    `*[_type == "deliveryArea" && slug.current == $slug && language == $locale][0]{ ${deliveryAreaFields} }`,
    { slug, locale },
  );
}

export async function getAllDeliveryAreas(locale: Locale) {
  return sanityClient.fetch(
    `*[_type == "deliveryArea" && language == $locale && slug.current != null && draft != true]{ "slug": slug.current, ${deliveryAreaFields} }`,
    { locale },
  );
}