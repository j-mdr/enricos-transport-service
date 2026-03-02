/**
 * * Configuration of the i18n system data files and text translations
 * Example translations below are for English and French, with textTranslations used in src/layouts/BlogLayoutCenter.astro and src/components/HeroCenteredSection/[hero].astro
 */

/**
 * * Data file configuration for the i18n system
 * Every {Data} key must exist in the below object
 */
import testimonialDataNl from "./nl/testimonialData.json.ts";
import teamDataNl from "./nl/teamData.json";
import navDataNl from "./nl/navData.json.ts";
import siteDataNl from "./nl/siteData.json";
import servicesSideImageDataNl from "./nl/servicesSideImageData.json.ts";

import siteDataEn from "./en/siteData.json";
import navDataEn from "./en/navData.json.ts";
import { faqAccordionSectionData } from "./data/faqAccordionSectionData.json.ts";
import teamDataEn from "./en/teamData.json";
import testimonialDataEn from "./en/testimonialData.json.ts";
import { HeroSideImageSectionData } from "./data/heroSideImageSectionData.json.ts";
import servicesSideImageDataEn from "./en/servicesSideImageData.json.ts";

export const dataTranslations = {
  nl: {
    siteData: siteDataNl,
    navData: navDataNl,
    faqAccordionSectionData: faqAccordionSectionData.nl,
    teamData: teamDataNl,
    testimonialData: testimonialDataNl,
    heroSideImageData: HeroSideImageSectionData.nl,
    servicesSideImageData: servicesSideImageDataNl,
  },
  en: {
    siteData: siteDataEn,
    navData: navDataEn,
    faqAccordionSectionData: faqAccordionSectionData.en,
    teamData: teamDataEn,
    testimonialData: testimonialDataEn,
    heroSideImageData: HeroSideImageSectionData.en,
    servicesSideImageData: servicesSideImageDataEn,
  },
} as const;

/**
 * * Text translations are used with the `useTranslation` function from src/utils/i18nUtils.ts to translate various strings on your site.
 *
 * ## Example
 *
 * ```ts
 * import { getLocaleFromUrl } from "@utils/localeUtils";
 * import { useTranslations } from "@utils/translationUtils";
 * const currLocale = getLocaleFromUrl(Astro.url);
 * const t = useTranslations(currLocale);
 * t("back_to_all_posts"); // this would be "Retour à tous les articles" if the current locale is "fr"
 * ```
 * or
 * ```ts
 * import { useTranslations } from "@utils/translationUtils";
 * const t = useTranslations("fr");
 * t("back_to_all_posts"); // this would be "Retour à tous les articles"
 * ```
 */
export const textTranslations = {
  nl: {
    contact_button_text: "Neem contact",
    contact_button_text_short: "Contact",
    quote_button_text: "Offerte opvragen",
    back_to_all_posts: "Back to all posts",
    updated: "Geupdatet",
    about: "Over",
    read_more: "Lees meer",
  },
  en: {
    contact_button: "Contact us",
    contact_button_text_short: "Contact us",
    quote_button_text: "Get free quote",
    back_to_all_posts: "Back to all posts",
    updated: "Updated",
    about: "About",
    read_more: "Read more",
  },
} as const;

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
export const localizedCollections = {
  blog: {
    en: "blog",
    nl: "blog",
  },
  services: {
    en: "services",
    nl: "diensten",
  },
  // Add more collections/locales as needed
} as const;
