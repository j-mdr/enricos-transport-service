// AUTO-GENERATED — run `pnpm sync-routes` to update
// EN paths for content entries with different NL/EN slugs (e.g. service pages)
// must be set manually after adding new content.

const _routes = {
  nl: {
    // pages
    blog: "blog",
    "blog*": "blog/*",
    categorieen: "categorieen",
    "categorieen*": "categorieen/*",
    contact: "contact",
    "diensten*": "diensten/*",
    offerte_aanvragen: "offerte-aanvragen",
    over_ons: "over-ons",
    partner_worden: "partner-worden",
    // blog
    blog_best_vscode_extensions_front_end_developers:
      "blog/best-vscode-extensions-front-end-developers",
    blog_example_one: "blog/example-one",
    blog_example_three: "blog/example-three",
    blog_example_two: "blog/example-two",
    blog_tailwind_gradient_underline: "blog/tailwind-gradient-underline",
    blog_tsconfig_paths_setup: "blog/tsconfig-paths-setup",
    blog_voorbeeld_een: "blog/voorbeeld-een",
    // services
    diensten_documenten_transport: "diensten/documenten-transport",
    diensten_groot_transport: "diensten/groot-transport",
    diensten_incidenteel_transport: "diensten/incidenteel-transport",
    diensten_meubel_transport: "diensten/meubel-transport",
    diensten_regulier_transport: "diensten/regulier-transport",
    diensten_spoed_transport: "diensten/spoed-transport",
    // other pages
    elements: "elements",
    privacy_policy: "privacy-policy",
    terms: "terms",
  },
  en: {
    // pages
    blog: "blog",
    "blog*": "blog/*",
    categorieen: "categories",
    "categorieen*": "categories/*",
    contact: "contact",
    "diensten*": "services/*",
    offerte_aanvragen: "request-quote",
    over_ons: "about-us",
    partner_worden: "become-a-partner",
    // blog
    blog_best_vscode_extensions_front_end_developers:
      "blog/best-vscode-extensions-front-end-developers",
    blog_example_one: "blog/example-one",
    blog_example_three: "blog/example-three",
    blog_example_two: "blog/example-two",
    blog_tailwind_gradient_underline: "blog/tailwind-gradient-underline",
    blog_tsconfig_paths_setup: "blog/tsconfig-paths-setup",
    blog_voorbeeld_een: "blog/example-one",
    // services
    diensten_documenten_transport: "services/document-transport",
    diensten_groot_transport: "services/large-transport",
    diensten_incidenteel_transport: "services/occasional-transport",
    diensten_meubel_transport: "services/meubel-transport",
    diensten_regulier_transport: "services/regular-transport",
    diensten_spoed_transport: "services/urgent-transport",
    // other pages
    elements: "elements",
    privacy_policy: "privacy-policy",
    terms: "terms",
  },
} as const;

export type PageRouteKey = keyof typeof _routes.nl;
export type RouteTranslations = typeof _routes;
export const routeTranslations: Record<string, Record<string, string>> = _routes;
