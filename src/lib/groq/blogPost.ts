import { defineQuery } from "groq";
import { sanityClient } from "@lib/sanityClient";
import type { Locale } from "@config/siteSettings.json";
import { alternatePathsFragment, contentFragment, ctaButtonFragment } from "./fragments";

// Lightweight fields for listing pages (no blocks)
const blogPostCardFields = `
  title,
  description,
  "slug": slug.current,
  heroImage { asset, alt, hotspot, crop },
  pubDate,
  authors[]->{ name, "avatar": avatar { asset->{ url }, alt } },
  categories[]->{ title, "slug": slug.current },
  ${alternatePathsFragment}
`;

// Full fields including blocks for the detail page
const blogPostFields = `
  ${blogPostCardFields},
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

export const getBlogPostBySlugQuery = defineQuery(
  `*[_type == "blogPost" && slug.current == $slug && language == $locale][0]{ ${blogPostFields} }`,
);

export const getAllBlogPostsQuery = defineQuery(
  `*[_type == "blogPost" && language == $locale && slug.current != null && draft != true] | order(pubDate desc){ ${blogPostCardFields} }`,
);

export const getAllCategoriesQuery = defineQuery(
  `*[_type == "category" && language == $locale] | order(title asc){ title, "slug": slug.current, description, ${alternatePathsFragment} }`,
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
