/**
 * * This file is used to define the navigation links for the site.
 * Notes:
 * 1 level of dropdown is supported
 * Mega menus look best with 3-5 columns, but supports anything > 2 columns
 * If using icons, the icon should be saved in the src/icons folder. If filename is "tabler/icon.svg" then input "tabler/icon"
 * Recommend getting icons from https://tabler.io/icons
 */

// types
import { type navItem } from "../types/configDataTypes.ts";

// note: 1 level of dropdown is supported
const navConfig: navItem[] = [
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
];

export default navConfig;
