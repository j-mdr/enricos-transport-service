import { type StringInputProps, type TextAreaInputProps } from "sanity";
import { Stack, Text, Box } from "@sanity/ui";

type Props = (StringInputProps | TextAreaInputProps) & {
  max: number;
  min?: number;
};

export function createCharCountInput(max: number, min?: number) {
  return function CharCountInput(props: StringInputProps | TextAreaInputProps) {
    const value = (props.value as string) ?? "";
    const count = value.length;
    const remaining = max - count;

    let color: "default" | "caution" | "critical" = "default";
    if (count > max) color = "critical";
    else if (remaining <= 10) color = "caution";

    return (
      <Stack space={2}>
        {props.renderDefault(props)}
        <Box style={{ display: "flex", justifyContent: "flex-end" }}>
          <Text size={1} muted={color === "default"} tone={color !== "default" ? color : undefined}>
            {count}/{max} tekens{min && count < min ? ` (min. ${min})` : ""}
          </Text>
        </Box>
      </Stack>
    );
  };
}
