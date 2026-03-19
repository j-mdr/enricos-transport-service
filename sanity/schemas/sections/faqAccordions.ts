import { defineType, defineField } from "sanity";
import { OlistIcon } from "@sanity/icons";

export const faqAccordionsFields = [
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
];

export const faqAccordions = defineType({
  name: "faqAccordions",
  title: "FAQ / accordeon",
  type: "document",
  icon: OlistIcon,
  fields: [
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
    ...faqAccordionsFields,
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title, subtitle: "FAQ / accordeon" }),
  },
});
