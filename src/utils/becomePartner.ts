import { createReader } from "@keystatic/core/reader";
import type { Locale } from "@config/siteSettings.json";
import keystaticConfig from "../../keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);

export async function getBecomePartnerLabels(locale: Locale) {
  const data = await (locale === "nl"
    ? reader.singletons.becomePartnerLabelsNL.read()
    : reader.singletons.becomePartnerLabelsEN.read());

  return data ?? null;
}
