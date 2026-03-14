type TranslationEntry = {
  _key: string;
  value?: { language: string; slug: string } | null;
};

type DocType = "service" | "deliveryArea" | "blogPost" | "page";

const urlPrefixes: Record<DocType, Record<string, string>> = {
  service: { nl: "/diensten/", en: "/en/services/" },
  deliveryArea: { nl: "/bezorggebieden/", en: "/en/delivery-areas/" },
  blogPost: { nl: "/blog/", en: "/en/blog/" },
  page: { nl: "/", en: "/en/" },
};

export function buildAlternatePaths(
  translations: TranslationEntry[] | null | undefined,
  type: DocType,
): Partial<Record<string, string>> {
  if (!translations?.length) return {};
  const paths: Record<string, string> = {};
  for (const t of translations) {
    const slug = t.value?.slug;
    const lang = t._key;
    if (slug && lang) {
      const prefix = urlPrefixes[type][lang] ?? "/";
      paths[lang] = `${prefix}${slug}`;
    }
  }
  return paths;
}
