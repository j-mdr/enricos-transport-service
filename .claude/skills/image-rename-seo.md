# Skill: Afbeeldingen hernoemen naar SEO-vriendelijke namen

## Wanneer gebruiken
- Bronbestanden staan in `src/assets/images/raw/` met generieke namen (bijv. WhatsApp-exports)
- Doel: kopieën met SEO-namen in `src/assets/images/`

## Naamformaat
`enricos-transportservice-[seo-beschrijving]-[aspectratio].[extensie]`

Voorbeelden van aspectratio-suffixen: `4x3`, `3x4`, `1x1`, `16x9`

## Werkwijze

1. **Maak een mapping-tabel** met huidig bestandsnaam → nieuwe SEO-naam.
2. **Let op bestandsextensie**: gebruik dezelfde extensie als het bronbestand (`.jpeg`, `.jpg`, `.png`, `.webp`, etc.). Kopieer nooit met een andere extensie.
3. **Kopieer met `cp`** (bronbestanden blijven ongewijzigd in `raw/`):

```bash
cp "src/assets/images/raw/WhatsApp Image ....jpeg" "src/assets/images/enricos-transportservice-[beschrijving]-[ratio].jpeg"
```

4. **Verificeer** het aantal gekopieerde bestanden:

```bash
ls src/assets/images/enricos-transportservice-*.jpeg | wc -l
ls src/assets/images/enricos-transportservice-*.jpeg
```

(Pas de extensie aan als het geen `.jpeg` is.)

## Belangrijk
- Gebruik altijd **dezelfde bestandsextensie** als het origineel. Controleer dit per bestand als er gemengde types (.jpeg, .png, .webp) in de `raw/` map zitten.
- Gebruik aanhalingstekens om spaties in bestandsnamen te quoten.
- Originelen in `raw/` worden nooit verwijderd of gewijzigd.

---

## Workflow 2: Smart crop naar 4 standaard webformaten (via `pnpm crop`)

Wanneer ruwe foto's in meerdere aspect-ratio's nodig zijn, gebruik dan het geautomatiseerde crop-script.

### Crop-afmetingen

| Ratio | Breedte | Hoogte |
|---|---|---|
| 4x3 | 1600px | 1200px |
| 3x4 | 900px | 1200px |
| 1x1 | 1200px | 1200px |
| 16x9 | 1920px | 1080px |

### Hoe het werkt

Het script `scripts/crop-images.mjs` gebruikt [sharp](https://sharp.pixelplumbing.com/) met de `attention`-strategie: detecteert automatisch het meest saillante onderdeel van de foto (gezichten, hoog contrast) als focuspunt voor de crop — geen handmatige focal points nodig.

Output per foto: `enricos-transportservice-[seo-naam]-[ratio].[ext]` in `src/assets/images/`.

### Uitvoeren

```bash
pnpm crop
```

### Nieuwe foto's toevoegen

1. Voeg het raw-bestand toe aan `src/assets/images/raw/`
2. Voeg een entry toe aan de `MAPPING` array in `scripts/crop-images.mjs`:
   ```js
   { raw: "BestandsNaam.jpeg", seo: "seo-vriendelijke-naam" }
   ```
3. Voer `pnpm crop` opnieuw uit.

### Verificatie

```bash
ls src/assets/images/enricos-transportservice-*.jpeg | wc -l
# 15 foto's × 4 formaten = 60 bestanden
```