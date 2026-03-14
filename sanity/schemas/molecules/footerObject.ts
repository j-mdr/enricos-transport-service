import { defineType, defineField } from "sanity";

export const footerObject = defineType({
  name: "footerObject",
  title: "Footer",
  type: "object",
  fields: [
    defineField({
      name: "logo",
      title: "Logo",
      type: "imageWithAlt",
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
});
