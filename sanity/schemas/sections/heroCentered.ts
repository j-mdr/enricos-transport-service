import { defineType, defineField } from "sanity";

export const heroCentered = defineType({
  name: "heroCentered",
  title: "Hero / gecentreerd",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      description: "Gebruik {highlight} om een woord te markeren",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "description", title: "Beschrijving", type: "text", rows: 2 }),
    defineField({ name: "ctaButton1", title: "CTA knop 1", type: "ctaButton" }),
    defineField({ name: "ctaButton2", title: "CTA knop 2 (optioneel)", type: "ctaButton" }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title, subtitle: "Hero / gecentreerd" }),
  },
});
