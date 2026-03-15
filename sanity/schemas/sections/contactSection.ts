import { defineType, defineField } from "sanity";

export const contactSection = defineType({
  name: "contactSection",
  title: "ContactSection",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
    }),
    defineField({ name: "image", title: "Afbeelding", type: "imageWithAlt" }),
    defineField({
      name: "form",
      title: "Formulier",
      type: "reference",
      to: [{ type: "form" }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: { prepare: () => ({ title: "Contactformulier", subtitle: "ContactSection" }) },
});
