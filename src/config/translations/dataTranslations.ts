/**
 * * Data file configuration for the i18n system
 * Every {Data} key must exist in the below object
 */
import { companyInfoTranslations } from "@config/translations/companyInfoTranslations.ts";

export const dataTranslations = {
  nl: {
    siteData: companyInfoTranslations.nl,
  },
  en: {
    siteData: companyInfoTranslations.en,
  },
} as const;
