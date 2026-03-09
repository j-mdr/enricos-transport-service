import { createReader } from "@keystatic/core/reader";
import type { Locale } from "@config/siteSettings.json";
import keystaticConfig from "../../keystatic.config";
import { getCompanyInfo } from "@utils/companyInfo";

const reader = createReader(process.cwd(), keystaticConfig);

export async function getFooterData(locale: Locale) {
  const data = await (locale === "nl"
    ? reader.singletons.footerNL.read()
    : reader.singletons.footerEN.read());

  const companyInfo = await getCompanyInfo(locale);

  const companyName = data?.companyName?.trim() || companyInfo?.name || "Enrico's Transportservice";

  return {
    companyName,
    ctaButton: {
      text: data?.ctaButtonText ?? "",
      href: data?.ctaButtonHref ?? "",
    },
  };
}
