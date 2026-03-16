import type { StructureResolver } from "sanity/structure";

// Document types die per taal bestaan (via @sanity/document-internationalization)
const pageTypes = [
  {
    type: "page",
    titleNL: "Pagina's (hiërarchisch)",
    titleEN: "Pages (hierarchical)",
    orderField: "slug.current",
  },
  { type: "blogPost", titleNL: "Blog", titleEN: "Blog", orderField: "slug.current" },
];

const otherTypes = [
  { type: "category", titleNL: "Categorieën", titleEN: "Categories" },
  { type: "person", titleNL: "Personen", titleEN: "Persons", orderField: "name" },
  { type: "form", titleNL: "Formulieren", titleEN: "Forms" },
];

function docList(
  S: Parameters<StructureResolver>[0],
  type: string,
  title: string,
  lang: string,
  orderField = "title",
) {
  return S.listItem()
    .title(title)
    .schemaType(type)
    .child(
      S.documentList()
        .title(title)
        .schemaType(type)
        .filter(`_type == $type && language == $lang`)
        .params({ type, lang })
        .defaultOrdering([{ field: orderField, direction: "asc" }]),
    );
}

function settingsItem(S: Parameters<StructureResolver>[0], lang: "nl" | "en") {
  const isNL = lang === "nl";
  return S.listItem()
    .title(isNL ? "Instellingen" : "Settings")
    .id(`settings-${lang}`)
    .child(S.document().schemaType("settings").documentId(`settings-${lang}`));
}

function langGroup(S: Parameters<StructureResolver>[0], lang: "nl" | "en") {
  const isNL = lang === "nl";
  return S.listItem()
    .title(isNL ? "🇳🇱 Nederlands" : "🇬🇧 English")
    .child(
      S.list()
        .title(isNL ? "Nederlands" : "English")
        .items([
          settingsItem(S, lang),
          S.divider(),
          ...pageTypes.map(({ type, titleNL, titleEN, orderField }) =>
            docList(S, type, isNL ? titleNL : titleEN, lang, orderField),
          ),
          S.divider(),
          ...otherTypes.map(({ type, titleNL, titleEN, orderField }) =>
            docList(S, type, isNL ? titleNL : titleEN, lang, orderField),
          ),
        ]),
    );
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Inhoud")
    .items([langGroup(S, "nl"), langGroup(S, "en")]);
