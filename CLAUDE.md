# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server at localhost:4321
pnpm build        # Build production site to ./dist/
pnpm preview      # Preview build via Cloudflare Workers (wrangler dev)
pnpm lint         # Run ESLint
pnpm format       # Run Prettier on all files
astro check       # TypeScript / Astro type checking
```

Deployment is to Cloudflare Workers via `wrangler.jsonc`. The custom domain is `ets.j-mdr.com`.

**IMPORTANT: After every change to ensure code quality and consistency.**

```bash
pnpm format
pnpm build
```

## Architecture

This is an **Astro 5** website for Enrico's Transportservice — a Dutch transport company. It uses TailwindCSS 4, React (for interactive islands), and deploys to Cloudflare Workers (SSR, output: "server"). **Sanity** is the headless CMS.

### i18n

Two locales: `nl` (Dutch, default — no URL prefix) and `en` (English — `/en/` prefix). Configured in `astro.config.mjs` with `prefixDefaultLocale: false`.

Locale settings live in `src/config/siteSettings.json.ts` (`locales`, `defaultLocale`, `localeMap`, `languageSwitcherMap`).

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

| Type       | Description                                                                  |
| ---------- | ---------------------------------------------------------------------------- |
| `page`     | Flexible pages with block builder; supports parent hierarchy for nested URLs |
| `blogPost` | Blog posts with Portable Text content                                        |
| `category` | Blog category taxonomy                                                       |
| `person`   | Author / team member profiles                                                |
| `form`     | Form configurations with field definitions                                   |
| `settings` | Global settings with nav + footer (singletons `settings-nl`, `settings-en`)  |

**Schema organization** (`sanity/schemas/`):

- `atoms/` — link, imageWithAlt, seoMeta, portableText
- `molecules/` — ctaButton, navItemDropdown, formField, faqItem, testimonialCard, featureCard variants, serviceCard variants
- `documents/` — page, blogPost, category, person, form, nav, footer
- `sections/` — 25+ block types for the page block builder (see Block Builder section)
- `singletons/` — settings (settings-nl, settings-en)

**GROQ queries** live in `src/lib/groq/`:

- `fragments.ts` — reusable fragments (links, CTA buttons, alternatePaths)
- `page.ts` — `getPageBySlug(slug, locale)`, `getAllPages(locale)`
- `blogPost.ts` — `getBlogPostBySlug(slug, locale)`, `getAllBlogPosts(locale)`
- `settings.ts` — `getSettings(locale)`, `getNavFromSettings(locale)`, `getFooterFromSettings(locale)`

**Sanity client** — `src/lib/sanityClient.ts`

### Block Builder

`page` documents use a `blocks[]` array with discriminated union types for composable layouts. The block renderer is at `src/components/BlockRenderer/BlockRenderer.astro`.

Supported block types:

- **Hero**: `heroBgImage`, `heroSideImage`, `heroCentered`
- **FAQ**: `faqAccordions`, `faqCards`
- **CTA**: `ctaBgImage`, `ctaCardCenter`, `ctaCardCenter2`, `ctaCards`
- **Feature**: `featureCardsSmall`, `featureLightboxMarquee`, `featureGalleryMarquee`, `featureSideImage`, `featureToggleImage`
- **Services**: `servicesIcon`, `servicesSideImage`
- **Content**: `awardsSection`, `introSection`, `teamMemberCards`, `testimonialsColumns`, `testimonialsSwiper`
- **Contact**: `contactSection`, `requestQuoteSection`, `becomePartnerSection`
- **Misc**: `richText` (Portable Text via `@portabletext/react`), `contactForm`

### Sanity UI Components

Always use these three components when rendering Sanity data — never build raw `<a>` or `<img>` tags manually for Sanity content.

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

Renders a Sanity link object (which has a `destination` array with either an `externalLink` or `internalLink`). Handles locale prefix, `target="_blank"`, and `rel="noopener noreferrer"` automatically.

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
SanityInternalLink; // { _type: "internalLink"; reference?: { _type, slug } }
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

### Images

Images are served from Sanity's CDN via `src/lib/sanityImage.ts`:

- `urlFor(source)` — returns an image URL builder
- `urlForStr(source, options)` — builds a complete URL with width/height/quality/format
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

**Layouts**: `BaseLayout.astro`, `BlogLayoutCenter.astro`, `ServiceLayoutCenter.astro`

### Adding / Modifying Routes

1. Add the route to `src/config/routeTranslations.ts` for both `nl` and `en`
2. Create the `.astro` page file(s) under `src/pages/` (Dutch) and `src/pages/en/` (English)
3. Update navigation in Sanity settings if the page should appear in nav

### Environment Variables

| Variable                    | Visibility  | Purpose                                  |
| --------------------------- | ----------- | ---------------------------------------- |
| `PUBLIC_SANITY_PROJECT_ID`  | Public      | Sanity project ID                        |
| `PUBLIC_SANITY_DATASET`     | Public      | Sanity dataset (default: `production`)   |
| `PUBLIC_TURNSTILE_SITE_KEY` | Public      | Cloudflare Turnstile public key          |
| `TURNSTILE_SECRET_KEY`      | Server-only | Cloudflare Turnstile secret              |
| `STATICFORMS_ACCESS_KEY`    | Server-only | StaticForms API key for form submissions |
