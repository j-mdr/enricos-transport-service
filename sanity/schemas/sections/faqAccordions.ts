import { defineType, defineField } from "sanity";
import { OlistIcon } from "@sanity/icons";

export const faqAccordions = defineType({
  name: "faqAccordions",
  title: "FAQ / accordeon",
  type: "document",
  icon: OlistIcon,
  fields: [
    defineField({ name: "language", title: "Taal", type: "string", readOnly: true, hidden: false }),
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
    prepare: ({ title }) => ({ title, subtitle: "FAQ / accordeon" }),
  },
});
