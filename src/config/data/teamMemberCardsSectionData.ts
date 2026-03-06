import {
  type LocalizedData,
  type TeamMemberCardsSectionData,
} from "@config/translations/configDataTypes.ts";

import Virginia from "@images/nic_fassbender.jpg";
import Victra from "@images/nic_fassbender.jpg";
import Darrow from "@images/nic_fassbender.jpg";

export const teamMemberCardsSectionData: LocalizedData<TeamMemberCardsSectionData> = {
  nl: {
    title: "Maak kennis met ons team{highlight}",
    teamMembers: [
      {
        image: Virginia,
        name: "Enrico Janssen",
        title: "Oprichter",
        bio: `I grew up in the suburbs of Chicago. I was a competitive swimmer for 12 years and
      played water polo in college. I graduated from the University of Illinois in 2012.
    `,
      },
      {
        image: Victra,
        name: "Kelly Janssen",
        title: "Medeoprichter",
        bio: `I'm from the south side of Chicago. I graduated from the University of Illinois in 2013.
      I've been working in the paint industry ever since. I’m a huge fan of the outdoors and I love to travel.
      `,
      },
    ],
  },
  en: {
    title: "Meet the team{highlight} members",
    teamMembers: [
      {
        image: Darrow,
        name: "Enrico Janssen",
        title: "Owner",
        bio: `I’m originally from Indiana. I was raised on a farm and became an Eagle Scout in 2008.
      I graduated from Purdue University in 2012 with a degree in Design, and I’ve been working in the
      paint industry ever since. 
      `,
      },
      {
        image: Virginia,
        name: "Kelly Janssen",
        title: "Co-owner",
        bio: `I grew up in the suburbs of Chicago. I was a competitive swimmer for 12 years and
      played water polo in college. I graduated from the University of Illinois in 2012.
    `,
      },
    ],
  },
};
