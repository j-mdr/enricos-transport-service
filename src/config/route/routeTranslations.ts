import { MAIN_ROUTES } from "@config/constants.ts";
import type { DataTranslationType } from "@config/configDataTypes.ts";

/**
 * * Route translations are used to translate route names for the language switcher component
 * This can be useful for SEO reasons. The key does not matter, it just needs to match between languages
 *
 * These routes must be everything after the base domain. So if this is "atlas.com/blog", the route would be "blog"
 * Or if this is "atlas.com/legal/privacy", the route would be "legal/privacy"
 *
 * This also supports wildcards. For example, "categories/*" would match "categories/1" or "categories/2" etc for that language.
 *
 * Note: This works in conjunction with the collectionTranslations.ts
 */

const removePreSlash = (route: string) => route.replace(/^\//, "");
// Use
export const routeTranslations: DataTranslationType<
  Record<keyof Omit<typeof MAIN_ROUTES, "home">, string>
> = {
  nl: {
    overOns: removePreSlash(MAIN_ROUTES.overOns),
    contact: removePreSlash(MAIN_ROUTES.contact),
    offerteAanvragen: removePreSlash(MAIN_ROUTES.offerteAanvragen),
    partnerWorden: removePreSlash(MAIN_ROUTES.partnerWorden),
    diensten: removePreSlash(MAIN_ROUTES.diensten) + "/*",
    blog: removePreSlash(MAIN_ROUTES.blog) + "/*",
    categorieen: removePreSlash(MAIN_ROUTES.categorieen) + "/*",
    regulierTransport: removePreSlash(MAIN_ROUTES.regulierTransport),
    incidenteelTransport: removePreSlash(MAIN_ROUTES.incidenteelTransport),
    grootTransport: removePreSlash(MAIN_ROUTES.grootTransport),
    spoedTransport: removePreSlash(MAIN_ROUTES.spoedTransport),
    documentenTransport: removePreSlash(MAIN_ROUTES.documentenTransport),
    meubelTransport: removePreSlash(MAIN_ROUTES.meubelTransport),
  },
  en: {
    overOns: "about-us",
    contact: "contact",
    offerteAanvragen: "request-quote",
    partnerWorden: "become-a-partner",
    diensten: "services/*",
    blog: "blog/*",
    categorieen: "categories/*",
    regulierTransport: "regular-transport",
    incidenteelTransport: "occasional-transport",
    grootTransport: "large-transport",
    spoedTransport: "express-transport",
    documentenTransport: "document-transport",
    meubelTransport: "furniture-transport",
  },
} as const;
