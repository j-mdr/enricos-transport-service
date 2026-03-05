import { type LocalizedData, type SiteData } from "./configDataTypes.ts";
import { COMPANY_INFO } from "@config/constants.ts";

// Update this file with your site specific information
const COMPANY_NAME = "Enrico's Transportservice";
const COMPANY_EMAIL = "info@enricostransportservice.nl";
const COMPANY_PHONE = "+31 6 5517 4134";
const COMPANY_ADDRES_STREET = "";
const COMPANY_ADDRESS_CITY = "";
const COMPANY_ADDRES_ZIPCODE = "";
const COMPANY_ADDRES_PROVINCE = "";
const COMPANY_ADDRES_COUNTRY = "Netherlands";
const BASE_URL = "https://enricostransportservice.nl";

export const companyInfoTranslations: LocalizedData<SiteData> = {
  nl: {
    name: COMPANY_NAME,
    // Your website's title and description (meta fields)
    title: "Enrico's Transportservice - Veilig, vlot en vertrouwd",
    description: `SPOED BESCHIKBAAR - Binnen 60 tot 120 minuten op locatie aanwezig Koerier Zwolle. Direct inzicht in kosten – helder, snel en zonder verrassingen. Persoonlijk & direct contact Flexibel maatwerktransport. 24/7 spoedservice mogelijk. Betrouwbare levering SPOED BESCHIKBAAR - Binnen 60`,
    baseUrl: BASE_URL,
    // used on contact page and footer
    contact: {
      street: COMPANY_ADDRES_STREET,
      city: COMPANY_ADDRESS_CITY,
      zipCode: COMPANY_ADDRES_ZIPCODE,
      province: COMPANY_ADDRES_PROVINCE,
      country: COMPANY_ADDRES_COUNTRY,
      phone: "+31 6 5517 4134",
      email: COMPANY_INFO.email,
    },

    // Your information for blog post purposes
    author: {
      name: COMPANY_NAME,
      email: COMPANY_EMAIL,
      twitter: "",
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
    title: "Enrico's Transportservice - Safe, swift and trusted",
    description: `URGENT AVAILABLE - On-site within 60 to 120 minutes Courier Zwolle. Immediate cost insight – clear, fast and without surprises. Personal & direct contact Flexible custom transport. 24/7 emergency service possible. Reliable delivery EMERGENCY AVAILABLE - On-site within 60`,
    baseUrl: BASE_URL,
    // used on contact page and footer
    contact: {
      street: COMPANY_ADDRES_STREET,
      city: COMPANY_ADDRESS_CITY,
      zipCode: COMPANY_ADDRES_ZIPCODE,
      province: COMPANY_ADDRES_PROVINCE,
      country: COMPANY_ADDRES_COUNTRY,
      phone: COMPANY_PHONE,
      email: "info@enricostransportservice.nl",
    },

    // Your information for blog post purposes
    author: {
      name: COMPANY_NAME,
      email: COMPANY_EMAIL,
      twitter: "",
    },

    // default image for meta tags if the page doesn't have an image already
    defaultImage: {
      src: "/images/cosmic-themes-logo.jpg",
      alt: "Cosmic Themes logo",
    },
  },
};
