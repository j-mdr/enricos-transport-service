import { defineType, defineField } from "sanity";

// Footer document — meerdere footers mogelijk (bijv. hoofdfooter, minimale footer voor landingspagina's).
// Vertalingen worden beheerd via @sanity/document-internationalization.

export const footer = defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    defineField({ name: "language", type: "string", readOnly: true, hidden: false }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "imageWithAlt",
    }),
    defineField({
      name: "title",
      title: "Naam",
      type: "string",
      description: "Intern, bijv. 'Hoofdfooter'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctaButton",
      title: "CTA knop",
      type: "ctaButton",
    }),
    defineField({
      name: "columns",
      title: "Link kolommen",
      type: "array",
      of: [
        {
          type: "object",
          name: "footerColumn",
          title: "Kolom",
          fields: [
            defineField({
              name: "title",
              title: "Kolomtitel",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "links",
              title: "Links",
              type: "array",
              of: [{ type: "link" }],
            }),
          ],
          preview: {
            select: { title: "title" },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
