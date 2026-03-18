import { defineType, defineField } from "sanity";
import { ProtectedSlugInput } from "../../components/ProtectedSlugInput";
import { UrlPathInput } from "../../components/UrlPathInput";

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
    defineField({ name: "language", title: "Taal", type: "string", readOnly: true, hidden: false }),
    defineField({
      name: "protected",
      title: "Beschermd",
      type: "boolean",
      description: "Zet aan om verwijderen in de studio te blokkeren.",
      group: "meta",
      initialValue: false,
    }),
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
      name: "image",
      title: "Afbeelding",
      type: "imageWithAlt",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "blocks",
      title: "Blokken",
      type: "array",
      group: "content",
      validation: (Rule) => Rule.min(1).max(15),
      of: [
        { type: "heroBgImage" },
        { type: "heroSideImage" },
        { type: "heroCentered" },
        { type: "featureVideo" },
        { type: "introSection" },
        { type: "headingWithImage" },
        { type: "richText" },
        {
          type: "reference",
          title: "Herbruikbare sectie",
          to: [
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
          ],
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
      name: "seo",
      title: "SEO",
      type: "seoMeta",
      group: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug.current",
      media: "image.asset",
    },
    prepare({ title, slug }: { title: string; slug: string }) {
      return { title, subtitle: slug };
    },
  },
});
