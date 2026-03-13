import { defineType, defineField } from "sanity";

// Kaart met afbeelding op zij, wordt afwisselend links/rechts gerenderd op basis van de index.

export const serviceCardSideImage = defineType({
  name: "serviceCardSideImage",
  title: "Service kaart (zij-afbeelding)",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Beschrijving",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "image",
      title: "Afbeelding",
      type: "imageWithAlt",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctaButton",
      title: "CTA knop",
      type: "ctaButton",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image.asset",
    },
  },
});