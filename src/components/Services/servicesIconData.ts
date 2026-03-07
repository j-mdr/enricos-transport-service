import {
  type LocalizedData,
  type ServicesIconSectionData,
} from "@config/configDataTypes.ts";

export const servicesIconData: LocalizedData<ServicesIconSectionData> = {
  nl: {
    title: "Wat wij voor u{highlight} kunnen betekenen",
    services: [
      {
        icon: "tabler/truck",
        ctaButton: { href: "/diensten/regulier-transport", text: "Lees meer" },
        title: "Reguliere transport",
        description: `Een betrouwbare levering staat of valt met timing en zorgvuldigheid.`,
      },
      {
        icon: "tabler/calendar-plus",
        ctaButton: { href: "/diensten/incidenteel-transport", text: "Lees meer" },
        title: "Incidenteel transport",
        description: `Niet elke transportbehoefte past binnen een vaste planning.`,
      },
      {
        icon: "tabler/truck-delivery",
        ctaButton: { href: "/diensten/groot-transport", text: "Lees meer" },
        title: "Groot transport",
        description: `Het vervoeren van grote, zware of volumineuze ladingen vraagt om een goede planning vooraf.`,
      },
      {
        icon: "tabler/urgent",
        ctaButton: { href: "/diensten/spoed-transport", text: "Lees meer" },
        title: "Spoedtransport",
        description: `Wanneer tijd cruciaal is, bieden wij de oplossing met spoedtransport.`,
      },
      {
        icon: "tabler/checklist",
        ctaButton: { href: "/diensten/documenten-transport", text: "Lees meer" },
        title: "Documententransport",
        description: `Bij ons staat de veiligheid en vertrouwelijkheid van uw documenten voorop. `,
      },
      {
        icon: "tabler/sofa",
        ctaButton: { href: "/diensten/meubel-transport", text: "Lees meer" },
        title: "Meubeltransport",
        description: `Meubels vervoeren vraagt om aandacht, zorg en een nauwkeurige aanpak.`,
      },
    ],
  },
  en: {
    title: "Our strengths{highlight}",
    services: [
      {
        icon: "tabler/truck",
        ctaButton: { href: "/en/services/regular-transport", text: "Read more" },
        title: "Regular transport",
        description: `A reliable delivery is all about timing and care.`,
      },
      {
        icon: "tabler/calendar-plus",
        ctaButton: { href: "/en/services/occasional-transport", text: "Read more" },
        title: "Occasional transport",
        description: `Not every transport need fits within a fixed schedule.`,
      },
      {
        icon: "tabler/truck-delivery",
        ctaButton: { href: "/en/services/large-transport", text: "Read more" },
        title: "Large transport",
        description: `Transporting large, heavy, or bulky loads requires good planning.`,
      },
      {
        icon: "tabler/urgent",
        ctaButton: { href: "/en/services/urgent-transport", text: "Read more" },
        title: "Urgent transport",
        description: `When time is crucial, Enrico's Transportservice offers the solution with professional urgent transport.`,
      },
      {
        icon: "tabler/checklist",
        ctaButton: { href: "/en/services/document-transport", text: "Read more" },
        title: "Document transport",
        description: `At Enrico's Transportservice, the safety and confidentiality of your documents are paramount.`,
      },
      {
        icon: "tabler/sofa",
        ctaButton: { href: "/en/services/furniture-transport", text: "Read more" },
        title: "Furniture transport",
        description: `Transporting furniture requires attention, care, and a precise approach.`,
      },
    ],
  },
};
