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
import KeystaticFeatureCardsSmallSection from "./KeystaticFeatureCardsSmallSection";
import KeystaticFeatureLightboxMarqueeSection from "./KeystaticFeatureLightboxMarqueeSection";
import KeystaticFeatureSideImageSection from "./KeystaticFeatureSideImageSection";
import KeystaticFeatureToggleImageSection from "./KeystaticFeatureToggleImageSection";
import KeystaticServicesIconSection from "./KeystaticServicesIconSection";
import KeystaticServicesSideImageSection from "./KeystaticServicesSideImageSection";
import KeystaticTestimonialsSection from "./KeystaticTestimonialsSection";
import KeystaticTeamMemberCardsSection from "./KeystaticTeamMemberCardsSection";
import KeystaticIntroSection from "./KeystaticIntroSection";

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

const FeatureCardsSmallSection = (locale: "nl" | "en") =>
  block({
    label: "Feature Kaarten Klein (FeatureCardsSmallSection)",
    ContentView: (props) => (
      <KeystaticFeatureCardsSmallSection
        featureSet={props.value.featureSet}
        label="Feature Kaarten Klein"
      />
    ),
    schema: {
      featureSet: fields.relationship({
        label: "Feature Set",
        collection: locale === "nl" ? "featureCardsSmallNL" : "featureCardsSmallEN",
      }),
    },
  });

const FeatureLightboxMarqueeSection = (locale: "nl" | "en") =>
  block({
    label: "Feature Lightbox Marquee (FeatureLightboxMarqueeSection)",
    ContentView: (props) => (
      <KeystaticFeatureLightboxMarqueeSection
        featureSet={props.value.featureSet}
        label="Feature Lightbox Marquee"
      />
    ),
    schema: {
      featureSet: fields.relationship({
        label: "Feature Set",
        collection: locale === "nl" ? "featureLightboxMarqueeNL" : "featureLightboxMarqueeEN",
      }),
    },
  });

const FeatureGalleryMarqueeSection = (locale: "nl" | "en") =>
  block({
    label: "Feature Gallery Marquee (FeatureGalleryMarqueeSection)",
    ContentView: (props) => (
      <KeystaticFeatureLightboxMarqueeSection
        featureSet={props.value.featureSet}
        label="Feature Gallery Marquee"
      />
    ),
    schema: {
      featureSet: fields.relationship({
        label: "Feature Set",
        collection: locale === "nl" ? "featureLightboxMarqueeNL" : "featureLightboxMarqueeEN",
      }),
    },
  });

const FeatureSideImageSection = (locale: "nl" | "en") =>
  block({
    label: "Feature Zij-afbeelding (FeatureSideImageSection)",
    ContentView: (props) => (
      <KeystaticFeatureSideImageSection
        featureSet={props.value.featureSet}
        label="Feature Zij-afbeelding"
      />
    ),
    schema: {
      featureSet: fields.relationship({
        label: "Feature Set",
        collection: locale === "nl" ? "featureSideImageNL" : "featureSideImageEN",
      }),
    },
  });

const FeatureToggleImageSection = (locale: "nl" | "en") =>
  block({
    label: "Feature Toggle Afbeelding (FeatureToggleImageSection)",
    ContentView: (props) => (
      <KeystaticFeatureToggleImageSection
        featureSet={props.value.featureSet}
        label="Feature Toggle Afbeelding"
      />
    ),
    schema: {
      featureSet: fields.relationship({
        label: "Feature Set",
        collection: locale === "nl" ? "featureToggleImageNL" : "featureToggleImageEN",
      }),
    },
  });

const ServicesIconSection = (locale: "nl" | "en") =>
  block({
    label: "Services Icon (ServicesIconSection)",
    ContentView: (props) => (
      <KeystaticServicesIconSection servicesSet={props.value.servicesSet} label="Services Icon" />
    ),
    schema: {
      servicesSet: fields.relationship({
        label: "Services Set",
        collection: locale === "nl" ? "servicesIconNL" : "servicesIconEN",
      }),
    },
  });

const ServicesSideImageSection = (locale: "nl" | "en") =>
  block({
    label: "Services Zij-afbeelding (ServicesSideImageSection)",
    ContentView: (props) => (
      <KeystaticServicesSideImageSection
        servicesSet={props.value.servicesSet}
        label="Services Zij-afbeelding"
      />
    ),
    schema: {
      servicesSet: fields.relationship({
        label: "Services Set",
        collection: locale === "nl" ? "servicesSideImageNL" : "servicesSideImageEN",
      }),
    },
  });

const TestimonialsColumnsSection = (locale: "nl" | "en") =>
  block({
    label: "Testimonials Kolommen (TestimonialsColumnsSection)",
    ContentView: (props) => (
      <KeystaticTestimonialsSection
        testimonialsSet={props.value.testimonialsSet}
        label="Testimonials Kolommen"
      />
    ),
    schema: {
      testimonialsSet: fields.relationship({
        label: "Testimonials Set",
        collection: locale === "nl" ? "testimonialsNL" : "testimonialsEN",
      }),
    },
  });

const TestimonialsSwiperSection = (locale: "nl" | "en") =>
  block({
    label: "Testimonials Swiper (TestimonialsSwiperSection)",
    ContentView: (props) => (
      <KeystaticTestimonialsSection
        testimonialsSet={props.value.testimonialsSet}
        label="Testimonials Swiper"
      />
    ),
    schema: {
      testimonialsSet: fields.relationship({
        label: "Testimonials Set",
        collection: locale === "nl" ? "testimonialsNL" : "testimonialsEN",
      }),
    },
  });

const IntroSection = (locale: "nl" | "en") =>
  block({
    label: "Intro Sectie (IntroSection)",
    ContentView: (props) => (
      <KeystaticIntroSection introSet={props.value.introSet} label="Intro Sectie" />
    ),
    schema: {
      introSet: fields.relationship({
        label: "Intro Set",
        collection: locale === "nl" ? "introSectionNL" : "introSectionEN",
      }),
    },
  });

const TeamMemberCardsSection = (locale: "nl" | "en") =>
  block({
    label: "Team Leden Kaarten (TeamMemberCardsSection)",
    ContentView: (props) => (
      <KeystaticTeamMemberCardsSection teamSet={props.value.teamSet} label="Team Leden Kaarten" />
    ),
    schema: {
      teamSet: fields.relationship({
        label: "Team Set",
        collection: locale === "nl" ? "teamMemberCardsNL" : "teamMemberCardsEN",
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
  FeatureCardsSmallSection,
  FeatureLightboxMarqueeSection,
  FeatureGalleryMarqueeSection,
  FeatureSideImageSection,
  FeatureToggleImageSection,
  ServicesIconSection,
  ServicesSideImageSection,
  TestimonialsColumnsSection,
  TestimonialsSwiperSection,
  TeamMemberCardsSection,
  IntroSection,
};
