import { defineType, defineField } from "sanity";

export const internalLink = defineType({
  name: "internalLink",
  title: "Interne link",
  type: "object",
  fields: [
    defineField({
      name: "reference",
      title: "Pagina of blogpost",
      type: "reference",
      to: [{ type: "page" }, { type: "blogPost" }],
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
