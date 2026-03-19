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
const serviceCardFields = `
  title,
  "slug": slug.current,
  urlPath,
  heroImage ${imageFragment},
  seo,
  pubDate,
  ${alternatePathsFragment}
`;

// Full fields including blocks for the detail page
const serviceFields = `
  ${serviceCardFields},
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

export const getServiceBySlugQuery = defineQuery(
  `*[_type == "service" && (slug.current == $slug || slug.current == "diensten/" + $slug) && language == $locale][0]{ ${serviceFields} }`,
);

export const getAllServicesQuery = defineQuery(
  `*[_type == "service" && language == $locale && slug.current != null && draft != true] | order(slug.current asc){ ${serviceCardFields} }`,
);

export async function getServiceBySlug(slug: string, locale: Locale) {
  return sanityClient.fetch(getServiceBySlugQuery, { slug, locale });
}

export async function getAllServices(locale: Locale) {
  return sanityClient.fetch(getAllServicesQuery, { locale });
}
