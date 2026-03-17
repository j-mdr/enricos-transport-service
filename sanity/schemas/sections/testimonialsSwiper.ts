import { defineType, defineField } from "sanity";

export const testimonialsSwiper = defineType({
  name: "testimonialsSwiper",
  title: "Recensies / carrousel",
  type: "object",
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
    prepare: ({ title }) => ({ title, subtitle: "Recensies / carrousel" }),
  },
});
