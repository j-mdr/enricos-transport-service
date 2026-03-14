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
      name: "href",
      title: "URL",
      type: "string",
      description: "Leeg laten als dit item een dropdown heeft",
    }),
    defineField({
      name: "dropdown",
      title: "Dropdown links",
      type: "array",
      of: [{ type: "link" }],
    }),
  ],
  preview: {
    select: {
      title: "text",
      subtitle: "href",
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle || "— dropdown",
      };
    },
  },
});
