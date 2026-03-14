import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { documentInternationalization } from "@sanity/document-internationalization";

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
    structureTool({ structure }),
    visionTool(),
    documentInternationalization({
      supportedLanguages: [
        { id: "nl", title: "Nederlands" },
        { id: "en", title: "English" },
      ],
      schemaTypes: ["blogPost", "service", "deliveryArea", "page", "nav", "footer", "form"],
    }),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    newDocumentOptions: (prev) =>
      prev.filter(
        (option) =>
          !["blogPost", "service", "deliveryArea", "page", "nav", "footer", "form"].includes(
            option.templateId,
          ),
      ),
  },
});
