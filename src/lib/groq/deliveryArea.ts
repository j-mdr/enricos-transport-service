import { defineQuery } from "groq";
import { sanityClient } from "@lib/sanityClient";
import type { Locale } from "@config/siteConfig.ts";
import {
  alternatePathsFragment,
  contentFragment,
  ctaButtonFragment,
  imageFragment,
} from "./fragments";

// Lightweight fields for listing pages (no blocks)
const deliveryAreaCardFields = `
  title,
  "slug": slug.current,
  urlPath,
  heroImage ${imageFragment},
  seo,
  pubDate,
  ${alternatePathsFragment}
`;

// Full fields including blocks for the detail page
const deliveryAreaFields = `
  ${deliveryAreaCardFields},
  blocks[] {
    _key,
    _type,
    ...,
    image ${imageFragment},
    _type == "richText" => { ${contentFragment} },
    _type == "reference" => @->{
      _type,
      ...,
      image ${imageFragment},
      _type == "teamMemberCards" => {
        "teamMembers": teamMembers[]->{ name, personTitle, bio, avatar ${imageFragment} }
      },
      _type in ["ctaBgImage", "ctaCardCenter", "ctaCardCenter2", "ctaCards"] => {
        ctaButton ${ctaButtonFragment}
      },
      _type == "servicesIcon" => {
        services[] { ..., ctaButton ${ctaButtonFragment} }
      },
      _type == "servicesSideImage" => {
        services[] { ..., ctaButton ${ctaButtonFragment} }
      },
      _type == "contactSection" => {
        type,
        title,
        image ${imageFragment},
        form->{ title, emailSubject, submitButtonText, successMessage, errorMessage,
          fields[] { type, name, label, placeholder, required, width, options[] { label, value } }
        }
      }
    }
  }
`;

export const getDeliveryAreaBySlugQuery = defineQuery(
  `*[_type == "deliveryArea" && (slug.current == $slug || slug.current == "bezorggebieden/" + $slug) && language == $locale][0]{ ${deliveryAreaFields} }`,
);

export const getAllDeliveryAreasQuery = defineQuery(
  `*[_type == "deliveryArea" && language == $locale && slug.current != null && draft != true] | order(slug.current asc){ ${deliveryAreaCardFields} }`,
);

export async function getDeliveryAreaBySlug(slug: string, locale: Locale) {
  return sanityClient.fetch(getDeliveryAreaBySlugQuery, { slug, locale });
}

export async function getAllDeliveryAreas(locale: Locale) {
  return sanityClient.fetch(getAllDeliveryAreasQuery, { locale });
}
