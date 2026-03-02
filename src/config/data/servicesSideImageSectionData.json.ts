/**
 * * This file is used to define the navigation links for the site.
 * Notes:
 * 1 level of dropdown is supported
 * Mega menus look best with 3-5 columns, but supports anything > 2 columns
 * If using icons, the icon should be saved in the src/icons folder. If filename is "tabler/icon.svg" then input "tabler/icon"
 * Recommend getting icons from https://tabler.io/icons
 */

// types
import { type DataTranslationType, type ServicesSideImageSectionData } from "../configDataTypes.ts";

//image
import image1 from "@images/house.jpg";
import image2 from "@images/living-room.jpg";
import image3 from "@images/paint-swatches.jpg";
import { MAIN_ROUTES } from "@config/constants.ts";

export const servicesSideImageSectionData: DataTranslationType<ServicesSideImageSectionData> = {
  nl: {
    title: "Wat wij voor u{highlight} kunnen betekenen",
    items: [
      {
        image: image1,
        href: MAIN_ROUTES.regulierTransport,
        imageAlt: "een afbeelding",
        title: "Reguliere transport",
        details: `Een betrouwbare levering staat of valt met timing en zorgvuldigheid. Bij Enrico’s Transportservice zorgen wij ervoor dat uw goederen exact op het afgesproken moment en in uitstekende staat worden afgeleverd. Dankzij onze doordachte planning en persoonlijke werkwijze weet u altijd waar u aan toe bent.`,
      },
      {
        image: image2,
        href: MAIN_ROUTES.incidenteelTransport,
        imageAlt: "een afbeelding",
        title: "Incidenteel transport",
        details: `Niet elke transportbehoefte past binnen een vaste planning. Soms is er juist behoefte aan een eenmalige levering, een spoedtransport of het snel vervoeren van een pallet of essentiële materialen. In zulke situaties biedt Enrico’s Transportservice een snelle en betrouwbare oplossing voor incidenteel transport.`,
      },
      {
        image: image3,
        href: MAIN_ROUTES.grootTransport,
        imageAlt: "een afbeelding",
        title: "Groot transport",
        details: `Het vervoeren van grote, zware of volumineuze ladingen vraagt om vakmanschap, planning en materieel waarop u kunt vertrouwen. Enrico’s Transportservice is gespecialiseerd in groot transport voor bedrijven die geen risico willen nemen met hun goederen.`,
      },
      {
        image: image3,
        href: MAIN_ROUTES.spoedTransport,
        imageAlt: "een afbeelding",
        title: "Spoedtransport",
        details: `Wanneer tijd cruciaal is, biedt Enrico’s Transportservice de oplossing met professioneel spoedtransport. Of het nu gaat om een vergeten levering, een dringende order of een zending die dezelfde dag nog moet worden afgeleverd, wij zorgen dat uw goederen direct en veilig op de juiste plek terechtkomen.`,
      },
      {
        image: image3,
        href: MAIN_ROUTES.documentenTransport,
        imageAlt: "een afbeelding",
        title: "Documententransport",
        details: `Bij Enrico’s Transportservice staat de veiligheid en vertrouwelijkheid van uw documenten voorop. Of het nu gaat om juridische dossiers, contracten of andere gevoelige informatie, wij zorgen dat uw documenten snel, veilig en zonder tussenstops bij de juiste ontvanger aankomen.`,
      },
      {
        image: image3,
        href: MAIN_ROUTES.meubelTransport,
        imageAlt: "een afbeelding",
        title: "Documententransport",
        details: `Meubels vervoeren vraagt om aandacht, zorg en een nauwkeurige aanpak. Enrico’s Transportservice is gespecialiseerd in meubelbezorging waarbij kwaliteit en betrouwbaarheid centraal staan. Wij zorgen ervoor dat elk meubelstuk veilig, netjes en volgens afspraak wordt afgeleverd.`,
      },
    ],
  },
  en: {
    title: "What we can do for you{highlight}",
    items: [
      {
        image: image1,
        href: "/regulier-transport",
        imageAlt: "een afbeelding",
        title: "Exterior Painting",
        details: `Professional home exterior painting, including siding, doors, and trim.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex nesciunt quia quibusdam, 
    voluptatem aliquid autem, magnam, doloremque voluptatibus odio esse pariatur harum 
    odit neque qui earum nam praesentium sint ullam!`,
      },
      {
        image: image2,
        href: "/regulier-transport",
        imageAlt: "een afbeelding",
        title: "Interior Painting",
        details: `Our experienced staff can paint your home's interior, including walls, ceilings, and trim.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex nesciunt quia quibusdam, voluptatem 
    aliquid autem, magnam, doloremque voluptatibus odio esse pariatur harum odit neque qui earum 
    nam praesentium sint ullam!`,
      },
      {
        image: image3,
        href: "/regulier-transport",
        imageAlt: "een afbeelding",
        title: "Deck and Fence Staining",
        details: `Stain your deck or fence to keep it looking great and protected from the elements.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex nesciunt quia quibusdam, 
    voluptatem aliquid autem, magnam, doloremque voluptatibus odio esse pariatur harum odit neque 
    qui earum nam praesentium sint ullam!`,
      },
    ],
  },
};
