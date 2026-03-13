import { defineType, defineField } from "sanity";

export const ctaButton = defineType({
  name: "ctaButton",
  title: "CTA knop",
  type: "object",
  fields: [
    defineField({
      name: "link",
      title: "Link",
      type: "link",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: [
          { title: "Default", value: "default" },
          { title: "Primary", value: "primary" },
          { title: "Secondary", value: "secondary" },
          { title: "Outline", value: "outline" },
          { title: "Ghost", value: "ghost" },
        ],
        layout: "radio",
      },
      initialValue: "primary",
    }),
    defineField({
      name: "size",
      title: "Grootte",
      type: "string",
      options: {
        list: [
          { title: "Klein (sm)", value: "sm" },
          { title: "Normaal (md)", value: "md" },
          { title: "Groot (lg)", value: "lg" },
        ],
        layout: "radio",
      },
      initialValue: "md",
    }),
  ],
  preview: {
    select: {
      title: "link.text",
      subtitle: "link.href",
    },
  },
});