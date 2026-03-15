import { type CollectionEntry } from "astro:content";

interface GeneralProps {
  type: "general";
  siteTitle?: string;
}

export interface BlogProps {
  type: "blog";
  postFrontmatter: CollectionEntry<"blog">["data"];
  image: ImageMetadata; // result of getImage() from Seo.astro
  authors: CollectionEntry<"authors">[];
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
    const { postFrontmatter, image, authors, canonicalUrl } = props as BlogProps;

    const authorsJsonLdArray = authors.map((author) => {
      return {
        "@type": "Person",
        name: author.data.name,
        url: author.data.authorLink,
      };
    });

    let authorsJsonLd;

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
        "headline": "${postFrontmatter.title}",
        "description": "${postFrontmatter.description}",
        "image": "${image.src}",
        "author": ${JSON.stringify(authorsJsonLd)},
        "datePublished": "${postFrontmatter.pubDate}",
        "dateModified": "${postFrontmatter.updatedDate}"
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
