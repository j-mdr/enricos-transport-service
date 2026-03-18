import { defineType, defineField } from "sanity";
import { UsersIcon } from "@sanity/icons";
import { langFilter } from "../../lib/filters";

export const teamMemberCards = defineType({
  name: "teamMemberCards",
  title: "Team / teamleden kaarten",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
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
      of: [
        {
          type: "reference",
          to: [{ type: "person" }],
          options: { filter: langFilter },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title, subtitle: "Team / teamleden kaarten" }),
  },
});
