import { defineType, defineField } from "sanity";
import { ProtectedSlugInput } from "../../components/ProtectedSlugInput";
import { createUrlPathInput } from "../../components/UrlPathInput";

const BlogUrlPathInput = createUrlPathInput((def) => def.blogSlug);

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
      name: "description",
      title: "Beschrijving",
      type: "text",
      rows: 3,
      group: "content",
      description: "Korte samenvatting getoond in kaarten en als SEO fallback.",
      validation: (Rule) => Rule.required().max(200),
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
      components: { input: BlogUrlPathInput },
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
          options: {
            filter: ({ document }: { document: { language?: string } }) =>
              document.language
                ? { filter: "language == $lang", params: { lang: document.language } }
                : {},
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "categories",
      title: "Categorieën",
      type: "array",
      group: "meta",
      of: [
        {
          type: "reference",
          to: [{ type: "category" }],
          options: {
            filter: ({ document }: { document: { language?: string } }) =>
              document.language
                ? { filter: "language == $lang", params: { lang: document.language } }
                : {},
          },
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
        { type: "faqAccordions" },
        { type: "faqCards" },
        { type: "ctaBgImage" },
        { type: "ctaCardCenter" },
        { type: "ctaCardCenter2" },
        { type: "ctaCards" },
        { type: "featureCardsSmall" },
        { type: "featureLightboxMarquee" },
        { type: "featureGalleryMarquee" },
        { type: "featureSideImage" },
        { type: "featureToggleImage" },
        { type: "servicesIcon" },
        { type: "servicesSideImage" },
        { type: "awardsSection" },
        { type: "teamMemberCards" },
        { type: "testimonialsColumns" },
        { type: "testimonialsSwiper" },
        { type: "contactSection" },
        { type: "richText" },
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
      subtitle: "pubDate",
      media: "heroImage.asset",
    },
  },
});
