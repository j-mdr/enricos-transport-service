import { defineConfig, envField } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import compress from "@playform/compress";
import AutoImport from "astro-auto-import";
import react from "@astrojs/react";
import keystatic from "@keystatic/astro";
import icon from "astro-icon";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://enricostransportservice.nl",
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
    },
  },
  redirects: {
    "/admin/": "/keystatic/",
  },
  // trailingSlash: "always",
  // i18n configuration must match src/config/translations.json.ts
  i18n: {
    defaultLocale: "nl",
    locales: ["en", "nl"],
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
    keystatic(),
    sitemap(),
    compress({
      HTML: true,
      JavaScript: true,
      CSS: false, // enabling this can cause issues
      Image: false, // astro:assets handles this. Enabling this can dramatically increase build times
      SVG: false, // astro-icon handles this
    }),
  ],
  output: "server",
  vite: {
    // resolve: {
    //   // Use react-dom/server.edge instead of react-dom/server.browser for React 19.
    //   // Without this, MessageChannel from node:worker_threads needs to be polyfilled.
    //   alias: import.meta.env.PROD && {
    //     "react-dom/server": "react-dom/server.edge",
    //   },
    // },
    plugins: [tailwindcss()],
    // stop inlining short scripts to fix issues with ClientRouter
    build: {
      assetsInlineLimit: 0,
    },
  },
});
