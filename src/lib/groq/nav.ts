import type { Locale } from "@config/siteSettings.json";
import { getNavFromSettings } from "./settings";

export async function getNavData(locale: Locale) {
  return getNavFromSettings(locale);
}
