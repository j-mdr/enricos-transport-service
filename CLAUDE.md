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

**IMPORTANT: After everychange to ensure code quality and consistency.**

```bash
# Format the code using Prettier and then build the production site
pnpm format
pnpm build

```

## Architecture

This is an **Astro 5** website for Enrico's Transportservice — a Dutch transport company. It uses TailwindCSS 4, React (for interactive components and Keystatic CMS), and deploys to Cloudflare Workers.

### i18n

Two locales: `nl` (Dutch, default — no URL prefix) and `en` (English — `/en/` prefix). Configured in `astro.config.mjs` with `prefixDefaultLocale: false`.

**Single source of truth for all routes** is `src/config/constants.ts` → `ROUTES`. The file also holds `COMPANY_INFO` and `SOCIAL_LINKS`.

Translation layers:

- **Route names** (for language switcher / hreflang): `src/config/routeTranslations.json.ts`
- **UI strings**: `src/config/textTranslationsJson.ts` — accessed via `useTextTranslation(locale)` from `@utils/translationUtils`
- **Section/page data** (nav, hero, services, FAQs, etc.): `src/config/data/*.ts` — all exported through `src/config/data/dataTranslations.json.ts` and accessed via `getTranslatedData("key", locale)` from `@utils/translationUtils`
- **Content collection routing**: `src/config/collectionTranslationsJson.ts` — maps collection names to per-locale URL bases (e.g. `services` → `nl: "diensten"`, `en: "services"`)

Key util functions (all in `src/utils/`):

- `getLocaleFromUrl(url)` — extracts locale from `Astro.url`
- `filterCollectionByLanguage(collection, locale)` — filters content entries by locale prefix
- `getLocalizedRoute(locale, baseRoute)` — translates a route to a target locale (sync)
- `getLocalizedPathname(locale, url)` — translates the current URL to a target locale (async, used by language switcher)

### Content Collections (`src/content.config.ts`)

Four collections, all stored under `src/content/` with locale subfolders (`nl/`, `en/`):

- `blog` — MDX blog posts (requires `title`, `description`, `authors`, `pubDate`, `heroImage`, `categories`)
- `authors` — Author profiles
- `services` — Service pages
- `otherPages` — Miscellaneous content pages

Each collection entry can have an optional `mappingKey` field to link the same content across locales for hreflang/language switching.

### Path Aliases

Defined in `tsconfig.json`:

- `@config/*` → `src/config/*`
- `@utils/*` → `src/utils/*`
- `@layouts/*` → `src/layouts/*`
- `@components/*` → `src/components/*`
- `@assets/*` → `src/assets/*`
- `@/*` → `src/*`

### CMS

Keystatic CMS is integrated at `/keystatic/` (also accessible via `/admin/` redirect). Configuration is in `keystatic.config.tsx`.

### Component Library

`src/components/starwind/` contains a set of low-level UI primitives (accordion, button, card, dialog, etc.) — similar to shadcn/ui but built for Astro. Do not remove or substantially modify these unless replacing them wholesale.

Page-level section components live in `src/components/` organized by feature (Hero, Cta, Feature, Services, Testimonials, etc.).

### Adding / Modifying Routes

1. Add the route to both `nl` and `en` in `ROUTES` in `src/config/constants.ts`
2. Add corresponding entries to `src/config/routeTranslationsJson.ts`
3. Create the `.astro` page file(s) under `src/pages/` (Dutch) and `src/pages/en/` (English)
4. Update nav data in `src/config/data/navData.json.ts` if the page should appear in navigation

### Adding Translatable UI Strings

Add keys to both `nl` and `en` in `src/config/textTranslationsJson.ts`, then use `useTextTranslation(locale)(key)` in components.

### Adding Section Data

Add entries to both `nl` and `en` in the relevant file in `src/config/data/`, then register the export in `src/config/data/dataTranslationsJson.ts`.
