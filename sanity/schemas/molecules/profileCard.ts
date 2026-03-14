import { defineType, defineField } from "sanity";

export const profileCard = defineType({
  name: "profileCard",
  title: "Profiel kaart",
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
      title: "Functie",
      type: "string",
      description: "Bijv. 'Oprichter' of 'Chauffeur'",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "image",
      title: "Profielfoto",
      type: "imageWithAlt",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "personTitle",
      media: "image.asset",
    },
  },
});
