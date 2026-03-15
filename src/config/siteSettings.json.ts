/**
 * Global site settings
 */

import { localeDefinitions } from "./localeConfig";
import { type LocalizedData, type SiteSettingsProps } from "./configDataTypes.ts";

export { locales, defaultLocale, type Locale } from "./localeConfig";

// localeMap is used to map languages to their respective locales - used for formatDate function
export const localeMap = Object.fromEntries(
  localeDefinitions.map((l) => [l.id, l.languageCode]),
) as LocalizedData<string>;

// text to show in the language switcher for each locale
export const languageSwitcherMap = Object.fromEntries(
  localeDefinitions.map((l) => [l.id, l.switcherLabel]),
) as LocalizedData<string>;

// site settings that don't change between languages
export const siteSettings: SiteSettingsProps = {
  useViewTransitions: true,
  useAnimations: true,
};

export default siteSettings;
