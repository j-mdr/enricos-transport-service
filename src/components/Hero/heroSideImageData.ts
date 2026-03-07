import {
  type LocalizedData,
  type HeroSideImageSectionData,
} from "@config/configDataTypes.ts";
import heroImage from "@images/enricos-transportservice-bestelbus-achteraanzicht-zonsondergang-rivier-1x1.jpeg";

export const heroSideImageData: LocalizedData<HeroSideImageSectionData> = {
  nl: {
    image: {
      src: heroImage,
      alt: "Enrico Janssen in bestelbus",
    },
    title: "Helder, snel{highlight} en zonder ver\u00ADras\u00ADsingen",
    description: "Direct inzicht in kosten",
    ctaButton: {
      href: "/offerte-aanvragen",
      text: "Offerte aanvragen",
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
      href: "/en/request-quote",
      text: "Get quote",
    },
  },
};
