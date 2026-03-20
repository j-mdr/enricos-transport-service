import { defineType, defineField } from "sanity";
import { EnvelopeIcon } from "@sanity/icons";

export const contactSection = defineType({
  name: "contactSection",
  title: "Contact / sectie",
  type: "document",
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      initialValue: "withContactInfo",
      options: {
        list: [
          { title: "Met contactgegevens", value: "withContactInfo" },
          { title: "Met afbeelding", value: "withImage" },
          { title: "Gecentreerd", value: "centered" },
          { title: "CTA kaart", value: "withCta" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Afbeelding",
      type: "imageWithAlt",
      hidden: ({ parent }) => parent?.type !== "withImage",
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
    defineField({
      name: "fields",
      title: "Formuliervelden",
      type: "array",
      of: [{ type: "formField" }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title: title ?? "Contactformulier", subtitle: "Contact / sectie" }),
  },
});
