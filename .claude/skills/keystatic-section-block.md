# Skill: Keystatic JSON collection + Section component als MDX block

## Wanneer gebruiken

Wanneer je een herbruikbaar section component wilt dat:

- Zijn data uit een Keystatic-beheerde JSON collection haalt
- Inline in MDX content geplaatst kan worden (als block component)
- Op meerdere pagina's gebruikt kan worden via een `slug`/set-prop

Voorbeelden: FAQ sectie, hero sectie, testimonials sectie, pricing tabel, team sectie.

## Het patroon (6 stappen)

### Stap 1 — Keystatic collection definitie

**`src/components/KeystaticComponents/Collections.tsx`** — collection toevoegen vóór de export:

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
      // Voor afbeeldingen:
      image: fields.image({
        label: "Afbeelding",
        publicPath: "../",
        validation: { isRequired: true },
      }),
      mappingKey: fields.text({ label: "Mapping Key" }),
    },
  });

export default { ...bestaande, MySection };
```

MDX components toevoegen in elke bestaande `fields.mdx()` blok in Collections.tsx:

```typescript
components: {
  // ...bestaande
  MySectionBlock: ComponentBlocks.MySectionBlock(locale),
},
```

**`keystatic.config.tsx`**:

```typescript
collections: {
  mySectionNL: Collections.MySection("nl"),
  mySectionEN: Collections.MySection("en"),
}
ui.navigation: {
  "Content sets": ["faqsNL", "faqsEN", "mySectionNL", "mySectionEN"],
}
```

### Stap 2 — Astro content collection

**`src/content.config.ts`**:

```typescript
const mySectionCollection = defineCollection({
  loader: glob({ pattern: "**/index.json", base: "./src/content/mySection" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // ... zelfde velden als Keystatic schema
      image: image(), // alleen als het schema een image heeft
      mappingKey: z.string().optional(),
    }),
});

export const collections = { ...bestaande, mySection: mySectionCollection };
```

> **Let op:** Gebruik `schema: ({ image }) => z.object({...})` alleen als er een `image()` veld in het schema zit. Anders gebruik je `schema: z.object({...})` zonder destructuring.

### Stap 3 — Content JSON bestanden + afbeeldingen aanmaken

```
src/content/mySection/
  nl/
    home/
      index.json
      image.jpeg      ← alleen als het schema een image heeft
  en/
    home/
      index.json
      image.jpeg
```

`index.json` formaat:

```json
{
  "title": "Mijn sectie titel",
  "image": "image.jpeg",
  "mappingKey": "my-section-home"
}
```

> **Image pad:** Gebruik `"image.jpeg"` (relatief t.o.v. de index.json) voor handmatig aangemaakte entries.
> Keystatic CMS slaat afbeeldingen op als `"../home/image.jpeg"` (o.b.v. `publicPath: "../"`). Beide paden werken.

### Stap 4 — Astro section component

```astro
---
import { getCollection } from "astro:content";
import { getLocaleFromUrl } from "@/utils/localeUtils";

interface Props {
  heroSet?: string; // naam van de prop = slug van de gewenste set
}

const { heroSet = "home" } = Astro.props;
const locale = getLocaleFromUrl(Astro.url);

const entries = await getCollection("mySection");
// Astro glob loader stripped /index automatisch uit het pad
// ID formaat: "{locale}/{slug}" — NIET "{locale}/{slug}/index"
const entry = entries.find((e) => e.id === `${locale}/${heroSet}`);
if (!entry) return; // ← KRITIEK: altijd guard, anders throw

const { title, image, ...rest } = entry.data;
---

<section>
  <!-- render met title, image, en rest -->
</section>
```

> **Prop naam:** De prop naam (bijv. `heroSet`) moet exact overeenkomen met wat `fields.relationship()` doorgeeft in zowel de preview component als de Astro component.

### Stap 5 — Keystatic CMS preview component + block registreren

**`src/components/KeystaticComponents/KeystaticMySectionBlock.tsx`** (preview in editor):

```tsx
export default function KeystaticMySectionBlock({ mySet }: { mySet: string | null }) {
  return (
    <div style={{ border: "2px dashed #ccc", padding: "1rem", borderRadius: "8px" }}>
      <strong>My Section</strong>
      {mySet ? <p>Set: {mySet}</p> : <p style={{ color: "#999" }}>Geen set geselecteerd</p>}
    </div>
  );
}
```

**`src/components/KeystaticComponents/ComponentBlocks.tsx`** — block toevoegen:

```typescript
import KeystaticMySectionBlock from "./KeystaticMySectionBlock";

const MySectionBlock = (locale: "nl" | "en") =>
  block({
    label: "My Section",
    ContentView: (props) => <KeystaticMySectionBlock mySet={props.value.mySet} />,
    schema: {
      mySet: fields.relationship({
        label: "Set",
        collection: locale === "nl" ? "mySectionNL" : "mySectionEN",
      }),
    },
  });

export default { ...bestaande, MySectionBlock };
```

### Stap 6 — MDX page route bestanden updaten

**Alle 8 pagina route bestanden** moeten bijgewerkt worden:

- `src/pages/[...page].astro`
- `src/pages/en/[...page].astro`
- `src/pages/blog/[...slug].astro`
- `src/pages/en/blog/[...slug].astro`
- `src/pages/diensten/[...slug].astro`
- `src/pages/en/services/[...slug].astro`
- `src/pages/bezorggebieden/[...slug].astro`
- `src/pages/en/delivery-areas/[...slug].astro`

In elk bestand: import toevoegen + component registreren in `<Content components={{}}/>`

```astro
import MySectionComponent from "@components/MySection/MySectionComponent.astro";

<Content
  components={{
    a: ExternalLink,
    FaqSection: FaqAccordionsSection,
    MySectionBlock: MySectionComponent, // ← naam moet matchen met block label key
  }}
/>
```

> **Kritiek:** Stap 6 wordt snel vergeten maar is VERPLICHT. Zonder deze stap rendert het block niet op de front-end, ook al werkt Keystatic CMS correct.

---

## Kritieke gotcha's samengevat

| Punt                 | Detail                                                                             |
| -------------------- | ---------------------------------------------------------------------------------- |
| Astro glob loader ID | `"{locale}/{slug}"` — NIET `"{locale}/{slug}/index"`                               |
| Guard na find()      | `if (!entry) return;` is verplicht                                                 |
| Image pad in JSON    | `"image.jpeg"` voor handmatig; Keystatic gebruikt `"../home/image.jpeg"`           |
| Image schema         | `schema: ({ image }) => z.object({...})` alleen met image velden                   |
| Stap 6 vergeten      | Alle 8 page route bestanden moeten component registreren                           |
| Component naam       | Moet exact overeenkomen tussen block label, ComponentBlocks key, en components map |

## Directe (niet-MDX) gebruik

Voor gebruik direct in Astro pagina's zonder MDX:

```astro
<MySectionComponent heroSet="mijn-slug" />
```

De default prop zorgt dat `<MySectionComponent />` (zonder prop) altijd `"home"` gebruikt.
