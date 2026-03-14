import type { StructureResolver } from "sanity/structure";

// Singletons hebben een vaste _id en mogen niet vermenigvuldigd worden.
const singletonTypes = ["settings"];

// Document types die per taal bestaan (via @sanity/document-internationalization)
const i18nTypes = [
  { type: "page", titleNL: "Pagina's", titleEN: "Pages" },
  { type: "blogPost", titleNL: "Blog", titleEN: "Blog" },
  { type: "service", titleNL: "Diensten", titleEN: "Services" },
  { type: "deliveryArea", titleNL: "Bezorggebieden", titleEN: "Delivery Areas" },
  { type: "person", titleNL: "Personen", titleEN: "Persons" },
  { type: "nav", titleNL: "Navigatie", titleEN: "Navigation" },
  { type: "footer", titleNL: "Footer", titleEN: "Footer" },
  { type: "form", titleNL: "Formulieren", titleEN: "Forms" },
];

function langGroup(S: Parameters<StructureResolver>[0], lang: "nl" | "en") {
  const isNL = lang === "nl";
  return S.listItem()
    .title(isNL ? "🇳🇱 Nederlands" : "🇬🇧 English")
    .child(
      S.list()
        .title(isNL ? "Nederlands" : "English")
        .items(
          i18nTypes.map(({ type, titleNL, titleEN }) =>
            S.listItem()
              .title(isNL ? titleNL : titleEN)
              .schemaType(type)
              .child(
                S.documentList()
                  .title(isNL ? titleNL : titleEN)
                  .schemaType(type)
                  .filter(`_type == $type && language == $lang`)
                  .params({ type, lang }),
              ),
          ),
        ),
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
