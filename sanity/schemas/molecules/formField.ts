import { defineType, defineField, defineArrayMember } from "sanity";

// Eén formulierveld in de form builder.
// Het 'type' bepaalt welke extra opties zichtbaar zijn in de Studio.

export const formField = defineType({
  name: "formField",
  title: "Formulierveld",
  type: "object",
  fields: [
    defineField({
      name: "type",
      title: "Veldtype",
      type: "string",
      options: {
        list: [
          { title: "Tekst (één regel)", value: "text" },
          { title: "E-mailadres", value: "email" },
          { title: "Telefoonnummer", value: "tel" },
          { title: "Tekstvak (meerdere regels)", value: "textarea" },
          { title: "Keuzelijst (select)", value: "select" },
          { title: "Aanvinkvak (checkbox)", value: "checkbox" },
          { title: "Datum", value: "date" },
          { title: "Bestand uploaden", value: "file" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Veldnaam (intern)",
      type: "string",
      description: "Gebruikt als sleutel in de form submission, bijv. 'firstName'",
      validation: (Rule) =>
        Rule.required()
          .regex(/^[a-zA-Z][a-zA-Z0-9_]*$/)
          .error("Alleen letters, cijfers en underscores. Start met een letter."),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "placeholder",
      title: "Placeholder tekst",
      type: "string",
      hidden: ({ parent }) =>
        parent?.type === "checkbox" || parent?.type === "date" || parent?.type === "file",
    }),
    defineField({
      name: "required",
      title: "Verplicht veld",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "width",
      title: "Breedte",
      type: "string",
      options: {
        list: [
          { title: "Volledig", value: "full" },
          { title: "Half", value: "half" },
        ],
        layout: "radio",
      },
      initialValue: "full",
    }),
    // Alleen zichtbaar als type === 'select'
    defineField({
      name: "options",
      title: "Keuze opties",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "selectOption",
          fields: [
            defineField({
              name: "label",
              title: "Label (zichtbaar)",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "value",
              title: "Waarde (intern)",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        }),
      ],
      hidden: ({ parent }) => parent?.type !== "select",
      validation: (Rule) =>
        Rule.custom((options, context: any) => {
          if (context.parent?.type === "select" && (!options || (options as any[]).length === 0)) {
            return "Voeg minimaal één optie toe voor een keuzelijst";
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "type",
      required: "required",
    },
    prepare({ title, subtitle, required }) {
      return {
        title: `${title}${required ? " *" : ""}`,
        subtitle,
      };
    },
  },
});
