---
name: keystatic-section-block
description: Voeg een nieuw Keystatic-beheerd section component toe als selecteerbaar blok in de CMS block builder (otherPages) én als MDX insert component (blog/services/deliveryAreas). Gebruik dit wanneer je een herbruikbaar section component wilt koppelen aan een Keystatic JSON collection — volledig nieuw of als variant van een bestaande collection.
---

# Skill: Keystatic JSON collection + Section component als MDX block

## Wanneer gebruiken

Wanneer je een herbruikbaar section component wilt dat:

- Zijn data uit een Keystatic-beheerde JSON collection haalt
- Inline in MDX content geplaatst kan worden (als block component)
- In de otherPages block builder selecteerbaar is
- Op meerdere pagina's gebruikt kan worden via een `slug`/set-prop

Voorbeelden: FAQ sectie, hero sectie, testimonials sectie, pricing tabel, team sectie.

---

## Twee scenario's

### Scenario A — Volledig nieuw (nieuwe collection + nieuw component)

Gebruik dit als het component data nodig heeft uit een nieuwe, nog niet bestaande collection.

### Scenario B — Variant van een bestaande collection

Gebruik dit als je een **tweede weergave** wilt voor een bestaande collection (bijv. FAQ als accordeon én als kaarten). In dit geval sla je stap 1, 2 en 3 over — de collection en content bestanden bestaan al.

**Verschil in aanpak voor scenario B:**

- Geen nieuwe Keystatic collection nodig in `keystatic.config.tsx`
- Geen nieuwe content.config.ts collection
- Geen nieuwe content JSON bestanden
- Wél: nieuwe discriminant + select-optie in `pageBlocks` (Collections.tsx)
- Wél: nieuw blok in `ComponentBlocks.tsx`
- Wél: nieuwe branch in `BlockRenderer.astro`
- Wél: bestaande preview component uitbreiden met `label` prop i.p.v. nieuwe aanmaken
- Wél: alle page route bestanden updaten (stap 6)
- **Tip:** Hernoem ook de bestaande select-optie als je er een variante naast zet, zodat het verschil duidelijk is in de CMS UI (bijv. "FAQ Sectie" → "FAQ Accordeon (FaqAccordionsSection)")

---

## Het patroon — stap voor stap (scenario A)

### Stap 1 — Keystatic collection definitie

**`src/components/KeystaticComponents/Collections.tsx`** — collection toevoegen vóór de export, en het nieuwe MDX component toevoegen in **alle drie** de `fields.mdx()` blokken (Blog, Services, DeliveryAreas — elk apart):

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

MDX components toevoegen in **alle drie** de `fields.mdx()` blokken in Collections.tsx (Blog, Services, DeliveryAreas — elk apart):

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

Als het een block variant is (scenario B), voeg je hier alleen een nieuwe discriminant toe aan `blockSchema`:

```typescript
z.object({
  discriminant: z.literal("mySectionVariant"),
  value: z.object({ mySet: z.string().nullable().optional() }),
}),
```

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
  mySet?: string; // naam van de prop = slug van de gewenste set
}

const { mySet = "home" } = Astro.props;
const locale = getLocaleFromUrl(Astro.url);

const entries = await getCollection("mySection");
// Astro glob loader stripped /index automatisch uit het pad
// ID formaat: "{locale}/{slug}" — NIET "{locale}/{slug}/index"
const entry = entries.find((e) => e.id === `${locale}/${mySet}`);
if (!entry) return; // ← KRITIEK: altijd guard, anders throw

const { title, image, ...rest } = entry.data;
---

<section>
  <!-- render met title, image, en rest -->
</section>
```

> **Prop naam:** De prop naam (bijv. `mySet`) moet exact overeenkomen met wat `fields.relationship()` doorgeeft in zowel de preview component als de Astro component.

### Stap 5 — Keystatic CMS preview component + block registreren

**`src/components/KeystaticComponents/KeystaticMySectionBlock.tsx`** (preview in editor):

```tsx
export default function KeystaticMySectionBlock({
  mySet,
  label = "My Section",
}: {
  mySet: string | null;
  label?: string;
}) {
  return (
    <div style={{ border: "2px dashed #ccc", padding: "1rem", borderRadius: "8px" }}>
      <strong>{label}</strong>
      {mySet ? <p>Set: {mySet}</p> : <p style={{ color: "#999" }}>Geen set geselecteerd</p>}
    </div>
  );
}
```

> **`label` prop:** Voeg altijd een optionele `label` prop toe aan de preview component. Als je later een tweede variant toevoegt (scenario B), kun je dezelfde component hergebruiken met een andere label — geen nieuwe component nodig.

**`src/components/KeystaticComponents/ComponentBlocks.tsx`** — block toevoegen:

```typescript
import KeystaticMySectionBlock from "./KeystaticMySectionBlock";

