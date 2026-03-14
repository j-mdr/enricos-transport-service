import { defineType, defineField } from "sanity";

// Klein kaartje met icon, titel en tekst. Ideaal in een grid van 4 of 6 stuks.

export const featureCardSmall = defineType({
  name: "featureCardSmall",
  title: "Feature kaart (klein)",
  type: "object",
  fields: [
    defineField({
      name: "icon",
      title: "Icon naam",
      type: "string",
      description: "Bijv. tabler/truck of tabler/heart-handshake",
    }),
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "text",
      title: "Tekst",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "icon",
    },
  },
});
