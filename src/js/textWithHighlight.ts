type TitleSplit = {
  leadingText: string;
  highlightedWord: string;
  trailingText: string;
  hasIcon: boolean;
};

export function splitTitleWithIcon(title: string): TitleSplit {
  if (!title || typeof title !== "string") {
    return {
      leadingText: "",
      highlightedWord: "",
      trailingText: "",
      hasIcon: false,
    };
  }
  const highlightMarker = "{highlight}";

  const [beforeIcon = "", afterIcon = ""] = title.trim().split(highlightMarker);

  const words = beforeIcon.trim().split(/\s+/).filter(Boolean);

  const highlightedWord = words.pop() ?? "";
  const leadingText = words.join(" ");

  return {
    leadingText,
    highlightedWord,
    trailingText: afterIcon.trim(),
    hasIcon: title.includes(highlightMarker),
  };
}
