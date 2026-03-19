import { defineType, defineField, defineArrayMember } from "sanity";
import { ProtectedSlugInput } from "../../components/ProtectedSlugInput";
import { createUrlPathInput } from "../../components/UrlPathInput";
import { langFilter } from "../../lib/filters";

const ServiceUrlPathInput = createUrlPathInput((def) => def.servicesSlug);

export const service = defineType({
  name: "service",
  title: "Dienst",
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
      components: { input: ServiceUrlPathInput },
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
        defineArrayMember({
          name: "faqCards",
          type: "reference",
          title: "FAQ / kaarten",
          to: [{ type: "faqCards" }],
          options: { filter: langFilter },
        }),
        defineArrayMember({
          name: "ctaBgImage",
          type: "reference",
          title: "CTA / met achtergrond afbeelding",
          to: [{ type: "ctaBgImage" }],
          options: { filter: langFilter },
        }),
        defineArrayMember({
          name: "ctaCardCenter",
          type: "reference",
          title: "CTA / kaart gecentreerd",
          to: [{ type: "ctaCardCenter" }],
          options: { filter: langFilter },
        }),
        defineArrayMember({
          name: "ctaCardCenter2",
          type: "reference",
          title: "CTA / kaart gecentreerd (variant 2)",
          to: [{ type: "ctaCardCenter2" }],
          options: { filter: langFilter },
        }),
        defineArrayMember({
          name: "ctaCards",
          type: "reference",
          title: "CTA / kaarten",
          to: [{ type: "ctaCards" }],
          options: { filter: langFilter },
        }),
        defineArrayMember({
          name: "featureCardsSmall",
          type: "reference",
          title: "Feature / kleine kaarten",
          to: [{ type: "featureCardsSmall" }],
          options: { filter: langFilter },
        }),
        defineArrayMember({
          name: "featureLightboxMarquee",
          type: "reference",
          title: "Feature / lightbox carrousel",
          to: [{ type: "featureLightboxMarquee" }],
          options: { filter: langFilter },
        }),
        defineArrayMember({
          name: "featureGalleryMarquee",
          type: "reference",
          title: "Feature / galerij carrousel",
          to: [{ type: "featureGalleryMarquee" }],
          options: { filter: langFilter },
        }),
        defineArrayMember({
          name: "featureSideImage",
          type: "reference",
          title: "Feature / met zijafbeelding",
          to: [{ type: "featureSideImage" }],
          options: { filter: langFilter },
        }),
        defineArrayMember({
          name: "featureToggleImage",
          type: "reference",
          title: "Feature / met wisselende afbeelding",
          to: [{ type: "featureToggleImage" }],
          options: { filter: langFilter },
        }),
        defineArrayMember({
          name: "servicesIcon",
          type: "reference",
          title: "Diensten / met iconen",
          to: [{ type: "servicesIcon" }],
          options: { filter: langFilter },
        }),
        defineArrayMember({
          name: "servicesSideImage",
          type: "reference",
          title: "Diensten / met zijafbeelding",
          to: [{ type: "servicesSideImage" }],
          options: { filter: langFilter },
        }),
        defineArrayMember({
          name: "awardsSection",
          type: "reference",
          title: "Inhoud / certificaten & awards",
          to: [{ type: "awardsSection" }],
          options: { filter: langFilter },
        }),
        defineArrayMember({
          name: "teamMemberCards",
          type: "reference",
          title: "Team / teamleden kaarten",
          to: [{ type: "teamMemberCards" }],
          options: { filter: langFilter },
        }),
        defineArrayMember({
          name: "testimonialsColumns",
          type: "reference",
          title: "Recensies / kolommen",
          to: [{ type: "testimonialsColumns" }],
          options: { filter: langFilter },
        }),
        defineArrayMember({
          name: "testimonialsSwiper",
          type: "reference",
          title: "Recensies / carrousel",
          to: [{ type: "testimonialsSwiper" }],
          options: { filter: langFilter },
        }),
        defineArrayMember({
          name: "contactSection",
          type: "reference",
          title: "Contact / sectie",
          to: [{ type: "contactSection" }],
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
