import type { Locale } from "@config/siteSettings.json";
import { getSettings } from "@lib/groq/settings";

export async function getCompanyInfo(locale: Locale) {
  return getSettings(locale);
}

export type CompanyInfo = Awaited<ReturnType<typeof getCompanyInfo>>;
