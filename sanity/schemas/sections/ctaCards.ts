import { defineType, defineField } from "sanity";
import { SparklesIcon } from "@sanity/icons";

export const ctaCards = defineType({
  name: "ctaCards",
  title: "CTA / kaarten",
  type: "document",
  icon: SparklesIcon,
  fields: [
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      description: "Gebruik {highlight} om een woord te markeren",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "description", title: "Beschrijving", type: "text", rows: 2 }),
    defineField({ name: "ctaButton", title: "CTA knop", type: "ctaButton" }),
    defineField({
      name: "cards",
      title: "Kaarten",
      type: "array",
      of: [{ type: "featureCardSmall" }],
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title, subtitle: "CTA / kaarten" }),
  },
});
