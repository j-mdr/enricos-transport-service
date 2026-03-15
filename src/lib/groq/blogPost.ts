import { defineQuery } from "groq";
import { sanityClient } from "@lib/sanityClient";
import type { Locale } from "@config/siteSettings.json";
import { alternatePathsFragment, contentFragment } from "./fragments";

const blogPostFields = `
  title,
  description,
  "slug": slug.current,
  heroImage { asset, alt, hotspot, crop },
  pubDate,
  authors[]->{ name, "avatar": avatar { asset->{ url }, alt } },
  categories,
  ${contentFragment},
  ${alternatePathsFragment}
`;

export const getBlogPostBySlugQuery = defineQuery(
  `*[_type == "blogPost" && slug.current == $slug && language == $locale][0]{ ${blogPostFields} }`,
);

export const getAllBlogPostsQuery = defineQuery(
  `*[_type == "blogPost" && language == $locale && slug.current != null && draft != true] | order(pubDate desc){ ${blogPostFields} }`,
);

export async function getBlogPostBySlug(slug: string, locale: Locale) {
  return sanityClient.fetch(getBlogPostBySlugQuery, { slug, locale });
}

export async function getAllBlogPosts(locale: Locale) {
  return sanityClient.fetch(getAllBlogPostsQuery, { locale });
}
