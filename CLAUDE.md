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
# Format the code using Prettier and then build the production site
pnpm format
pnpm build
```

## Architecture

This is an **Astro 5** website for Enrico's Transportservice — a Dutch transport company. It uses TailwindCSS 4, React (for interactive components and Keystatic CMS), and deploys to Cloudflare Workers.

### i18n

Two locales: `nl` (Dutch, default — no URL prefix) and `en` (English — `/en/` prefix). Configured in `astro.config.mjs` with `prefixDefaultLocale: false`.

Locale settings (list of locales, defaultLocale, localeMap, etc.) live in `src/config/siteSettings.json.ts`.

Translation layers:

- **Route names** (for language switcher / hreflang): `src/config/routeTranslations.ts` — EN paths for content entries with different NL/EN slugs must be set manually.
- **UI strings (labels)**: Managed via Keystatic CMS singletons (`labelsNL`, `labelsEN`) — accessed via `useLabels(locale)` from `@utils/labels.ts`
- **Company info**: Managed via Keystatic CMS singletons (`companyInfoNL`, `companyInfoEN`) — accessed via `getCompanyInfo(locale)` from `@utils/companyInfo.ts`
- **Content collection routing**: `src/config/collectionTranslations.ts` — maps collection names to per-locale URL bases (e.g. `diensten` → `nl: "diensten"`, `en: "services"`)

Key util functions:

- `src/utils/localeUtils.ts` — `getLocaleFromUrl(url)`, `filterCollectionByLanguage(collection, locale)`, `removeLocaleFromSlug(slug)`
- `src/utils/translationUtils.ts` — `useTranslation(url)` (async, returns `{ text, route }`), `getLocalizedRoute(locale, baseRoute)`, `getLocalizedPathname(locale, url)`
- `src/utils/labels.ts` — `useLabels(locale)`, `getLabels(locale)` — reads UI string labels from Keystatic
- `src/utils/companyInfo.ts` — `getCompanyInfo(locale)` — reads company info from Keystatic

The main entry point for components is `useTranslation(url)` which returns:

- `text(key)` — localized UI string label
- `route(pathname)` — localized route

### Content Collections (`src/content.config.ts`)

Five collections, all stored under `src/content/` with locale subfolders (`nl/`, `en/`):

- `blog` — MDX blog posts (requires `title`, `description`, `authors`, `pubDate`, `heroImage`, `categories`)
- `authors` — Author profiles
- `services` — Service pages
- `bezorggebieden` — Delivery area pages
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

Keystatic manages the following singletons (editable in the CMS):

- `labelsNL` / `labelsEN` — UI strings / labels per locale
- `companyInfoNL` / `companyInfoEN` — company info per locale

### Component Library

`src/components/starwind/` contains a set of low-level UI primitives (accordion, button, card, dialog, etc.) — similar to shadcn/ui but built for Astro. Do not remove or substantially modify these unless replacing them wholesale.

Page-level section components live in `src/components/` organized by feature (Hero, Cta, Feature, Services, Testimonials, etc.).

### Adding / Modifying Routes

1. Add the route to `src/config/routeTranslations.ts` for both `nl` and `en`
2. Create the `.astro` page file(s) under `src/pages/` (Dutch) and `src/pages/en/` (English)
3. Update nav labels in Keystatic if the page should appear in navigation

### Adding Translatable UI Strings

Add keys to both `labelsNL` and `labelsEN` singletons in Keystatic (or directly in `src/content/labels/nl.json` and `src/content/labels/en.json`), then use `const { text } = await useTranslation(Astro.url)` and call `text("key")` in components.

### Adding Section Data

Section/page data is managed via Keystatic CMS singletons. Add new singletons in `keystatic.config.tsx` and access them via a reader in the relevant utility file under `src/utils/`.
