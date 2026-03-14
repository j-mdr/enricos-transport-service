import { defineType, defineField } from "sanity";

export const teamMemberCards = defineType({
  name: "teamMemberCards",
  title: "TeamMemberCardsSection",
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
      of: [{ type: "profileCard" }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title, subtitle: "TeamMemberCardsSection" }),
  },
});
