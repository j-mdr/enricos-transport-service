import { sanityClient } from "@lib/sanityClient";
import type { Locale } from "@config/siteSettings.json";

// Haalt een pagina op via slug en locale.
// __i18n_lang wordt automatisch toegevoegd door @sanity/document-internationalization.
export async function getPageBySlug(slug: string, locale: Locale) {
  return sanityClient.fetch(
    `*[_type == "page" && slug.current == $slug && language == $locale][0]{
      title,
      description,
      layout,
      image { asset->, alt },
      seo,
      blocks[] {
        _type,
        ...
      }
    }`,
    { slug, locale },
  );
}