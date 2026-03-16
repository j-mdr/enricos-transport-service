import { defaultLocale, locales } from "@config/siteConfig.ts";
import { getLocaleDefinition } from "@config/localeConfig.ts";

/**
 * * returns the current locale gathered from the URL
 * @param url current URL
 * @returns current locale as a string
 * use like `const currentLocale = getLocaleFromUrl(Astro.url);`
 *
 * This gives you the same result as `Astro.currentLocale` except:
 * - it never returns "undefined", and instead defaults to the defaultLocale
 */
export function getLocaleFromUrl(url: URL): (typeof locales)[number] {
  const [, locale] = url.pathname.split("/");

  //@ts-expect-error element is guaranteed to be an appropriate string
  if (locales.includes(locale)) return locale as (typeof locales)[number];
  return defaultLocale;
}
