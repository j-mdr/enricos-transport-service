/**
 * * This file is used to define the navigation links for the site.
 * Notes:
 * 1 level of dropdown is supported
 * Mega menus look best with 3-5 columns, but supports anything > 2 columns
 * If using icons, the icon should be saved in the src/icons folder. If filename is "tabler/icon.svg" then input "tabler/icon"
 * Recommend getting icons from https://tabler.io/icons
 */

// types
import { type ServicesSideImage } from "../types/configDataTypes.ts";

//image
import image1 from "@images/house.jpg";
import image2 from "@images/living-room.jpg";
import image3 from "@images/paint-swatches.jpg";

// data
const serviceData: ServicesSideImage = {
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
};

export default serviceData;
