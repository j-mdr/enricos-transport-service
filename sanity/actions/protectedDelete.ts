import type { DocumentActionComponent, DocumentActionProps } from "sanity";

export function createProtectedDeleteAction(originalAction: DocumentActionComponent): DocumentActionComponent {
  return function ProtectedDeleteAction(props: DocumentActionProps) {
    const doc = props.draft ?? props.published;
    if (doc?.protected) return null;
    return originalAction(props);
  };
}
