import { type LocalizedData, type FooterData } from "@config/translations/configDataTypes.ts";

export const footerData: LocalizedData<FooterData> = {
  nl: {
    companyName: "Enrico's Transportservice",
    ctaButton: {
      href: "/contact",
      text: "Neem contact op",
    },
  },
  en: {
    companyName: "Enrico's Transportservice",
    ctaButton: {
      href: "/en/contact",
      text: "Contact us",
    },
  },
};
