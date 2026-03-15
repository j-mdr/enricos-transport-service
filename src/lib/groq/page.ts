import { defineQuery } from "groq";
import { sanityClient } from "@lib/sanityClient";
import type { Locale } from "@config/siteSettings.json";
import { alternatePathsFragment, ctaButtonFragment, contentFragment } from "./fragments";

const pageFields = `
  title,
  description,
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
    },
    _type == "richText" => { ${contentFragment} }
  }
`;

export const getPageBySlugQuery = defineQuery(
  `*[_type == "page" && slug.current == $slug && language == $locale][0]{ ${pageFields} }`,
);

export const getAllPagesQuery = defineQuery(
  `*[_type == "page" && language == $locale && slug.current != null]{ "path": slug.current, ${pageFields} }`,
);

export async function getPageBySlug(slug: string, locale: Locale) {
  return sanityClient.fetch(getPageBySlugQuery, { slug, locale });
}

export async function getAllPages(locale: Locale) {
  return sanityClient.fetch(getAllPagesQuery, { locale });
}
