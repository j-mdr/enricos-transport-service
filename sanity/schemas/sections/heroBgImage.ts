import { defineType, defineField } from "sanity";

export const heroBgImage = defineType({
  name: "heroBgImage",
  title: "HeroBgImageSection",
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
    defineField({
      name: "image",
      title: "Achtergrond afbeelding",
      type: "imageWithAlt",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title, subtitle: "HeroBgImageSection" }),
  },
});
