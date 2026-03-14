import { defineConfig } from "sanity";
import { createProtectedDeleteAction } from "./sanity/actions/protectedDelete";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { documentInternationalization } from "@sanity/document-internationalization";
import { nlNLLocale } from "@sanity/locale-nl-nl";

import { schemaTypes } from "./sanity/schemas";
import { structure } from "./sanity/structure";

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET;

export default defineConfig({
  name: "enricos-transport-service",
  title: "Enrico's Transportservice",
  projectId,
  dataset,
  plugins: [
    nlNLLocale(),
    structureTool({ structure }),
    visionTool(),
    documentInternationalization({
      supportedLanguages: [
        { id: "nl", title: "Nederlands" },
        { id: "en", title: "English" },
      ],
      schemaTypes: ["blogPost", "page", "form", "person", "category"],
    }),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    newDocumentOptions: (prev) =>
      prev.filter(
        (option) => !["blogPost", "page", "form", "person", "category"].includes(option.templateId),
      ),
    actions: (prev, { schemaType }) => {
      if (schemaType !== "page") return prev;
      return prev.map((action) =>
        action.action === "delete" ? createProtectedDeleteAction(action) : action,
      );
    },
  },
});
