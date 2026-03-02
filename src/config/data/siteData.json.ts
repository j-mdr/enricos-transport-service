import { type DataTranslationType, type SiteData } from "../configDataTypes.ts";
import { COMPANY_EMAIL, COMPANY_NAME, COMPANY_PHONE } from "@config/constants.ts";

// Update this file with your site specific information

export const siteData: DataTranslationType<SiteData> = {
  nl: {
    name: COMPANY_NAME,
    // Your website's title and description (meta fields)
    title: "Enrico's Transportservice - Veilig, vlot en vertrouwd",
    description: `SPOED BESCHIKBAAR - Binnen 60 tot 120 minuten op locatie aanwezig Koerier Zwolle. Direct inzicht in kosten – helder, snel en zonder verrassingen. Persoonlijk & direct contact Flexibel maatwerktransport. 24/7 spoedservice mogelijk. Betrouwbare levering SPOED BESCHIKBAAR - Binnen 60`,

    // used on contact page and footer
    contact: {
      address1: "Heel Nederland",
      address2: "",
      phone: COMPANY_PHONE,
      email: COMPANY_EMAIL,
    },

    // Your information for blog post purposes
    author: {
      name: "Enrico's Transportservice",
      email: "creator@cosmicthemes.com",
      twitter: "Cosmic_Themes",
    },

    // default image for meta tags if the page doesn't have an image already
    defaultImage: {
      src: "/images/cosmic-themes-logo.jpg",
      alt: "Cosmic Themes logo",
    },
  },
  en: {
    name: COMPANY_NAME,
    // Your website's title and description (meta fields)
    title: "Enrico's Transportservice - Veilig, vlot en vertrouwd",
    description: `SPOED BESCHIKBAAR - Binnen 60 tot 120 minuten op locatie aanwezig Koerier Zwolle. Direct inzicht in kosten – helder, snel en zonder verrassingen. Persoonlijk & direct contact Flexibel maatwerktransport. 24`,

    // used on contact page and footer
    contact: {
      address1: "Netherlands",
      address2: "",
      phone: COMPANY_PHONE,
      email: COMPANY_EMAIL,
    },

    // Your information for blog post purposes
    author: {
      name: "Cosmic Themes",
      email: "creator@cosmicthemes.com",
      twitter: "Cosmic_Themes",
    },

    // default image for meta tags if the page doesn't have an image already
    defaultImage: {
      src: "/images/cosmic-themes-logo.jpg",
      alt: "Cosmic Themes logo",
    },
  },
};
