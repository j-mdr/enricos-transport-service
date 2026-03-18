import { defineType, defineField } from "sanity";
import { SparklesIcon } from "@sanity/icons";

export const ctaCardCenter2 = defineType({
  name: "ctaCardCenter2",
  title: "CTA / kaart gecentreerd (variant 2)",
  type: "document",
  icon: SparklesIcon,
  fields: [
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
    prepare: ({ title }) => ({ title, subtitle: "CTA / kaart gecentreerd (variant 2)" }),
  },
});
