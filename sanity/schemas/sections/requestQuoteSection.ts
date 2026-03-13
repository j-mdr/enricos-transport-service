import { defineType, defineField } from "sanity";

export const requestQuoteSection = defineType({
  name: "requestQuoteSection",
  title: "RequestQuoteSection",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Titel", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "image", title: "Afbeelding", type: "imageWithAlt" }),
    defineField({
      name: "form",
      title: "Formulier",
      type: "reference",
      to: [{ type: "form" }],
    }),
  ],
  preview: { select: { title: "title" }, prepare: ({ title }) => ({ title, subtitle: "RequestQuoteSection" }) },
});
