import { defineType, defineField } from "sanity";
import { ThListIcon } from "@sanity/icons";

export const testimonialsColumns = defineType({
  name: "testimonialsColumns",
  title: "Recensies / kolommen",
  type: "document",
  icon: ThListIcon,
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      description: "Gebruik {highlight} om een woord te markeren",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "testimonials",
      title: "Reviews",
      type: "array",
      of: [{ type: "testimonialCard" }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title, subtitle: "Recensies / kolommen" }),
  },
});
