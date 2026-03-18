# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server at localhost:4321
pnpm build        # Build production site to ./dist/
pnpm preview      # Preview build via Cloudflare Workers (wrangler dev)
pnpm lint         # Run ESLint
pnpm format       # Run Prettier on all files
pnpm typegen      # Regenerate sanity.types.ts from schemas + GROQ queries
astro check       # TypeScript / Astro type checking
```

Deployment is to Cloudflare Workers via `wrangler.jsonc`. The custom domain is `ets.j-mdr.com`.

**IMPORTANT: After every change to ensure code quality and consistency.**

```bash
pnpm format
pnpm astro check
pnpm build
```

## Architecture

This is an **Astro 5** website for Enrico's Transportservice — a Dutch transport company. It uses TailwindCSS 4, React (for interactive islands), and deploys to Cloudflare Workers (static output, `output: "static"`). **Sanity** is the headless CMS.

All pages are prerendered at build time. `trailingSlash: "always"` is enforced — all URLs end with `/`. `SanityLink` appends a trailing slash to internal links as a fallback for existing CMS data.

### i18n

Two locales: `nl` (Dutch, default — no URL prefix) and `en` (English — `/en/` prefix). Configured in `astro.config.mjs` with `prefixDefaultLocale: false`.

Locale settings live in `src/config/siteConfig.ts` (`locales`, `defaultLocale`, `localeMap`, `languageSwitcherMap`).

Translation layers:

- **Route names** (language switcher / hreflang): `src/config/routeTranslations.ts` — maps NL slugs to EN slugs. Run `pnpm sync-routes` to auto-update.
- **Collection URL bases**: `src/config/collectionTranslations.ts` — maps collection names to per-locale base paths (e.g. `services → nl: "diensten", en: "services"`).
- **Content i18n**: Managed in Sanity via `@sanity/document-internationalization`. Each document has a `language` field (`nl` / `en`) and is linked via `translation.metadata`.

Key util functions:

- `src/utils/localeUtils.ts` — `getLocaleFromUrl(url)`, `filterCollectionByLanguage(collection, locale)`, `removeLocaleFromSlug(slug)`
- `src/utils/translationUtils.ts` — `getLocalizedRoute(locale, baseRoute, options)` — resolves translated route paths using static routeTranslations
- `src/utils/companyInfo.ts` — `getCompanyInfo(locale)` — company contact info

### CMS — Sanity

Sanity Studio is accessible at `/studio` (also `/admin/` redirects here). Config is in `sanity.config.ts` / `sanity.cli.ts`.

- **Project ID**: `PUBLIC_SANITY_PROJECT_ID` env var (CLI: `p88mnbf2`)
- **Dataset**: `PUBLIC_SANITY_DATASET` env var (default: `production`)
- **API version**: `2025-03-13`
- **CDN**: enabled (`useCdn: true`) for read performance

**Document types managed in Sanity:**

| Type        | Description                                                                                    |
| ----------- | ---------------------------------------------------------------------------------------------- |
| `page`      | Flexible pages with block builder; supports parent hierarchy for nested URLs                   |
| `blogPost`  | Blog posts with description, blocks, and SEO fields                                            |
| `category`  | Blog category taxonomy                                                                         |
| `person`    | Author / team member profiles                                                                  |
| `form`      | Form configurations with field definitions                                                     |
| `settings`  | Global settings with nav + footer (singletons `settings-nl`, `settings-en`)                    |
| `robotsTxt` | Singleton (`_id: "robots-txt"`) — custom `robots.txt` content. Falls back to default if empty. |

**Schema organization** (`sanity/schemas/`):

- `atoms/` — link, imageWithAlt, seoMeta, portableText
- `molecules/` — ctaButton, navItemDropdown, formField, faqItem, testimonialCard, featureCard variants, serviceCard variants
- `documents/` — page, blogPost, category, person, form, nav, footer
- `sections/` — 25+ block types for the page block builder (see Block Builder section)
- `singletons/` — settings (settings-nl, settings-en), robotsTxt

**GROQ queries** live in `src/lib/groq/`:

- `fragments.ts` — reusable fragments (links, CTA buttons, alternatePaths)
- `page.ts` — `getPageBySlug(slug, locale)`, `getAllPages(locale)`
- `blogPost.ts` — `getBlogPostBySlug(slug, locale)`, `getAllBlogPosts(locale)`, `getAllCategories(locale)`, `getBlogPostsByCategory(categorySlug, locale)`
- `settings.ts` — `getSettings(locale)`, `getNavFromSettings(locale)`, `getFooterFromSettings(locale)`, `getRobotsQuery` (fetches `robots.txt` content from `robotsTxt` singleton)

**Sanity client** — `src/lib/sanityClient.ts`

**TypeScript types** — `sanity.types.ts` (root, auto-generated). Run `pnpm typegen` after any schema change or new GROQ query. GROQ queries must be wrapped with `defineQuery()` from `"groq"` to get typed results. Import result types like `GetPageBySlugQueryResult` directly from `sanity.types.ts`.

### Block Builder

`page` and `blogPost` documents use a `blocks[]` array with discriminated union types for composable layouts. The block renderer is at `src/components/BlockRenderer/BlockRenderer.astro`.

Supported block types:

- **Hero**: `heroBgImage`, `heroSideImage`, `heroCentered`
- **FAQ**: `faqAccordions`, `faqCards`
- **CTA**: `ctaBgImage`, `ctaCardCenter`, `ctaCardCenter2`, `ctaCards`
- **Feature**: `featureCardsSmall`, `featureLightboxMarquee`, `featureGalleryMarquee`, `featureSideImage`, `featureToggleImage`
- **Services**: `servicesIcon`, `servicesSideImage`
- **Content**: `awardsSection`, `introSection`, `teamMemberCards`, `testimonialsColumns`, `testimonialsSwiper`
- **Contact**: `contactSection`
- **Misc**: `richText` (Portable Text via `@portabletext/react`), `headingWithImage`

### Sanity UI Components

Always use these components when rendering Sanity data — never build raw `<a>` or `<img>` tags manually for Sanity content.

#### `Icon` — `src/components/Icon/Icon.astro`

Safe wrapper around `astro-icon`. Validates that the icon exists before rendering; falls back to `tabler/circle-dashed` if not found. Use this instead of importing `Icon` from `astro-icon/components` directly, to prevent build crashes from invalid CMS icon names.

```astro
---
import Icon from "@components/Icon/Icon.astro";
---

