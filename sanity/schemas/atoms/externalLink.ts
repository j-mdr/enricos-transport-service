import { defineType, defineField } from "sanity";

export const externalLink = defineType({
  name: "externalLink",
  title: "Externe link",
  type: "object",
  fields: [
    defineField({
      name: "href",
      title: "URL",
      type: "string",
      description: "Bijv. https://example.com",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "openInNewTab",
      title: "Openen in nieuw tabblad",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "href" },
  },
});
