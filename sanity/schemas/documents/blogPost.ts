import { defineType, defineField, defineArrayMember } from "sanity";
import { OlistIcon } from "@sanity/icons";
import { ProtectedSlugInput } from "../../components/ProtectedSlugInput";
import { createUrlPathInput } from "../../components/UrlPathInput";
import { langFilter } from "../../lib/filters";
import { slugValidation } from "../../lib/slugValidation";
import { faqAccordionsFields } from "../sections/faqAccordions";
import { faqCardsFields } from "../sections/faqCards";

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
      validation: slugValidation,
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
              name: "feature",
              title: "Feature",
              of: [
                "featureCardsSmall",
                "featureLightboxMarquee",
                "featureGalleryMarquee",
                "featureSideImage",
                "featureToggleImage",
              ],
            },
            {
              name: "cta",
              title: "CTA",
              of: ["ctaBgImage", "ctaCardCenter", "ctaCardCenter2", "ctaCards"],
            },
            {
              name: "faq",
              title: "FAQ",
              of: ["faqAccordions", "faqAccordionsInline", "faqCards", "faqCardsInline"],
            },
            { name: "diensten", title: "Diensten", of: ["servicesIcon", "servicesSideImage"] },
            {
              name: "recensies",
              title: "Recensies",
              of: ["testimonialsColumns", "testimonialsSwiper"],
            },
            { name: "team", title: "Team & Awards", of: ["teamMemberCards", "awardsSection"] },
            { name: "contact", title: "Contact", of: ["contactSection"] },
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
