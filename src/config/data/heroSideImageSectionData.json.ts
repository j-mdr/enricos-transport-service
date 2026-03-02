// types
import { type DataTranslationType, type heroSideImageSectionData } from "../configDataTypes.ts";

//image
import heroImage from "@images/enrico-in-bestelbus.tiff";

export const HeroSideImageSectionData: DataTranslationType<heroSideImageSectionData> = {
  nl: {
    image: heroImage,

    title: "Koerier in Zwolle – Snel, veilig en flexibel{highlight}",
    description: "Direct inzicht in kosten – helder, snel en zonder verrassingen.",
    imageAlt: "Enrico Janssen in bestelbus",
  },
  en: {
    image: heroImage,
    title: "Carrier in the Netherlands, Zwolle – Fast, secure and flexibel{highlight}",
    description: "Description text...",
    imageAlt: "Enrico Janssen",
  },
};
