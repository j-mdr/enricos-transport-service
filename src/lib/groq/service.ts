import { sanityClient } from "@lib/sanityClient";
import type { Locale } from "@config/siteSettings.json";

const navFragment = `nav->{ logo { asset, alt, hotspot, crop }, ctaButton { link { text, href } }, navItems[] { text, href, dropdown[] { text, href } } }`;
const footerFragment = `footer->{ logo { asset, alt, hotspot, crop }, ctaButton { link { text, href } }, columns[] { title, links[] { text, href } } }`;

const translationsFragment = `"translations": *[_type == "translation.metadata" && references(^._id)][0].translations[]{ _key, value->{ language, "slug": slug.current } }`;

const serviceFields = `
  title,
  description,
  image { asset, alt, hotspot, crop },
  seo,
  content,
  ${translationsFragment},
  ${navFragment},
  ${footerFragment}
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
