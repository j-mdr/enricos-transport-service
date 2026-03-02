type TitleSplit = {
  leadingText: string;
  highlightedWord: string;
  trailingText: string;
  hasHighlightedWord: boolean;
};

export function splitTitleWithIcon(title: string): TitleSplit {
  if (!title || typeof title !== "string") {
    return {
      leadingText: "",
      highlightedWord: "",
      trailingText: "",
      hasHighlightedWord: false,
    };
  }

  const highlightMarker = "{highlight}";

  // 🚨 Als marker niet bestaat → gewoon alles als normale titel
  if (!title.includes(highlightMarker)) {
    return {
      leadingText: title.trim(),
      highlightedWord: "",
      trailingText: "",
      hasHighlightedWord: false,
    };
  }

  const [beforeMarker, afterMarker] = title.split(highlightMarker);

  const words = beforeMarker.trim().split(/\s+/);

  // Als er geen woord vóór marker staat
  if (words.length === 0) {
    return {
      leadingText: "",
      highlightedWord: "",
      trailingText: afterMarker?.trim() ?? "",
      hasHighlightedWord: false,
    };
  }

  const highlightedWord = words.pop() as string;

  return {
    leadingText: words.join(" "),
    highlightedWord,
    trailingText: afterMarker?.trim() ?? "",
    hasHighlightedWord: true,
  };
}
