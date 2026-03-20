import { defineType, defineField } from "sanity";
import { BlockContentIcon } from "@sanity/icons";

export const richText = defineType({
  name: "richText",
  title: "Inhoud / rijke tekst",
  type: "object",
  fields: [
    defineField({
      name: "content",
      title: "Inhoud",
      type: "portableText",
      validation: (Rule) => Rule.required(),
    }),
  ],
  icon: BlockContentIcon,
  preview: { prepare: () => ({ title: "Rijke tekst", subtitle: "Inhoud / rijke tekst" }) },
});
