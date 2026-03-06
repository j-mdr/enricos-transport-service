import {
  type LocalizedData,
  type ServicesSideImageSectionData,
} from "../translations/configDataTypes.ts";
import refulierTransportImage from "@images/enricos-transportservice-bestelbus-achteraanzicht-zonsondergang-rivier-1x1.jpeg";
import incidenteelTransportImage from "@images/enricos-transportservice-bestelbus-laaddock-distributiecentrum-technische-unie-1x1.jpeg";
import grootTransportImage from "@images/enricos-transportservice-bestelbus-laaddock-distributiecentrum-technische-unie-1x1.jpeg";
import spoedTransportImage from "@images/enricos-transportservice-bestelbus-achteraanzicht-bospad-herfst-1x1.jpeg";
import documentenTransportImage from "@images/enricos-transportservice-bestelbus-zijkant-plaatsnaambord-feanwalden-1x1.jpeg";
import meubelTransport from "@images/enricos-transportservice-bestelbus-geparkeerd-attractiepark-1x1.jpeg";
import { ROUTES } from "@config/constants.ts";

const READ_MORE_TEXT = {
  nl: "Lees meer",
  en: "Read more",
};

export const servicesSideImageSectionData: LocalizedData<ServicesSideImageSectionData> = {
  nl: {
    title: "Wat wij voor u{highlight} kunnen betekenen",
    services: [
      {
        image: {
          src: refulierTransportImage,
          alt: "een afbeelding",
        },
        ctaButton: {
          href: ROUTES.nl.regulierTransport,
          text: "Lees meer",
        },
        title: "Reguliere transport",
        description: `Een betrouwbare levering staat of valt met timing en zorgvuldigheid. Bij Enrico’s Transportservice zorgen wij ervoor dat uw goederen exact op het afgesproken moment en in uitstekende staat worden afgeleverd. Dankzij onze doordachte planning en persoonlijke werkwijze weet u altijd waar u aan toe bent.`,
      },
      {
        image: {
          src: incidenteelTransportImage,
          alt: "een afbeelding",
        },
        ctaButton: {
          href: ROUTES.nl.incidenteelTransport,

          text: READ_MORE_TEXT.nl,
        },
        title: "Incidenteel transport",
        description: `Niet elke transportbehoefte past binnen een vaste planning. Soms is er juist behoefte aan een eenmalige levering, een spoedtransport of het snel vervoeren van een pallet of essentiële materialen. In zulke situaties biedt Enrico’s Transportservice een snelle en betrouwbare oplossing voor incidenteel transport.`,
      },
      {
        image: {
          src: grootTransportImage,
          alt: "een afbeelding",
        },
        ctaButton: {
          href: ROUTES.nl.grootTransport,
          text: READ_MORE_TEXT.nl,
        },
        title: "Groot transport",
        description: `Het vervoeren van grote, zware of volumineuze ladingen vraagt om een goede planning vooraf`,
      },
      {
        image: {
          src: spoedTransportImage,
          alt: "een afbeelding",
        },
        ctaButton: {
          href: ROUTES.nl.spoedTransport,
          text: READ_MORE_TEXT.nl,
        },
        title: "Spoedtransport",
        description: `Wanneer tijd cruciaal is, biedt Enrico’s Transportservice de oplossing met professioneel spoedtransport. Of het nu gaat om een vergeten levering, een dringende order of een zending die dezelfde dag nog moet worden afgeleverd, wij zorgen dat uw goederen direct en veilig op de juiste plek terechtkomen.`,
      },
      {
        image: {
          src: documentenTransportImage,
          alt: "een afbeelding",
        },
        ctaButton: {
          href: ROUTES.nl.documentenTransport,
          text: READ_MORE_TEXT.nl,
        },
        title: "Documententransport",
        description: `Bij Enrico’s Transportservice staat de veiligheid en vertrouwelijkheid van uw documenten voorop. Of het nu gaat om juridische dossiers, contracten of andere gevoelige informatie, wij zorgen dat uw documenten snel, veilig en zonder tussenstops bij de juiste ontvanger aankomen.`,
      },
      {
        image: {
          src: meubelTransport,
          alt: "een afbeelding",
        },
        ctaButton: {
          href: ROUTES.nl.meubelTransport,

          text: READ_MORE_TEXT.nl,
        },
        title: "Meubeltransport",
        description: `Meubels vervoeren vraagt om aandacht, zorg en een nauwkeurige aanpak. Enrico’s Transportservice is gespecialiseerd in meubelbezorging waarbij kwaliteit en betrouwbaarheid centraal staan. Wij zorgen ervoor dat elk meubelstuk veilig, netjes en volgens afspraak wordt afgeleverd.`,
      },
    ],
  },
  en: {
    title: "What we can do for you{highlight}",
    services: [
      {
        image: {
          src: refulierTransportImage,
          alt: "een afbeelding",
        },
        ctaButton: {
          href: ROUTES.en.regulierTransport,
          text: READ_MORE_TEXT.en,
        },
        title: "Regular transport",
        description: `A reliable delivery is all about timing and care. At Enrico’s Transportservice, we ensure that your goods are delivered at the agreed time and in excellent condition. Thanks to our thoughtful planning and personal approach, you always know what to expect.`,
      },
      {
        image: {
          src: incidenteelTransportImage,
          alt: "een afbeelding",
        },
        ctaButton: {
          href: ROUTES.en.incidenteelTransport,
          text: READ_MORE_TEXT.en,
        },
        title: "Occasional transport",
        description: `Not every transport need fits within a fixed schedule. Sometimes there is a need for a one-time delivery, an urgent transport, or the quick transportation of a pallet or essential materials. In such situations, Enrico’s Transportservice offers a fast and reliable solution for occasional transport.`,
      },
      {
        image: {
          src: grootTransportImage,
          alt: "een afbeelding",
        },
        ctaButton: {
          href: ROUTES.en.grootTransport,
          text: READ_MORE_TEXT.en,
        },
        title: "Large transport",
        description: `Transporting large, heavy, or bulky loads requires craftsmanship, planning, and equipment you can rely on. Enrico’s Transportservice specializes in large transport for companies that do not want to take risks with their goods.`,
      },
      {
        image: {
          src: spoedTransportImage,
          alt: "een afbeelding",
        },
        ctaButton: {
          href: ROUTES.en.spoedTransport,
          text: READ_MORE_TEXT.en,
        },
        title: "Urgent transport",
        description: `When time is crucial, Enrico’s Transportservice offers the solution with professional urgent transport. Whether it’s a forgotten delivery, an urgent order, or a shipment that needs to be delivered the same day, we ensure that your goods reach the right place immediately and safely.`,
      },
      {
        image: {
          src: documentenTransportImage,
          alt: "een afbeelding",
        },
        ctaButton: {
          href: ROUTES.en.documentenTransport,
          text: READ_MORE_TEXT.en,
        },
        title: "Document transport",
        description: `At Enrico’s Transportservice, the safety and confidentiality of your documents are paramount. Whether it’s legal files, contracts, or other sensitive information, we ensure that your documents arrive quickly, safely, and without stops at the right recipient.`,
      },
      {
        image: {
          src: meubelTransport,
          alt: "een afbeelding",
        },
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
