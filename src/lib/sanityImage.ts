import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityClient } from "@lib/sanityClient";
import { ASPECT_RATIO_DEFS, type AspectRatioKey } from "../../sanity/lib/aspectRatios";

export const ASPECT_RATIOS = Object.fromEntries(
  Object.entries(ASPECT_RATIO_DEFS).map(([key, { ratio }]) => [key, ratio]),
) as { [K in AspectRatioKey]: number };

export type AspectRatio = AspectRatioKey;

const builder = createImageUrlBuilder(sanityClient);

export interface SanityImageObject {
  asset?: {
    _ref?: string; // unresolved reference
    _id?: string; // resolved reference
    url?: string; // pre-built URL (fallback)
  } | null;
  alt?: string | null;
  hotspot?: { x?: number; y?: number } | null;
  crop?: { top?: number; bottom?: number; left?: number; right?: number } | null;
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
