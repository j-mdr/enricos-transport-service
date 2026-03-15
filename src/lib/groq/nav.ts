import type { Locale } from "@config/siteConfig.ts";
import { getNavFromSettings } from "./settings";

export async function getNavData(locale: Locale) {
  return getNavFromSettings(locale);
}
