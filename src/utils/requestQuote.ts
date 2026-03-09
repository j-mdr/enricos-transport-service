import { createReader } from "@keystatic/core/reader";
import type { Locale } from "@config/siteSettings.json";
import keystaticConfig from "../../keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);

export async function getRequestQuoteLabels(locale: Locale) {
  const data = await (locale === "nl"
    ? reader.singletons.requestQuoteLabelsNL.read()
    : reader.singletons.requestQuoteLabelsEN.read());

  return data ?? null;
}
