import { useEditState, useFormValue } from "sanity";
import { SlugInput, type SlugInputProps } from "sanity";

export function ProtectedSlugInput(props: SlugInputProps) {
  const id = useFormValue(["_id"]) as string;
  const type = useFormValue(["_type"]) as string;
  const docId = id?.replace(/^drafts\./, "");
  const { published } = useEditState(docId, type);

  return <SlugInput {...props} readOnly={Boolean(published)} />;
}
