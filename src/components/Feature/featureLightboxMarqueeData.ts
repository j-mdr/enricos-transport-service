import type { LocalizedData, FeatureLightboxMarqueeSectionData } from "@config/configDataTypes.ts";
import image1 from "@images/enricos-transportservice-bestelbus-geparkeerd-attractiepark-1x1.jpeg";
import image2 from "@images/enricos-transportservice-bestelbus-achteraanzicht-bospad-herfst-1x1.jpeg";
import image3 from "@images/enricos-transportservice-bestelbus-achterkant-hotel-apeldoorn-1x1.jpeg";
import image4 from "@images/enricos-transportservice-bestelbus-laaddock-distributiecentrum-technische-unie-4x3.jpeg";
import image5 from "@images/enricos-transportservice-bestelbus-magazijn-laden-groene-kratten-4x3.jpeg";
import image6 from "@images/enricos-transportservice-bestelbus-voor-verlichte-villa-avond-4x3.jpeg";
import image7 from "@images/enricos-transportservice-bestelbus-voorkant-zonsopgang-mistig-landschap-4x3.jpeg";

export const featureLightboxMarqueeData: LocalizedData<FeatureLightboxMarqueeSectionData> = {
  nl: {
    title: "Onderweg naar onze klanten{highlight}",
    images: [
      { src: image1, alt: "Image 1" },
      { src: image2, alt: "Image 2" },
      { src: image3, alt: "Image 3" },
      { src: image4, alt: "Image 4" },
      { src: image5, alt: "Image 5" },
      { src: image6, alt: "Image 6" },
      { src: image7, alt: "Image 7" },
    ],
  },
  en: {
    title: "On the road to our customers{highlight}",
    images: [
      { src: image1, alt: "Image 1" },
      { src: image2, alt: "Image 2" },
      { src: image3, alt: "Image 3" },
      { src: image4, alt: "Image 4" },
      { src: image5, alt: "Image 5" },
      { src: image6, alt: "Image 6" },
      { src: image7, alt: "Image 7" },
    ],
  },
};
