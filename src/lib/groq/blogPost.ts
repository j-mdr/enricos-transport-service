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

const blogPostFields = `
  title,
  description,
  "slug": slug.current,
  heroImage { asset, alt, hotspot, crop },
  pubDate,
  authors[]->{ name, "avatar": avatar { asset->{ url }, alt } },
  categories,
  content,
  ${alternatePathsFragment},
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
