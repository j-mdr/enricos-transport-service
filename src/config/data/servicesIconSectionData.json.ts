import { type LocalizedData, type ServicesIconSectionData } from "../configDataTypes.ts";
import image3 from "@images/paint-swatches.jpg";
import { ROUTES } from "@config/constants.ts";

const READ_MORE_TEXT = {
  nl: "Lees meer",
  en: "Read more",
};

export const servicesIconSectionData: LocalizedData<ServicesIconSectionData> = {
  nl: {
    title: "Wat wij voor u{highlight} kunnen betekenen",
    services: [
      {
        icon: "tabler/truck",
        ctaButton: {
          href: ROUTES.nl.regulierTransport,
          text: "Lees meer",
        },
        title: "Reguliere transport",
        description: `Een betrouwbare levering staat of valt met timing en zorgvuldigheid.`,
      },
      {
        icon: "tabler/calendar-plus",
        ctaButton: {
          href: ROUTES.nl.incidenteelTransport,

          text: READ_MORE_TEXT.nl,
        },
        title: "Incidenteel transport",
        description: `Niet elke transportbehoefte past binnen een vaste planning.`,
      },
      {
        icon: "tabler/truck-delivery",
        ctaButton: {
          href: ROUTES.nl.grootTransport,
          text: READ_MORE_TEXT.nl,
        },
        title: "Groot transport",
        description: `Het vervoeren van grote, zware of volumineuze ladingen vraagt om een goede planning vooraf.`,
      },
      {
        icon: "tabler/urgent",
        ctaButton: {
          href: ROUTES.nl.spoedTransport,
          text: READ_MORE_TEXT.nl,
        },
        title: "Spoedtransport",
        description: `Wanneer tijd cruciaal is, bieden wij de oplossing met spoedtransport.`,
      },
      {
        icon: "tabler/checklist",
        ctaButton: {
          href: ROUTES.nl.documentenTransport,
          text: READ_MORE_TEXT.nl,
        },
        title: "Documententransport",
        description: `Bij ons staat de veiligheid en vertrouwelijkheid van uw documenten voorop. `,
      },
      {
        icon: "tabler/sofa",
        ctaButton: {
          href: ROUTES.nl.meubelTransport,

          text: READ_MORE_TEXT.nl,
        },
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
        ctaButton: {
          href: ROUTES.en.regulierTransport,
          text: READ_MORE_TEXT.en,
        },
        title: "Regular transport",
        description: `A reliable delivery is all about timing and care.`,
      },
      {
        icon: "tabler/calendar-plus",
        ctaButton: {
          href: ROUTES.en.incidenteelTransport,
          text: READ_MORE_TEXT.en,
        },
        title: "Occasional transport",
        description: `Not every transport need fits within a fixed schedule.`,
      },
      {
        icon: "tabler/truck-delivery",
        ctaButton: {
          href: ROUTES.en.grootTransport,
          text: READ_MORE_TEXT.en,
        },
        title: "Large transport",
        description: `Transporting large, heavy, or bulky loads requires good planning.`,
      },
      {
        icon: "tabler/urgent",
        ctaButton: {
          href: ROUTES.en.spoedTransport,
          text: READ_MORE_TEXT.en,
        },
        title: "Urgent transport",
        description: `When time is crucial, Enrico’s Transportservice offers the solution with professional urgent transport.`,
      },
      {
        icon: "tabler/checklist",
        ctaButton: {
          href: ROUTES.en.documentenTransport,
          text: READ_MORE_TEXT.en,
        },
        title: "Document transport",
        description: `At Enrico’s Transportservice, the safety and confidentiality of your documents are paramount.`,
      },
      {
        icon: "tabler/sofa",
        ctaButton: {
          href: ROUTES.en.meubelTransport,
          text: READ_MORE_TEXT.en,
        },
        title: "Furniture transport",
        description: `Transporting furniture requires attention, care, and a precise approach.`,
      },
    ],
  },
};
