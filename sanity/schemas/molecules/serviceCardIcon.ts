import { defineType, defineField } from "sanity";
import { IconPickerInput } from "../../components/IconPickerInput";

export const serviceCardIcon = defineType({
  name: "serviceCardIcon",
  title: "Service kaart (icon)",
  type: "object",
  fields: [
    defineField({
      name: "icon",
      title: "Icon naam",
      type: "string",
      description: "Bijv. tabler/truck of tabler/package",
      components: { input: IconPickerInput },
    }),
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Beschrijving",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "ctaButton",
      title: "CTA knop",
      type: "ctaButton",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "icon",
    },
  },
});
