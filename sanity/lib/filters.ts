export const langFilter = (({ document }: { document: { language?: string } }) =>
  document.language
    ? { filter: "language == $lang", params: { lang: document.language } }
    : {}) as any;
