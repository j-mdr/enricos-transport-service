import { defineType, defineField } from "sanity";

export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Afbeelding",
  type: "image",
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: "alt",
      title: "Alt tekst",
      type: "string",
      description: "Beschrijving van de afbeelding voor toegankelijkheid en SEO",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "alt",
      media: "asset",
    },
  },
});
