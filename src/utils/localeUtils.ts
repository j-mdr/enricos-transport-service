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

/**
 * Returns the given path localized for the target locale.
 * Strips any existing locale prefix from the path first.
 * @param path path string or URL — leading slash is optional
 * @param locale target locale id (e.g. "nl" or "en")
 */
export function localizePath(path: string | URL, locale: string): string {
  const raw = path instanceof URL ? path.pathname : path;
  const stripped = raw.startsWith("/") ? raw.slice(1) : raw;

  // Remove existing locale prefix (e.g. "en/..." → "...")
  const withoutLocale = locales.reduce((p, loc) => {
    const { localeSlug } = getLocaleDefinition(loc);
    return localeSlug && p.startsWith(localeSlug + "/") ? p.slice(localeSlug.length + 1) : p;
  }, stripped);

  const { localeSlug } = getLocaleDefinition(locale);
  return localeSlug ? `/${localeSlug}/${withoutLocale}` : `/${withoutLocale}`;
}
