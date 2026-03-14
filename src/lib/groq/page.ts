import { sanityClient } from "@lib/sanityClient";
import type { Locale } from "@config/siteSettings.json";
import { alternatePathsFragment, ctaButtonFragment } from "./fragments";

const pageFields = `
  title,
  description,
  layout,
  image { asset, alt, hotspot, crop },
  seo,
  ${alternatePathsFragment},
  blocks[] {
    _type,
    ...,
    _type == "teamMemberCards" => {
      "teamMembers": teamMembers[]->{ name, personTitle, bio, avatar { asset, alt, hotspot, crop } }
    },
    _type in ["heroBgImage", "heroCentered"] => {
      ctaButton1 ${ctaButtonFragment},
      ctaButton2 ${ctaButtonFragment}
    },
    _type in ["heroSideImage", "ctaBgImage", "ctaCardCenter", "ctaCardCenter2", "ctaCards"] => {
      ctaButton ${ctaButtonFragment}
    },
    _type == "servicesIcon" => {
      services[] { ..., ctaButton ${ctaButtonFragment} }
    },
    _type == "servicesSideImage" => {
      services[] { ..., ctaButton ${ctaButtonFragment} }
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