<Icon name="tabler/phone" class="size-5" />
```

#### `SanityImage` — `src/components/SanityImage/SanityImage.astro`

Renders a Sanity image with automatic srcset generation (webp + jpeg), hotspot/crop support, and CLS prevention. SVGs are rendered as plain `<img>`, raster images as `<picture>`.

```astro
---
import SanityImage from "@components/SanityImage/SanityImage.astro";
---

<!-- Using a sizesType preset (recommended) -->
<SanityImage image={block.image} sizesType="half" loading="eager" fetchpriority="high" />

<!-- Using explicit width/height -->
<SanityImage image={block.image} width={800} height={450} quality={90} class="rounded-xl" />

<!-- Using an aspect ratio (from AspectRatio type) -->
<SanityImage image={block.image} width={640} aspectRatio="16:9" sizesType="card" />
```

**Props:**

| Prop            | Type                                           | Default             | Description                                                |
| --------------- | ---------------------------------------------- | ------------------- | ---------------------------------------------------------- |
| `image`         | `SanityImageObject \| null`                    | required            | Sanity image object from GROQ                              |
| `width`         | `number`                                       | —                   | Explicit pixel width                                       |
| `height`        | `number`                                       | —                   | Explicit pixel height (also used for aspect ratio)         |
| `aspectRatio`   | `AspectRatio`                                  | —                   | Key from `ASPECT_RATIOS` (e.g. `"16:9"`, `"4:3"`, `"1:1"`) |
| `quality`       | `number`                                       | `80`                | Image quality (1–100)                                      |
| `sizesType`     | `"background" \| "half" \| "card" \| "avatar"` | —                   | Preset for `sizes` + srcset widths                         |
| `sizes`         | `string`                                       | auto                | Custom `sizes` attribute                                   |
| `loading`       | `"lazy" \| "eager"`                            | `"lazy"`            | Loading strategy — use `"eager"` for LCP images            |
| `fetchpriority` | `"high" \| "low" \| "auto"`                    | `"high"` when eager | Fetch priority hint                                        |
| `class`         | `string`                                       | —                   | CSS classes passed to `<img>`                              |

#### `SanityLink` — `src/components/SanityLink/SanityLink.astro`

Renders a Sanity link object (which has a `destination` array with either an `externalLink` or `internalLink`). Handles `target="_blank"` and `rel="noopener noreferrer"` automatically. Appends a trailing slash to internal links to align with `trailingSlash: "always"`.

```astro
---
import SanityLink from "@components/SanityLink/SanityLink.astro";
---

<SanityLink link={item.link} class="hover:text-primary underline"> Custom label </SanityLink>

