import { defineType, defineField } from "sanity";

export const navObject = defineType({
  name: "navObject",
  title: "Navigatie",
  type: "object",
  fields: [
    defineField({
      name: "logo",
      title: "Logo",
      type: "imageWithAlt",
    }),
    defineField({
      name: "navItems",
      title: "Navigatie items",
      type: "array",
      of: [{ type: "link" }, { type: "navItemDropdown" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "ctaButton",
      title: "CTA knop",
      type: "ctaButton",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
