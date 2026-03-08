import { getCollection } from "astro:content";
import type { Locale } from "@config/siteSettings.json";
import type { NavData, NavItem } from "@config/configDataTypes";

export async function getNavData(locale: Locale): Promise<NavData> {
  const entries = await getCollection("nav");
  const entry = entries.find((e) => e.id === `${locale}/main`);

  if (!entry) {
    // fallback: return empty nav
    return { ctaButton: { text: "", href: "" }, navItems: [] };
  }

  const { ctaButton, navItems } = entry.data;

  const mappedNavItems: NavItem[] = navItems.map((item) => {
    if (item.dropdown && item.dropdown.length > 0) {
      return {
        text: item.text,
        dropdown: item.dropdown.map((d) => ({ text: d.text, link: d.link })),
      };
    }
    return { text: item.text, link: item.link ?? "/" };
  });

  return { ctaButton, navItems: mappedNavItems };
}

export async function getNavLogo(locale: Locale) {
  const entries = await getCollection("nav");
  const entry = entries.find((e) => e.id === `${locale}/main`);
  if (!entry) return null;
  return { logo: entry.data.logo, logoAlt: entry.data.logoAlt };
}
