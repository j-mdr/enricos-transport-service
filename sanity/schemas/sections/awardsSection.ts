import { defineType, defineField } from "sanity";
import { StarIcon } from "@sanity/icons";

export const awardsSection = defineType({
  name: "awardsSection",
  title: "Inhoud / certificaten & awards",
  type: "document",
  icon: StarIcon,
  fields: [
    defineField({ name: "language", title: "Taal", type: "string", readOnly: true, hidden: false }),
    defineField({ name: "title", title: "Titel", type: "string" }),
    defineField({
      name: "awards",
      title: "Awards",
      type: "array",
      of: [{ type: "imageWithAlt" }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title, subtitle: "Inhoud / certificaten & awards" }),
  },
});
