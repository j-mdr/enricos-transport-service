import { localeDefinitions } from "@config/localeConfig.ts";

export { localeDefinitions, locales, defaultLocale, type Locale } from "./localeConfig";

// text to show in the language switcher for each locale
export const languageSwitcherMap = Object.fromEntries(
  localeDefinitions.map((l) => [l.id, l.switcherLabel]),
);

// site settings that don't change between languages
export const siteSettings = {
  useViewTransitions: false,
  useAnimations: false,
};

export default siteSettings;
