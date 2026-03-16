import type { Locale } from "@config/siteConfig.ts";
import { getFooterFromSettings } from "@lib/groq/settings";

function resolveDestination(item: any, _locale: string = "nl"): string {
  const dest = item?.destination?.[0];
  if (!dest) return "/";
  if (dest._type === "internalLink") return dest.reference?.urlPath ?? "/";
  return dest.href ?? "/";
}

export async function getFooterData(locale: Locale) {
  const data = await getFooterFromSettings(locale);

  return {
    logo: data?.logo ?? null,
    ctaButton: {
      link: data?.ctaButton?.link ?? null,
      variant: data?.ctaButton?.variant ?? "primary",
      size: data?.ctaButton?.size ?? "md",
    },
    columns: (data?.columns ?? []).map((col: any) => ({
      title: col.title,
      links: (col.links ?? []).map((link: any) => ({
        text: link.text,
        href: resolveDestination(link, locale),
        newTab: link.destination?.[0]?.openInNewTab ?? false,
      })),
    })),
  };
}
