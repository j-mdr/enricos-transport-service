import { defineType, defineField } from "sanity";

export const awardsSection = defineType({
  name: "awardsSection",
  title: "Inhoud / certificaten & awards",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Titel", type: "string" }),
    defineField({
      name: "awards",
      title: "Awards",
      type: "array",
      of: [{ type: "imageWithAlt" }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title, subtitle: "Inhoud / certificaten & awards" }),
  },
});
