import { defineType, defineField } from "sanity";

export const introSection = defineType({
  name: "introSection",
  title: "Inhoud / intro sectie",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "introText", title: "Intro tekst", type: "text", rows: 3 }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title, subtitle: "Inhoud / intro sectie" }),
  },
});
