import { useEditState, useFormValue } from "sanity";
import { SlugInput, type SlugInputProps } from "sanity";
import { Card, Text, Stack } from "@sanity/ui";
import { WarningOutlineIcon } from "@sanity/icons";

export function ProtectedSlugInput(props: SlugInputProps) {
  const id = useFormValue(["_id"]) as string;
  const type = useFormValue(["_type"]) as string;
  const docId = id?.replace(/^drafts\./, "");
  const { published } = useEditState(docId, type);

  return (
    <Stack space={2}>
      {published && (
        <Card padding={3} radius={2} tone="caution">
          <Text size={1} muted>
            <WarningOutlineIcon /> Deze pagina is gepubliceerd. Wijzig de slug alleen als je ook de
            URL in externe links bijwerkt.
          </Text>
        </Card>
      )}
      <SlugInput {...props} readOnly={false} />
    </Stack>
  );
}
