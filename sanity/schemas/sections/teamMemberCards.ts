import { defineType, defineField } from "sanity";

export const teamMemberCards = defineType({
  name: "teamMemberCards",
  title: "Team / teamleden kaarten",
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
      name: "teamMembers",
      title: "Teamleden",
      type: "array",
      of: [{ type: "reference", to: [{ type: "person" }] }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title, subtitle: "Team / teamleden kaarten" }),
  },
});
