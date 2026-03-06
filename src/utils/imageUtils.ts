import type { ImageType } from "@config/translations/configDataTypes.ts";

export function createMarqueeRows(images: ImageType[]) {
  const rotate = (arr: ImageType[], offset: number) => [
    ...arr.slice(offset),
    ...arr.slice(0, offset),
  ];
  return {
    top: { images },
    middle: { images: rotate(images, Math.floor(images.length / 3)) },
    bottom: { images: [...images].reverse() },
  };
}
