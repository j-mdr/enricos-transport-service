import { type Routes, ROUTES } from "@config/constants.ts";
import type { LocalizedData } from "@config/configDataTypes.ts";

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

export const routeTranslations: LocalizedData<Omit<Routes, "home">> = {
  nl: {
    overOns: removePreSlash(ROUTES.nl.overOns),
    contact: removePreSlash(ROUTES.nl.contact),
    offerteAanvragen: removePreSlash(ROUTES.nl.offerteAanvragen),
    partnerWorden: removePreSlash(ROUTES.nl.partnerWorden),
    diensten: `${removePreSlash(ROUTES.nl.diensten)}/*`,
    blog: `${removePreSlash(ROUTES.nl.blog)}/*`,
    categorieen: `${removePreSlash(ROUTES.nl.categorieen)}/*`,
    regulierTransport: removePreSlash(ROUTES.nl.regulierTransport),
    incidenteelTransport: removePreSlash(ROUTES.nl.incidenteelTransport),
    grootTransport: removePreSlash(ROUTES.nl.grootTransport),
    spoedTransport: removePreSlash(ROUTES.nl.spoedTransport),
    documentenTransport: removePreSlash(ROUTES.nl.documentenTransport),
    meubelTransport: removePreSlash(ROUTES.nl.meubelTransport),
  },
  en: {
    overOns: removePreSlash(ROUTES.en.overOns),
    contact: removePreSlash(ROUTES.en.contact),
    offerteAanvragen: removePreSlash(ROUTES.en.offerteAanvragen),
    partnerWorden: removePreSlash(ROUTES.en.partnerWorden),
    diensten: `${removePreSlash(ROUTES.en.diensten)}/*`,
    blog: `${removePreSlash(ROUTES.en.blog)}/*`,
    categorieen: `${removePreSlash(ROUTES.en.categorieen)}/*`,
    regulierTransport: removePreSlash(ROUTES.en.regulierTransport),
    incidenteelTransport: removePreSlash(ROUTES.en.incidenteelTransport),
    grootTransport: removePreSlash(ROUTES.en.grootTransport),
    spoedTransport: removePreSlash(ROUTES.en.spoedTransport),
    documentenTransport: removePreSlash(ROUTES.en.documentenTransport),
    meubelTransport: removePreSlash(ROUTES.en.meubelTransport),
  },
} as const;
