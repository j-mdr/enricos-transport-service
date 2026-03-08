import { DocumentRenderer } from "@keystatic/core/renderer";

type DocumentRendererProps = Parameters<typeof DocumentRenderer>[0];

interface Props {
  document: DocumentRendererProps["document"];
}

export default function RichTextBlock({ document }: Props) {
  return <DocumentRenderer document={document} />;
}
