import { defineType, defineField } from "sanity";

export const becomePartnerSection = defineType({
  name: "becomePartnerSection",
  title: "BecomePartnerSection",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Titel", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "image", title: "Afbeelding", type: "imageWithAlt" }),
    defineField({
      name: "form",
      title: "Formulier",
      type: "reference",
      to: [{ type: "form" }],
    }),
  ],
  preview: { select: { title: "title" }, prepare: ({ title }) => ({ title, subtitle: "BecomePartnerSection" }) },
});
