export type LocaleId = "nl" | "en";

export interface LocaleDefinition {
  id: LocaleId;
  title: string;
  urlPrefix: string;
  isDefault: boolean;
  languageCode: string;
  switcherLabel: string;
  categoriesUrlPath: string;
  blogUrlPath: string;
  backToAllBlogPostsLabel: string;
}

export const localeDefinitions: LocaleDefinition[] = [
  {
    id: "nl",
    title: "Nederlands",
    urlPrefix: "/",
    isDefault: true,
    languageCode: "nl-NL",
    switcherLabel: "NL",
    categoriesUrlPath: "categorieen",
    blogUrlPath: "blog",
    backToAllBlogPostsLabel: "Terug naar alle berichten",
  },
  {
    id: "en",
    title: "English",
    urlPrefix: "/en",
    isDefault: false,
    languageCode: "en-US",
    switcherLabel: "EN",
    categoriesUrlPath: "categories",
    blogUrlPath: "blog",
    backToAllBlogPostsLabel: "Back to all posts",
  },
];

export const getLocaleDefinition = (locale: LocaleId) => {
  const localeDefinition = localeDefinitions.find((l) => l.id === locale);
  if (!locale) {
    throw new Error(`Locale with id "${locale}" not found`);
  }
  return localeDefinition;
};

export type Locale = LocaleId;
export const locales = localeDefinitions.map((l) => l.id) as LocaleId[];
export const defaultLocale = localeDefinitions.find((l) => l.isDefault)!.id;
