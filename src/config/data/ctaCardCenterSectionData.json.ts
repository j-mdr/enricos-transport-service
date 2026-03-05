import { type CtaCardCenterSectionData, type LocalizedData } from "../translations/configDataTypes.ts";
import { ROUTES } from "@config/constants.ts";
import { textTranslations } from "@config/translations/textTranslations.ts";

export const ctaCardCenterSectionData: LocalizedData<CtaCardCenterSectionData> = {
  nl: {
    title: "Wij regelen het voor u",
    description:
      "Vraag geheel vrijblijvend een offerte aan en ervaar onze persoonlijke service en betrouwbare transportoplossingen.",
    ctaButton: {
      href: ROUTES.nl.offerteAanvragen,
      text: textTranslations.nl.get_quote_button_text,
    },
  },
  en: {
    title: "Book a ride?",
    description:
      "Enrico’s Transportservice provides reliable regular and occasional transport services, including large-scale, express, and document transport, with a personal approach that ensures safe and timely delivery.",
    ctaButton: {
      href: ROUTES.nl.offerteAanvragen,
      text: textTranslations.en.get_quote_button_text,
    },
  },
};
