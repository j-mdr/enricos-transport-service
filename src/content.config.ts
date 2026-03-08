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

// Block schema for otherPages
const blockSchema = z.discriminatedUnion("discriminant", [
  z.object({
    discriminant: z.literal("heroBg"),
    value: z.object({ heroSet: z.string().nullable().optional() }),
  }),
  z.object({
    discriminant: z.literal("hero"),
    value: z.object({ heroSet: z.string().nullable().optional() }),
  }),
  z.object({
    discriminant: z.literal("heroCentered"),
    value: z.object({ heroSet: z.string().nullable().optional() }),
  }),
  z.object({
    discriminant: z.literal("faq"),
    value: z.object({ faqSet: z.string().nullable().optional() }),
  }),
  z.object({
    discriminant: z.literal("faqCards"),
    value: z.object({ faqSet: z.string().nullable().optional() }),
  }),
  z.object({
    discriminant: z.literal("ctaBgImage"),
    value: z.object({ ctaSet: z.string().nullable().optional() }),
  }),
  z.object({
    discriminant: z.literal("ctaCardCenter"),
    value: z.object({ ctaSet: z.string().nullable().optional() }),
  }),
  z.object({
    discriminant: z.literal("ctaCardCenter2"),
    value: z.object({ ctaSet: z.string().nullable().optional() }),
  }),
  z.object({
    discriminant: z.literal("ctaCards"),
    value: z.object({ ctaSet: z.string().nullable().optional() }),
  }),
  z.object({
    discriminant: z.literal("featureCardsSmall"),
    value: z.object({ featureSet: z.string().nullable().optional() }),
  }),
  z.object({
    discriminant: z.literal("featureLightboxMarquee"),
    value: z.object({ featureSet: z.string().nullable().optional() }),
  }),
  z.object({
    discriminant: z.literal("featureGalleryMarquee"),
    value: z.object({ featureSet: z.string().nullable().optional() }),
  }),
  z.object({
    discriminant: z.literal("featureSideImage"),
    value: z.object({ featureSet: z.string().nullable().optional() }),
  }),
  z.object({
    discriminant: z.literal("featureToggleImage"),
    value: z.object({ featureSet: z.string().nullable().optional() }),
  }),
  z.object({
    discriminant: z.literal("servicesIcon"),
    value: z.object({ servicesSet: z.string().nullable().optional() }),
  }),
  z.object({
    discriminant: z.literal("servicesSideImage"),
    value: z.object({ servicesSet: z.string().nullable().optional() }),
  }),
  z.object({
    discriminant: z.literal("richText"),
    value: z.any(),
  }),
]);

// other pages
const otherPagesCollection = defineCollection({
  loader: glob({ pattern: "**/index.json", base: "./src/content/otherPages" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      // mappingKey allows you to match entries across languages for SEO purposes
      mappingKey: z.string().optional(),
      template: z.enum(["BaseLayout", "ServiceLayoutCenter"]).default("BaseLayout"),
      image: image().optional(),
      draft: z.boolean().optional(),
      blocks: z.array(blockSchema).optional().default([]),
    }),
});

// hero sections
const heroCollection = defineCollection({
  loader: glob({ pattern: "**/index.json", base: "./src/content/hero" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      ctaButtonText: z.string(),
      ctaButtonHref: z.string(),
      image: image(),
      imageAlt: z.string(),
      mappingKey: z.string().optional(),
    }),
});

// hero bg sections
const heroBgCollection = defineCollection({
  loader: glob({ pattern: "**/index.json", base: "./src/content/heroBg" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      ctaButton1Text: z.string(),
      ctaButton1Href: z.string(),
      ctaButton2Text: z.string().optional(),
      ctaButton2Href: z.string().optional(),
      image: image(),
      imageAlt: z.string(),
      mappingKey: z.string().optional(),
    }),
});

// hero centered sections
const heroCenteredCollection = defineCollection({
  loader: glob({ pattern: "**/index.json", base: "./src/content/heroCentered" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    ctaButton1Text: z.string(),
    ctaButton1Href: z.string(),
    ctaButton2Text: z.string().optional(),
    ctaButton2Href: z.string().optional(),
    mappingKey: z.string().optional(),
  }),
});

