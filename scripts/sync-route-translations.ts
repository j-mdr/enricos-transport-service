// scripts/sync-route-translations.ts
// Usage: pnpm sync-routes
//
// Scans src/pages/ (NL only) + src/data/ content entries and regenerates
// src/config/routeTranslations.ts, then formats it with Prettier.
//
// Key convention:
//   Static pages         → snake_case of NL slug       (e.g. "over_ons")
//   Wildcard collections → snake_case of NL folder + * (e.g. "diensten*")
//   Content entries      → snake_case of NL path       (e.g. "diensten_regulier_transport")
//
// EN pairing for content entries:
//   1. Match by `mappingKey` field in frontmatter (cross-locale pairs)
//   2. Same-slug fallback (NL slug exists in EN locale dir)
//   3. Preserve existing EN value by key from the current file
//   4. Warn and emit "" if none of the above work

import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname, basename, extname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PAGES_DIR = join(ROOT, "src", "pages");
const DATA_DIR = join(ROOT, "src", "data");
const OUTPUT_FILE = join(ROOT, "src", "config", "routeTranslations.ts");
const COLLECTION_TRANS_FILE = join(ROOT, "src", "config", "collectionTranslations.ts");

const SKIP_FILES = new Set(["404.astro", "[...page].astro", "rss.xml.ts", "index.astro"]);
const SKIP_DIRS = new Set(["en", "examples"]);

// ── types ─────────────────────────────────────────────────────────────────────

interface RouteEntry {
  key: string;
  nlValue: string;
  isCollection: boolean;
  nlFolder: string | null;
}

interface ContentEntry {
  key: string;
  nlValue: string;
  enValue: string;
}

interface Section {
  comment: string;
  entries: ContentEntry[];
}

type PageEntry = { key: string; nlValue: string; enValue: string };
type CollMap = Record<string, Record<string, string>>;

// ── helpers ───────────────────────────────────────────────────────────────────

/** Convert a kebab/path string to snake_case key, preserving trailing *. */
function toSnakeKey(s: string): string {
  const hasStar = s.endsWith("*");
  const base = hasStar ? s.slice(0, -1) : s;
  return (hasStar ? base.replace(/[-/]/g, "_") + "*" : base.replace(/[-/]/g, "_"));
}

