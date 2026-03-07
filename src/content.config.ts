import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";

// Type-check frontmatter using a schema
const blogCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*{md,mdx}", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      // reference the authors collection https://docs.astro.build/en/guides/content-collections/#defining-collection-references
      authors: z.array(reference("authors")),
      // Transform string to Date object
      pubDate: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      updatedDate: z
        .string()
        .or(z.date())
        .optional()
        .transform((str) => (str ? new Date(str) : undefined)),
      heroImage: image(),
      categories: z.array(z.string()),
      // mappingKey allows you to match entries across languages for SEO purposes
      mappingKey: z.string().optional(),
      // blog posts will be excluded from build if draft is "true"
      draft: z.boolean().optional(),
    }),
});

// authors
const authorsCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*{md,mdx}", base: "./src/content/authors" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      avatar: image(),
      about: z.string(),
      email: z.string(),
      authorLink: z.string(), // author page link. Could be a personal website, github, twitter, whatever you want
    }),
});

// diensten
const servicesCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*{md,mdx}", base: "./src/content/services" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      image: image(),
      // mappingKey allows you to match entries across languages for SEO purposes
      mappingKey: z.string().optional(),
      template: z.enum(["ServiceLayoutCenter"]).default("ServiceLayoutCenter"),
      // services will be excluded from build if draft is "true"
      draft: z.boolean().optional(),
    }),
});

// delivery areas
const deliveryAreasCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*{md,mdx}", base: "./src/content/deliveryAreas" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      image: image(),
      // mappingKey allows you to match entries across languages for SEO purposes
      mappingKey: z.string().optional(),
      template: z.enum(["ServiceLayoutCenter"]).default("ServiceLayoutCenter"),
      // entries will be excluded from build if draft is "true"
      draft: z.boolean().optional(),
    }),
});

// other pages
const otherPagesCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*{md,mdx}", base: "./src/content/otherPages" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      // mappingKey allows you to match entries across languages for SEO purposes
      mappingKey: z.string().optional(),
      template: z.enum(["BaseLayout", "ServiceLayoutCenter"]).default("BaseLayout"),
      image: image().optional(),
      draft: z.boolean().optional(),
    }),
});

// faq sets
const faqsCollection = defineCollection({
  loader: glob({ pattern: "**/index.json", base: "./src/content/faqs" }),
  schema: z.object({
    title: z.string(),
    faqs: z.array(z.object({ question: z.string(), answer: z.string() })),
    mappingKey: z.string().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  authors: authorsCollection,
  services: servicesCollection,
  deliveryAreas: deliveryAreasCollection,
  otherPages: otherPagesCollection,
  faqs: faqsCollection,
};
