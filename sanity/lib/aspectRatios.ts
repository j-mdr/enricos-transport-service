export const ASPECT_RATIO_DEFS = {
  vierkant: { ratio: 1, label: "Vierkant (1:1)" },
  klassiek: { ratio: 4 / 3, label: "Klassiek (4:3)" },
  portret: { ratio: 3 / 4, label: "Portret (3:4)" },
  landschap: { ratio: 16 / 9, label: "Landschap (16:9)" },
  breed: { ratio: 21 / 9, label: "Breed (21:9)" },
  widescreen: { ratio: 16 / 10, label: "Widescreen (16:10)" },
} as const;

export type AspectRatioKey = keyof typeof ASPECT_RATIO_DEFS;
