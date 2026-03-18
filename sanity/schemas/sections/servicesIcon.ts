import { defineType, defineField } from "sanity";
import { ThListIcon } from "@sanity/icons";

export const servicesIcon = defineType({
  name: "servicesIcon",
  title: "Diensten / met iconen",
  type: "document",
  icon: ThListIcon,
  fields: [
    defineField({ name: "language", title: "Taal", type: "string", readOnly: true, hidden: false }),
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      description: "Gebruik {highlight} om een woord te markeren",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [{ type: "serviceCardIcon" }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title, subtitle: "Diensten / met iconen" }),
  },
});
