import { defineType, defineField } from "sanity";

export const author = defineType({
  name: "author",
  title: "Auteur",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Naam",
      type: "string",
      validation: (Rule) => Rule.required(),
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
      media: "avatar.asset",
    },
  },
});
