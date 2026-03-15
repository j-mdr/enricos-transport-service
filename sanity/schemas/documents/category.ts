import { defineType, defineField } from "sanity";
import { ProtectedSlugInput } from "../../components/ProtectedSlugInput";
import { localeDefinitions } from "../../../src/config/localeConfig";

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
        source: (doc) => {
          const d = doc as unknown as { title?: string };
          return d.title ?? "";
        },
        slugify: (input, _, context) => {
          const parent = context?.parent as unknown as { language?: string };
          const locale =
            localeDefinitions.find((l) => l.id === parent?.language) ??
            localeDefinitions.find((l) => l.isDefault)!;
          return locale.categoryUrlBase + "/" + input.toLowerCase().replace(/\s+/g, "-");
        },
      },
      components: { input: ProtectedSlugInput },
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
