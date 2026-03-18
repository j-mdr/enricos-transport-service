import { defineType, defineField } from "sanity";
import { BlockElementIcon } from "@sanity/icons";

export const featureVideo = defineType({
  name: "featureVideo",
  title: "Feature / video",
  type: "object",
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: "sectionTitle",
      title: "Sectie titel",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "titleHighlight",
      title: "Gemarkeerd woord in titel",
      type: "string",
      description: "Dit woord wordt gemarkeerd weergegeven in de titel",
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail afbeelding",
      type: "imageWithAlt",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "video",
      title: "Video bestand",
      type: "file",
      options: { accept: "video/mp4,video/webm" },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "sectionTitle" },
    prepare: ({ title }) => ({ title, subtitle: "Feature / video" }),
  },
});
