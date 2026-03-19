import { defineType, defineField } from "sanity";
import { ProtectedSlugInput } from "../../components/ProtectedSlugInput";
import { createUrlPathInput } from "../../components/UrlPathInput";
import { slugValidation } from "../../lib/slugValidation";

const CategoryUrlPathInput = createUrlPathInput((def) => def.categoriesSlug);

export const category = defineType({
  name: "category",
  title: "Categorie",
  type: "document",
  fields: [
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
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
        source: (doc) => {
          const d = doc as unknown as { title?: string };
          return d.title ?? "";
        },
        slugify: (input) => input.toLowerCase().replace(/\s+/g, "-"),
      },
      components: { input: ProtectedSlugInput },
      validation: slugValidation,
    }),
    defineField({
      name: "urlPath",
      title: "URL pad",
      type: "string",
      description: "Automatisch gegenereerd op basis van taal en slug.",
      components: { input: CategoryUrlPathInput },
    }),
    defineField({
      name: "description",
      title: "Beschrijving",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "urlPath" },
  },
});
