import { sanityClient } from "@lib/sanityClient";
import type { Locale } from "@config/siteSettings.json";

export async function getNavData(locale: Locale) {
  return sanityClient.fetch(
    `*[_type == "nav" && language == $locale][0]{
      logo { asset, alt, hotspot, crop },
      ctaButton { link { text, href } },
      navItems[] { text, hasDropdown, link { text, linkType, href, openInNewTab, reference->{ _type, slug } }, dropdown[] { text, linkType, href, openInNewTab, reference->{ _type, slug } } }
    }`,
    { locale },
  );
}
