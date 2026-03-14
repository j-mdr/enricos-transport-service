import { defineType, defineField } from "sanity";

export const navItemDropdown = defineType({
  name: "navItemDropdown",
  title: "Dropdown menu",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "dropdown",
      title: "Links",
      type: "array",
      of: [{ type: "link" }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "label" },
    prepare({ title }) {
      return { title, subtitle: "— dropdown" };
    },
  },
});
