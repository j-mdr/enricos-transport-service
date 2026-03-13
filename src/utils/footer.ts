import type { Locale } from "@config/siteSettings.json";
import { sanityClient } from "@lib/sanityClient";

export async function getFooterData(locale: Locale) {
  const data = await sanityClient.fetch(
    `*[_type == "footer" && language == $locale][0]{
      ctaButton { link { text, href } },
      columns[] { title, links[] { text, href } }
    }`,
    { locale },
  );

  return {
    ctaButton: {
      text: data?.ctaButton?.link?.text ?? "",
      href: data?.ctaButton?.link?.href ?? "",
    },
    columns: data?.columns ?? [],
  };
}