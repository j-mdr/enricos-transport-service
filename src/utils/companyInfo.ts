import { createReader } from "@keystatic/core/reader";
import type { Locale } from "@config/siteSettings.json";
import keystaticConfig from "../../keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);

export async function getCompanyInfo(locale: Locale) {
  const data = await (locale === "nl"
    ? reader.singletons.companyInfoNL.read()
    : reader.singletons.companyInfoEN.read());

  return data ?? null;
}

export type CompanyInfo = Awaited<ReturnType<typeof getCompanyInfo>>;
