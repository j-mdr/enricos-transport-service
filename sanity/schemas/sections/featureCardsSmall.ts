import { defineType, defineField } from "sanity";

export const featureCardsSmall = defineType({
  name: "featureCardsSmall",
  title: "FeatureCardsSmallSection",
  type: "object",
  fields: [
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
    prepare: ({ title }) => ({ title, subtitle: "FeatureCardsSmallSection" }),
  },
});
