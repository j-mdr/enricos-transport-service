import { defineType, defineField } from "sanity";
import { SparklesIcon } from "@sanity/icons";

export const ctaCardCenter = defineType({
  name: "ctaCardCenter",
  title: "CTA / kaart gecentreerd",
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
    defineField({ name: "description", title: "Beschrijving", type: "string" }),
    defineField({ name: "ctaButton", title: "CTA knop", type: "ctaButton" }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title, subtitle: "CTA / kaart gecentreerd" }),
  },
});
