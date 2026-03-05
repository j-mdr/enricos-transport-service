// types
import { type LocalizedData, type NavData } from "../translations/configDataTypes.ts";
import { textTranslations } from "@config/translations/textTranslations.ts";
import { ROUTES } from "@config/constants.ts";
import { routeTranslations } from "@config/translations/routeTranslations.ts";

export const navData: LocalizedData<NavData> = {
  nl: {
    ctaButton: {
      text: textTranslations.nl.contact_button_text_short,
      href: routeTranslations.nl.contact,
    },
    navItems: [
      {
        text: "Over ons",
        link: routeTranslations.nl.over_ons,
      },
      // regular dropdown
      {
        text: "Diensten",
        dropdown: [
          {
            text: "Regulier transport",
            link: routeTranslations.nl.diensten_regulier_transport,
          },
          {
            text: "Incidenteel transport",
            link: routeTranslations.nl.diensten_incidenteel_transport,
          },
          {
            text: "Groot transport",
            link: routeTranslations.nl.diensten_groot_transport,
          },
          {
            text: "Spoed transport",
            link: routeTranslations.nl.diensten_spoed_transport,
          },
          {
            text: "Documententransport",
            link: routeTranslations.nl.diensten_documenten_transport,
          },
          {
            text: "Meubeltransport",
            link: routeTranslations.nl.diensten_meubel_transport,
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
        text: "About us",
        link: routeTranslations.en.over_ons,
      },
      // regular dropdown
      {
        text: "Services",
        dropdown: [
          {
            text: "Regular transport",
            link: routeTranslations.en.diensten_regulier_transport,
          },
          {
            text: "Occasional transport",
            link: routeTranslations.en.diensten_incidenteel_transport,
          },
          {
            text: "Large transport",
            link: routeTranslations.en.diensten_groot_transport,
          },
          {
            text: "Urgent transport",
            link: routeTranslations.en.diensten_spoed_transport,
          },
          {
            text: "Documentation transport",
            link: routeTranslations.en.diensten_documenten_transport,
          },
          {
            text: "Furniture transport",
            link: routeTranslations.en.diensten_meubel_transport,
          },
        ],
      },
      {
        text: "Become partner",
        link: routeTranslations.en.partner_worden,
      },
      {
        text: "Blog",
        link: routeTranslations.en.blog,
      },
    ],
  },
};
