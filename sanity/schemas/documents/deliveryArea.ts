import { defineType, defineField, defineArrayMember } from "sanity";
import { ProtectedSlugInput } from "../../components/ProtectedSlugInput";
import { createUrlPathInput } from "../../components/UrlPathInput";
import { langFilter } from "../../lib/filters";

const DeliveryAreaUrlPathInput = createUrlPathInput((def) => def.deliveryAreasSlug);

export const deliveryArea = defineType({
  name: "deliveryArea",
  title: "Bezorggebied",
  type: "document",
  groups: [
    { name: "content", title: "Inhoud" },
    { name: "meta", title: "Meta" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Beschrijving",
      type: "text",
      rows: 3,
      group: "content",
      description: "Korte samenvatting getoond onder de titel en als SEO fallback.",
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "meta",
      options: {
        source: (doc) => {
          const d = doc as unknown as { title?: string };
          return d.title ?? "";
        },
        slugify: (input) => input.toLowerCase().replace(/\s+/g, "-"),
      },
      components: { input: ProtectedSlugInput },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "urlPath",
      title: "URL pad",
      type: "string",
      group: "meta",
      description: "Automatisch gegenereerd op basis van taal en slug.",
      components: { input: DeliveryAreaUrlPathInput },
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
      name: "contentModifiedDate",
      title: "Laatste wijziging aan content",
      type: "datetime",
      group: "meta",
    }),
    defineField({
      name: "authors",
      title: "Auteurs",
      type: "array",
      group: "meta",
      of: [
        {
          type: "reference",
          to: [{ type: "person" }],
          options: { filter: langFilter },
        },
      ],
    }),
    defineField({
      name: "blocks",
      title: "Blokken",
      type: "array",
      group: "content",
      validation: (Rule) => Rule.min(1).max(15),
      of: [
        { type: "richText" },
        { type: "featureVideo" },
        defineArrayMember({
          name: "faqAccordions",
          type: "reference",
          title: "FAQ / accordeon",
          to: [{ type: "faqAccordions" }],
          options: { filter: langFilter },
        }),
      ],
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
      subtitle: "urlPath",
      media: "heroImage.asset",
    },
  },
});
