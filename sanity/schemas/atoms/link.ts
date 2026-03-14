import { defineType, defineField } from "sanity";

export const link = defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Tekst",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "linkType",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Extern", value: "external" },
          { title: "Intern", value: "internal" },
        ],
        layout: "radio",
      },
      initialValue: "external",
    }),
    defineField({
      name: "href",
      title: "URL",
      type: "string",
      description: "Bijv. https://example.com",
      hidden: ({ parent }) => parent?.linkType === "internal",
      validation: (Rule) =>
        Rule.custom((value, ctx) => {
          if ((ctx.parent as { linkType?: string })?.linkType !== "internal" && !value)
            return "Verplicht voor externe links";
          return true;
        }),
    }),
    defineField({
      name: "reference",
      title: "Pagina of blogpost",
      type: "reference",
      to: [{ type: "page" }, { type: "blogPost" }],
      hidden: ({ parent }) => parent?.linkType !== "internal",
      validation: (Rule) =>
        Rule.custom((value, ctx) => {
          if ((ctx.parent as { linkType?: string })?.linkType === "internal" && !value)
            return "Verplicht voor interne links";
          return true;
        }),
    }),
    defineField({
      name: "openInNewTab",
      title: "Openen in nieuw tabblad",
      type: "boolean",
      initialValue: false,
      hidden: ({ parent }) => parent?.linkType === "internal",
    }),
  ],
  preview: {
    select: {
      title: "text",
      subtitle: "href",
      linkType: "linkType",
    },
    prepare({ title, subtitle, linkType }) {
      return {
        title,
        subtitle: linkType === "internal" ? "intern" : subtitle,
      };
    },
  },
});
