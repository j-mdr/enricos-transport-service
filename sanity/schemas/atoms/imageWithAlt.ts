import { defineType, defineField } from "sanity";
import { ASPECT_RATIO_DEFS } from "../../lib/aspectRatios";

const cropPresets = Object.entries(ASPECT_RATIO_DEFS).map(([key, { ratio, label }]) => ({
  name: key,
  title: label,
  aspectRatio: ratio,
}));

export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Afbeelding",
  type: "image",
  options: {
    hotspot: true,
    crop: { presets: cropPresets },
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