<!-- Falls back to link.text if no slot content -->
<SanityLink link={item.link} />
```

**Props:**

| Prop    | Type               | Description                                        |
| ------- | ------------------ | -------------------------------------------------- |
| `link`  | `SanityLinkObject` | Sanity link object with `text` and `destination[]` |
| `class` | `string`           | CSS classes                                        |

**Types** (exported from the component):

```typescript
SanityExternalLink; // { _type: "externalLink"; href?; openInNewTab? }
SanityInternalLink; // { _type: "internalLink"; reference?: { _type, urlPath } }
SanityLinkObject; // { text?; destination?: [SanityExternalLink | SanityInternalLink] }
```

#### `SanityCtaButton` — `src/components/SanityCtaButton/SanityCtaButton.astro`

Renders a CTA button from a Sanity `ctaButton` object. Wraps `Button.astro` with variant, size, and link resolution. Returns nothing if `ctaButton.link` is absent.

```astro
---
import SanityCtaButton from "@components/SanityCtaButton/SanityCtaButton.astro";
---

<SanityCtaButton ctaButton={block.ctaButton1} arrow="right" />
<SanityCtaButton ctaButton={block.ctaButton2} arrow="none" class="mt-4" />
```

**Props:**

| Prop        | Type                            | Description               |
| ----------- | ------------------------------- | ------------------------- |
| `ctaButton` | `SanityCtaButtonObject \| null` | Sanity CTA button object  |
| `arrow`     | `"left" \| "right" \| "none"`   | Arrow direction on button |
| `class`     | `string`                        | Additional CSS classes    |

**Type** (exported from the component):

```typescript
SanityCtaButtonObject; // { link?: SanityLinkObject; variant?: string; size?: "sm" | "md" | "lg" }
```

Variants map to `Button` variants: `default`, `primary`, `secondary`, `outline`, `ghost`.

### SEO & BaseLayout

`BaseLayout.astro` accepts a `seo` prop (Sanity `SeoMeta` object) alongside `title` and `description` fallbacks. Internally it derives `resolvedTitle`, `resolvedDescription`, and `noindex` from the `seo` object.

```astro
<BaseLayout
  title={title ?? ""}
  description={description ?? ""}
  seo={seo}
  ogImageUrl={ogImageUrl}
  alternatePaths={alternatePaths}
  blocks={page.blocks ?? undefined}
/>
```

For non-CMS pages (e.g. 404), pass `seo={{ noIndex: true }}` directly.

The `seoMeta` Sanity type has three fields: `title`, `description`, `noIndex`.

### Images

Images are served from Sanity's CDN via `src/lib/sanityImage.ts`:

- `urlFor(source)` — returns an image URL builder
- `ASPECT_RATIOS` — map of `AspectRatio` keys to numeric ratios

### Path Aliases

Defined in `tsconfig.json`:

- `@config/*` → `src/config/*`
- `@utils/*` → `src/utils/*`
- `@layouts/*` → `src/layouts/*`
- `@components/*` → `src/components/*`
- `@assets/*` → `src/assets/*`
- `@images/*` → `src/assets/images/*`
- `@videos/*` → `src/assets/videos/*`
- `@lib/*` → `src/lib/*`
- `@/*` → `src/*`

### Component Library

Page-level section components live in `src/components/` organized by feature (Hero, Cta, Feature, Services, Testimonials, Faq, Team, Awards, Contact, etc.).

### Pages & Routing

- `src/pages/index.astro` / `src/pages/en/index.astro` — homepages
- `src/pages/[...page].astro` / `src/pages/en/[...page].astro` — dynamic router for pages/services/delivery areas (fetches from Sanity)
- `src/pages/blog/[...slug].astro` / `src/pages/en/blog/[...slug].astro` — blog posts
- `src/pages/categorieen/[...slug].astro` / `src/pages/en/categories/[...slug].astro` — category pages
- `src/pages/robots.txt.ts` — serves `robots.txt` from Sanity `robotsTxt` singleton; falls back to default

**Layouts**: `BaseLayout.astro`, `BlogLayoutCenter.astro`, `ServiceLayoutCenter.astro`

### Adding / Modifying Routes

1. Add the route to `src/config/routeTranslations.ts` for both `nl` and `en`
2. Create the `.astro` page file(s) under `src/pages/` (Dutch) and `src/pages/en/` (English)
3. Update navigation in Sanity settings if the page should appear in nav

### Environment Variables

| Variable                    | Visibility  | Purpose                                        |
| --------------------------- | ----------- | ---------------------------------------------- |
| `PUBLIC_SITE_URL`           | Public      | Canonical site URL (e.g. `https://example.nl`) |
| `PUBLIC_SANITY_PROJECT_ID`  | Public      | Sanity project ID                              |
| `PUBLIC_SANITY_DATASET`     | Public      | Sanity dataset (default: `production`)         |
| `PUBLIC_TURNSTILE_SITE_KEY` | Public      | Cloudflare Turnstile public key                |
| `PUBLIC_GA_MEASUREMENT_ID`  | Public      | Google Analytics measurement ID (optional)     |
| `TURNSTILE_SECRET_KEY`      | Server-only | Cloudflare Turnstile secret                    |
| `STATICFORMS_ACCESS_KEY`    | Server-only | StaticForms API key for form submissions       |
