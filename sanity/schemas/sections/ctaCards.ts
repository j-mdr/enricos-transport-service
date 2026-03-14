import { defineType, defineField } from "sanity";

export const ctaCards = defineType({
  name: "ctaCards",
  title: "CtaCardsSection",
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
    defineField({ name: "ctaButton", title: "CTA knop", type: "ctaButton" }),
    defineField({
      name: "cards",
      title: "Kaarten",
      type: "array",
      of: [{ type: "featureCardSmall" }],
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title, subtitle: "CtaCardsSection" }),
  },
});
