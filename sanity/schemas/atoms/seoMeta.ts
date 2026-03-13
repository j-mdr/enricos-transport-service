import { defineType, defineField } from "sanity";

export const seoMeta = defineType({
  name: "seoMeta",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "SEO Titel",
      type: "string",
      description: "Paginatitel in zoekmachines (~60 tekens)",
      validation: (Rule) => Rule.max(60).warning("Houdt de titel onder de 60 tekens"),
    }),
    defineField({
      name: "description",
      title: "SEO Beschrijving",
      type: "text",
      rows: 3,
      description: "Metabeschrijving in zoekmachines (~155 tekens)",
      validation: (Rule) => Rule.max(155).warning("Houdt de beschrijving onder de 155 tekens"),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
    },
  },
});