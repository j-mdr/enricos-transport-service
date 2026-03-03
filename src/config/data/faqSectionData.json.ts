import { type DataTranslationType, type FaqSectionData } from "../configDataTypes.ts";
import { COMPANY_INFO } from "@config/constants.ts";

export const faqSectionData: DataTranslationType<FaqSectionData> = {
  nl: {
    title: "Veel gestelde vragen{highlight}",
    faqs: [
      {
        question: "Wat is het bereik van jullie transportdiensten?",
        answer: `Enrico’s Transportservice bedient klanten in heel Nederland en biedt ook transportmogelijkheden in Europa.`,
      },
      {
        question: "Kunnen jullie spoedtransporten aan?",
        answer: `Ja, we bieden spoedtransportdiensten voor dringende leveringen. Neem contact met ons op voor meer informatie over onze spoedopties.`,
      },
      {
        question: "Wat zijn jullie tarieven en prijsstructuur?",
        answer: `Onze tarieven variëren afhankelijk van de dienst, afstand en andere factoren. U kunt met een paar kliks uw tarief berekenen op deze link`,
      },
      {
        question: "Hoe kan ik transport aanvragen?",
        answer: `Gebruik het contact formulier via het menu. Liever persoonlijk contact? Bel ons via <a href="tel:${COMPANY_INFO.phone}" class="hover:text-primary-500 transition hover:underline">${COMPANY_INFO.phone}
        </a> of mail naar <a href="mailto:${COMPANY_INFO.mail}" class="hover:text-primary-500 transition hover:underline">${COMPANY_INFO.email}
        </a>. We staan voor je klaar.`,
      },
      {
        question: "Hoe zit het met de veiligheid van mijn goederen tijdens het transport?",
        answer: `Bij Enrico’s Transportservice staat de veiligheid van uw lading altijd op de eerste plaats. Wij begrijpen dat uw goederen waardevol zijn en met zorg behandeld moeten worden. Daarom nemen wij uitgebreide maatregelen om risico’s te minimaliseren:


Goede verzekering: Wij hanteren de officiële AVC- en CMR-voorwaarden, zodat uw zending altijd goed verzekerd is – zowel nationaal als internationaal.

Bescherming tegen schade en diefstal: Uw lading is standaard verzekerd tegen schade en diefstal.

Zorgvuldige verpakking: We gebruiken de juiste verpakkingsmethoden om te voorkomen dat goederen beschadigd raken tijdens het transport.

Ervaren chauffeurs: Onze chauffeurs zijn professioneel opgeleid en beschikken over jarenlange ervaring. Ze behandelen uw goederen alsof het hun eigen spullen zijn.

Betrouwbare voertuigen: Onze moderne en goed onderhouden wagenpark verkleint de kans op vertragingen of incidenten onderweg.

Zo kunt u erop vertrouwen dat uw zending veilig, onbeschadigd en op tijd op de plaats van bestemming aankomt.`,
      },
      {
        question: "Bieden jullie ook Onboard Koerier (OBC)-diensten aan?",
        answer: `<span>Ja, bij Enrico’s Transportservice kunt u gebruikmaken van een Onboard Koerier (OBC). Hierbij reist een koerier persoonlijk met uw zending mee – of dat nu per vliegtuig, trein of over de weg is – en begeleidt deze van deur tot deur. Zo bent u verzekerd van maximale aandacht, snelheid en veiligheid.</span> <br/>
<span>Deze service wordt vaak ingezet voor:</span> <br/>
<ol>
<li>- Belangrijke documenten of contracten</li>
<li>- Medische monsters en farmaceutische zendingen</li>
<li>- Cruciale IT- of machineonderdelen</li>
<li>- Reserveonderdelen voor industrie en luchtvaart</li>
<li>- Andere waardevolle of urgente goederen</li>
</ol>
<br/>
<span>Met onze OBC-dienst krijgt uw zending persoonlijke begeleiding van start tot eind, zonder tussenstops of overslag. Perfect voor goederen die absoluut veilig en op tijd moeten aankomen.</span>
`,
      },
    ],
  },
  en: {
    title: "FAQ{highlight}",
    faqs: [
      {
        question: "Who are the themes for?",
        answer: `These themes are for developers who want to have pre-created templates to use in their projects,
    and have the hard stuff taken care of. Whether that is personal projects, a new SaaS business, a website for a client, etc.
    They offer speed, customizability with swappable 
    components, built-in SEO, and image optimization. Instead of spending hours figuring out 
    how to do this yourself, you can leverage the themes to save weeks of time and effort. You can easily 
    mix and match sections, update the copy, and change the color theme with just one line of code.`,
      },
      {
        question: "What all components are included?",
        answer: `60+ components. Including 6 feature sections, 3 hero sections, 2 services sections, 2 testimonial sections, 
    2 faq sections, 404, contact, legal, 2 blog indexes, blog post layout, and a cookie banner.`,
      },
      {
        question: 'What do you mean by "free updates"?',
        answer: `When you purchase any of our themes, you get lifetime updates for free. 
      We regularly update our themes to ensure compatibility with the latest version of Astro, 
      and to add new features or bug fixes.`,
      },
      {
        question: "Why Astro?",
        answer: `Astro is an excellent framework for content-focused websites, with a great developer
      experience. It also allows you to use any UI framework you want within it, such as React, Vue,
      and Svelte. This means you can use any of your existing components, or any of the thousands of 
      components available online. `,
      },
      {
        question: "Can I use a theme for multiple projects?",
        answer: `Yes, you can use any of our themes for as many projects as you like.
      You can even sell websites you create with them to your clients. As long as you
      don't resell the theme itself, you're likely to go! See our
      <a href="https://cosmicthemes.com/license/" target="_blank" rel="noopener noreferrer">License</a> 
      page for more details.`,
      },
      {
        question: "How do I download new versions of the themes?",
        answer: `You can download any new versions of the themes by accessing
      your lemonsqueezy library. When you first purchase the theme, I recommend 
      creating a lemonsqueezy account at app.lemonsqueezy.com. Then you will have
      access to any theme updates from that page.`,
      },
    ],
  },
};
