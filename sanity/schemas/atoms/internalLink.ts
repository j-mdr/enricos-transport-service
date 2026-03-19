import { defineType, defineField } from "sanity";

export const internalLink = defineType({
  name: "internalLink",
  title: "Interne link",
  type: "object",
  fields: [
    defineField({
      name: "reference",
      title: "Pagina, blogpost, dienst, bezorggebied of categorie",
      type: "reference",
      to: [
        { type: "page" },
        { type: "blogPost" },
        { type: "service" },
        { type: "deliveryArea" },
        { type: "category" },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "reference->title",
      slug: "reference->slug.current",
    },
    prepare({ title, slug }: { title?: string; slug?: string }) {
      return { title: title ?? slug ?? "— geen referentie" };
    },
  },
});
