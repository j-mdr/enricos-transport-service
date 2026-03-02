import { type DataTranslationType, type HeroSideImageSectionData } from "../configDataTypes.ts";
import heroImage from "@images/enrico-in-bestelbus.tiff";
import { textTranslations } from "@config/text/textTranslations.ts";
import { MAIN_ROUTES } from "@config/constants.ts";

export const heroSideImageSectionData: DataTranslationType<HeroSideImageSectionData> = {
  nl: {
    image: {
      src: heroImage,
      alt: "Enrico Janssen in bestelbus",
    },
    title: "Koerier in Zwolle – Snel, veilig en flexibel{highlight}",
    description: "Uw betrouwbare koerier in Zwolle en omgeving",
    ctaButton: {
      href: MAIN_ROUTES.offerteAanvragen,
      text: textTranslations.nl.get_quote_button_text_short,
    },
  },
  en: {
    image: {
      src: heroImage,
      alt: "Enrico Janssen sitting in a delivery van",
    },
    title: "Courier in Zwolle – Fast, safe and flexible{highlight}",
    description: "Reliable carrier in Zwolle and surrounding areas",
    ctaButton: {
      href: MAIN_ROUTES.offerteAanvragen,
      text: textTranslations.en.get_quote_button_text_short,
    },
  },
};
