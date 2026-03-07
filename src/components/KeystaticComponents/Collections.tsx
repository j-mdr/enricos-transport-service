/**
 * * Keystatic Collection definitions that can take in languages and return the correct content
 * This makes it much cleaner to work with content in different languages
 */

import { collection, fields, singleton } from "@keystatic/core";

// components
import ComponentBlocks from "@components/KeystaticComponents/ComponentBlocks";

// utils
import { locales } from "@config/siteSettings.json";

type Locale = (typeof locales)[number];

const templateOptions = {
  baseLayout: { label: "Base Layout", value: "BaseLayout" },
  serviceLayoutCenter: { label: "Service Layout (gecentreerd)", value: "ServiceLayoutCenter" },
} as const;

/**
 * * Blog posts collection
 * This gets used by Astro Content Collections, so if you update this, you'll need to update the Astro Content Collections schema
 */
const Blog = (locale: (typeof locales)[number]) =>
  collection({
    label: `Blog (${locale.toUpperCase()})`,
    slugField: "title",
    path: `src/content/blog/${locale}/*/`,
    columns: ["title", "pubDate"],
    entryLayout: "content",
    format: { contentField: "content" },
    schema: {
      title: fields.slug({
        name: { label: "Title" },
        slug: {
          label: "SEO-friendly slug",
          description: "Never change the slug once a file is published!",
        },
      }),
      description: fields.text({
        label: "Description",
        validation: { isRequired: true, length: { min: 1, max: 160 } },
      }),
      draft: fields.checkbox({
        label: "Draft",
        description: "Set this post as draft to prevent it from being published.",
      }),

      authors: fields.array(
        fields.relationship({
          label: "Post author",
          collection: `authors`,
        }),
        {
          label: "Authors",
          validation: { length: { min: 1 } },
          itemLabel: (props) => props.value || "Please select an author",
        },
      ),
      pubDate: fields.date({ label: "Publish Date" }),
      updatedDate: fields.date({
        label: "Updated Date",
        description: "If you update this post at a later date, put that date here.",
      }),
      mappingKey: fields.text({
        label: "Mapping Key",
        description: "This is used to map entries between languages.",
      }),
      heroImage: fields.image({
        label: "HeroCenteredSection Image",
        publicPath: "../",
        validation: { isRequired: true },
      }),
      categories: fields.array(fields.text({ label: "Category" }), {
        label: "Categories",
        description: "This is NOT case sensitive.",
        itemLabel: (props) => props.value,
        validation: { length: { min: 1 } },
      }),
      content: fields.mdx({
        label: "Content",
        options: {
          bold: true,
          italic: true,
          strikethrough: true,
          code: true,
          heading: [2, 3, 4, 5, 6],
          blockquote: true,
          orderedList: true,
          unorderedList: true,
          table: true,
          link: true,
          image: {
            directory: `src/content/blog/${locale}/`,
            publicPath: "../",
            // schema: {
            //   title: fields.text({
            //     label: "Caption",
            //     description:
            //       "The text to display under the image in a caption.",
            //   }),
            // },
          },
          divider: true,
          codeBlock: true,
        },
        components: {
          Admonition: ComponentBlocks.Admonition,
          FaqSection: ComponentBlocks.FaqSection(locale),
        },
      }),
    },
  });

/**
 * * Authors collection
 * This gets used by Astro Content Collections, so if you update this, you'll need to update the Astro Content Collections schema
 */
const Authors = (locale: (typeof locales)[number] | "") =>
  collection({
    label: `Auteur's ${locale === "" ? "" : `(${locale.toUpperCase()})`} `,
    slugField: "name",
    path: `src/content/authors/${locale}/*/`,
    columns: ["name"],
    entryLayout: "content",
    format: { contentField: "bio" },
    schema: {
      name: fields.slug({
        name: {
          label: "Name",
          validation: {
            isRequired: true,
          },
        },
        slug: {
          label: "SEO-friendly slug",
          description: "Never change the slug once this file is published!",
        },
      }),
      avatar: fields.image({
        label: "Author avatar",
        publicPath: "../",
        validation: { isRequired: true },
      }),
      about: fields.text({
        label: "About",
        description: "A short bio about the author",
        validation: { isRequired: true },
      }),
      email: fields.text({
        label: "The author's email",
        description: "This must look something like `you@email.com`",
        validation: { isRequired: true },
      }),
      authorLink: fields.url({
        label: "Author Website or Social Media Link",
        validation: { isRequired: true },
      }),
      bio: fields.mdx({
        label: "Full Bio",
        description: "The author's full bio",
        options: {
          bold: true,
          italic: true,
          strikethrough: true,
          code: true,
          heading: [2, 3, 4],
          blockquote: true,
          orderedList: true,
          unorderedList: true,
          table: false,
          link: true,
          image: {
            directory: "src/content/authors/",
            publicPath: "../",
          },
          divider: true,
          codeBlock: false,
        },
      }),
    },
  });

