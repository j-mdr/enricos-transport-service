import { defineType, defineField } from "sanity";

export const ctaCardCenter = defineType({
  name: "ctaCardCenter",
  title: "CTA / kaart gecentreerd",
  type: "object",
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
    prepare: ({ title }) => ({ title, subtitle: "CTA / kaart gecentreerd" }),
  },
});
