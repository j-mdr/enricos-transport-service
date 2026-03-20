import { defineType, defineField } from "sanity";

export const ctaButton = defineType({
  name: "ctaButton",
  title: "CTA knop",
  type: "object",
  fieldsets: [
    {
      name: "stijl",
      title: "Stijl",
      options: { collapsible: true, collapsed: true },
    },
  ],
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
      fieldset: "stijl",
      options: {
        list: [
          { title: "Primary", value: "primary" },
          { title: "Secondary", value: "secondary" },
          { title: "Outline", value: "outline" },
          { title: "Ghost", value: "ghost" },
          { title: "Default", value: "default" },
        ],
        layout: "radio",
      },
      initialValue: "primary",
    }),
    defineField({
      name: "size",
      title: "Grootte",
      type: "string",
      fieldset: "stijl",
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
      subtitle: "link.destination.0.href",
    },
  },
});
