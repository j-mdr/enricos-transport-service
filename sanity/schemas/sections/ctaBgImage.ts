import { defineType, defineField } from "sanity";
import { SparklesIcon } from "@sanity/icons";

export const ctaBgImage = defineType({
  name: "ctaBgImage",
  title: "CTA / met achtergrond afbeelding",
  type: "document",
  icon: SparklesIcon,
  fields: [
    defineField({ name: "language", title: "Taal", type: "string", readOnly: true, hidden: false }),
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      description: "Gebruik {highlight} om een woord te markeren",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "description", title: "Beschrijving", type: "text", rows: 2 }),
    defineField({ name: "ctaButton", title: "CTA knop", type: "ctaButton" }),
    defineField({ name: "image", title: "Achtergrond afbeelding", type: "imageWithAlt" }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title, subtitle: "CTA / met achtergrond afbeelding" }),
  },
});
