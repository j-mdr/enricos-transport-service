
import { defaultLocale, locales } from "@/config/siteSettings.json";
import { routeTranslations } from "@config/routeTranslations.ts";


/**
 * * Returns the translated route for a given locale and base route. Drop-in replacement for getRelativeLocaleUrl()
 * Tries to match the longest prefix first, then shorter, for most specific translation.
 * Uses the static routeTranslations object (not async).
 * @param locale - The target locale (e.g., "de")
 * @param baseRoute - The route in the assumed base locale (default is defaultLocale)
 * @param options - Optional object: { baseLocale?: string }
 * @returns The localized route string
 */
export function getLocalizedRoute(
  locale: (typeof locales)[number],
  baseRoute: string = "/",
  options?: { baseLocale?: (typeof locales)[number] },
): string {
  const isExternalLink = /^(https?:\/\/|mailto:|tel:|sms:)/i.test(baseRoute);
  const isId = baseRoute.startsWith("#");
  if (isExternalLink || isId) {
    // base route is either external link or ID
    return baseRoute;
  }

  // Extract ID fragment if present
  let fragment = "";
  let routeWithoutFragment = baseRoute;
  const fragmentIndex = baseRoute.indexOf("#");

  if (fragmentIndex !== -1) {
    fragment = baseRoute.slice(fragmentIndex);
    routeWithoutFragment = baseRoute.slice(0, fragmentIndex);
  }

  const assumedBaseLocale = options?.baseLocale ?? defaultLocale;
  const normalized = routeWithoutFragment.replace(/^\/?|\/?$/g, "");

  // Special case: root route
  if (normalized === "") {
    return locale === defaultLocale ? "/" : `/${locale}/`;
  }

  const defaultTranslations = routeTranslations[assumedBaseLocale];
  const localeTranslations = routeTranslations[locale];

  const segments = normalized.split("/");

  let routePath: string | undefined;

  // Try longest to shortest prefix
  for (let i = segments.length; i > 0; i--) {
    const prefix = segments.slice(0, i).join("/");
    const key = Object.keys(defaultTranslations).find((k) => defaultTranslations[k] === prefix);
    if (key && localeTranslations[key]) {
      const translatedPrefix = localeTranslations[key];
      const rest = segments.slice(i).join("/");
      routePath = [translatedPrefix, rest].filter(Boolean).join("/");
      break;
    }
  }

  if (!routePath) {
    routePath = normalized;
  }

  // Insert locale prefix if not default
  if (locale !== defaultLocale) {
    routePath = `${locale}/${routePath}`;
  }

  // Combine the route path with the fragment
  // If there's a fragment, ensure there's exactly one slash before it
  if (fragment) {
    return `/${routePath.replace(/\\/g, "/")}/` + fragment;
  } else {
    return `/${routePath.replace(/\\/g, "/")}/`;
  }
}

