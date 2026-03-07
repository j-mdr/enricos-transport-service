import { type LocalizedData, type ServicesSideImageSectionData } from "@config/configDataTypes.ts";
import refulierTransportImage from "@images/enricos-transportservice-bestelbus-achteraanzicht-zonsondergang-rivier-1x1.jpeg";
import incidenteelTransportImage from "@images/enricos-transportservice-bestelbus-laaddock-distributiecentrum-technische-unie-1x1.jpeg";
import grootTransportImage from "@images/enricos-transportservice-bestelbus-laaddock-distributiecentrum-technische-unie-1x1.jpeg";
import spoedTransportImage from "@images/enricos-transportservice-bestelbus-achteraanzicht-bospad-herfst-1x1.jpeg";
import documentenTransportImage from "@images/enricos-transportservice-bestelbus-zijkant-plaatsnaambord-feanwalden-1x1.jpeg";
import meubelTransport from "@images/enricos-transportservice-bestelbus-geparkeerd-attractiepark-1x1.jpeg";

export const servicesSideImageData: LocalizedData<ServicesSideImageSectionData> = {
  nl: {
    title: "Wat wij voor u{highlight} kunnen betekenen",
    services: [
      {
        image: { src: refulierTransportImage, alt: "een afbeelding" },
        ctaButton: { href: "/diensten/regulier-transport", text: "Lees meer" },
        title: "Reguliere transport",
        description: `Een betrouwbare levering staat of valt met timing en zorgvuldigheid. Bij Enrico's Transportservice zorgen wij ervoor dat uw goederen exact op het afgesproken moment en in uitstekende staat worden afgeleverd. Dankzij onze doordachte planning en persoonlijke werkwijze weet u altijd waar u aan toe bent.`,
      },
      {
        image: { src: incidenteelTransportImage, alt: "een afbeelding" },
        ctaButton: { href: "/diensten/incidenteel-transport", text: "Lees meer" },
        title: "Incidenteel transport",
        description: `Niet elke transportbehoefte past binnen een vaste planning. Soms is er juist behoefte aan een eenmalige levering, een spoedtransport of het snel vervoeren van een pallet of essentiële materialen. In zulke situaties biedt Enrico's Transportservice een snelle en betrouwbare oplossing voor incidenteel transport.`,
      },
      {
        image: { src: grootTransportImage, alt: "een afbeelding" },
        ctaButton: { href: "/diensten/groot-transport", text: "Lees meer" },
        title: "Groot transport",
        description: `Het vervoeren van grote, zware of volumineuze ladingen vraagt om een goede planning vooraf`,
      },
      {
        image: { src: spoedTransportImage, alt: "een afbeelding" },
        ctaButton: { href: "/diensten/spoed-transport", text: "Lees meer" },
        title: "Spoedtransport",
        description: `Wanneer tijd cruciaal is, biedt Enrico's Transportservice de oplossing met professioneel spoedtransport. Of het nu gaat om een vergeten levering, een dringende order of een zending die dezelfde dag nog moet worden afgeleverd, wij zorgen dat uw goederen direct en veilig op de juiste plek terechtkomen.`,
      },
      {
        image: { src: documentenTransportImage, alt: "een afbeelding" },
        ctaButton: { href: "/diensten/documenten-transport", text: "Lees meer" },
        title: "Documententransport",
        description: `Bij Enrico's Transportservice staat de veiligheid en vertrouwelijkheid van uw documenten voorop. Of het nu gaat om juridische dossiers, contracten of andere gevoelige informatie, wij zorgen dat uw documenten snel, veilig en zonder tussenstops bij de juiste ontvanger aankomen.`,
      },
      {
        image: { src: meubelTransport, alt: "een afbeelding" },
        ctaButton: { href: "/diensten/meubel-transport", text: "Lees meer" },
        title: "Meubeltransport",
        description: `Meubels vervoeren vraagt om aandacht, zorg en een nauwkeurige aanpak. Enrico's Transportservice is gespecialiseerd in meubelbezorging waarbij kwaliteit en betrouwbaarheid centraal staan. Wij zorgen ervoor dat elk meubelstuk veilig, netjes en volgens afspraak wordt afgeleverd.`,
      },
    ],
  },
  en: {
    title: "What we can do for you{highlight}",
    services: [
      {
        image: { src: refulierTransportImage, alt: "een afbeelding" },
        ctaButton: { href: "/en/services/regular-transport", text: "Read more" },
        title: "Regular transport",
        description: `A reliable delivery is all about timing and care. At Enrico's Transportservice, we ensure that your goods are delivered at the agreed time and in excellent condition. Thanks to our thoughtful planning and personal approach, you always know what to expect.`,
      },
      {
        image: { src: incidenteelTransportImage, alt: "een afbeelding" },
        ctaButton: { href: "/en/services/occasional-transport", text: "Read more" },
        title: "Occasional transport",
        description: `Not every transport need fits within a fixed schedule. Sometimes there is a need for a one-time delivery, an urgent transport, or the quick transportation of a pallet or essential materials. In such situations, Enrico's Transportservice offers a fast and reliable solution for occasional transport.`,
      },
      {
        image: { src: grootTransportImage, alt: "een afbeelding" },
        ctaButton: { href: "/en/services/large-transport", text: "Read more" },
        title: "Large transport",
        description: `Transporting large, heavy, or bulky loads requires craftsmanship, planning, and equipment you can rely on. Enrico's Transportservice specializes in large transport for companies that do not want to take risks with their goods.`,
      },
      {
        image: { src: spoedTransportImage, alt: "een afbeelding" },
        ctaButton: { href: "/en/services/urgent-transport", text: "Read more" },
        title: "Urgent transport",
        description: `When time is crucial, Enrico's Transportservice offers the solution with professional urgent transport. Whether it's a forgotten delivery, an urgent order, or a shipment that needs to be delivered the same day, we ensure that your goods reach the right place immediately and safely.`,
      },
      {
        image: { src: documentenTransportImage, alt: "een afbeelding" },
        ctaButton: { href: "/en/services/document-transport", text: "Read more" },
        title: "Document transport",
        description: `At Enrico's Transportservice, the safety and confidentiality of your documents are paramount. Whether it's legal files, contracts, or other sensitive information, we ensure that your documents arrive quickly, safely, and without stops at the right recipient.`,
      },
      {
        image: { src: meubelTransport, alt: "een afbeelding" },
        ctaButton: { href: "/en/services/furniture-transport", text: "Read more" },
        title: "Furniture transport",
        description: `Transporting furniture requires attention, care, and a precise approach. Enrico's Transportservice specializes in furniture delivery where quality and reliability are central. We ensure that every piece of furniture is delivered safely, neatly, and according to agreement.`,
      },
    ],
  },
};
