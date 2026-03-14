import { defineType, defineField } from "sanity";

export const featureLightboxMarquee = defineType({
  name: "featureLightboxMarquee",
  title: "FeatureLightboxMarqueeSection",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Titel", type: "string" }),
    defineField({
      name: "images",
      title: "Afbeeldingen",
      type: "array",
      of: [{ type: "imageWithAlt" }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title, subtitle: "FeatureLightboxMarqueeSection" }),
  },
});
