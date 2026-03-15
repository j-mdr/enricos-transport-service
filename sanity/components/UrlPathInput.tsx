import { useEffect } from "react";
import { useFormValue, set, type StringInputProps } from "sanity";
import { TextInput, Stack } from "@sanity/ui";
import { getLocaleDefinition } from "../../src/config/localeConfig";

export function UrlPathInput(props: StringInputProps) {
  const slug = useFormValue(["slug", "current"]) as string | undefined;
  const language = useFormValue(["language"]) as string | undefined;

  useEffect(() => {
    if (!slug) return;
    const { localeSlug } = getLocaleDefinition(language);
    const computed = localeSlug ? `/${localeSlug}/${slug}` : `/${slug}`;
    if (computed !== props.value) {
      props.onChange(set(computed));
    }
  }, [slug, language]);

  return (
    <Stack space={2}>
      <TextInput value={props.value ?? ""} readOnly />
    </Stack>
  );
}
