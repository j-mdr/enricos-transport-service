import { useState, useMemo } from "react";
import { set, unset } from "sanity";
import type { StringInputProps } from "sanity";
import { Stack, Box, TextInput, Text, Card, Grid, Button, Tooltip, useRootTheme } from "@sanity/ui";
import { TABLER_ICON_NAMES } from "../lib/tablerIconNames";

const iconUrls = import.meta.glob("/src/icons/tabler/*.svg", {
  query: "?url",
  import: "default",
  eager: true,
}) as Record<string, string>;

function getIconUrl(fullName: string): string | undefined {
  const baseName = fullName.replace("tabler/", "");
  return iconUrls[`/src/icons/tabler/${baseName}.svg`];
}

export function IconPickerInput(props: StringInputProps) {
  const [query, setQuery] = useState("");
  const current = props.value ?? "";
  const { scheme } = useRootTheme();
  const iconFilter = scheme === "dark" ? "brightness(0) invert(1)" : "brightness(0)";

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return TABLER_ICON_NAMES.slice(0, 100);
    return TABLER_ICON_NAMES.filter((n) => n.includes(q)).slice(0, 100);
  }, [query]);

  function handleSelect(name: string) {
    if (current === name) {
      props.onChange(unset());
    } else {
      props.onChange(set(name));
    }
  }

  return (
    <Stack space={3}>
      {current && (
        <Card padding={3} radius={2} border tone="primary">
          <Box style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {getIconUrl(current) && (
              <img
                src={getIconUrl(current)}
                alt={current}
                width={32}
                height={32}
                style={{ flexShrink: 0, filter: iconFilter }}
              />
            )}
            <Stack space={1} style={{ flex: 1 }}>
              <Text size={1} weight="semibold">
                Geselecteerd
              </Text>
              <Text size={1} muted>
                {current}
              </Text>
            </Stack>
            <Button
              tone="critical"
              mode="ghost"
              text="Wis"
              onClick={() => props.onChange(unset())}
            />
          </Box>
        </Card>
      )}

      <TextInput
        placeholder="Zoek icoon (bijv. truck, heart, home)..."
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
      />

      <Card border radius={2} style={{ maxHeight: "450px", overflowY: "auto" }}>
        <Grid columns={5} gap={1} padding={2}>
          {filtered.map((name) => {
            const url = getIconUrl(name);
            const isSelected = current === name;
            return (
              <Tooltip
                key={name}
                content={
                  <Box padding={2}>
                    <Text size={1}>{name.replace("tabler/", "")}</Text>
                  </Box>
                }
                placement="top"
                portal
              >
                <Card
                  as="button"
                  padding={2}
                  radius={2}
                  tone={isSelected ? "primary" : "default"}
                  border={isSelected}
                  onClick={() => handleSelect(name)}
                  style={{
                    cursor: "pointer",
                    textAlign: "center",
                    border: isSelected ? undefined : "1px solid transparent",
                  }}
                >
                  {url ? (
                    <img
                      src={url}
                      alt={name}
                      width={20}
                      height={20}
                      style={{
                        margin: "auto",
                        padding: "0 10px",
                        display: "block",
                        filter: iconFilter,
                      }}
                    />
                  ) : (
                    <Box style={{ height: "24px", margin: "0 auto 4px" }} />
                  )}
                  <Text
                    size={0}
                    muted
                    style={{
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      display: "block",
                      maxWidth: "100%",
                      marginTop: "6px",
                    }}
                  >
                    {name.replace("tabler/", "")}
                  </Text>
                </Card>
              </Tooltip>
            );
          })}
        </Grid>
        {filtered.length === 0 && (
          <Box padding={4} style={{ textAlign: "center" }}>
            <Text muted>Geen iconen gevonden voor &quot;{query}&quot;</Text>
          </Box>
        )}
      </Card>
    </Stack>
  );
}
