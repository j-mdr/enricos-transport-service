import type { Locale } from "@config/siteSettings.json";
import type { NavData, NavItem } from "@config/configDataTypes";
import { getNavData as fetchNavData } from "@lib/groq/nav";

export function mapNavData(data: any): NavData {
  if (!data) return { ctaButton: { text: "", href: "" }, navItems: [] };

  const navItems: NavItem[] = (data.navItems ?? []).map((item: any) => {
    if (item.dropdown && item.dropdown.length > 0) {
      return {
        text: item.text,
        dropdown: item.dropdown.map((d: any) => ({ text: d.text, link: d.href })),
      };
    }
    return { text: item.text, link: item.href ?? "/" };
  });

  return {
    logo: data.logo ?? null,
    ctaButton: {
      text: data.ctaButton?.link?.text ?? "",
      href: data.ctaButton?.link?.href ?? "",
    },
    navItems,
  } as NavData & { logo: any };
}

export async function getNavData(locale: Locale): Promise<NavData> {
  const data = await fetchNavData(locale);
  return mapNavData(data);
}
