import { sanityClient } from "@lib/sanityClient";
import type { Locale } from "@config/siteSettings.json";

export async function getSettings(locale: Locale) {
  const id = `settings-${locale}`;
  return sanityClient.fetch(`*[_id == $id][0]`, { id });
}