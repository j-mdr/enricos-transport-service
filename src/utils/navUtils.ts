import type { Locale } from "@config/siteConfig.ts";
import { getNavData as fetchNavData } from "@lib/groq/nav";

export async function getNavData(locale: Locale) {
  return fetchNavData(locale);
}
