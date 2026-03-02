/**
 * * Data file configuration for the i18n system
 * Every {Data} key must exist in the below object
 */
import { siteData } from "@config/data/siteData.json.ts";
import { navData } from "@config/data/navData.json.ts";
import { faqSectionData } from "@config/data/faqSectionData.json.ts";
import { teamMemberCardsSectionData } from "@config/data/teamMemberCardsSectionData.ts";
import { testimonialSwiperSectionData } from "@config/data/testimonialSwiperSectionData.json.ts";
import { heroSideImageSectionData } from "@config/data/heroSideImageSectionData.json.ts";
import { servicesSideImageSectionData } from "@config/data/servicesSideImageSectionData.json.ts";
import { ctaCardCenterSectionData } from "@config/data/ctaCardCenterSectionData.json.ts";
import { featureCardSmallSectionJson } from "@config/data/featureCardSmallSection.json.ts";

export const dataTranslations = {
  nl: {
    siteData: siteData.nl,
    navData: navData.nl,
    faqSectionData: faqSectionData.nl,
    teamMemberCardsSectionData: teamMemberCardsSectionData.nl,
    testimonialSwiperSectionData: testimonialSwiperSectionData.nl,
    heroSideImageSectionData: heroSideImageSectionData.nl,
    servicesSideImageSectionData: servicesSideImageSectionData.nl,
    ctaCardCenterSectionData: ctaCardCenterSectionData.nl,
    featureCardSmallSectionJson: featureCardSmallSectionJson.nl,
  },
  en: {
    siteData: siteData.en,
    navData: navData.en,
    faqSectionData: faqSectionData.en,
    teamMemberCardsSectionData: teamMemberCardsSectionData.en,
    testimonialSwiperSectionData: testimonialSwiperSectionData.en,
    heroSideImageSectionData: heroSideImageSectionData.en,
    servicesSideImageSectionData: servicesSideImageSectionData.en,
    ctaCardCenterSectionData: ctaCardCenterSectionData.en,
    featureCardSmallSectionJson: featureCardSmallSectionJson.en,
  },
} as const;
