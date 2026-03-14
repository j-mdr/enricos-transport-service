import { defineType, defineField } from "sanity";

// Een navItem is ofwel een directe link (href ingevuld, dropdown leeg)
// ofwel een dropdown parent (href leeg, dropdown gevuld).
// Dropdown items hergebruiken het 'link' atoom — daar is href altijd verplicht.

export const navItem = defineType({
  name: "navItem",
  title: "Navigatie item",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Tekst",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "hasDropdown",
      title: "Heeft dropdown",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "link",
      hidden: ({ parent }) => parent?.hasDropdown === true,
    }),
    defineField({
      name: "dropdown",
      title: "Dropdown links",
      type: "array",
      of: [{ type: "link" }],
      hidden: ({ parent }) => parent?.hasDropdown !== true,
    }),
  ],
  preview: {
    select: {
      title: "text",
      subtitle: "link.href",
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle || "— dropdown",
      };
    },
  },
});
