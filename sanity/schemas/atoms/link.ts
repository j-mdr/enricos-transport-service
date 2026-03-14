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
      name: "destination",
      title: "Type link",
      type: "array",
      of: [{ type: "externalLink" }, { type: "internalLink" }],
      validation: (Rule) => Rule.required().min(1).max(1),
    }),
  ],
  preview: {
    select: {
      title: "text",
      href: "destination[0].href",
      ref: "destination[0].reference._ref",
    },
    prepare({ title, href, ref }: { title?: string; href?: string; ref?: string }) {
      return {
        title,
        subtitle: href ?? (ref ? "intern" : undefined),
      };
    },
  },
});
