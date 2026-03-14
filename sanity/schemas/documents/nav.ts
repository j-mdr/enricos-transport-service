import { defineType, defineField } from "sanity";

// Navigatie document — meerdere navs mogelijk (bijv. hoofdnavigatie, docs nav).
// Vertalingen worden beheerd via @sanity/document-internationalization.

export const nav = defineType({
  name: "nav",
  title: "Navigatie",
  type: "document",
  fields: [
    defineField({ name: "language", type: "string", readOnly: true, hidden: false }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "imageWithAlt",
    }),
    defineField({
      name: "title",
      title: "Naam",
      type: "string",
      description: "Intern, bijv. 'Hoofdnavigatie'",
      validation: (Rule) => Rule.required(),
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
  preview: {
    select: {
      title: "title",
    },
  },
});
