import { defineType, defineField } from "sanity";

export const ctaCardCenter = defineType({
  name: "ctaCardCenter",
  title: "CtaCardCenterSection",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      description: "Gebruik {highlight} om een woord te markeren",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "ctaButton", title: "CTA knop", type: "ctaButton" }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title, subtitle: "CtaCardCenterSection" }),
  },
});
