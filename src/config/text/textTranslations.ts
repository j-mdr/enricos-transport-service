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
    get_quote_button_text: "Vraag een offerte aan",
    get_quote_button_text_short: "Offerte aanvragen",
    back_to_all_posts: "Terug naar alle posts",
    updated: "geüpdatet",
    about: "over",
    read_more: "lees meer",
    contact_information: "Contactgegevens",
  },
  en: {
    contact_button: "Contact us",
    contact_button_text_short: "Contact us",
    get_quote_button_text: "Get free quote",
    get_quote_button_text_short: "Get quote",
    back_to_all_posts: "Back to all posts",
    updated: "updated",
    about: "about",
    read_more: "read more",
    contact_information: "Location & Contact",
  },
} as const;
