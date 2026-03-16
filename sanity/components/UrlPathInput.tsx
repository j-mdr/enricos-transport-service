import { useEffect } from "react";
import { useFormValue, set, type StringInputProps } from "sanity";
import { TextInput, Stack } from "@sanity/ui";
import { getLocaleDefinition, type LocaleDefinition } from "../../src/config/localeConfig";

export function createUrlPathInput(getBasePath: (def: LocaleDefinition) => string) {
  return function UrlPathInputWithBase(props: StringInputProps) {
    const slug = useFormValue(["slug", "current"]) as string | undefined;
    const language = useFormValue(["language"]) as string | undefined;

    useEffect(() => {
      if (!slug || props.readOnly) return;
      const def = getLocaleDefinition(language);
      const { localeSlug } = def;
      const basePath = getBasePath(def);
      const computed = localeSlug ? `/${localeSlug}/${basePath}/${slug}` : `/${basePath}/${slug}`;
      if (computed !== props.value) {
        props.onChange(set(computed));
      }
    }, [slug, language, props.readOnly]);

    return (
      <Stack space={2}>
        <TextInput value={props.value ?? ""} readOnly />
      </Stack>
    );
  };
}

export function UrlPathInput(props: StringInputProps) {
  const slug = useFormValue(["slug", "current"]) as string | undefined;
  const language = useFormValue(["language"]) as string | undefined;

  useEffect(() => {
    if (!slug || props.readOnly) return;
    const { localeSlug } = getLocaleDefinition(language);
    const computed = localeSlug ? `/${localeSlug}/${slug}` : `/${slug}`;
    if (computed !== props.value) {
      props.onChange(set(computed));
    }
  }, [slug, language, props.readOnly]);

  return (
    <Stack space={2}>
      <TextInput value={props.value ?? ""} readOnly />
    </Stack>
  );
}