/**
 * * Services collection
 * This gets used by Astro Content Collections, so if you update this, you'll need to update the Astro Content Collections schema
 */
const Services = (locale: (typeof locales)[number]) =>
  collection({
    label: `Diensten (${locale.toUpperCase()})`,
    slugField: "title",
    path: `src/content/services/${locale}/*/`,
    columns: ["title"],
    entryLayout: "content",
    format: { contentField: "content" },
    schema: {
      title: fields.slug({
        name: { label: "Title" },
        slug: {
          label: "SEO-friendly slug",
          description: "Never change the slug once a file is published!",
        },
      }),
      description: fields.text({
        label: "Description",
        validation: { isRequired: true, length: { min: 1, max: 160 } },
      }),
      image: fields.image({
        label: "Main Image",
        publicPath: "../",
        validation: { isRequired: true },
      }),
      mappingKey: fields.text({
        label: "Mapping Key",
        description: "This is used to map entries between languages.",
      }),
      template: fields.select({
        label: "Template",
        description: "De layout die voor deze pagina gebruikt wordt.",
        options: [templateOptions.serviceLayoutCenter],
        defaultValue: "ServiceLayoutCenter",
      }),
      draft: fields.checkbox({
        label: "Draft",
        description: "Set this page as draft to prevent it from being published.",
      }),
      content: fields.mdx({
        label: "Page Contents",
        options: {
          bold: true,
          italic: true,
          strikethrough: true,
          code: false,
          heading: [2, 3, 4],
          blockquote: true,
          orderedList: true,
          unorderedList: true,
          table: true,
          link: true,
          image: {
            directory: `src/content/diensten/${locale}/`,
            publicPath: "../",
          },
          divider: true,
          codeBlock: false,
        },
        components: {
          Admonition: ComponentBlocks.Admonition,
          FaqSection: ComponentBlocks.FaqSection(locale),
        },
      }),
    },
  });

/**
 * * Delivery Areas collection
 * This gets used by Astro Content Collections, so if you update this, you'll need to update the Astro Content Collections schema
 */
const DeliveryAreas = (locale: (typeof locales)[number]) =>
  collection({
    label: `Bezorggebieden (${locale.toUpperCase()})`,
    slugField: "title",
    path: `src/content/deliveryAreas/${locale}/*/`,
    columns: ["title"],
    entryLayout: "content",
    format: { contentField: "content" },
    schema: {
      title: fields.slug({
        name: { label: "Title" },
        slug: {
          label: "SEO-friendly slug",
          description: "Never change the slug once a file is published!",
        },
      }),
      description: fields.text({
        label: "Description",
        validation: { isRequired: true, length: { min: 1, max: 160 } },
      }),
      image: fields.image({
        label: "Main Image",
        publicPath: "../",
        validation: { isRequired: true },
      }),
      mappingKey: fields.text({
        label: "Mapping Key",
        description: "This is used to map entries between languages.",
      }),
      template: fields.select({
        label: "Template",
        description: "De layout die voor deze pagina gebruikt wordt.",
        options: [templateOptions.serviceLayoutCenter],
        defaultValue: "ServiceLayoutCenter",
      }),
      draft: fields.checkbox({
        label: "Draft",
        description: "Set this page as draft to prevent it from being published.",
      }),
      content: fields.mdx({
        label: "Page Contents",
        options: {
          bold: true,
          italic: true,
          strikethrough: true,
          code: false,
          heading: [2, 3, 4],
          blockquote: true,
          orderedList: true,
          unorderedList: true,
          table: true,
          link: true,
          image: {
            directory: `src/content/deliveryAreas/${locale}/`,
            publicPath: "../",
          },
          divider: true,
          codeBlock: false,
        },
        components: {
          Admonition: ComponentBlocks.Admonition,
          FaqSection: ComponentBlocks.FaqSection(locale),
        },
      }),
    },
  });

/**
 * * Other Pages collection
 * For items like legal pages, about pages, etc.
 * This gets used by Astro Content Collections, so if you update this, you'll need to update the Astro Content Collections schema
 */
