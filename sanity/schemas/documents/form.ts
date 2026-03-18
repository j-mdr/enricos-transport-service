import { defineType, defineField } from "sanity";

// Flexibel formulier document — editors bouwen zelf de velden.
// Vertalingen worden beheerd via @sanity/document-internationalization.
// Submissions gaan naar een externe service (bijv. Resend), niet naar Sanity.

export const form = defineType({
  name: "form",
  title: "Formulier",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Formulier titel",
      type: "string",
      description: "Zichtbaar als koptekst boven het formulier",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fields",
      title: "Formuliervelden",
      type: "array",
      of: [{ type: "formField" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "emailSubject",
      title: "Onderwerp e-mail (optioneel)",
      type: "string",
      description: "Overschrijft het standaard onderwerp in de ontvangen e-mail",
    }),
    defineField({
      name: "submitButtonText",
      title: "Knoptekst",
      type: "string",
      initialValue: "Versturen",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "successMessage",
      title: "Succesbericht",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "errorMessage",
      title: "Foutmelding",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
