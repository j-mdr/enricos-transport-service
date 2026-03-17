import { defineType, defineField } from "sanity";

export const headingWithImage = defineType({
  name: "headingWithImage",
  title: "Inhoud / koptekst met afbeelding",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Afbeelding",
      type: "imageWithAlt",
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title, subtitle: "Inhoud / koptekst met afbeelding" }),
  },
});
