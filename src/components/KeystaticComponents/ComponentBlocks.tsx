import { fields } from "@keystatic/core";
import { wrapper, block } from "@keystatic/core/content-components";

// preview components
import KeystaticAdmonition from "./KeystaticAdmonition";
import KeystaticFaqSection from "./KeystaticFaqSection";
import KeystaticHeroSection from "./KeystaticHeroSection";
import KeystaticHeroBgSection from "./KeystaticHeroBgSection";
import KeystaticHeroCenteredSection from "./KeystaticHeroCenteredSection";
import KeystaticCtaBgImageSection from "./KeystaticCtaBgImageSection";
import KeystaticCtaCardSection from "./KeystaticCtaCardSection";
import KeystaticCtaCardsSection from "./KeystaticCtaCardsSection";

const Admonition = wrapper({
  label: "Admonition",
  ContentView: (props) => (
    <KeystaticAdmonition variant={props.value.variant}>{props.children}</KeystaticAdmonition>
  ),
  schema: {
    variant: fields.select({
      label: "Variant",
      options: [
        { value: "info", label: "Info" },
        { value: "tip", label: "Tip" },
        { value: "caution", label: "Caution" },
        { value: "danger", label: "Danger" },
      ],
      defaultValue: "info",
    }),
    // This makes it so you can edit what is inside the admonition
    content: fields.child({
      kind: "block",
      formatting: { inlineMarks: "inherit", softBreaks: "inherit" },
      links: "inherit",
      editIn: "both",
      label: "Admonition Content",
      placeholder: "Enter your admonition content here",
    }),
  },
});

const FaqSection = (locale: "nl" | "en") =>
  block({
    label: "FAQ Accordeon (FaqAccordionsSection)",
    ContentView: (props) => (
      <KeystaticFaqSection faqSet={props.value.faqSet} label="FAQ Accordeon" />
    ),
    schema: {
      faqSet: fields.relationship({
        label: "FAQ Set",
        collection: locale === "nl" ? "faqsNL" : "faqsEN",
      }),
    },
  });

const FaqCardsSection = (locale: "nl" | "en") =>
  block({
    label: "FAQ Kaarten (FaqCardsSection)",
    ContentView: (props) => <KeystaticFaqSection faqSet={props.value.faqSet} label="FAQ Kaarten" />,
    schema: {
      faqSet: fields.relationship({
        label: "FAQ Set",
        collection: locale === "nl" ? "faqsNL" : "faqsEN",
      }),
    },
  });

const HeroSection = (locale: "nl" | "en") =>
  block({
    label: "Hero Sectie",
    ContentView: (props) => <KeystaticHeroSection heroSet={props.value.heroSet} />,
    schema: {
      heroSet: fields.relationship({
        label: "Hero Set",
        collection: locale === "nl" ? "heroNL" : "heroEN",
      }),
    },
  });

const HeroBgSection = (locale: "nl" | "en") =>
  block({
    label: "Hero Achtergrond Sectie",
    ContentView: (props) => <KeystaticHeroBgSection heroSet={props.value.heroSet} />,
    schema: {
      heroSet: fields.relationship({
        label: "Hero Set",
        collection: locale === "nl" ? "heroBgNL" : "heroBgEN",
      }),
    },
  });

const HeroCenteredSection = (locale: "nl" | "en") =>
  block({
    label: "Hero Gecentreerd Sectie",
    ContentView: (props) => <KeystaticHeroCenteredSection heroSet={props.value.heroSet} />,
    schema: {
      heroSet: fields.relationship({
        label: "Hero Set",
        collection: locale === "nl" ? "heroCenteredNL" : "heroCenteredEN",
      }),
    },
  });

const CtaBgImageSection = (locale: "nl" | "en") =>
  block({
    label: "CTA Achtergrond (CtaBgImageSection)",
    ContentView: (props) => (
      <KeystaticCtaBgImageSection ctaSet={props.value.ctaSet} label="CTA Achtergrond" />
    ),
    schema: {
      ctaSet: fields.relationship({
        label: "CTA Set",
        collection: locale === "nl" ? "ctaBgImageNL" : "ctaBgImageEN",
      }),
    },
  });

const CtaCardCenterSection = (locale: "nl" | "en") =>
  block({
    label: "CTA Kaart Gecentreerd (CtaCardCenterSection)",
    ContentView: (props) => (
      <KeystaticCtaCardSection ctaSet={props.value.ctaSet} label="CTA Kaart Gecentreerd" />
    ),
    schema: {
      ctaSet: fields.relationship({
        label: "CTA Set",
        collection: locale === "nl" ? "ctaCardNL" : "ctaCardEN",
      }),
    },
  });

const CtaCardCenter2Section = (locale: "nl" | "en") =>
  block({
    label: "CTA Kaart Gecentreerd v2 (CtaCardCenter2Section)",
    ContentView: (props) => (
      <KeystaticCtaCardSection ctaSet={props.value.ctaSet} label="CTA Kaart Gecentreerd v2" />
    ),
    schema: {
      ctaSet: fields.relationship({
        label: "CTA Set",
        collection: locale === "nl" ? "ctaCardNL" : "ctaCardEN",
      }),
    },
  });

const CtaCardsSection = (locale: "nl" | "en") =>
  block({
    label: "CTA Kaarten (CtaCardsSection)",
    ContentView: (props) => (
      <KeystaticCtaCardsSection ctaSet={props.value.ctaSet} label="CTA Kaarten" />
    ),
    schema: {
      ctaSet: fields.relationship({
        label: "CTA Set",
        collection: locale === "nl" ? "ctaCardsNL" : "ctaCardsEN",
      }),
    },
  });

export default {
  Admonition,
  FaqSection,
  FaqCardsSection,
  HeroSection,
  HeroBgSection,
  HeroCenteredSection,
  CtaBgImageSection,
  CtaCardCenterSection,
  CtaCardCenter2Section,
  CtaCardsSection,
};
