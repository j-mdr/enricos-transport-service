import { defineConfig, type DocumentActionComponent } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import {
  documentInternationalization,
  useDeleteTranslationAction,
} from "@sanity/document-internationalization";
import { nlNLLocale } from "@sanity/locale-nl-nl";
import { localeDefinitions } from "./src/config/localeConfig";
import { schemaTypes } from "./sanity/schemas";
import { structure } from "./sanity/studioStructure";

const projectId =
  (typeof import.meta !== "undefined" && import.meta.env?.PUBLIC_SANITY_PROJECT_ID) ||
  process.env.PUBLIC_SANITY_PROJECT_ID ||
  "p88mnbf2";
const dataset =
  (typeof import.meta !== "undefined" && import.meta.env?.PUBLIC_SANITY_DATASET) ||
  process.env.PUBLIC_SANITY_DATASET ||
  "production";

const internationalizedSchemaTypes = [
  "blogPost",
  "page",
  "person",
  "category",
  "deliveryArea",
  "service",
  "faqAccordions",
  "faqCards",
  "ctaBgImage",
  "ctaCardCenter",
  "ctaCardCenter2",
  "ctaCards",
  "featureCardsSmall",
  "featureLightboxMarquee",
  "featureGalleryMarquee",
  "featureSideImage",
  "featureToggleImage",
  "servicesIcon",
  "servicesSideImage",
  "awardsSection",
  "teamMemberCards",
  "testimonialsColumns",
  "testimonialsSwiper",
  "contactSection",
];

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
      supportedLanguages: localeDefinitions.map((l) => ({ id: l.id, title: l.title })),
      schemaTypes: internationalizedSchemaTypes,
    }),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    newDocumentOptions: (prev) =>
      prev.filter((option) => !internationalizedSchemaTypes.includes(option.templateId)),
    actions: (prev, { schemaType }) => {
      if (internationalizedSchemaTypes.includes(schemaType)) {
        return [...prev, useDeleteTranslationAction as unknown as DocumentActionComponent];
      }
      return prev;
    },
  },
});
