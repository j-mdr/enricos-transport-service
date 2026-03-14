// Gedeelde GROQ fragmenten voor nav, footer en links

export const destinationFragment = `
  destination[] {
    _type,
    _type == "externalLink" => { href, openInNewTab },
    _type == "internalLink" => { reference->{ _type, slug } }
  }
`;

export const linkFragment = `{ text, ${destinationFragment} }`;

export const ctaButtonFragment = `{ variant, size, link { text, ${destinationFragment} } }`;

export const alternatePathsFragment = `
  "alternatePaths": {
    "nl": coalesce(
      "/" + *[_type == "translation.metadata" && references(^._id)][0].translations[language == "nl"][0].value->slug.current,
      "/"
    ),
    "en": coalesce(
      "/en/" + *[_type == "translation.metadata" && references(^._id)][0].translations[language == "en"][0].value->slug.current,
      "/en/"
    )
  }
`;
