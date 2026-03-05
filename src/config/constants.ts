import type { LocalizedData } from "@config/translations/configDataTypes.ts";


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