// ctaBgImage sections
const ctaBgImageCollection = defineCollection({
  loader: glob({ pattern: "**/index.json", base: "./src/content/ctaBgImage" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    ctaButtonText: z.string(),
    ctaButtonHref: z.string(),
    mappingKey: z.string().optional(),
  }),
});

// ctaCard sections (shared by CtaCardCenterSection and CtaCardCenter2Section)
const ctaCardCollection = defineCollection({
  loader: glob({ pattern: "**/index.json", base: "./src/content/ctaCard" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    ctaButtonText: z.string(),
    ctaButtonHref: z.string(),
    mappingKey: z.string().optional(),
  }),
});

// ctaCards sections (for CtaCardsSection with cards array)
const ctaCardsCollection = defineCollection({
  loader: glob({ pattern: "**/index.json", base: "./src/content/ctaCards" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    ctaButtonText: z.string(),
    ctaButtonHref: z.string(),
    cards: z.array(z.object({ icon: z.string(), title: z.string(), text: z.string() })),
    mappingKey: z.string().optional(),
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

// featureCardsSmall sections
const featureCardsSmallCollection = defineCollection({
  loader: glob({ pattern: "**/index.json", base: "./src/content/featureCardsSmall" }),
  schema: z.object({
    title: z.string(),
    features: z.array(z.object({ icon: z.string(), title: z.string(), text: z.string() })),
    mappingKey: z.string().optional(),
  }),
});

// featureLightboxMarquee sections (also used by FeatureGalleryMarqueeSection)
const featureLightboxMarqueeCollection = defineCollection({
  loader: glob({ pattern: "**/index.json", base: "./src/content/featureLightboxMarquee" }),
  schema: z.object({
    title: z.string(),
    images: z.array(z.object({ image: z.string().nullable().optional(), alt: z.string() })),
    mappingKey: z.string().optional(),
  }),
});

// featureSideImage sections
const featureSideImageCollection = defineCollection({
  loader: glob({ pattern: "**/index.json", base: "./src/content/featureSideImage" }),
  schema: ({ image }) =>
    z.object({
      sectionTitle: z.string(),
      items: z.array(
        z.object({
          image: image().optional(),
          imageAlt: z.string().optional(),
          title: z.string(),
          checkItems: z.array(z.string()),
          href: z.string().optional(),
        }),
      ),
      mappingKey: z.string().optional(),
    }),
});

// featureToggleImage sections
const featureToggleImageCollection = defineCollection({
  loader: glob({ pattern: "**/index.json", base: "./src/content/featureToggleImage" }),
  schema: ({ image }) =>
    z.object({
      sectionTitle: z.string(),
      sections: z.array(
        z.object({
          icon: z.string().optional(),
          title: z.string(),
          image: image().optional(),
          imageAlt: z.string().optional(),
        }),
      ),
      mappingKey: z.string().optional(),
    }),
});

// servicesIcon sections
const servicesIconCollection = defineCollection({
  loader: glob({ pattern: "**/index.json", base: "./src/content/servicesIcon" }),
  schema: z.object({
    title: z.string(),
    services: z.array(
      z.object({
        icon: z.string(),
        title: z.string(),
        description: z.string(),
        ctaButtonText: z.string(),
        ctaButtonHref: z.string(),
      }),
    ),
    mappingKey: z.string().optional(),
  }),
});

// servicesSideImage sections
const servicesSideImageCollection = defineCollection({
  loader: glob({ pattern: "**/index.json", base: "./src/content/servicesSideImage" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      services: z.array(
        z.object({
          image: image().nullable().optional(),
          imageAlt: z.string(),
          title: z.string(),
          description: z.string(),
          ctaButtonText: z.string(),
          ctaButtonHref: z.string(),
        }),
      ),
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
  hero: heroCollection,
  heroBg: heroBgCollection,
  heroCentered: heroCenteredCollection,
  ctaBgImage: ctaBgImageCollection,
  ctaCard: ctaCardCollection,
  ctaCards: ctaCardsCollection,
  featureCardsSmall: featureCardsSmallCollection,
  featureLightboxMarquee: featureLightboxMarqueeCollection,
  featureSideImage: featureSideImageCollection,
  featureToggleImage: featureToggleImageCollection,
  servicesIcon: servicesIconCollection,
  servicesSideImage: servicesSideImageCollection,
};
