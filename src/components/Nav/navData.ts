import { type LocalizedData, type NavData } from "@config/configDataTypes.ts";

export const navData: LocalizedData<NavData> = {
  nl: {
    ctaButton: {
      text: "Contact",
      href: "/contact",
    },
    navItems: [
      {
        text: "Over ons",
        link: "/over-ons",
      },
      {
        text: "Diensten",
        dropdown: [
          { text: "Regulier transport", link: "/diensten/regulier-transport" },
          { text: "Incidenteel transport", link: "/diensten/incidenteel-transport" },
          { text: "Groot transport", link: "/diensten/groot-transport" },
          { text: "Spoed transport", link: "/diensten/spoed-transport" },
          { text: "Documententransport", link: "/diensten/documenten-transport" },
          { text: "Meubeltransport", link: "/diensten/meubel-transport" },
        ],
      },
      {
        text: "Partner worden",
        link: "/partner-worden",
      },
      {
        text: "Blog",
        link: "/blog",
      },
    ],
  },
  en: {
    ctaButton: {
      text: "Contact us",
      href: "/contact",
    },
    navItems: [
      {
        text: "About us",
        link: "/about-us",
      },
      {
        text: "Services",
        dropdown: [
          { text: "Regular transport", link: "/services/regular-transport" },
          { text: "Occasional transport", link: "/services/occasional-transport" },
          { text: "Large transport", link: "/services/large-transport" },
          { text: "Urgent transport", link: "/services/urgent-transport" },
          { text: "Documentation transport", link: "/services/document-transport" },
          { text: "Furniture transport", link: "/services/furniture-transport" },
        ],
      },
      {
        text: "Become partner",
        link: "/become-a-partner",
      },
      {
        text: "Blog",
        link: "/blog",
      },
    ],
  },
};
