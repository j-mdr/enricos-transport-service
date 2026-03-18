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
const blogPostCardFields = `
  title,
  description,
  "slug": slug.current,
  urlPath,
  heroImage ${imageFragment},
  seo,
  pubDate,
  authors[]->{ name, avatar ${imageFragment} },
  categories[]->{ title, urlPath },
  ${alternatePathsFragment}
`;

// Full fields including blocks for the detail page
const blogPostFields = `
  ${blogPostCardFields},
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

export const getBlogPostBySlugQuery = defineQuery(
  `*[_type == "blogPost" && (slug.current == $slug || slug.current == "blog/" + $slug) && language == $locale][0]{ ${blogPostFields} }`,
);

export const getAllBlogPostsQuery = defineQuery(
  `*[_type == "blogPost" && language == $locale && slug.current != null && draft != true] | order(pubDate desc){ ${blogPostCardFields} }`,
);

export const getAllCategoriesQuery = defineQuery(
  `*[_type == "category" && language == $locale] | order(title asc){ title, "slug": slug.current, urlPath, description, ${alternatePathsFragment} }`,
);

export const getBlogPostsByCategoryQuery = defineQuery(
  `*[_type == "blogPost" && language == $locale && $categorySlug in categories[]->slug.current && draft != true] | order(pubDate desc){ ${blogPostCardFields} }`,
);

export async function getBlogPostBySlug(slug: string, locale: Locale) {
  return sanityClient.fetch(getBlogPostBySlugQuery, { slug, locale });
}

export async function getAllBlogPosts(locale: Locale) {
  return sanityClient.fetch(getAllBlogPostsQuery, { locale });
}

export async function getAllCategories(locale: Locale) {
  return sanityClient.fetch(getAllCategoriesQuery, { locale });
}

export async function getBlogPostsByCategory(categorySlug: string, locale: Locale) {
  return sanityClient.fetch(getBlogPostsByCategoryQuery, { categorySlug, locale });
}
