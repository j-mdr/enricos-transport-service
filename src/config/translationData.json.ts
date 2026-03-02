/**
 * * Configuration of the i18n system data files and text translations
 * Example translations below are for English and French, with textTranslations used in src/layouts/BlogLayoutCenter.astro and src/components/HeroCenteredSection/[hero].astro
 */

/**
 * * Data file configuration for the i18n system
 * Every {Data} key must exist in the below object
 */

import { siteData } from "./data/siteData.json.ts";
import { navData } from "./data/navData.json.ts";
import { faqAccordionSectionData } from "./data/faqAccordionSectionData.json.ts";
import { teamMemberCardsSectionData } from "./data/teamMemberCardsSectionData.ts";
import { testimonialSwiperSectionData } from "./data/testimonialSwiperSectionData.json.ts";
import { HeroSideImageSectionData } from "./data/heroSideImageSectionData.json.ts";
import { servicesSideImageSectionData } from "./data/servicesSideImageSectionData.json.ts";

export const dataTranslations = {
  nl: {
    siteData: siteData.nl,
    navData: navData.nl,
    faqAccordionSectionData: faqAccordionSectionData.nl,
    teamMemberCardsSectionData: teamMemberCardsSectionData.nl,
    testimonialSwiperSectionData: testimonialSwiperSectionData.nl,
    heroSideImageSectionData: HeroSideImageSectionData.nl,
    servicesSideImageSectionData: servicesSideImageSectionData.nl,
  },
  en: {
    siteData: siteData.en,
    navData: navData.en,
    faqAccordionSectionData: faqAccordionSectionData.en,
    teamMemberCardsSectionData: teamMemberCardsSectionData.en,
    testimonialSwiperSectionData: testimonialSwiperSectionData.en,
    heroSideImageSectionData: HeroSideImageSectionData.en,
    servicesSideImageSectionData: servicesSideImageSectionData.en,
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
    contact_button_text: "Neem contact op",
    contact_button_text_short: "Contact",
    get_quote_button_text: "Vraag een gratis offerte aan",
    get_quote_button_text_short: "Vraag offerte aan",
    back_to_all_posts: "Terug naar alle posts",
    updated: "Geüpdatet",
    about: "Over",
    read_more: "Lees meer",
  },
  en: {
    contact_button: "Contact us",
    contact_button_text_short: "Contact us",
    get_quote_button_text: "Get free quote",
    get_quote_button_text_short: "Get quote",
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
