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
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              {
                name: "linkType",
                title: "Type",
                type: "string",
                options: {
                  list: [
                    { title: "Extern", value: "external" },
                    { title: "Intern", value: "internal" },
                  ],
                  layout: "radio",
                },
                initialValue: "external",
              },
              {
                name: "href",
                title: "URL",
                type: "string",
                description: "Bijv. https://example.com",
                hidden: ({ parent }: { parent?: { linkType?: string } }) =>
                  parent?.linkType === "internal",
                validation: (Rule) =>
                  Rule.custom((value, ctx) => {
                    if (
                      (ctx.parent as { linkType?: string })?.linkType !==
                        "internal" &&
                      !value
                    )
                      return "Verplicht voor externe links";
                    return true;
                  }),
              },
              {
                name: "reference",
                title: "Pagina of blogpost",
                type: "reference",
                to: [{ type: "page" }, { type: "blogPost" }],
                hidden: ({ parent }: { parent?: { linkType?: string } }) =>
                  parent?.linkType !== "internal",
                validation: (Rule) =>
                  Rule.custom((value, ctx) => {
                    if (
                      (ctx.parent as { linkType?: string })?.linkType ===
                        "internal" &&
                      !value
                    )
                      return "Verplicht voor interne links";
                    return true;
                  }),
              },
              {
                name: "openInNewTab",
                title: "Openen in nieuw tabblad",
                type: "boolean",
                initialValue: false,
                hidden: ({ parent }: { parent?: { linkType?: string } }) =>
                  parent?.linkType === "internal",
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
