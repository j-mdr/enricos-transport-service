import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

interface Props {
  value: PortableTextBlock[];
}

export default function RichTextBlock({ value }: Props) {
  if (!value?.length) return null;
  return <PortableText value={value} />;
}
