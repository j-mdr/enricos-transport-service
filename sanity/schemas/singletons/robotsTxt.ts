import { defineType, defineField } from "sanity";

export const robotsTxt = defineType({
  name: "robotsTxt",
  title: "robots.txt",
  type: "document",
  fields: [
    defineField({
      name: "content",
      title: "Inhoud",
      type: "text",
      rows: 12,
      description: "Volledige inhoud van robots.txt. Laat leeg voor de standaardwaarde.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "robots.txt" }),
  },
});
