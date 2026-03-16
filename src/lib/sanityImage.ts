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
    url?: string | null; // pre-built URL (fallback)
    metadata?: {
      dimensions?: {
        width?: number | null;
        height?: number | null;
      } | null;
    } | null;
  } | null;
  alt?: string | null;
  hotspot?: { x?: number; y?: number } | null;
  crop?: { top?: number; bottom?: number; left?: number; right?: number } | null;
}

export function urlFor(source: SanityImageObject) {
  return builder.image(source);
}

/** Builds a 1200×630 WebP URL suitable for og:image meta tags. Returns undefined when no asset is present. */
export function buildOgImageUrl(image: SanityImageObject | null | undefined): string | undefined {
  if (!image?.asset) return undefined;
  return urlFor(image).width(1200).height(630).fit("crop").format("webp").url();
}
