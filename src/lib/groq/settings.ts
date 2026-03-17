import { defineQuery } from "groq";
import { sanityClient } from "@lib/sanityClient";
import type { Locale } from "@config/siteConfig.ts";
import type { GetSettingsQueryResult } from "../../../sanity.types";
import { linkFragment, ctaButtonFragment, imageFragment } from "./fragments";

export const getSettingsQuery = defineQuery(`*[_id == $id && _type == "settings"][0]`);

export const getRobotsQuery = defineQuery(`*[_id == "robots-txt"][0].content`);

export async function getSettings(locale: Locale): Promise<GetSettingsQueryResult> {
  const id = `settings-${locale}`;
  return sanityClient.fetch(getSettingsQuery, { id });
}

const navFields = `
  logo ${imageFragment},
  ctaButton ${ctaButtonFragment},
  navItems[] {
    _type,
    _type == "link" => ${linkFragment},
    _type == "navItemDropdown" => { label, dropdown[] ${linkFragment} }
  }
`;

const footerFields = `
  logo ${imageFragment},
  ctaButton ${ctaButtonFragment},
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
