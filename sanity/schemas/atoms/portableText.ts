import { defineType, defineArrayMember } from "sanity";

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
            name: "inlineLink",
            type: "object",
            title: "Link",
            fields: [
              {
                name: "href",
                type: "string",
                title: "URL",
                validation: (Rule) => Rule.required(),
              },
              {
                name: "openInNewTab",
                type: "boolean",
                title: "Openen in nieuw tabblad",
                initialValue: false,
              },
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