import { defineType, defineField } from "sanity";
import { ProtectedSlugInput } from "../../components/ProtectedSlugInput";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog post",
  type: "document",
  groups: [
    { name: "content", title: "Inhoud" },
    { name: "meta", title: "Meta" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "language", type: "string", readOnly: true, hidden: false }),
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "meta",
      options: { source: "title" },
      components: { input: ProtectedSlugInput },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Beschrijving",
      type: "text",
      rows: 2,
      group: "content",
    }),
    defineField({
      name: "heroImage",
      title: "Hero afbeelding",
      type: "imageWithAlt",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pubDate",
      title: "Publicatiedatum",
      type: "datetime",
      group: "meta",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "authors",
      title: "Auteurs",
      type: "array",
      group: "meta",
      of: [{ type: "reference", to: [{ type: "person" }] }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "categories",
      title: "Categorieën",
      type: "array",
      group: "meta",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "content",
      title: "Inhoud",
      type: "portableText",
      group: "content",
    }),
    defineField({
      name: "nav",
      title: "Navigatie",
      type: "reference",
      to: [{ type: "nav" }],
      group: "meta",
    }),
    defineField({
      name: "footer",
      title: "Footer",
      type: "reference",
      to: [{ type: "footer" }],
      group: "meta",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seoMeta",
      group: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "pubDate",
      media: "heroImage.asset",
    },
  },
});
