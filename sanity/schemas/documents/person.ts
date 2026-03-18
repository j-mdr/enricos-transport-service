import { defineType, defineField } from "sanity";

export const person = defineType({
  name: "person",
  title: "Persoon",
  type: "document",
  fields: [
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "name",
      title: "Naam",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        slugify: (input) => input.toLowerCase().replace(/\s+/g, "-"),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "personTitle",
      title: "Functie",
      type: "string",
      description: "Bijv. 'Oprichter' of 'Chauffeur'",
    }),
    defineField({
      name: "avatar",
      title: "Profielfoto",
      type: "imageWithAlt",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "authorLink",
      title: "Persoonlijke link",
      type: "url",
      description: "Bijv. LinkedIn of persoonlijke website",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "personTitle",
      media: "avatar.asset",
    },
  },
});
