import { locales, localeDefinitions } from "@/config/localeConfig.ts";

/**
 * * returns "slugified" text.
 * @param text: string - text to slugify
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase() // convert to lowercase
    .replace(/\s+/g, "-") // replace spaces with -
    .replace(/[^\w-]+/g, "") // remove all non-word chars
    .replace(/--+/g, "-") // replace multiple dashes with single dash
    .replace(/^-+/, "") // trim dash from start of text
    .replace(/-+$/, ""); // trim dash from end of text
}

// localeMap is used to map languages to their respective locales - used for formatDate function
export const localeMap = Object.fromEntries(localeDefinitions.map((l) => [l.id, l.languageCode]));

// --------------------------------------------------------
/**
 * * returns a nicely formatted string of the date passed
 * @param date string | number | Date - date to format
 * @param locale string - locale to format the date in
 * @returns string - formatted date
 */
export function formatDate(date: string | number | Date, locale: (typeof locales)[number]): string {
  let localeString = "en-US";

  if (locales.includes(locale)) {
    localeString = localeMap[locale];
  }

  return new Date(date).toLocaleDateString(localeString, {
    timeZone: "UTC",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
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
