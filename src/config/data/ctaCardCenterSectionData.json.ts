import { type CtaCardCenterSectionData, type LocalizedData } from "../configDataTypes.ts";
import { ROUTES } from "@config/constants.ts";
import { textTranslations } from "@config/text/textTranslations.ts";

export const ctaCardCenterSectionData: LocalizedData<CtaCardCenterSectionData> = {
  nl: {
    title: "Wat wij voor u kunnen betekenen",
    description:
      "Enrico’s Transportservice biedt betrouwbaar regulier en incidenteel transport, waaronder groot-, spoed- en documententransport, met een persoonlijke aanpak die zorgt voor veilige en tijdige levering.",
    ctaButton: {
      href: ROUTES.nl.offerteAanvragen,
      text: textTranslations.nl.get_quote_button_text,
    },
  },
  en: {
    title: "What we can do for you",
    description:
      "Enrico’s Transportservice provides reliable regular and occasional transport services, including large-scale, express, and document transport, with a personal approach that ensures safe and timely delivery.",
    ctaButton: {
      href: ROUTES.nl.offerteAanvragen,
      text: textTranslations.en.get_quote_button_text,
    },
  },
};
