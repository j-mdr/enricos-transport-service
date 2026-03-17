import { defineType, defineField } from "sanity";

export const featureToggleImage = defineType({
  name: "featureToggleImage",
  title: "Feature / met wisselende afbeelding",
  type: "object",
  fields: [
    defineField({
      name: "sectionTitle",
      title: "Sectie titel",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sections",
      title: "Toggle items",
      type: "array",
      of: [{ type: "featureCardToggle" }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "sectionTitle" },
    prepare: ({ title }) => ({ title, subtitle: "Feature / met wisselende afbeelding" }),
  },
});
