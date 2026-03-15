import { defineType, defineArrayMember, defineField } from "sanity";

// Portable Text is Sanity's rich text format.
// Dit type vervangt Keystatic's fields.document().
// Gebruik het als: defineField({ name: 'content', type: 'portableText' })

export const portableText = defineType({
  name: "portableText",
  title: "Rijke tekst",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normaal", value: "normal" },
        { title: "Kop 2", value: "h2" },
        { title: "Kop 3", value: "h3" },
        { title: "Kop 4", value: "h4" },
        { title: "Citaat", value: "blockquote" },
      ],
      lists: [
        { title: "Opsomming", value: "bullet" },
        { title: "Genummerd", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Vet", value: "strong" },
          { title: "Cursief", value: "em" },
          { title: "Onderstrepen", value: "underline" },
          { title: "Doorstrepen", value: "strike-through" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              defineField({
                name: "destination",
                title: "Bestemming",
                type: "array",
                of: [{ type: "externalLink" }, { type: "internalLink" }],
                validation: (Rule) => Rule.required().min(1).max(1),
              }),
            ],
          },
        ],
      },
    }),
    // Inline afbeelding in rijke tekst
    defineArrayMember({
      type: "imageWithAlt",
    }),
  ],
});
