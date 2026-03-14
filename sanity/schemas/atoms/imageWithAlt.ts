import { defineType, defineField } from "sanity";

export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Afbeelding",
  type: "image",
  options: {
    hotspot: true,
    crop: {
      presets: [
        { name: "1:1", title: "Vierkant", aspectRatio: 1 },
        { name: "16:9", title: "Landschap", aspectRatio: 16 / 9 },
        { name: "4:3", title: "Klassiek", aspectRatio: 4 / 3 },
        { name: "3:4", title: "Portret", aspectRatio: 3 / 4 },
      ],
    },
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
