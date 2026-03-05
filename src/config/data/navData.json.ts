// types
import { type LocalizedData, type NavData } from "../translations/configDataTypes.ts";
import { textTranslations } from "@config/translations/textTranslations.ts";
import { ROUTES } from "@config/constants.ts";

export const navData: LocalizedData<NavData> = {
  nl: {
    ctaButton: {
      text: textTranslations.nl.contact_button_text_short,
      href: ROUTES.en.contact,
    },
    navItems: [
      {
        text: "Over ons",
        link: "/over-ons",
      },
      // regular dropdown
      {
        text: "Diensten",
        dropdown: [
          {
            text: "Regulier transport",
            link: "/diensten/regulier-transport",
          },
          {
            text: "Incidenteel transport",
            link: "/diensten/incidenteel-transport",
          },
          {
            text: "Groot transport",
            link: "/diensten/groot-transport",
          },
          {
            text: "Spoed transport",
            link: "/diensten/spoedtransport",
          },
          {
            text: "Documententransport",
            link: "/diensten/documenten-transport",
          },
          {
            text: "Meubeltransport",
            link: "/diensten/meubeltransport",
          },
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
      text: textTranslations.en.contact_button_text_short,
      href: ROUTES.en.contact,
    },
    navItems: [
      {
        text: "Over ons",
        link: "/over-ons",
      },
      // regular dropdown
      {
        text: "Services",
        dropdown: [
          {
            text: "Regular transport",
            link: "/diensten/regulier-transport",
          },
          {
            text: "Occasional transport",
            link: "/diensten/incidenteel-transport",
          },
          {
            text: "Large transport",
            link: "/diensten/groot-transport",
          },
          {
            text: "Emergency transport",
            link: "/diensten/spoedtransport",
          },
          {
            text: "Documentation transport",
            link: "/diensten/documenten-transport",
          },
          {
            text: "Furniture transport",
            link: "/diensten/meubeltransport",
          },
        ],
      },
      {
        text: "Become partner",
        link: "/partner-worden",
      },
      {
        text: "Blog",
        link: "/blog",
      },
    ],
  },
};
