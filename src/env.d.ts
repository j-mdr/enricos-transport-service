/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

interface Env {
  TURNSTILE_SECRET_KEY: string;
  STATICFORMS_ACCESS_KEY: string;
}

declare namespace App {
  interface Locals extends Runtime {}
}
