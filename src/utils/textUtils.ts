import { localeMap, locales } from "@/config/siteSettings.json";

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

/**
 * * returns "humanized" text. runs slugify() and then replaces - with space and upper case first letter of every word, and lower case the rest
 * @param text: string - text to humanize
 */
export function humanize(text: string): string {
  const slugifiedText = slugify(text);
  return (
    slugifiedText
      .replace(/-/g, " ") // replace "-" with space
      // .toLowerCase();
      .replace(
        // upper case first letter of every word, and lower case the rest
        /\w\S*/g,
        (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase(),
      )
  );
}

// --------------------------------------------------------
/**
 * * returns "categorified" text. runs slugify() and then replaces - with space and upper cases everything
 * @param text: string - text to categorify
 * @returns string - categorified text
 */
export function categorify(text: string): string {
  const slugifiedText = slugify(text);
  return slugifiedText
    .replace(/-/g, " ") // replace "-" with space
    .toUpperCase();
}

// --------------------------------------------------------
/**
 * * returns a nicely formatted string of the date passed
 * @param date: string | number | Date - date to format
 * @param locale: string - locale to format the date in
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