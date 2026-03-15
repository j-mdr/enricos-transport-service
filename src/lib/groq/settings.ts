import { defineQuery } from "groq";
import { sanityClient } from "@lib/sanityClient";
import type { Locale } from "@config/siteConfig.ts";
import { linkFragment, destinationFragment } from "./fragments";

export const getSettingsQuery = defineQuery(`*[_id == $id][0]`);

export async function getSettings(locale: Locale) {
  const id = `settings-${locale}`;
  return sanityClient.fetch(getSettingsQuery, { id });
}

const navFields = `
  logo { asset, alt, hotspot, crop },
  ctaButton { link ${linkFragment} },
  navItems[] {
    _type,
    _type == "link" => { text, ${destinationFragment} },
    _type == "navItemDropdown" => { label, dropdown[] ${linkFragment} }
  }
`;

const footerFields = `
  logo { asset, alt, hotspot, crop },
  ctaButton { link ${linkFragment} },
  columns[] { title, links[] ${linkFragment} }
`;

export const getNavFromSettingsQuery = defineQuery(`*[_id == $id][0].nav { ${navFields} }`);

export const getFooterFromSettingsQuery = defineQuery(
  `*[_id == $id][0].footer { ${footerFields} }`,
);

export async function getNavFromSettings(locale: Locale) {
  const id = `settings-${locale}`;
  return sanityClient.fetch(getNavFromSettingsQuery, { id });
}

export async function getFooterFromSettings(locale: Locale) {
  const id = `settings-${locale}`;
  return sanityClient.fetch(getFooterFromSettingsQuery, { id });
}
