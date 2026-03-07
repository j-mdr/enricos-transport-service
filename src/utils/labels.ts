import { createReader } from "@keystatic/core/reader";
import type { Locale } from "@config/siteSettings.json";
import keystaticConfig from "../../keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);

export async function getLabels(locale: Locale) {
  const data = await (locale === "nl"
    ? reader.singletons.labelsNL.read()
    : reader.singletons.labelsEN.read());

  return data ?? null;
}

export type Labels = Awaited<ReturnType<typeof getLabels>>;

export async function useLabels(locale: Locale) {
  const data = await getLabels(locale);
  return function t(key: keyof NonNullable<Labels>) {
    return data?.[key] ?? "";
  };
}
