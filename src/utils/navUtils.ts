import type { Locale } from "@config/siteSettings.json";
import type { NavData, NavItem } from "@config/configDataTypes";
import { getNavData as fetchNavData } from "@lib/groq/nav";

function resolveLink(link: any, locale: string = "nl"): string {
  if (!link) return "/";
  if (link.linkType === "internal") {
    const slug = link.reference?.slug?.current ?? "";
    const type = link.reference?._type;
    const prefix = locale === "nl" ? "" : `/${locale}`;
    if (type === "blogPost") return `${prefix}/blog/${slug}`;
    return `${prefix}/${slug}`;
  }
  return link.href ?? "/";
}

export function mapNavData(data: any, locale: string = "nl"): NavData {
  if (!data) return { ctaButton: { text: "", href: "" }, navItems: [] };

  const navItems: NavItem[] = (data.navItems ?? []).map((item: any) => {
    if (item.hasDropdown && item.dropdown?.length > 0) {
      return {
        text: item.text,
        dropdown: item.dropdown.map((d: any) => ({
          text: d.text,
          link: resolveLink(d, locale),
          newTab: d.openInNewTab ?? false,
        })),
      };
    }
    return {
      text: item.text,
      link: resolveLink(item.link, locale),
      newTab: item.link?.openInNewTab ?? false,
    };
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
  return mapNavData(data, locale);
}
