// types
import {
  type FooterData,
  type LocalizedData,
} from "../translations/configDataTypes.ts";
import { createCtaButton } from "@config/data/dataUtils.ts";
import { companyInfoTranslations } from "@config/translations/companyInfoTranslations.ts";
import { routeTranslations } from "@config/translations/routeTranslations.ts";
import { textTranslations } from "@config/translations/textTranslations.ts";

export const footerData: LocalizedData<FooterData> = {
  nl: {
    ...createCtaButton(routeTranslations.nl.contact, textTranslations.nl.contact_button_text_short),
    companyName: companyInfoTranslations.nl.name,
  },
  en: {
    ...createCtaButton(routeTranslations.en.contact, textTranslations.en.contact_button_text_short),
    companyName: companyInfoTranslations.en.name
  },
};
