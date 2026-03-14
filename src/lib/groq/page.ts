import { sanityClient } from "@lib/sanityClient";
import type { Locale } from "@config/siteSettings.json";

const linkFragment = `{
  text,
  "href": select(
    linkType == "internal" =>
      "/" + select($locale == "en" => "en/", "") + reference->slug.current,
    href
  ),
  openInNewTab
}`;

const navFragment = `nav->{ logo { asset, alt, hotspot, crop }, ctaButton { link ${linkFragment} }, navItems[] { text, href, dropdown[] ${linkFragment} } }`;
const footerFragment = `footer->{ logo { asset, alt, hotspot, crop }, ctaButton { link ${linkFragment} }, columns[] { title, links[] ${linkFragment} } }`;

const alternatePathsFragment = `
  "alternatePaths": {
    "nl": coalesce(
      "/" + *[_type == "translation.metadata" && references(^._id)][0].translations[language == "nl"][0].value->slug.current,
      "/"
    ),
    "en": coalesce(
      "/en/" + *[_type == "translation.metadata" && references(^._id)][0].translations[language == "en"][0].value->slug.current,
      "/en/"
    )
  }
`;

const pageFields = `
  title,
  description,
  layout,
  image { asset, alt, hotspot, crop },
  seo,
  ${alternatePathsFragment},
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
    `*[_type == "page" && language == $locale && slug.current != null]{ "path": slug.current, ${pageFields} }`,
    { locale },
  );
}
