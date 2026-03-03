export const COMPANY_INFO = {
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
export const SOCIAL_LINKS = {
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

// Main page routes
// for defaut locale (NL). Make sure to update these routes if you change the default locale or add new pages.
// These routes are used for the main navigation and in the hero section CTA button, so they should always be up to date.
export const MAIN_ROUTES = {
  home: "/",
  overOns: "/over-ons",
  diensten: "/diensten",
  contact: "/contact",
  offerteAanvragen: "/offerte-aanvragen",
  partnerWorden: "/partner-worden",
  blog: "/blog",
  categorieen: "/categorieen",
  regulierTransport: "/regulier-transport",
  incidenteelTransport: "/incidenteel-transport",
  grootTransport: "/regulier-transport",
  spoedTransport: "/spoed-transport",
  documentenTransport: "/documenten-transport",
  meubelTransport: "/meubel-transport",
} as const;