const OtherPages = (locale: (typeof locales)[number]) =>
  collection({
    label: `Pagina's (${locale.toUpperCase()})`,
    slugField: "title",
    path: `src/content/otherPages/${locale}/*/`,
    columns: ["title"],
    entryLayout: "content",
    format: { contentField: "content" },
    schema: {
      title: fields.slug({
        name: { label: "Title" },
        slug: {
          label: "SEO-friendly slug",
          description: "Never change the slug once a file is published!",
        },
      }),
      description: fields.text({
        label: "Description",
        validation: { isRequired: true, length: { min: 1, max: 160 } },
      }),
      mappingKey: fields.text({
        label: "Mapping Key",
        description: "This is used to map entries between languages.",
      }),
      template: fields.select({
        label: "Template",
        description: "De layout die voor deze pagina gebruikt wordt.",
        options: [templateOptions.baseLayout, templateOptions.serviceLayoutCenter],
        defaultValue: "BaseLayout",
      }),
      image: fields.image({
        label: "Main Image",
        description: "Optioneel. Alleen zichtbaar bij Service Layout.",
        publicPath: "../",
      }),
      draft: fields.checkbox({
        label: "Draft",
        description: "Set this page as draft to prevent it from being published.",
      }),
      content: fields.mdx({
        label: "Page Contents",
        options: {
          bold: true,
          italic: true,
          strikethrough: true,
          code: true,
          heading: [2, 3, 4, 5, 6],
          blockquote: true,
          orderedList: true,
          unorderedList: true,
          table: true,
          link: true,
          image: {
            directory: `src/content/otherPages/${locale}/`,
            publicPath: "../",
          },
          divider: true,
          codeBlock: true,
        },
        components: {
          Admonition: ComponentBlocks.Admonition,
          FaqSection: ComponentBlocks.FaqSection(locale),
        },
      }),
    },
  });

/**
 * * FAQ Sets collection
 * Keystatic-managed FAQ sets per locale
 */
const Faqs = (locale: Locale) =>
  collection({
    label: `FAQ Sets (${locale.toUpperCase()})`,
    slugField: "title",
    path: `src/content/faqs/${locale}/*/`,
    format: { data: "json" },
    schema: {
      title: fields.slug({ name: { label: "Titel" } }),
      faqs: fields.array(
        fields.object({
          question: fields.text({ label: "Vraag", validation: { isRequired: true } }),
          answer: fields.text({
            label: "Antwoord",
            multiline: true,
            validation: { isRequired: true },
          }),
        }),
        { label: "FAQ items", itemLabel: (props) => props.fields.question.value || "FAQ item" },
      ),
      mappingKey: fields.text({ label: "Mapping Key" }),
    },
  });

/**
 * * Labels singleton
 * Editable UI labels per locale
 */
const Labels = (locale: (typeof locales)[number]) =>
  singleton({
    label: `Labels (${locale.toUpperCase()})`,
    path: `src/content/labels/${locale}`,
    format: { data: "json" },
    schema: {
      contactButtonText: fields.text({ label: "Contact knop tekst" }),
      contactButtonTextShort: fields.text({ label: "Contact knop tekst (kort)" }),
      getQuoteButtonText: fields.text({ label: "Offerte knop tekst" }),
      getQuoteButtonTextShort: fields.text({ label: "Offerte knop tekst (kort)" }),
      backToAllPosts: fields.text({ label: "Terug naar alle posts" }),
      updated: fields.text({ label: "Bijgewerkt" }),
      about: fields.text({ label: "Over" }),
      readMore: fields.text({ label: "Lees meer" }),
      contactInformation: fields.text({ label: "Contactgegevens" }),
    },
  });

/**
 * * Company Info singleton
 * Editable company information per locale
 */
const CompanyInfo = (locale: (typeof locales)[number]) =>
  singleton({
    label: `Bedrijfsinfo (${locale.toUpperCase()})`,
    path: `src/content/companyInfo/${locale}`,
    format: { data: "json" },
    schema: {
      name: fields.text({ label: "Bedrijfsnaam" }),
      title: fields.text({ label: "SEO Titel" }),
      description: fields.text({ label: "SEO Beschrijving", multiline: true }),
      baseUrl: fields.url({ label: "Basis URL" }),
      street: fields.text({ label: "Straat" }),
      city: fields.text({ label: "Stad" }),
      zipCode: fields.text({ label: "Postcode" }),
      province: fields.text({ label: "Provincie" }),
      country: fields.text({ label: "Land" }),
      phone: fields.text({ label: "Telefoon" }),
      email: fields.text({ label: "E-mail" }),
      facebookUrl: fields.url({ label: "Facebook URL" }),
      instagramUrl: fields.url({ label: "Instagram URL" }),
      linkedinUrl: fields.url({ label: "LinkedIn URL" }),
      author: fields.relationship({
        label: "Auteur",
        collection: "authors",
      }),
    },
  });

export default {
  Blog,
  Authors,
  Services,
  DeliveryAreas,
  OtherPages,
  CompanyInfo,
  Labels,
  Faqs,
};
