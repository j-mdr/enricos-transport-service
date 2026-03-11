import { createReader } from "@keystatic/core/reader";
import type { Locale } from "@config/siteSettings.json";
import type { NavData, NavItem } from "@config/configDataTypes";
import keystaticConfig from "../../keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);

export async function getNavData(locale: Locale): Promise<NavData> {
  const data = await (locale === "nl"
    ? reader.singletons.navNL.read()
    : reader.singletons.navEN.read());

  if (!data) {
    return { ctaButton: { text: "", href: "" }, navItems: [] };
  }

  const { ctaButton, navItems } = data;

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
