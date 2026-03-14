import type { Locale } from "@config/siteSettings.json";
import nlLabels from "../content/labels/nl.json";
import enLabels from "../content/labels/en.json";

const labelsMap = { nl: nlLabels, en: enLabels };

export type Labels = typeof nlLabels;

export function getLabels(locale: Locale): Labels {
  return labelsMap[locale] ?? nlLabels;
}

export async function useLabels(locale: Locale) {
  const data = getLabels(locale);
  return function t(key: keyof Labels): string {
    return data[key] ?? "";
  };
}
