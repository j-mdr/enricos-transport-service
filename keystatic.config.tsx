/**
 * * This is the Keystatic configuration file. It is used to define the collections and fields that will be used in the Keystatic CMS.
 *
 * ! This works in conjunction with Astro content collections. If you update one, you must update the other.
 *
 * Access keystatic interface at /admin or /keystatic
 * This works in local mode in dev, then cloud mode in prod
 * Cloud deployment is free to sign up (up to 3 users per team)
 * Docs: https://keystatic.com/docs/cloud
 * Create a Keystatic Cloud account here: https://keystatic.cloud/
 */

import { config } from "@keystatic/core";

// components
import Collections from "@components/KeystaticComponents/Collections";

export default config({
  // works in local mode in dev, then cloud mode in prod
  storage: { kind: "github",pathPrefix: 'prod', repo: "j-mdr/enricos-transport-service" },
  // cloud deployment is free to sign up (up to 3 users per team)
  // docs: https://keystatic.com/docs/cloud
  // create a Keystatic Cloud account here: https://keystatic.cloud/
  // cloud: { project: "cosmic-themes/stellar" },
  ui: {
    brand: { name: "Enrico's transportservice" },
    navigation: {
      Auteurs: ["authors"],
      Blog: ["blogEN", "blogNL"],
      "Pagina's": [
        "deliveryAreasEN",
        "deliveryAreasNL",
        "servicesEN",
        "servicesNL",
        "otherPagesEN",
        "otherPagesNL",
      ],
      "Content sets": [
        "faqsNL",
        "faqsEN",
        "heroNL",
        "heroEN",
        "heroBgNL",
        "heroBgEN",
        "heroCenteredNL",
        "heroCenteredEN",
        "ctaBgImageNL",
        "ctaBgImageEN",
        "ctaCardNL",
        "ctaCardEN",
        "ctaCardsNL",
        "ctaCardsEN",
        "featureCardsSmallNL",
        "featureCardsSmallEN",
        "featureLightboxMarqueeNL",
        "featureLightboxMarqueeEN",
        "featureSideImageNL",
        "featureSideImageEN",
        "featureToggleImageNL",
        "featureToggleImageEN",
        "servicesIconNL",
        "servicesIconEN",
        "servicesSideImageNL",
        "servicesSideImageEN",
        "testimonialsNL",
        "testimonialsEN",
        "teamMemberCardsNL",
        "teamMemberCardsEN",
        "introSectionNL",
        "introSectionEN",
        "awardsSectionNL",
        "awardsSectionEN",
        "requestQuoteSectionNL",
        "requestQuoteSectionEN",
      ],
      "Globale instellingen": [
        "navNL",
        "navEN",
        "footerNL",
        "footerEN",
        "contactFormLabelsNL",
        "contactFormLabelsEN",
        "requestQuoteLabelsNL",
        "requestQuoteLabelsEN",
        "companyInfoNL",
        "companyInfoEN",
        "labelsNL",
        "labelsEN",
      ],
    },
  },
  singletons: {
    footerNL: Collections.Footer("nl"),
    footerEN: Collections.Footer("en"),
    contactFormLabelsNL: Collections.ContactFormLabels("nl"),
    contactFormLabelsEN: Collections.ContactFormLabels("en"),
    requestQuoteLabelsNL: Collections.RequestQuoteLabels("nl"),
    requestQuoteLabelsEN: Collections.RequestQuoteLabels("en"),
    companyInfoNL: Collections.CompanyInfo("nl"),
    companyInfoEN: Collections.CompanyInfo("en"),
    labelsNL: Collections.Labels("nl"),
    labelsEN: Collections.Labels("en"),
  },
  collections: {
    navNL: Collections.Nav("nl"),
    navEN: Collections.Nav("en"),

    blogEN: Collections.Blog("en"),
    blogNL: Collections.Blog("nl"),

    // for now there is a limitation with keystatic where relationship fields don't work well with i18n features
    // If you need multiple languages here (you might not) just create multiple variants of the same author
    // this might look like "author-1-en" and "author-1-fr"
    authors: Collections.Authors(""),

    servicesEN: Collections.Services("en"),
    servicesNL: Collections.Services("nl"),

    deliveryAreasEN: Collections.DeliveryAreas("en"),
    deliveryAreasNL: Collections.DeliveryAreas("nl"),

    otherPagesEN: Collections.OtherPages("en"),
    otherPagesNL: Collections.OtherPages("nl"),

    faqsNL: Collections.Faqs("nl"),
    faqsEN: Collections.Faqs("en"),

    heroNL: Collections.Hero("nl"),
    heroEN: Collections.Hero("en"),

    heroBgNL: Collections.HeroBg("nl"),
    heroBgEN: Collections.HeroBg("en"),

    heroCenteredNL: Collections.HeroCentered("nl"),
    heroCenteredEN: Collections.HeroCentered("en"),

    ctaBgImageNL: Collections.CtaBgImage("nl"),
    ctaBgImageEN: Collections.CtaBgImage("en"),

    ctaCardNL: Collections.CtaCard("nl"),
    ctaCardEN: Collections.CtaCard("en"),

    ctaCardsNL: Collections.CtaCards("nl"),
    ctaCardsEN: Collections.CtaCards("en"),

    featureCardsSmallNL: Collections.FeatureCardsSmall("nl"),
    featureCardsSmallEN: Collections.FeatureCardsSmall("en"),

    featureLightboxMarqueeNL: Collections.FeatureLightboxMarquee("nl"),
    featureLightboxMarqueeEN: Collections.FeatureLightboxMarquee("en"),

    featureSideImageNL: Collections.FeatureSideImage("nl"),
    featureSideImageEN: Collections.FeatureSideImage("en"),

    featureToggleImageNL: Collections.FeatureToggleImage("nl"),
    featureToggleImageEN: Collections.FeatureToggleImage("en"),

    servicesIconNL: Collections.ServicesIcon("nl"),
    servicesIconEN: Collections.ServicesIcon("en"),

    servicesSideImageNL: Collections.ServicesSideImage("nl"),
    servicesSideImageEN: Collections.ServicesSideImage("en"),

    testimonialsNL: Collections.Testimonials("nl"),
    testimonialsEN: Collections.Testimonials("en"),

    teamMemberCardsNL: Collections.TeamMemberCards("nl"),
    teamMemberCardsEN: Collections.TeamMemberCards("en"),

    introSectionNL: Collections.IntroSection("nl"),
    introSectionEN: Collections.IntroSection("en"),

    awardsSectionNL: Collections.AwardsSection("nl"),
    awardsSectionEN: Collections.AwardsSection("en"),

    requestQuoteSectionNL: Collections.RequestQuoteSectionData("nl"),
    requestQuoteSectionEN: Collections.RequestQuoteSectionData("en"),
  },
});
