import sharp from "sharp";
import { existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const RAW_DIR = join(ROOT, "src/assets/images/raw");
const OUT_DIR = join(ROOT, "src/assets/images");

const CROPS = [
  { ratio: "4x3", width: 1600, height: 1200 },
  { ratio: "3x4", width: 900, height: 1200 },
  { ratio: "1x1", width: 1200, height: 1200 },
  { ratio: "16x9", width: 1920, height: 1080 },
];

const MAPPING = [
  {
    raw: "WhatsApp Image 2026-03-03 at 09.20.37.jpeg",
    seo: "bestelbus-achteraanzicht-zonsondergang-rivier",
  },
  {
    raw: "WhatsApp Image 2026-03-03 at 09.20.37 (1).jpeg",
    seo: "bestelbus-voorkant-zonsopgang-mistig-landschap",
  },
  {
    raw: "WhatsApp Image 2026-03-03 at 09.20.37 (2).jpeg",
    seo: "bestelbus-achteraanzicht-bospad-herfst",
  },
  {
    raw: "WhatsApp Image 2026-03-03 at 09.20.37 (3).jpeg",
    seo: "bestelbus-geparkeerd-attractiepark",
  },
  {
    raw: "WhatsApp Image 2026-03-03 at 09.20.38.jpeg",
    seo: "bestelbus-achterkant-hotel-apeldoorn",
  },
  {
    raw: "WhatsApp Image 2026-03-03 at 09.20.38 (1).jpeg",
    seo: "bestelbus-voor-verlichte-villa-avond",
  },
  {
    raw: "WhatsApp Image 2026-03-03 at 09.20.38 (2).jpeg",
    seo: "bestelbus-rijdend-polderweggetje-ochtendmist",
  },
  {
    raw: "WhatsApp Image 2026-03-03 at 09.20.38 (3).jpeg",
    seo: "bestelbus-close-up-voorkant-dijkweg-ochtendmist",
  },
  {
    raw: "WhatsApp Image 2026-03-03 at 09.20.38 (4).jpeg",
    seo: "bestelbus-stadscentrum-den-haag-kurhaus",
  },
  {
    raw: "WhatsApp Image 2026-03-03 at 09.20.38 (5).jpeg",
    seo: "bestelbus-laaddock-distributiecentrum-technische-unie",
  },
  {
    raw: "WhatsApp Image 2026-03-03 at 09.20.38 (6).jpeg",
    seo: "bestelbus-magazijn-laden-groene-kratten",
  },
  {
    raw: "WhatsApp Image 2026-03-03 at 09.20.38 (7).jpeg",
    seo: "fruitkist-bananen-sinaasappels-voor-bestelbus",
  },
  {
    raw: "WhatsApp Image 2026-03-03 at 09.20.38 (8).jpeg",
    seo: "bestelbus-achteraanzicht-polderweg-ochtendnevel",
  },
  {
    raw: "WhatsApp Image 2026-03-03 at 09.20.38 (9).jpeg",
    seo: "chauffeur-duimen-omhoog-roc-nijmegen",
  },
  {
    raw: "WhatsApp Image 2026-03-03 at 09.20.38 (10).jpeg",
    seo: "bestelbus-zijkant-plaatsnaambord-feanwalden",
  },
];

if (!existsSync(OUT_DIR)) {
  mkdirSync(OUT_DIR, { recursive: true });
}

let total = 0;
let errors = 0;

for (const { raw, seo } of MAPPING) {
  const input = join(RAW_DIR, raw);
  const ext = raw.split(".").pop();

  if (!existsSync(input)) {
    console.error(`MISSING: ${raw}`);
    errors++;
    continue;
  }

  for (const { ratio, width, height } of CROPS) {
    const outFile = `enricos-transportservice-${seo}-${ratio}.${ext}`;
    const output = join(OUT_DIR, outFile);

    try {
      await sharp(input)
        .resize(width, height, { fit: "cover", position: "attention" })
        .jpeg({ quality: 100 })
        .toFile(output);

      console.log(`OK  ${outFile}`);
      total++;
    } catch (err) {
      console.error(`ERR ${outFile}: ${err.message}`);
      errors++;
    }
  }
}

console.log(`\nDone: ${total} files written, ${errors} errors.`);
