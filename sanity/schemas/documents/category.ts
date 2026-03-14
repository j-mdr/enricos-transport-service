import { defineType, defineField } from "sanity";

export const category = defineType({
  name: "category",
  title: "Categorie",
  type: "document",
  fields: [
    defineField({ name: "language", type: "string", readOnly: true, hidden: false }),
    defineField({
      name: "title",
      title: "Naam",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        slugify: (input) => input.toLowerCase().replace(/\s+/g, "-"),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Beschrijving",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current" },
  },
});