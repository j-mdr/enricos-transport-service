import {
  type LocalizedData,
  type HeroSideImageSectionData,
} from "../translations/configDataTypes.ts";
import heroImage from "@images/enricos-transportservice-bestelbus-achteraanzicht-zonsondergang-rivier-1x1.jpeg";
import { textTranslations } from "@config/translations/textTranslations.ts";
import { ROUTES } from "@config/constants.ts";

export const heroSideImageSectionData: LocalizedData<HeroSideImageSectionData> = {
  nl: {
    image: {
      src: heroImage,
      alt: "Enrico Janssen in bestelbus",
    },
    title: "Helder, snel{highlight} en zonder ver\u00ADras\u00ADsingen",
    description: "Direct inzicht in kosten",
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
    title: "Clear, fast{highlight} and without surprises",
    description: "Immediate cost insight",
    ctaButton: {
      href: ROUTES.en.offerteAanvragen,
      text: textTranslations.en.get_quote_button_text_short,
    },
  },
};
