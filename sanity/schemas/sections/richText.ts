import { defineType, defineField } from "sanity";

export const richText = defineType({
  name: "richText",
  title: "Inhoud / rijke tekst",
  type: "object",
  fields: [
    defineField({
      name: "content",
      title: "Inhoud",
      type: "portableText",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: { prepare: () => ({ title: "Rijke tekst", subtitle: "Inhoud / rijke tekst" }) },
});
