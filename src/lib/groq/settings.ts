import { sanityClient } from "@lib/sanityClient";
import type { Locale } from "@config/siteSettings.json";
import { linkFragment, destinationFragment } from "./fragments";

export async function getSettings(locale: Locale) {
  const id = `settings-${locale}`;
  return sanityClient.fetch(`*[_id == $id][0]`, { id });
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

export async function getNavFromSettings(locale: Locale) {
  const id = `settings-${locale}`;
  return sanityClient.fetch(`*[_id == $id][0].nav { ${navFields} }`, { id });
}

export async function getFooterFromSettings(locale: Locale) {
  const id = `settings-${locale}`;
  return sanityClient.fetch(`*[_id == $id][0].footer { ${footerFields} }`, { id });
}
