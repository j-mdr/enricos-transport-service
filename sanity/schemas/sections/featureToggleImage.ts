import { defineType, defineField } from "sanity";

export const featureToggleImage = defineType({
  name: "featureToggleImage",
  title: "FeatureToggleImageSection",
  type: "object",
  fields: [
    defineField({ name: "sectionTitle", title: "Sectie titel", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "sections", title: "Toggle items", type: "array", of: [{ type: "featureCardToggle" }], validation: (Rule) => Rule.required().min(1) }),
  ],
  preview: { select: { title: "sectionTitle" }, prepare: ({ title }) => ({ title, subtitle: "FeatureToggleImageSection" }) },
});
