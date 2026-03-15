import type { Locale } from "@config/siteConfig.ts";
import type { NavData, NavItem } from "@config/configDataTypes";
import { getNavData as fetchNavData } from "@lib/groq/nav";

function resolveLink(item: any, locale: string = "nl"): string {
  const dest = item?.destination?.[0];
  if (!dest) return "/";
  if (dest._type === "internalLink") return dest.reference?.urlPath ?? "/";
  return dest.href ?? "/";
}

function isNewTab(item: any): boolean {
  return item?.destination?.[0]?.openInNewTab ?? false;
}

export function mapNavData(data: any, locale: string = "nl"): NavData {
  if (!data) return { ctaButton: { text: "", href: "" }, navItems: [] };

  const navItems: NavItem[] = (data.navItems ?? []).map((item: any) => {
    if (item._type === "navItemDropdown") {
      return {
        text: item.label,
        dropdown: (item.dropdown ?? []).map((d: any) => ({
          text: d.text,
          link: resolveLink(d, locale),
          newTab: isNewTab(d),
        })),
      };
    }
    return {
      text: item.text,
      link: resolveLink(item, locale),
      newTab: isNewTab(item),
    };
  });

  return {
    logo: data.logo ?? null,
    ctaButton: {
      link: data.ctaButton?.link ?? null,
      variant: data.ctaButton?.variant ?? "primary",
      size: data.ctaButton?.size ?? "md",
    },
    navItems,
  } as NavData & { logo: any };
}

export async function getNavData(locale: Locale): Promise<NavData> {
  const data = await fetchNavData(locale);
  return mapNavData(data, locale);
}
