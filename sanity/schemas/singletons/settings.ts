import { defineType, defineField } from "sanity";

// Globale site-instellingen per locale.
// In de Studio zijn dit twee vaste documenten: 'settings-nl' en 'settings-en'.
// Editors kunnen geen nieuwe settings documenten aanmaken.

export const settings = defineType({
  name: "settings",
  title: "Instellingen",
  type: "document",
  groups: [
    { name: "nav", title: "Navigatie" },
    { name: "footer", title: "Footer" },
    { name: "algemeen", title: "Algemeen" },
    { name: "bedrijf", title: "Bedrijf" },
    { name: "contact", title: "Contact" },
    { name: "adres", title: "Adres" },
    { name: "socials", title: "Socials" },
  ],
  fields: [
    defineField({
      name: "homePage",
      title: "Homepagina",
      type: "reference",
      to: [{ type: "page" }],
      group: "algemeen",
      description: "De pagina die wordt getoond op de homepage.",
      options: {
        filter: (({ document }: { document: { _id?: string } }) => {
          const lang = document._id?.replace(/^drafts\./, "").endsWith("-nl") ? "nl" : "en";
          return { filter: "language == $lang", params: { lang } };
        }) as any,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "nav",
      title: "Navigatie",
      type: "navObject",
      group: "nav",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "footer",
      title: "Footer",
      type: "footerObject",
      group: "footer",
    }),
    defineField({
      name: "name",
      title: "Bedrijfsnaam",
      type: "string",
      group: "bedrijf",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Telefoonnummer",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "email",
      title: "E-mailadres",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "street",
      title: "Straat",
      type: "string",
      group: "adres",
    }),
    defineField({
      name: "city",
      title: "Stad",
      type: "string",
      group: "adres",
    }),
    defineField({
      name: "zipCode",
      title: "Postcode",
      type: "string",
      group: "adres",
    }),
    defineField({
      name: "province",
      title: "Provincie",
      type: "string",
      group: "adres",
    }),
    defineField({
      name: "country",
      title: "Land",
      type: "string",
      group: "adres",
    }),
    defineField({
      name: "facebookUrl",
      title: "Facebook URL",
      type: "url",
      group: "socials",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
      group: "socials",
    }),
    defineField({
      name: "linkedinUrl",
      title: "LinkedIn URL",
      type: "url",
      group: "socials",
    }),
  ],
  preview: {
    select: {
      title: "name",
    },
  },
});
