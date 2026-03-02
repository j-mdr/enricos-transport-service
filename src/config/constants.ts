export const COMPANY_NAME = "Enrico's Transportservice";
export const COMPANY_PHONE = '31 6 55174134"';
export const COMPANY_EMAIL = "info@enricostransportservice.nl";
export const WEBSITE_URL = "https://enricostransportservice.nl";

// Main page routes for defaut locale (NL). Make sure to update these routes if you change the default locale or add new pages.
// These routes are used for the main navigation and in the hero section CTA button, so they should always be up to date.
export const MAIN_ROUTES = {
  home: "/",
  overOns: "/over-ons",
  diensten: "/diensten",
  contact: "/contact",
  offerteAanvragen: "/offerte-aanvragen",
  partnerWorden: "/partner-worden",
  blog: "/blog",
  regulierTransport: "/regulier-transport",
  incidenteelTransport: "/incidenteel-transport",
  grootTransport: "/regulier-transport",
  spoedTransport: "/spoed-transport",
  documentenTransport: "/documenten-transport",
  meubelTransport: "/meubel-transport",
} as const;
