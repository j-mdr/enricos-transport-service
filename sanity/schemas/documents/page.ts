import { defineType, defineField } from "sanity";

// Flexibele pagina met block builder.
// De blocks array wordt uitgebreid met section types zodra die gedefinieerd zijn.

export const page = defineType({
  name: "page",
  title: "Pagina",
  type: "document",
  groups: [
    { name: "content", title: "Inhoud" },
    { name: "meta", title: "Meta" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "language", title: 'Taal', type: "string", readOnly: true, hidden: false }),
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      group: "meta",
      options: {
        list: [
          { title: "Wide", value: "wide" },
          { title: "Narrow", value: "narrow" },
        ],
        layout: "radio",
      },
      initialValue: "wide",
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
      name: "image",
      title: "Afbeelding",
      type: "imageWithAlt",
      group: "content",
    }),
    defineField({
      name: "blocks",
      title: "Blokken",
      type: "array",
      group: "content",
      of: [
        { type: "heroBgImage" },
        { type: "heroSideImage" },
        { type: "heroCentered" },
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
        { type: "introSection" },
        { type: "teamMemberCards" },
        { type: "testimonialsColumns" },
        { type: "testimonialsSwiper" },
        { type: "contactSection" },
        { type: "requestQuoteSection" },
        { type: "becomePartnerSection" },
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
      subtitle: "layout",
      media: "image.asset",
    },
  },
});