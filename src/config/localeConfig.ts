export type LocaleId = "nl" | "en";

export interface LocaleDefinition {
  id: LocaleId;
  title: string;
  localeSlug: string;
  isDefault: boolean;
  languageCode: string;
  switcherLabel: string;
  categoriesSlug: string;
  blogSlug: string;
  backToAllBlogPostsLabel: string;
  servicesSlug: string;
  deliveryAreasSlug: string;
}

const nlLocaleDefinition: LocaleDefinition = {
  id: "nl",
  title: "Nederlands",
  localeSlug: "",
  isDefault: true,
  languageCode: "nl-NL",
  switcherLabel: "NL",
  categoriesSlug: "categorieen",
  blogSlug: "blog",
  backToAllBlogPostsLabel: "Terug naar alle berichten",
  servicesSlug: "diensten",
  deliveryAreasSlug: "bezorggebieden",
};

const enLocaleDefinition: LocaleDefinition = {
  id: "en",
  title: "English",
  localeSlug: "en",
  isDefault: false,
  languageCode: "en-US",
  switcherLabel: "EN",
  categoriesSlug: "categories",
  blogSlug: "blog",
  backToAllBlogPostsLabel: "Back to all posts",
  servicesSlug: "services",
  deliveryAreasSlug: "delivery-areas",
};

export const localeDefinitions: LocaleDefinition[] = [nlLocaleDefinition, enLocaleDefinition];

export const getLocaleDefinition = (locale = "nl") => {
  const localeDefinition = localeDefinitions.find((l) => l.id === locale);
  if (!localeDefinition) {
    return nlLocaleDefinition;
  }
  return localeDefinition;
};

export type Locale = LocaleId;
export const locales = localeDefinitions.map((l) => l.id) as LocaleId[];
export const defaultLocale = localeDefinitions.find((l) => l.isDefault)!.id;
