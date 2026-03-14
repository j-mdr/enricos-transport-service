import type { StructureResolver } from "sanity/structure";

// Singletons hebben een vaste _id en mogen niet vermenigvuldigd worden.
const singletonTypes = ["settings"];

// Document types die per taal bestaan (via @sanity/document-internationalization)
const pageTypes = [
  { type: "page", titleNL: "Pagina's (hiërarchisch)", titleEN: "Pages (hierarchical)" },
  { type: "blogPost", titleNL: "Blog", titleEN: "Blog" },
];

const otherTypes = [
  { type: "person", titleNL: "Personen", titleEN: "Persons" },
  { type: "nav", titleNL: "Navigatie", titleEN: "Navigation" },
  { type: "footer", titleNL: "Footer", titleEN: "Footer" },
  { type: "form", titleNL: "Formulieren", titleEN: "Forms" },
];

function docList(S: Parameters<StructureResolver>[0], type: string, title: string, lang: string) {
  return S.listItem()
    .title(title)
    .schemaType(type)
    .child(
      S.documentList()
        .title(title)
        .schemaType(type)
        .filter(`_type == $type && language == $lang`)
        .params({ type, lang })
        .defaultOrdering([{ field: "slug.current", direction: "asc" }]),
    );
}

function langGroup(S: Parameters<StructureResolver>[0], lang: "nl" | "en") {
  const isNL = lang === "nl";
  return S.listItem()
    .title(isNL ? "🇳🇱 Nederlands" : "🇬🇧 English")
    .child(
      S.list()
        .title(isNL ? "Nederlands" : "English")
        .items([
          ...pageTypes.map(({ type, titleNL, titleEN }) =>
            docList(S, type, isNL ? titleNL : titleEN, lang),
          ),
          S.divider(),
          ...otherTypes.map(({ type, titleNL, titleEN }) =>
            docList(S, type, isNL ? titleNL : titleEN, lang),
          ),
        ]),
    );
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Inhoud")
    .items([
      // Instellingen (singletons)
      S.listItem()
        .title("Instellingen")
        .child(
          S.list()
            .title("Instellingen")
            .items([
              S.listItem()
                .title("Instellingen NL")
                .id("settings-nl")
                .child(S.document().schemaType("settings").documentId("settings-nl")),
              S.listItem()
                .title("Instellingen EN")
                .id("settings-en")
                .child(S.document().schemaType("settings").documentId("settings-en")),
            ]),
        ),

      S.divider(),

      // Taalgroepen
      langGroup(S, "nl"),
      langGroup(S, "en"),
    ]);
