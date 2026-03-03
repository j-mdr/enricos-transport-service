import type { LocalizedData } from "@config/configDataTypes.ts";

type CompanyInfo = {
  name: string;
  address: string;
  city: string;
  zipCode: string;
  province: string;
  phone: string;
  email: string;
  websiteUrl: string;
};

export const COMPANY_INFO: CompanyInfo = {
  name: "Enrico's Transportservice",
  address: "",
  city: "",
  zipCode: "",
  province: "",
  phone: "+31 6 55174134",
  email: "info@enricostransportservice.nl",
  websiteUrl: "https://enricostransportservice.nl",
} as const;

// Social media links
type SocialLink = {
  url: string; // full URL to the social media profile
  id: string; // the username or page name on the social media platform, used for display purposes
};

type SocialLinks = {
  facebook: SocialLink;
  instagram: SocialLink;
  linkedin: SocialLink;
};

export const SOCIAL_LINKS: SocialLinks = {
  facebook: {
    url: "https://www.facebook.com/people/Enricos-Transportservice/100090222390945/",
    id: "Enricos-Transportservice",
  },
  instagram: {
    url: "https://www.instagram.com/enricostransportservice/",
    id: "enricostransportservice",
  },
  linkedin: {
    url: "https://nl.linkedin.com/company/enrico-s-transportservice",
    id: "enrico-s-transportservice",
  },
} as const;

// Single source of truth for all routes in the application.
// Make sure to update the files in /pages to match these routes

export type Routes = {
  home: string;
  overOns: string;
  diensten: string;
  contact: string;
  offerteAanvragen: string;
  partnerWorden: string;
  blog: string;
  categorieen: string;
  regulierTransport: string;
  incidenteelTransport: string;
  grootTransport: string;
  spoedTransport: string;
  documentenTransport: string;
  meubelTransport: string;
};

export type LocalizedRoutes = LocalizedData<Routes>;

export const ROUTES: LocalizedRoutes = {
  nl: {
    home: "/",
    overOns: "/over-ons",
    diensten: "/diensten",
    contact: "/contact",
    offerteAanvragen: "/offerte-aanvragen",
    partnerWorden: "/partner-worden",
    blog: "/blog",
    categorieen: "/categorieen",
    regulierTransport: "/diensten/regulier-transport",
    incidenteelTransport: "/diensten/incidenteel-transport",
    grootTransport: "/diensten/groot-transport",
    spoedTransport: "/diensten/spoed-transport",
    documentenTransport: "/diensten/documenten-transport",
    meubelTransport: "/diensten/meubel-transport",
  },
  en: {
    home: "/",
    overOns: "/about-us",
    diensten: "/services",
    contact: "/contact",
    offerteAanvragen: "/request-quote",
    partnerWorden: "/become-a-partner",
    blog: "/blog",
    categorieen: "/categories",
    regulierTransport: "/services/regular-transport",
    incidenteelTransport: "/services/occasional-transport",
    grootTransport: "/services/large-transport",
    spoedTransport: "/services/urgent-transport",
    documentenTransport: "/services/document-transport",
    meubelTransport: "/services/furniture-transport",
  },
};
