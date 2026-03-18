import { defineType, defineField } from "sanity";
import { EnvelopeIcon } from "@sanity/icons";

export const contactSection = defineType({
  name: "contactSection",
  title: "Contact / sectie",
  type: "document",
  icon: EnvelopeIcon,
  fields: [
    defineField({ name: "language", title: "Taal", type: "string", readOnly: true, hidden: false }),
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
      name: "form",
      title: "Formulier",
      type: "reference",
      to: [{ type: "form" }],
      options: {
        filter: ({ document }: { document: { language?: string } }) =>
          document.language
            ? { filter: "language == $lang", params: { lang: document.language } }
            : {},
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: { prepare: () => ({ title: "Contactformulier", subtitle: "Contact / sectie" }) },
});
