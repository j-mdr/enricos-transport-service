// types
import { type LocalizedData, type NavItem } from "../configDataTypes.ts";

export const navData: LocalizedData<NavItem[]> = {
  nl: [
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
  en: [
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
};
