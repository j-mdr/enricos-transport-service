import { type LocalizedData, type HeroSideImageSectionData } from "../configDataTypes.ts";
import heroImage from "@images/enricos_transport_service-bus-zonsopgang_4x3.jpg";
import { textTranslations } from "@config/textTranslations.ts";
import { ROUTES } from "@config/constants.ts";

export const heroSideImageSectionData: LocalizedData<HeroSideImageSectionData> = {
  nl: {
    image: {
      src: heroImage,
      alt: "Enrico Janssen in bestelbus",
    },
    title: "Koerier in Zwolle – Snel, veilig en flexibel{highlight}",
    description: "Uw betrouwbare koerier in Zwolle en omgeving",
    ctaButton: {
      href: ROUTES.nl.offerteAanvragen,
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
      href: ROUTES.en.offerteAanvragen,
      text: textTranslations.en.get_quote_button_text_short,
    },
  },
};
