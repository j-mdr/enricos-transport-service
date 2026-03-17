import { defineType, defineField } from "sanity";
import { createCharCountInput } from "../../components/CharCountInput";

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
      components: { input: createCharCountInput(60, 10) },
      validation: (Rule) => [
        Rule.required().error("SEO titel is verplicht"),
        Rule.min(10).error("SEO titel is te kort (min. 10 tekens)"),
        Rule.max(60).error("SEO titel mag maximaal 60 tekens zijn"),
      ],
    }),
    defineField({
      name: "description",
      title: "SEO Beschrijving",
      type: "text",
      rows: 3,
      description: "Metabeschrijving in zoekmachines (~155 tekens)",
      components: { input: createCharCountInput(155, 50) },
      validation: (Rule) => [
        Rule.required().error("SEO beschrijving is verplicht"),
        Rule.min(50).error("SEO beschrijving is te kort (min. 50 tekens)"),
        Rule.max(155).error("SEO beschrijving mag maximaal 155 tekens zijn"),
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
