/**
 * * Data file configuration for the i18n system
 * Every {Data} key must exist in the below object
 */
import { companyInfoTranslations } from "@config/translations/companyInfoTranslations.ts";
import { navData } from "@config/data/navData.json.ts";
import { footerData } from "@config/data/footerData.ts";
import { faqSectionData } from "@config/data/faqSectionData.json.ts";
import { teamMemberCardsSectionData } from "@config/data/teamMemberCardsSectionData.ts";
import { testimonialSwiperSectionData } from "@config/data/testimonialSwiperSectionData.json.ts";
import { heroSideImageSectionData } from "@config/data/heroSideImageSectionData.json.ts";
import { servicesSideImageSectionData } from "@config/data/servicesSideImageSectionData.json.ts";
import { ctaCardCenterSectionData } from "@config/data/ctaCardCenterSectionData.json.ts";
import { featureCardSmallSectionJson } from "@config/data/featureCardSmallSection.json.ts";
import { servicesIconSectionData } from "@config/data/servicesIconSectionData.json.ts";
import { featureLightboxMarqueeSectionData } from "@config/data/featureLightboxMarqueeSectionData.ts";

export const dataTranslations = {
  nl: {
    siteData: companyInfoTranslations.nl,
    navData: navData.nl,
    footerData: footerData.nl,
    faqSectionData: faqSectionData.nl,
    teamMemberCardsSectionData: teamMemberCardsSectionData.nl,
    testimonialSwiperSectionData: testimonialSwiperSectionData.nl,
    heroSideImageSectionData: heroSideImageSectionData.nl,
    servicesSideImageSectionData: servicesSideImageSectionData.nl,
    servicesIconSectionData: servicesIconSectionData.nl,
    ctaCardCenterSectionData: ctaCardCenterSectionData.nl,
    featureCardSmallSectionJson: featureCardSmallSectionJson.nl,
    featureLightboxMarqueeSectionData: featureLightboxMarqueeSectionData.nl,
  },
  en: {
    siteData: companyInfoTranslations.en,
    navData: navData.en,
    footerData: footerData.en,
    faqSectionData: faqSectionData.en,
    teamMemberCardsSectionData: teamMemberCardsSectionData.en,
    testimonialSwiperSectionData: testimonialSwiperSectionData.en,
    heroSideImageSectionData: heroSideImageSectionData.en,
    servicesSideImageSectionData: servicesSideImageSectionData.en,
    servicesIconSectionData: servicesIconSectionData.en,
    ctaCardCenterSectionData: ctaCardCenterSectionData.en,
    featureCardSmallSectionJson: featureCardSmallSectionJson.en,
    featureLightboxMarqueeSectionData: featureLightboxMarqueeSectionData.en,
  },
} as const;
