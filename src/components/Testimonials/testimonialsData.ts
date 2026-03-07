import { type LocalizedData, type TestimonialSwiperSectionData } from "@config/configDataTypes.ts";

import BowTiedFocus from "@images/nic_fassbender.jpg";
import Aniket from "@images/nic_fassbender.jpg";
import David from "@images/nic_fassbender.jpg";
import Damiano from "@images/nic_fassbender.jpg";

export const testimonialsData: LocalizedData<TestimonialSwiperSectionData> = {
  nl: {
    title: "Reviews van onze klanten{highlight}",
    testimonials: [
      {
        avatar: Aniket,
        name: "Aad",
        title: "Data Scientist",
        testimonial: `Heeft me een paar keer goed geholpen. Betrouwbaar en gewoon een goeie vent die je graag naar een klant stuurt. Altijd prima verzorgt..
      `,
      },
      {
        avatar: BowTiedFocus,
        name: "Cyrus mohammadi",
        title: "Frontend Engineer",
        testimonial: `Ik ben ontzettend tevreden over de service van Enrico's transportservice! Ik had dringend een pakket nodig dat op tijd moest aankomen, en ik was echt onder de indruk van hoe snel en professioneel ze het hebben afgehandeld. De bestelling werd op de afgesproken tijd opgehaald en binnen de afgesproken termijn bezorgd, zonder enige vertraging...
      `,
      },
      {
        avatar: Damiano,
        name: "Jorn Middelkamp",
        title: "C++ Developer",
        testimonial: `Uitermate tevreden over hun service! Binnen een paar minuten reactie op mijn bericht en kon direct een afspraak maken voor onze verhuizing twee weken geleden. De heren werken vlot,secuur en bovenal vriendelijk!
      `,
      },
      {
        avatar: David,
        name: "David G",
        title: "Web Developer",
        testimonial: `It's the cleanest template standup experience ever! I've never used Astro, but looking at the demo, code, it
      should be fairly simple pickup on top of my existing React and NextJS experience.
      `,
      },
    ],
  },
  en: {
    title: "What our customers{highlight} say",
    testimonials: [
      {
        avatar: Aniket,
        name: "Aad",
        title: "Data Scientist",
        testimonial: `Heeft me een paar keer goed geholpen. Betrouwbaar en gewoon een goeie vent die je graag naar een klant stuurt. Altijd prima verzorgt..
      `,
      },
      {
        avatar: BowTiedFocus,
        name: "Cyrus mohammadi",
        title: "Frontend Engineer",
        testimonial: `Ik ben ontzettend tevreden over de service van Enrico's transportservice! Ik had dringend een pakket nodig dat op tijd moest aankomen, en ik was echt onder de indruk van hoe snel en professioneel ze het hebben afgehandeld. De bestelling werd op de afgesproken tijd opgehaald en binnen de afgesproken termijn bezorgd, zonder enige vertraging...
      `,
      },
      {
        avatar: Damiano,
        name: "Jorn Middelkamp",
        title: "C++ Developer",
        testimonial: `Uitermate tevreden over hun service! Binnen een paar minuten reactie op mijn bericht en kon direct een afspraak maken voor onze verhuizing twee weken geleden. De heren werken vlot,secuur en bovenal vriendelijk!
      `,
      },
      {
        avatar: David,
        name: "David G",
        title: "Web Developer",
        testimonial: `It's the cleanest template standup experience ever! I've never used Astro, but looking at the demo, code, it
      should be fairly simple pickup on top of my existing React and NextJS experience.
      `,
      },
    ],
  },
};
