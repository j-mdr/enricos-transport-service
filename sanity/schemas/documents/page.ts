import { defineType, defineField, defineArrayMember } from "sanity";
import { ProtectedSlugInput } from "../../components/ProtectedSlugInput";
import { UrlPathInput } from "../../components/UrlPathInput";
import { langFilter } from "../../lib/filters";

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
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "parent",
      title: "Bovenliggende pagina",
      type: "reference",
      to: [{ type: "page" }],
      group: "meta",
      description:
        "Selecteer een bovenliggende pagina. Dit zorgt ervoor dat het pad van de url de slug van de bovenliggende pagina bevat (bijv. /diensten/regulier-transport).",
      options: {
        filter: (({ document }: { document: { _id?: string; language?: string } }) => {
          const id = document._id?.replace(/^drafts\./, "");
          if (!document.language) return id ? { filter: "_id != $id", params: { id } } : {};
          return {
            filter: "language == $language && _id != $id",
            params: { language: document.language, id: id ?? "" },
          };
        }) as any,
      },
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "meta",
      options: {
        source: (doc) => {
          const d = doc as unknown as { title?: string; parent?: { _ref?: string } };
          return [d.title, d.parent?._ref].filter(Boolean).join("__");
        },
        slugify: async (input, _schemaType, context) => {
          const title = input.split("__")[0];
          const leaf = title.toLowerCase().replace(/\s+/g, "-");

          const doc = context.parent as { parent?: { _ref?: string } } | undefined;
          if (doc?.parent?._ref) {
            const client = context.getClient({ apiVersion: "2024-01-01" });
            const parentSlug: string | null = await client.fetch(`*[_id == $id][0].slug.current`, {
              id: doc.parent._ref,
            });
            if (parentSlug) return `${parentSlug}/${leaf}`;
          }

          return leaf;
        },
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
      components: { input: UrlPathInput },
    }),
    defineField({
      name: "blocksTop",
      title: "Blokken (boven)",
      description: "Hier zitten o.a. blokken in met een h1 titel",
      type: "array",
      group: "content",
      validation: (Rule) => Rule.max(5),
      of: [
        { type: "heroBgImage" },
        { type: "heroSideImage" },
        { type: "heroCentered" },
        { type: "featureVideo" },
        { type: "introSection" },
        { type: "headingWithImage" },
        defineArrayMember({
          name: "awardsSection",
          type: "reference",
          title: "Inhoud / certificaten & awards",
          to: [{ type: "awardsSection" }],
          options: { filter: langFilter },
        }),
      ],
    }),
    defineField({
      name: "blocks",
      title: "Blokken",
      description: "Deze blokken worden op het 'smalle' gedeelte van de pagina getoond",
      type: "array",
      group: "content",
      validation: (Rule) => Rule.max(15),
      of: [
        { type: "richText" },
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
      ],
    }),
    defineField({
      name: "blocksBottom",
      title: "Blokken (onder)",
      type: "array",
      group: "content",
      validation: (Rule) => Rule.max(15),
      of: [
        { type: "richText" },
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
    },
  },
});
