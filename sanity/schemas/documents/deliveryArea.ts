import { defineType, defineField, defineArrayMember } from "sanity";
import { OlistIcon } from "@sanity/icons";
import { ProtectedSlugInput } from "../../components/ProtectedSlugInput";
import { createUrlPathInput } from "../../components/UrlPathInput";
import { langFilter } from "../../lib/filters";
import { slugValidation } from "../../lib/slugValidation";
import { faqAccordionsFields } from "../sections/faqAccordions";
import { faqCardsFields } from "../sections/faqCards";

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
      validation: slugValidation,
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
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "contentModifiedDate",
      title: "Laatste wijziging aan content",
      type: "datetime",
      group: "meta",
      initialValue: () => new Date().toISOString(),
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
      options: {
        insertMenu: {
          groups: [
            { name: "inhoud", title: "Inhoud", of: ["richText", "featureVideo"] },
            {
              name: "faq",
              title: "FAQ",
              of: ["faqAccordions", "faqAccordionsInline", "faqCards", "faqCardsInline"],
            },
          ],
          views: [{ name: "list" }, { name: "grid" }],
        },
      },
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
        defineArrayMember({
          name: "faqAccordionsInline",
          type: "object",
          title: "FAQ / accordeon (inline)",
          icon: OlistIcon,
          fields: faqAccordionsFields,
          preview: {
            select: { title: "title" },
            prepare: ({ title }) => ({ title, subtitle: "FAQ / accordeon (inline)" }),
          },
        }),
        defineArrayMember({
          name: "faqCards",
          type: "reference",
          title: "FAQ / kaarten",
          to: [{ type: "faqCards" }],
          options: { filter: langFilter },
        }),
        defineArrayMember({
          name: "faqCardsInline",
          type: "object",
          title: "FAQ / kaarten (inline)",
          icon: OlistIcon,
          fields: faqCardsFields,
          preview: {
            select: { title: "title" },
            prepare: ({ title }) => ({ title, subtitle: "FAQ / kaarten (inline)" }),
          },
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
