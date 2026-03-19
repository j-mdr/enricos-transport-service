import type { ComponentType } from "react";
import type { StructureResolver } from "sanity/structure";
import {
  BlockElementIcon,
  CogIcon,
  ComponentIcon,
  DocumentIcon,
  DocumentsIcon,
  EditIcon,
  EnvelopeIcon,
  ImagesIcon,
  OlistIcon,
  SparklesIcon,
  StarIcon,
  TagIcon,
  ThListIcon,
  EarthGlobeIcon,
  UserIcon,
  UsersIcon,
} from "@sanity/icons";

// Document types die per taal bestaan (via @sanity/document-internationalization)
const pageTypes = [
  {
    type: "blogPost",
    titleNL: "Blog",
    titleEN: "Blog",
    orderField: "slug.current",
    icon: EditIcon,
  },
  {
    type: "deliveryArea",
    titleNL: "Bezorggebieden",
    titleEN: "Delivery areas",
    orderField: "slug.current",
    icon: EarthGlobeIcon,
  },
  { type: "category", titleNL: "Categorieën", titleEN: "Categories", icon: TagIcon },
  {
    type: "service",
    titleNL: "Diensten",
    titleEN: "Services",
    orderField: "slug.current",
    icon: ThListIcon,
  },
  {
    type: "page",
    titleNL: "Pagina's",
    titleEN: "Pages",
    orderField: "slug.current",
    icon: DocumentsIcon,
  },
];

const otherTypes = [
  { type: "person", titleNL: "Personen", titleEN: "Persons", orderField: "name", icon: UserIcon },
];

const sectionTypes = [
  { type: "faqAccordions", titleNL: "FAQ accordeons", titleEN: "FAQ accordions", icon: OlistIcon },
  { type: "faqCards", titleNL: "FAQ kaarten", titleEN: "FAQ cards", icon: OlistIcon },
  { type: "ctaBgImage", titleNL: "CTA achtergrond", titleEN: "CTA background", icon: SparklesIcon },
  {
    type: "ctaCardCenter",
    titleNL: "CTA kaart center",
    titleEN: "CTA card center",
    icon: SparklesIcon,
  },
  {
    type: "ctaCardCenter2",
    titleNL: "CTA kaart center 2",
    titleEN: "CTA card center 2",
    icon: SparklesIcon,
  },
  { type: "ctaCards", titleNL: "CTA kaarten", titleEN: "CTA cards", icon: SparklesIcon },
  {
    type: "featureCardsSmall",
    titleNL: "Feature kaarten klein",
    titleEN: "Feature cards small",
    icon: BlockElementIcon,
  },
  {
    type: "featureLightboxMarquee",
    titleNL: "Feature lightbox",
    titleEN: "Feature lightbox",
    icon: ImagesIcon,
  },
  {
    type: "featureGalleryMarquee",
    titleNL: "Feature gallerij",
    titleEN: "Feature gallery",
    icon: ImagesIcon,
  },
  {
    type: "featureSideImage",
    titleNL: "Feature zijafbeelding",
    titleEN: "Feature side image",
    icon: BlockElementIcon,
  },
  {
    type: "featureToggleImage",
    titleNL: "Feature toggle",
    titleEN: "Feature toggle",
    icon: BlockElementIcon,
  },
  { type: "servicesIcon", titleNL: "Diensten iconen", titleEN: "Services icons", icon: ThListIcon },
  {
    type: "servicesSideImage",
    titleNL: "Diensten zijafbeelding",
    titleEN: "Services side image",
    icon: ThListIcon,
  },
  { type: "awardsSection", titleNL: "Awards", titleEN: "Awards", icon: StarIcon },
  { type: "teamMemberCards", titleNL: "Team", titleEN: "Team", icon: UsersIcon },
  {
    type: "testimonialsColumns",
    titleNL: "Reviews kolommen",
    titleEN: "Testimonials columns",
    icon: ThListIcon,
  },
  {
    type: "testimonialsSwiper",
    titleNL: "Reviews swiper",
    titleEN: "Testimonials swiper",
    icon: ThListIcon,
  },
  {
    type: "contactSection",
    titleNL: "Contactsectie",
    titleEN: "Contact section",
    icon: EnvelopeIcon,
  },
];

function docList(
  S: Parameters<StructureResolver>[0],
  type: string,
  title: string,
  lang: string,
  orderField = "title",
  icon?: ComponentType,
) {
  const item = S.listItem().title(title).schemaType(type);
  const itemWithIcon = icon ? item.icon(icon) : item;
  return itemWithIcon.child(
    S.documentList()
      .title(title)
      .schemaType(type)
      .filter(`_type == $type && language == $lang`)
      .params({ type, lang })
      .defaultOrdering([{ field: orderField, direction: "asc" }]),
  );
}

function settingsItem(S: Parameters<StructureResolver>[0], lang: "nl" | "en") {
  const isNL = lang === "nl";
  return S.listItem()
    .title(isNL ? "Instellingen" : "Settings")
    .icon(CogIcon)
    .id(`settings-${lang}`)
    .child(S.document().schemaType("settings").documentId(`settings-${lang}`));
}

function langGroup(S: Parameters<StructureResolver>[0], lang: "nl" | "en") {
  const isNL = lang === "nl";
  return S.listItem()
    .title(isNL ? "🇳🇱 Nederlands" : "🇬🇧 English")
    .icon(EarthGlobeIcon)
    .child(
      S.list()
        .title(isNL ? "Nederlands" : "English")
        .items([
          ...pageTypes.map(({ type, titleNL, titleEN, orderField, icon }) =>
            docList(S, type, isNL ? titleNL : titleEN, lang, orderField, icon),
          ),
          S.divider(),
          ...otherTypes.map(({ type, titleNL, titleEN, orderField, icon }) =>
            docList(S, type, isNL ? titleNL : titleEN, lang, orderField, icon),
          ),
          S.divider(),
          S.listItem()
            .title(isNL ? "Secties" : "Sections")
            .icon(ComponentIcon)
            .child(
              S.list()
                .title(isNL ? "Secties" : "Sections")
                .items(
                  sectionTypes.map(({ type, titleNL, titleEN, icon }) =>
                    docList(S, type, isNL ? titleNL : titleEN, lang, "title", icon),
                  ),
                ),
            ),
          settingsItem(S, lang),
          S.divider(),
        ]),
    );
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Inhoud")
    .items([
      langGroup(S, "nl"),
      langGroup(S, "en"),
      S.divider(),
      S.listItem()
        .title("robots.txt")
        .icon(DocumentIcon)
        .id("robots-txt")
        .child(S.document().schemaType("robotsTxt").documentId("robots-txt")),
    ]);
