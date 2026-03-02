/**
 * * Data file configuration for the i18n system
 * Every {Data} key must exist in the below object
 */
import { siteData } from "@config/data/siteData.json.ts";
import { navData } from "@config/data/navData.json.ts";
import { faqAccordionSectionData } from "@config/data/faqAccordionSectionData.json.ts";
import { teamMemberCardsSectionData } from "@config/data/teamMemberCardsSectionData.ts";
import { testimonialSwiperSectionData } from "@config/data/testimonialSwiperSectionData.json.ts";
import { heroSideImageSectionData } from "@config/data/heroSideImageSectionData.json.ts";
import { servicesSideImageSectionData } from "@config/data/servicesSideImageSectionData.json.ts";
import { ctaCardCenterSectionData } from "@config/data/ctaCardCenterSectionData.json.ts";

export const dataTranslations = {
  nl: {
    siteData: siteData.nl,
    navData: navData.nl,
    faqAccordionSectionData: faqAccordionSectionData.nl,
    teamMemberCardsSectionData: teamMemberCardsSectionData.nl,
    testimonialSwiperSectionData: testimonialSwiperSectionData.nl,
    heroSideImageSectionData: heroSideImageSectionData.nl,
    servicesSideImageSectionData: servicesSideImageSectionData.nl,
    ctaCardCenterSectionData: ctaCardCenterSectionData.nl,
  },
  en: {
    siteData: siteData.en,
    navData: navData.en,
    faqAccordionSectionData: faqAccordionSectionData.en,
    teamMemberCardsSectionData: teamMemberCardsSectionData.en,
    testimonialSwiperSectionData: testimonialSwiperSectionData.en,
    heroSideImageSectionData: heroSideImageSectionData.en,
    servicesSideImageSectionData: servicesSideImageSectionData.en,
    ctaCardCenterSectionData: ctaCardCenterSectionData.en,
  },
} as const;
