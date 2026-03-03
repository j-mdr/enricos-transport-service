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
        description: `Het vervoeren van grote, zware of volumineuze ladingen vraagt om vakmanschap, planning en materieel waarop u kunt vertrouwen. `,
      },
      {
        icon: "tabler/urgent",
        ctaButton: {
          href: ROUTES.nl.spoedTransport,
          text: READ_MORE_TEXT.nl,
        },
        title: "Spoedtransport",
        description: `Wanneer tijd cruciaal is, bieden wij de oplossing met professioneel spoedtransport.`,
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
    title: "What we can do for you{highlight}",
    services: [
      {
        icon: "tabler/truck",
        ctaButton: {
          href: ROUTES.en.regulierTransport,
          text: READ_MORE_TEXT.en,
        },
        title: "Regular transport",
        description: `A reliable delivery is all about timing and care. At Enrico’s Transportservice, we ensure that your goods are delivered at the agreed time and in excellent condition. Thanks to our thoughtful planning and personal approach, you always know what to expect.`,
      },
      {
        icon: "tabler/calendar-plus",
        ctaButton: {
          href: ROUTES.en.incidenteelTransport,
          text: READ_MORE_TEXT.en,
        },
        title: "Occasional transport",
        description: `Not every transport need fits within a fixed schedule. Sometimes there is a need for a one-time delivery, an urgent transport, or the quick transportation of a pallet or essential materials. In such situations, Enrico’s Transportservice offers a fast and reliable solution for occasional transport.`,
      },
      {
        icon: "tabler/truck-delivery",
        ctaButton: {
          href: ROUTES.en.grootTransport,
          text: READ_MORE_TEXT.en,
        },
        title: "Large transport",
        description: `Transporting large, heavy, or bulky loads requires craftsmanship, planning, and equipment you can rely on. Enrico’s Transportservice specializes in large transport for companies that do not want to take risks with their goods.`,
      },
      {
        icon: "tabler/urgent",
        ctaButton: {
          href: ROUTES.en.spoedTransport,
          text: READ_MORE_TEXT.en,
        },
        title: "Urgent transport",
        description: `When time is crucial, Enrico’s Transportservice offers the solution with professional urgent transport. Whether it’s a forgotten delivery, an urgent order, or a shipment that needs to be delivered the same day, we ensure that your goods reach the right place immediately and safely.`,
      },
      {
        icon: "tabler/checklist",
        ctaButton: {
          href: ROUTES.en.documentenTransport,
          text: READ_MORE_TEXT.en,
        },
        title: "Document transport",
        description: `At Enrico’s Transportservice, the safety and confidentiality of your documents are paramount. Whether it’s legal files, contracts, or other sensitive information, we ensure that your documents arrive quickly, safely, and without stops at the right recipient.`,
      },
      {
        icon: "tabler/sofa",
        ctaButton: {
          href: ROUTES.en.meubelTransport,
          text: READ_MORE_TEXT.en,
        },
        title: "Furniture transport",
        description: `Transporting furniture requires attention, care, and a precise approach. Enrico’s Transportservice specializes in furniture delivery where quality and reliability are central. We ensure that every piece of furniture is delivered safely, neatly, and according to agreement.`,
      },
    ],
  },
};