/** Extract the mappingKey value from MDX/MD frontmatter. */
function readMappingKey(filePath: string): string | undefined {
  try {
    const content = readFileSync(filePath, "utf-8");
    const fm = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!fm) return undefined;
    const m = fm[1].match(/^mappingKey:\s*(.+)$/m);
    return m ? m[1].trim().replace(/^["']|["']$/g, "") : undefined;
  } catch {
    return undefined;
  }
}

/** Wrap key in quotes if it contains non-identifier characters (e.g. "*"). */
function fmtKey(k: string): string {
  return /[^a-zA-Z0-9_$]/.test(k) ? `"${k}"` : k;
}

/** Build aligned `key: value,` lines for one locale, with section comment headers. */
function buildLocaleBlock(
  locale: "nl" | "en",
  resolvedPageEntries: PageEntry[],
  sections: Section[],
): string {
  const val = (e: PageEntry | ContentEntry) => (locale === "nl" ? e.nlValue : e.enValue);

  const allKeys = [
    ...resolvedPageEntries.map((e) => e.key),
    ...sections.flatMap((s) => s.entries.map((e) => e.key)),
  ];
  const maxKeyLen = Math.max(...allKeys.map((k) => fmtKey(k).length));

  const line = (e: PageEntry | ContentEntry) =>
    `    ${fmtKey(e.key).padEnd(maxKeyLen)}: ${JSON.stringify(val(e))},`;

  const lines: string[] = [];

  lines.push("    /**** pages ****/");
  for (const e of resolvedPageEntries) lines.push(line(e));

  for (const section of sections) {
    lines.push(`    /**** ${section.comment} ****/`);
    for (const e of section.entries) lines.push(line(e));
  }

  return lines.join("\n");
}

// ── Step 1: scan NL pages ─────────────────────────────────────────────────────

function scanNlPages(pagesDir: string): RouteEntry[] {
  const entries: RouteEntry[] = [];

  for (const item of readdirSync(pagesDir, { withFileTypes: true })) {
    if (item.isDirectory()) {
      if (SKIP_DIRS.has(item.name)) continue;

      const folderName = item.name;
      const folderKey = toSnakeKey(folderName);
      const subItems = readdirSync(join(pagesDir, folderName), { withFileTypes: true });
      const hasIndex = subItems.some((f) => f.isFile() && f.name === "index.astro");
      const hasDynamic = subItems.some((f) => f.isFile() && f.name.startsWith("["));

      if (hasIndex) {
        entries.push({ key: folderKey, nlValue: folderName, isCollection: false, nlFolder: null });
      }
      if (hasDynamic) {
        entries.push({
          key: folderKey + "*",
          nlValue: folderName + "/*",
          isCollection: true,
          nlFolder: folderName,
        });
      }
    } else if (item.isFile()) {
      const fname = item.name;
      if (SKIP_FILES.has(fname) || fname.startsWith("[")) continue;
      const ext = extname(fname);
      if (ext !== ".astro" && ext !== ".ts") continue;
      const slug = basename(fname, ext);
      entries.push({ key: toSnakeKey(slug), nlValue: slug, isCollection: false, nlFolder: null });
    }
  }

  return entries;
}

// ── Step 2: scan content entries ──────────────────────────────────────────────

function scanDataCollection(
  collFolder: string,
  nlBase: string,
  enBase: string,
  existingEn: Record<string, string>,
): ContentEntry[] {
  const nlDir = join(DATA_DIR, collFolder, "nl");
  const enDir = join(DATA_DIR, collFolder, "en");
  if (!existsSync(nlDir)) return [];

  const nlEntries = new Map<string, string | undefined>();
  for (const item of readdirSync(nlDir, { withFileTypes: true })) {
    if (!item.isDirectory()) continue;
    const indexFile = join(nlDir, item.name, "index.mdx");
    nlEntries.set(item.name, existsSync(indexFile) ? readMappingKey(indexFile) : undefined);
  }

  const enByMappingKey = new Map<string, string>();
  const enSlugs = new Set<string>();
  if (existsSync(enDir)) {
    for (const item of readdirSync(enDir, { withFileTypes: true })) {
      if (!item.isDirectory()) continue;
      const indexFile = join(enDir, item.name, "index.mdx");
      const mk = existsSync(indexFile) ? readMappingKey(indexFile) : undefined;
      enSlugs.add(item.name);
      if (mk) enByMappingKey.set(mk, item.name);
    }
  }

  const results: ContentEntry[] = [];

  for (const [nlSlug, mappingKey] of nlEntries) {
    const nlPath = nlBase ? `${nlBase}/${nlSlug}` : nlSlug;
    const key = toSnakeKey(nlPath);

    let enSlug: string | undefined;
    if (mappingKey && enByMappingKey.has(mappingKey)) {
      enSlug = enByMappingKey.get(mappingKey);
    } else if (enSlugs.has(nlSlug)) {
      enSlug = nlSlug;
    }

    const enValue =
      enSlug !== undefined
        ? enBase ? `${enBase}/${enSlug}` : enSlug
        : (existingEn[key] ?? "");

    results.push({ key, nlValue: nlPath, enValue });
  }

  return results;
}

// ── main ──────────────────────────────────────────────────────────────────────

async function main() {
  const collModule = await import(pathToFileURL(COLLECTION_TRANS_FILE).href);
  const collTrans = collModule.collectionTranslations as CollMap;

  let existingEn: Record<string, string> = {};
  try {
    const rtModule = await import(`${pathToFileURL(OUTPUT_FILE).href}?bust=${Date.now()}`);
    existingEn = { ...(rtModule.routeTranslations?.["en"] ?? {}) };
  } catch {
    console.warn("⚠  Could not load existing routeTranslations.ts — EN values may be empty");
  }

  // 1. Static/wildcard page routes
  const resolvedPageEntries: PageEntry[] = scanNlPages(PAGES_DIR).map((entry) => {
    let enValue = "";

    if (entry.isCollection && entry.nlFolder) {
      const match = Object.values(collTrans).find((m) => m["nl"] === entry.nlFolder);
      if (match) {
        enValue = match["en"] + "/*";
      } else {
        const baseKey = entry.key.slice(0, -1);
        const existing = existingEn[baseKey] ?? existingEn[entry.key] ?? "";
        enValue = existing && !existing.endsWith("/*") ? existing + "/*" : existing;
      }
    } else {
      const match = Object.values(collTrans).find((m) => m["nl"] === entry.nlValue);
      enValue = match
        ? match["en"]
        : (existingEn[entry.key] ?? "").replace(/\/\*$/, "");
    }

    return { key: entry.key, nlValue: entry.nlValue, enValue };
  });

  // 2. Content entries grouped by section
  const sections: Section[] = [];
  for (const [folder, mapping] of Object.entries(collTrans)) {
    const entries = scanDataCollection(folder, mapping["nl"], mapping["en"], existingEn);
    if (entries.length) sections.push({ comment: folder, entries });
  }
  const otherEntries = scanDataCollection("otherPages", "", "", existingEn);
  if (otherEntries.length) sections.push({ comment: "other pages", entries: otherEntries });

  // 3. Warnings
  const allNewKeys = new Set([
    ...resolvedPageEntries.map((e) => e.key),
    ...sections.flatMap((s) => s.entries.map((e) => e.key)),
  ]);

  for (const key of Object.keys(existingEn)) {
    if (!allNewKeys.has(key)) {
      console.warn(`⚠  Removed route "${key}" (no longer found in pages or data)`);
    }
  }
  for (const e of [...resolvedPageEntries, ...sections.flatMap((s) => s.entries)]) {
    if (e.enValue === "") {
      console.warn(`⚠  Route "${e.key}" has no EN path — set it manually in routeTranslations.ts`);
    }
  }

  // 4. Write file
  const output = `// AUTO-GENERATED — run \`pnpm sync-routes\` to update
// EN paths for content entries with different NL/EN slugs (e.g. service pages)
// must be set manually after adding new content.

const _routes = {
  nl: {
${buildLocaleBlock("nl", resolvedPageEntries, sections)}
  },
  en: {
${buildLocaleBlock("en", resolvedPageEntries, sections)}
  },
} as const;
`;

  writeFileSync(OUTPUT_FILE, output, "utf-8");
  execSync(`pnpm exec prettier --write "${OUTPUT_FILE}"`, { cwd: ROOT, stdio: "inherit" });
  console.log(`✓ Written src/config/routeTranslations.ts`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
