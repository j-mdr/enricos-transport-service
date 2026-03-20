import { defineType, defineField } from "sanity";
import { IconPickerInput } from "../../components/IconPickerInput";

// Kaart gebruikt in een toggle/tab sectie: klikken toont de bijbehorende afbeelding.

export const featureCardToggle = defineType({
  name: "featureCardToggle",
  title: "Feature kaart (toggle)",
  type: "object",
  fields: [
    defineField({
      name: "icon",
      title: "Icon naam",
      type: "string",
      description: "Bijv. tabler/home of tabler/truck",
      components: { input: IconPickerInput },
    }),
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Afbeelding",
      type: "imageWithAlt",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "icon",
      media: "image.asset",
    },
  },
});
