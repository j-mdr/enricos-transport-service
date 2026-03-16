interface GeneralProps {
  type: "general";
  siteTitle?: string;
}

export interface BlogProps {
  type: "blog";
  title: string;
  description: string;
  pubDate: string;
  ogImageUrl?: string;
  authors: { name?: string | null; url?: string | null }[];
  canonicalUrl: URL;
}

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqProps {
  type: "faq";
  items: FaqItem[];
}

export type JsonLDProps = BlogProps | GeneralProps | FaqProps;

export default function jsonLDGenerator(props: JsonLDProps) {
  const { type } = props;
  if (type === "blog") {
    const { title, description, pubDate, ogImageUrl, authors, canonicalUrl } = props as BlogProps;

    const authorsJsonLdArray = authors.map((author) => {
      return {
        "@type": "Person",
        name: author?.name,
        url: author?.url,
      };
    });

    let authorsJsonLd:
      | Record<string, string | null | undefined>
      | Record<string, string | null | undefined>[];

    if (authorsJsonLdArray.length === 1) {
      authorsJsonLd = authorsJsonLdArray[0];
    } else {
      authorsJsonLd = authorsJsonLdArray;
    }

    return `<script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Blogposting",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "${canonicalUrl}"
        },
        "headline": "${title}",
        "description": "${description}",
        ${ogImageUrl ? `"image": "${ogImageUrl}",` : ""}
        "author": ${JSON.stringify(authorsJsonLd)},
        "datePublished": "${pubDate}"
      }
    </script>`;
  }
  if (type === "faq") {
    const { items } = props as FaqProps;
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    };
    return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
  }

  return `<script type="application/ld+json">
      {
      "@context": "https://schema.org/",
      "@type": "WebSite",
      "name": "${(props as GeneralProps).siteTitle ?? ""}",
      "url": "${import.meta.env.SITE}"
      }
    </script>`;
}
