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
      href: "/en/contact",
    },
    navItems: [
      {
        text: "About us",
        link: "/en/about-us",
      },
      {
        text: "Services",
        dropdown: [
          { text: "Regular transport", link: "/en/services/regular-transport" },
          { text: "Occasional transport", link: "/en/services/occasional-transport" },
          { text: "Large transport", link: "/en/services/large-transport" },
          { text: "Urgent transport", link: "/en/services/urgent-transport" },
          { text: "Documentation transport", link: "/en/services/document-transport" },
          { text: "Furniture transport", link: "/en/services/furniture-transport" },
        ],
      },
      {
        text: "Become partner",
        link: "/en/become-a-partner",
      },
      {
        text: "Blog",
        link: "/en/blog",
      },
    ],
  },
};
