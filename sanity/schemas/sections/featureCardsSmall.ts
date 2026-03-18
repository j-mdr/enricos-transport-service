import { defineType, defineField } from "sanity";
import { BlockElementIcon } from "@sanity/icons";

export const featureCardsSmall = defineType({
  name: "featureCardsSmall",
  title: "Feature / kleine kaarten",
  type: "document",
  icon: BlockElementIcon,
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
    defineField({
      name: "features",
      title: "Feature kaarten",
      type: "array",
      of: [{ type: "featureCardSmall" }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title, subtitle: "Feature / kleine kaarten" }),
  },
});
