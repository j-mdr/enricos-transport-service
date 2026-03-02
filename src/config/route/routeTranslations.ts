/**
 * * Route translations are used to translate route names for the language switcher component
 * This can be useful for SEO reasons. The key does not matter, it just needs to match between languages
 *
 * These routes must be everything after the base domain. So if this is "atlas.com/blog", the route would be "blog"
 * Or if this is "atlas.com/legal/privacy", the route would be "legal/privacy"
 *
 * This also supports wildcards. For example, "categories/*" would match "categories/1" or "categories/2" etc for that language.
 *
 * Note: This works in conjunction with the localizedCollections object below
 */
export const routeTranslations = {
  nl: {
    about: "over-ons",
    contact: "contact",
    quote: "offerte",
    team: "team",
    becomePartner: "partner-worden",
    services: "diensten/*",
    categories: "categorieen/*",
    blog: "blog/*",
    regularTransport: "regulier-transport",
  },
  en: {
    about: "about",
    contact: "contact",
    team: "team",
    becomePartner: "become-partner",
    quote: "quote",
    categories: "categories/*",
    blog: "blog/*",
    regularTransport: "regular-transport",
  },
} as const;
