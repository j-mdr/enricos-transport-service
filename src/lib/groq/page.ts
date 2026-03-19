import { defineQuery } from "groq";
import { sanityClient } from "@lib/sanityClient";
import type { Locale } from "@config/siteConfig.ts";
import {
  alternatePathsFragment,
  ctaButtonFragment,
  contentFragment,
  imageFragment,
} from "./fragments";

export const pageFields = `
  title,
  description,
  seo,
  ${alternatePathsFragment},
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
        "form": { "title": title, emailSubject, submitButtonText, successMessage, errorMessage,
          fields[] { type, name, label, placeholder, required, width, options[] { label, value } }
        }
      }
    },
    _type in ["faqAccordions","faqCards","ctaBgImage","ctaCardCenter","ctaCardCenter2",
              "ctaCards","featureCardsSmall","featureLightboxMarquee","featureGalleryMarquee",
              "featureSideImage","featureToggleImage","servicesIcon","servicesSideImage",
              "awardsSection","teamMemberCards","testimonialsColumns","testimonialsSwiper",
              "contactSection"] => @->{
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
        "form": { "title": title, emailSubject, submitButtonText, successMessage, errorMessage,
          fields[] { type, name, label, placeholder, required, width, options[] { label, value } }
        }
      }
    }
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
