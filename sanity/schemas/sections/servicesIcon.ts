import { defineType, defineField } from "sanity";

export const servicesIcon = defineType({
  name: "servicesIcon",
  title: "ServicesIconSection",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Titel", type: "string", description: "Gebruik {highlight} om een woord te markeren", validation: (Rule) => Rule.required() }),
    defineField({ name: "services", title: "Services", type: "array", of: [{ type: "serviceCardIcon" }], validation: (Rule) => Rule.required().min(1) }),
  ],
  preview: { select: { title: "title" }, prepare: ({ title }) => ({ title, subtitle: "ServicesIconSection" }) },
});
