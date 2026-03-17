import { defineConfig, envField } from "astro/config";
import { loadEnv } from "vite";
import { locales, defaultLocale } from "./src/config/localeConfig";

const env = loadEnv(process.env.NODE_ENV, process.cwd(), "");

import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import compress from "@playform/compress";
import AutoImport from "astro-auto-import";
import react from "@astrojs/react";
import sanity from "@sanity/astro";
import icon from "astro-icon";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: env.PUBLIC_SITE_URL,
  adapter: cloudflare(),
  env: {
    schema: {
      PUBLIC_TURNSTILE_SITE_KEY: envField.string({
        context: "client",
        access: "public",
        optional: false,
      }),
      TURNSTILE_SECRET_KEY: envField.string({
        context: "server",
        access: "secret",
        optional: false,
      }),
      STATICFORMS_ACCESS_KEY: envField.string({
        context: "server",
        access: "secret",
        optional: false,
      }),
      PUBLIC_GA_MEASUREMENT_ID: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
    },
  },
  trailingSlash: "always",
  // i18n configuration must match src/config/localeConfig.ts
  i18n: {
    defaultLocale,
    locales: [...locales],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  markdown: {
    shikiConfig: {
      // Shiki Themes: https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: "dracula",
      wrap: true,
    },
  },
  integrations: [
    // example auto import component into mdx files
    AutoImport({
      imports: [
        // https://github.com/delucis/astro-auto-import
        "@components/Admonition/Admonition.astro",
      ],
    }),
    mdx(),
    react(),
    icon(),
    sanity({
      projectId: env.PUBLIC_SANITY_PROJECT_ID,
      dataset: env.PUBLIC_SANITY_DATASET ?? "production",
      studioBasePath: "/studio",
      useCdn: true,
    }),
    sitemap({
      filter: (page) =>
        !page.includes(`${env.PUBLIC_SITE_URL}componenten-voorbeeld/`),
    }),
    compress({
      HTML: true,
      JavaScript: true,
      CSS: false, // enabling this can cause issues
      Image: false, // astro:assets handles this. Enabling this can dramatically increase build times
      SVG: false, // astro-icon handles this
    }),
  ],
  output: "static",
  vite: {
    plugins: [tailwindcss()],
    // Inline PUBLIC_SANITY_* in SSR bundles (Vite does not replace import.meta.env in SSR by default)
    define: {
      "import.meta.env.PUBLIC_SANITY_PROJECT_ID": JSON.stringify(
        env.PUBLIC_SANITY_PROJECT_ID,
      ),
      "import.meta.env.PUBLIC_SANITY_DATASET": JSON.stringify(
        env.PUBLIC_SANITY_DATASET ?? "production",
      ),
    },
    // stop inlining short scripts to fix issues with ClientRouter
    build: {
      assetsInlineLimit: 0,
    },
    optimizeDeps: {
      include: ["sanity", "@sanity/ui", "history"],
      exclude: ["refractor"],
    },
    ssr: {
      noExternal: ["@sanity/astro"],
    },
  },
});
