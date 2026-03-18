import { defineType, defineField } from "sanity";
import { BlockElementIcon } from "@sanity/icons";

export const featureSideImage = defineType({
  name: "featureSideImage",
  title: "Feature / met zijafbeelding",
  type: "document",
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "sectionTitle",
      title: "Sectie titel",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [{ type: "featureCardSideImage" }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "sectionTitle" },
    prepare: ({ title }) => ({ title, subtitle: "Feature / met zijafbeelding" }),
  },
});
