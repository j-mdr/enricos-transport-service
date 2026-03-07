import {
  type LocalizedData,
  type CtaCardCenterSectionData,
} from "@config/translations/configDataTypes.ts";

export const ctaCardCenterData: LocalizedData<CtaCardCenterSectionData> = {
  nl: {
    title: "Wij regelen het voor u",
    description:
      "Vraag geheel vrijblijvend een offerte aan en ervaar onze persoonlijke service en betrouwbare transportoplossingen.",
    ctaButton: {
      href: "/offerte-aanvragen",
      text: "Vraag een offerte aan",
    },
  },
  en: {
    title: "Book a ride?",
    description:
      "Enrico's Transportservice provides reliable regular and occasional transport services, including large-scale, express, and document transport, with a personal approach that ensures safe and timely delivery.",
    ctaButton: {
      href: "/en/request-quote",
      text: "Get free quote",
    },
  },
};
