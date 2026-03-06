/**
 * * Content collection translations used by the language switcher and hreflang generator
 *
 * Per-collection, per-locale route base mapping (collections to localize are the keys)
 *
 * If you have a key of "blog" then the blog content collection will be localized. This will look
 * for a "mappingKey" in the entry metadata, and use that to map the entry to the correct locale
 *
 * You can use the locale value to map the collection to a different route if desired
 */
export const collectionTranslations = {
  blog: {
    en: "blog",
    nl: "blog",
  },
  services: {
    en: "services",
    nl: "diensten",
  },
  bezorggebieden: {
    en: "delivery-areas",
    nl: "bezorggebieden",
  },
  // Add more collections/locales as needed
} as const;