const MySectionBlock = (locale: "nl" | "en") =>
  block({
    label: "My Section (MySectionComponent)", // wees specifiek: label + componentnaam
    ContentView: (props) => (
      <KeystaticMySectionBlock mySet={props.value.mySet} label="My Section" />
    ),
    schema: {
      mySet: fields.relationship({
        label: "Set",
        collection: locale === "nl" ? "mySectionNL" : "mySectionEN",
      }),
    },
  });

export default { ...bestaande, MySectionBlock };
```

> **Block label:** Gebruik een duidelijk label dat zowel de functie als de componentnaam bevat (bijv. `"FAQ Accordeon (FaqAccordionsSection)"`). Dit helpt de redacteur de juiste variant te kiezen als er meerdere zijn.

### Stap 5b — `pageBlocks` in Collections.tsx updaten (voor otherPages block builder)

Voeg de select-optie toe én de bijbehorende conditional branch:

```typescript
// In de select options:
{ value: "mySection", label: "My Section (MySectionComponent)" },

// In de conditional branches:
mySection: fields.object({
  mySet: fields.relationship({
    label: "Set",
    collection: locale === "nl" ? "mySectionNL" : "mySectionEN",
  }),
}),
```

### Stap 5c — `BlockRenderer.astro` updaten

Importeer het Astro component bovenaan en voeg een render-branch toe:

```astro
import MySectionComponent from "@components/MySection/MySectionComponent.astro";

{
  block.discriminant === "mySection" && (block.value as { mySet?: string | null })?.mySet && (
    <MySectionComponent mySet={(block.value as { mySet: string }).mySet} />
  )
}
```

### Stap 6 — MDX page route bestanden updaten

**Alle 6 MDX slug route bestanden** moeten bijgewerkt worden (otherPages gebruikt BlockRenderer — dat is al gedaan in stap 5c):

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
    MySectionBlock: MySectionComponent, // ← naam moet matchen met de ComponentBlocks key
  }}
/>
```

> **Kritiek:** Stap 6 wordt snel vergeten maar is VERPLICHT. Zonder deze stap rendert het block niet in MDX content (blog/diensten/bezorggebieden), ook al werkt Keystatic CMS en otherPages correct.

---

## Verificatie

```bash
pnpm format && pnpm build
```

- Build moet clean zijn zonder errors
- In Keystatic (`/keystatic`) moet de nieuwe optie zichtbaar zijn in de block builder van een otherPage
- In een blog/dienst/bezorggebied MDX editor moet het block beschikbaar zijn als insert component

---

## Kritieke gotcha's samengevat

| Punt                  | Detail                                                                                                                              |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Astro glob loader ID  | `"{locale}/{slug}"` — NIET `"{locale}/{slug}/index"`                                                                                |
| Guard na find()       | `if (!entry) return;` is verplicht                                                                                                  |
| Image pad in JSON     | `"image.jpeg"` voor handmatig; Keystatic gebruikt `"../home/image.jpeg"`                                                            |
| Image schema          | `schema: ({ image }) => z.object({...})` alleen met image velden                                                                    |
| Stap 6 vergeten       | Alle 6 MDX slug route bestanden moeten component registreren                                                                        |
| Component naam key    | Moet exact overeenkomen tussen ComponentBlocks key, pageBlocks discriminant, BlockRenderer branch, en `<Content components={}>` map |
| Block label duidelijk | Gebruik `"Functie (ComponentNaam)"` als er meerdere varianten zijn                                                                  |
| Preview label prop    | Voeg altijd een optionele `label` prop toe aan preview component — herbruikbaar voor varianten                                      |
| Scenario B: hernoem   | Hernoem bestaande labels als je een tweede variant toevoegt, anders is het verwarrend in de CMS UI                                  |
| Collections.tsx MDX   | Nieuw component toevoegen in **alle drie** MDX blokken (Blog, Services, DeliveryAreas) — elk apart                                  |

## Directe (niet-MDX) gebruik

Voor gebruik direct in Astro pagina's zonder MDX:

```astro
<MySectionComponent mySet="mijn-slug" />
```

De default prop zorgt dat `<MySectionComponent />` (zonder prop) altijd `"home"` gebruikt.
