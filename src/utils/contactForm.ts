import { createReader } from "@keystatic/core/reader";
import type { Locale } from "@config/siteSettings.json";
import keystaticConfig from "../../keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);

export async function getContactFormLabels(locale: Locale) {
  const data = await (locale === "nl"
    ? reader.singletons.contactFormLabelsNL.read()
    : reader.singletons.contactFormLabelsEN.read());

  return data ?? null;
}
