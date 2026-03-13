import { defineType, defineField } from "sanity";

// Kaart met afbeelding op zij, checklijst en optionele link.
// Wordt afwisselend links/rechts gerenderd op basis van de index.

export const featureCardSideImage = defineType({
  name: "featureCardSideImage",
  title: "Feature kaart (zij-afbeelding)",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Afbeelding",
      type: "imageWithAlt",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "checkItems",
      title: "Check items",
      type: "array",
      of: [{ type: "string" }],
      description: "Opsomming van kenmerken of voordelen",
    }),
    defineField({
      name: "link",
      title: "Link (optioneel)",
      type: "link",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image.asset",
    },
  },
});