import { sanityClient } from "@lib/sanityClient";
import type { Locale } from "@config/siteSettings.json";

const navFragment = `nav->{ logo { asset, alt, hotspot, crop }, ctaButton { link { text, href } }, navItems[] { text, href, dropdown[] { text, href } } }`;
const footerFragment = `footer->{ logo { asset, alt, hotspot, crop }, ctaButton { link { text, href } }, columns[] { title, links[] { text, href } } }`;

const translationsFragment = `"translations": *[_type == "translation.metadata" && references(^._id)][0].translations[]{ _key, value->{ language, "slug": slug.current } }`;

const blogPostFields = `
  title,
  description,
  "slug": slug.current,
  heroImage { asset, alt, hotspot, crop },
  pubDate,
  authors[]->{ name, "avatar": avatar { asset->{ url }, alt } },
  categories,
  content,
  ${translationsFragment},
  ${navFragment},
  ${footerFragment}
`;

export async function getBlogPostBySlug(slug: string, locale: Locale) {
  return sanityClient.fetch(
    `*[_type == "blogPost" && slug.current == $slug && language == $locale][0]{ ${blogPostFields} }`,
    { slug, locale },
  );
}

export async function getAllBlogPosts(locale: Locale) {
  return sanityClient.fetch(
    `*[_type == "blogPost" && language == $locale && slug.current != null && draft != true] | order(pubDate desc){ ${blogPostFields} }`,
    { locale },
  );
}
