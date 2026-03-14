import { sanityClient } from "@lib/sanityClient";
import type { Locale } from "@config/siteSettings.json";

const navFragment = `nav->{ logo { asset, alt, hotspot, crop }, ctaButton { link { text, href } }, navItems[] { text, href, dropdown[] { text, href } } }`;
const footerFragment = `footer->{ logo { asset, alt, hotspot, crop }, ctaButton { link { text, href } }, columns[] { title, links[] { text, href } } }`;

const translationsFragment = `"translations": *[_type == "translation.metadata" && references(^._id)][0].translations[]{ _key, value->{ language, "slug": slug.current } }`;

const pageFields = `
  title,
  description,
  layout,
  image { asset, alt, hotspot, crop },
  seo,
  ${translationsFragment},
  ${navFragment},
  ${footerFragment},
  blocks[] {
    _type,
    ...,
    _type == "teamMemberCards" => {
      "teamMembers": teamMembers[]->{ name, personTitle, bio, avatar { asset, alt, hotspot, crop } }
    }
  }
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
