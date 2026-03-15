export type LocaleId = "nl" | "en";

export interface LocaleDefinition {
  id: LocaleId;
  title: string;
  urlPrefix: string;
  isDefault: boolean;
  languageCode: string;
  switcherLabel: string;
  categoryUrlBase: string;
  blogUrlBase: string;
}

export const localeDefinitions: LocaleDefinition[] = [
  {
    id: "nl",
    title: "Nederlands",
    urlPrefix: "",
    isDefault: true,
    languageCode: "nl-NL",
    switcherLabel: "NL",
    categoryUrlBase: "categorieen",
    blogUrlBase: "blog",
  },
  {
    id: "en",
    title: "English",
    urlPrefix: "en",
    isDefault: false,
    languageCode: "en-US",
    switcherLabel: "EN",
    categoryUrlBase: "categories",
    blogUrlBase: "blog",
  },
];

export type Locale = LocaleId;
export const locales = localeDefinitions.map((l) => l.id) as LocaleId[];
export const defaultLocale = localeDefinitions.find((l) => l.isDefault)!.id;
