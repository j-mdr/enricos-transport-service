import type { StructureResolver } from "sanity/structure";

// Singletons hebben een vaste _id en mogen niet vermenigvuldigd worden.
const singletonIds = ["settings-nl", "settings-en"];
const singletonTypes = ["settings"];

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

      // Reguliere document types (zonder singletons)
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !singletonTypes.includes(item.getId()!),
      ),
    ]);
