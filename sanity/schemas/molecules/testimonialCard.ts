import { defineType, defineField } from "sanity";

export const testimonialCard = defineType({
  name: "testimonialCard",
  title: "Testimonial",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Naam",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "personTitle",
      title: "Functie / omschrijving",
      type: "string",
      description: "Bijv. 'Klant' of 'CEO bij Bedrijf X'",
    }),
    defineField({
      name: "testimonial",
      title: "Review tekst",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "avatar",
      title: "Profielfoto (optioneel)",
      type: "imageWithAlt",
    }),
    defineField({
      name: "rating",
      title: "Beoordeling (sterren)",
      type: "number",
      options: {
        list: [1, 2, 3, 4, 5],
        layout: "radio",
      },
      initialValue: 5,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "testimonial",
      media: "avatar.asset",
    },
  },
});
