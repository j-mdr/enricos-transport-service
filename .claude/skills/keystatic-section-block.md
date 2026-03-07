# Skill: Keystatic JSON collection + Section component als MDX block

## Wanneer gebruiken

Wanneer je een herbruikbaar section component wilt dat:

- Zijn data uit een Keystatic-beheerde JSON collection haalt
- Inline in MDX content geplaatst kan worden (als block component)
- Op meerdere pagina's gebruikt kan worden via een `slug`/set-prop

Voorbeelden: FAQ sectie, testimonials sectie, pricing tabel, team sectie, feature sectie.

## Het patroon (5 stappen)

### Stap 1 — Keystatic collection definitie

**`src/components/KeystaticComponents/Collections.tsx`**:

```typescript
const MySection = (locale: Locale) =>
  collection({
    label: `My Section (${locale.toUpperCase()})`,
    slugField: "title",
    path: `src/content/mySection/${locale}/*/`,
    format: { data: "json" },
    schema: {
      title: fields.slug({ name: { label: "Titel" } }),
      // ... velden naar keuze
      mappingKey: fields.text({ label: "Mapping Key" }),
    },
  });

export default { ...bestaande, MySection };
```

**`keystatic.config.tsx`**:

```typescript
collections: {
  mySectionNL: Collections.MySection("nl"),
  mySectionEN: Collections.MySection("en"),
}
ui.navigation: {
  "My Section": ["mySectionNL", "mySectionEN"],
}
```

### Stap 2 — Astro content collection

**`src/content.config.ts`**:

```typescript
const mySectionCollection = defineCollection({
  loader: glob({ pattern: "**/index.json", base: "./src/content/mySection" }),
  schema: z.object({
    title: z.string(),
    // ... zelfde velden als Keystatic schema
    mappingKey: z.string().optional(),
  }),
});

export const collections = { ...bestaande, mySection: mySectionCollection };
```

### Stap 3 — Astro section component

```astro
---
import { getCollection } from "astro:content";
import { getLocaleFromUrl } from "@/utils/localeUtils";

interface Props {
  set: string; // slug van de gewenste set, bijv. "algemeen"
}

const { set } = Astro.props;
const locale = getLocaleFromUrl(Astro.url);

const entries = await getCollection("mySection");
// LET OP: Astro glob loader stripped /index automatisch
// ID formaat: "{locale}/{slug}" — NIET "{locale}/{slug}/index"
const entry = entries.find((e) => e.id === `${locale}/${set}`);
if (!entry) return;

const { title, ...rest } = entry.data;
---

<section>
  <!-- render met title en rest -->
</section>
```

### Stap 4 — Keystatic CMS preview component + block registreren

**`src/components/KeystaticComponents/KeystaticMySection.tsx`** (preview in editor):

```tsx
export default function KeystaticMySection({ set }: { set: string | null }) {
  return (
    <div style={{ border: "2px dashed #ccc", padding: "1rem", borderRadius: "8px" }}>
      <strong>My Section</strong>
      {set ? <p>Set: {set}</p> : <p style={{ color: "#999" }}>Geen set geselecteerd</p>}
    </div>
  );
}
```

**`src/components/KeystaticComponents/ComponentBlocks.tsx`** — block toevoegen:

```typescript
import { block } from "@keystatic/core/content-components";
import KeystaticMySection from "./KeystaticMySection";

const MySection = (locale: "nl" | "en") =>
  block({
    label: "My Section",
    ContentView: (props) => <KeystaticMySection set={props.value.set} />,
    schema: {
      set: fields.relationship({
        label: "Set",
        collection: locale === "nl" ? "mySectionNL" : "mySectionEN",
      }),
    },
  });

export default { ...bestaande, MySection };
```

In alle relevante `fields.mdx()` blokken in `Collections.tsx`:

```typescript
components: {
  MySection: ComponentBlocks.MySection(locale),
},
```

### Stap 5 — MDX renderers + directe gebruik

In pagina routes waar MDX gerenderd wordt:

```astro
import MySectionComponent from "@components/MySection/MySectionComponent.astro";

<Content components={{ MySection: MySectionComponent }} />
```

Directe (niet-MDX) gebruik:

```astro
<MySectionComponent set="mijn-slug" />
```

## Kritieke gotcha: Astro glob loader ID formaat

Bestand: `src/content/mySection/nl/algemeen/index.json`
→ Entry ID: **`nl/algemeen`** (NIET `nl/algemeen/index`)

Astro stripped het `/index` gedeelte automatisch uit het pad. Gebruik altijd:

```typescript
entries.find((e) => e.id === `${locale}/${set}`);
```

## JSON bestand formaat

`src/content/mySection/nl/{slug}/index.json`:

```json
{
  "title": "Titel",
  "mappingKey": "slug"
}
```
