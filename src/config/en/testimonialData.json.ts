import { type TestimonialData } from "../types/configDataTypes";

import BowTiedFocus from "@images/BowTiedFocus.jpg";
import TravisB from "@images/travis-b.png";
import Isaac from "@images/isaac_saas.jpg";
import Aniket from "@images/aniket_p.jpg";
import David from "@images/david-g-davedev.png";
import Damiano from "@images/damiano.jpg";

export const testimonials = [
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
  {
    avatar: TravisB,
    name: "Travis B",
    title: "Developer",
    testimonial: `Cosmic themes are for webdevs and marketers who don't want to waste time reinventing the wheel. 
    Their themes have great examples of some of the creative things you can accomplish with Astro. 
      `,
  },
  {
    avatar: Isaac,
    name: "Isaac",
    title: "SaaS Developer",
    testimonial: `My step-dad is starting a construction business and we're looking through Astro themes right now for his website
      and stumbled upon Cosmic Themes "Galaxy" theme. Absolutely filthy. Excellent work, man.
      `,
  },
];

const testimonialData: TestimonialData = {
  title: "Reviews van onze klanten{icon}",
  testimonials: testimonials,
};

export default testimonialData;
