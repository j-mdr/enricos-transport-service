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
      validation: (Rule) => [
        Rule.required().error("SEO titel is verplicht"),
        Rule.max(60).warning("Houdt de titel onder de 60 tekens"),
      ],
    }),
    defineField({
      name: "description",
      title: "SEO Beschrijving",
      type: "text",
      rows: 3,
      description: "Metabeschrijving in zoekmachines (~155 tekens)",
      validation: (Rule) => [
        Rule.required().error("SEO beschrijving is verplicht"),
        Rule.max(155).warning("Houdt de beschrijving onder de 155 tekens"),
      ],
    }),
    defineField({
      name: "noIndex",
      title: "Verberg voor zoekmachines",
      type: "boolean",
      description: "Voeg noindex toe aan deze pagina",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
    },
  },
});
