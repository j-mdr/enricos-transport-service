import { defineType, defineField } from "sanity";

export const faqCards = defineType({
  name: "faqCards",
  title: "FAQ / kaarten",
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
      name: "faqs",
      title: "FAQ items",
      type: "array",
      of: [{ type: "faqItem" }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title, subtitle: "FAQ / kaarten" }),
  },
});
