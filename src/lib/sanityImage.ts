import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "@lib/sanityClient";

export const ASPECT_RATIOS = {
  vierkant: 1,
  landschap: 16 / 9,
  klassiek: 4 / 3,
  portret: 3 / 4,
} as const;

export type AspectRatio = keyof typeof ASPECT_RATIOS;

const builder = imageUrlBuilder(sanityClient);

export interface SanityImageObject {
  asset?: {
    _ref?: string; // unresolved reference
    _id?: string; // resolved reference
    url?: string; // pre-built URL (fallback)
  } | null;
  alt?: string | null;
  hotspot?: { x: number; y: number } | null;
  crop?: { top: number; bottom: number; left: number; right: number } | null;
}

export function urlFor(source: SanityImageObject) {
  return builder.image(source);
}

export function urlForStr(
  source: SanityImageObject | null | undefined,
  options: { width?: number; height?: number; quality?: number; format?: string } = {},
): string | null {
  if (!source?.asset) return null;

  // Fallback: pre-built URL with no transformations
  if (!source.asset._ref && !source.asset._id && source.asset.url) {
    return source.asset.url;
  }

  let img = urlFor(source).auto("format");

  if (options.width) img = img.width(options.width);
  if (options.height) img = img.height(options.height);
  if (options.quality) img = img.quality(options.quality);
  if (options.format) img = img.format(options.format as any);

  return img.url();
}
