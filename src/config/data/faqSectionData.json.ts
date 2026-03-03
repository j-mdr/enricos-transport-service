import { type LocalizedData, type FaqSectionData } from "../configDataTypes.ts";
import { COMPANY_INFO } from "@config/constants.ts";

export const faqSectionData: LocalizedData<FaqSectionData> = {
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
        </a> of mail naar <a href="mailto:${COMPANY_INFO.email}" class="hover:text-primary-500 transition hover:underline">${COMPANY_INFO.email}
        </a>. We staan voor je klaar.`,
      },
      {
        question: "Hoe zit het met de veiligheid van mijn goederen tijdens het transport?",
        answer: `Bij Enrico’s Transportservice staat de veiligheid van uw lading altijd op de eerste plaats. 
                 Wij begrijpen dat uw goederen waardevol zijn en met zorg behandeld moeten worden. 
                 Daarom nemen wij uitgebreide maatregelen om risico’s te minimaliseren:
                <br/>
                <ol>
                  <li>            
                    - Goede verzekering: Wij hanteren de officiële AVC- en CMR-voorwaarden, zodat uw zending altijd goed verzekerd is – zowel nationaal als internationaal.
                  </li> 
                  <li>
                    - Bescherming tegen schade en diefstal: Uw lading is standaard verzekerd tegen schade en diefstal.
                  </li>
                  <li>
                    - Zorgvuldige verpakking: We gebruiken de juiste verpakkingsmethoden om te voorkomen dat goederen beschadigd raken tijdens het transport.
                  </li>
                  <li>
                    - Ervaren chauffeurs: Onze chauffeurs zijn professioneel opgeleid en beschikken over jarenlange ervaring. Ze behandelen uw goederen alsof het hun eigen spullen zijn.
                  </li>
                  <li>
                    - Betrouwbare voertuigen: Onze moderne en goed onderhouden wagenpark verkleint de kans op vertragingen of incidenten onderweg.
                  </li>
                </ol>
                <br/>
                Zo kunt u erop vertrouwen dat uw zending veilig, onbeschadigd en op tijd op de plaats van bestemming aankomt.`,
      },
      {
        question: "Bieden jullie ook Onboard Koerier (OBC)-diensten aan?",
        answer: `<span>Ja, bij Enrico’s Transportservice kunt u gebruikmaken van een Onboard Koerier (OBC). 
                 Hierbij reist een koerier persoonlijk met uw zending mee – of dat nu per vliegtuig, trein of over de weg is – en begeleidt deze van deur tot deur. 
                 Zo bent u verzekerd van maximale aandacht, snelheid en veiligheid.</span> 
                 <br/>
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
        question: "What is the range of your transport services?",
        answer: `Enrico's Transportservice serves customers throughout the Netherlands and also offers transport options in Europe.`,
      },
      {
        question: "Do you handle urgent transports?",
        answer: `Yes, we offer urgent transport services for time-sensitive deliveries. Please contact us for more information about our urgent options.`,
      },
      {
        question: "What are your rates and pricing structure?",
        answer: `Our rates vary depending on the service, distance, and other factors. You can calculate your rate with just a few clicks at this link.`,
      },
      {
        question: "How can I request transport?",
        answer: `Use the contact form via the menu. Prefer personal contact? Call us at <a href="tel:${COMPANY_INFO.phone}" class="hover:text-primary-500 transition hover:underline">${COMPANY_INFO.phone}
        </a> or email us at <a href="mailto:${COMPANY_INFO.email}" class="hover:text-primary-500 transition hover:underline">${COMPANY_INFO.email}
        </a>. We are here to assist you.`,
      },
      {
        question: "What about the safety of my goods during transport?",
        answer: `At Enrico's Transportservice, the safety of your cargo is always our top priority. We understand that your goods are valuable and need to be handled with care. Therefore, we take extensive measures to minimize risks:
                <br/>
                <ol>
                  <li>            
                    - Proper insurance: We adhere to the official AVC and CMR conditions, ensuring that your shipment is always well insured – both nationally and internationally.
                  </li> 
                  <li>
                    - Protection against damage and theft: Your cargo is standard insured against damage and theft.
                  </li>
                  <li>
                    - Careful packaging: We use the appropriate packaging methods to prevent goods from being damaged during transport.
                  </li>
                  <li>
                    - Experienced drivers: Our drivers are professionally trained and have years of experience. They treat your goods as if they were their own.
                  </li> 
                  <li>
                    - Reliable vehicles: Our modern and well-maintained fleet reduces the chances of delays or incidents on the road.
                  </li>
                </ol>
                <br/>
                This way, you can trust that your shipment will arrive safely, undamaged, and on time at its destination.`,
      },
      {
        question: "Do you also offer Onboard Courier (OBC) services?",
        answer: `<span>Yes, at Enrico's Transportservice you can take advantage of an Onboard Courier (OBC). 
                 With this service, a courier personally accompanies your shipment – whether by plane, train, or road – and guides it from door to door. 
                 This ensures maximum attention, speed, and safety.</span> 
                 <br/>
                  <span>This service is often used for:</span> <br/>
                  <ol>
                    <li>- Important documents or contracts</li>
                    <li>- Medical samples and pharmaceutical shipments</li>
                    <li>- Crucial IT or machine parts</li>
                    <li>- Spare parts for industry and aviation</li>
                    <li>- Other valuable or urgent goods</li>
                  </ol>
                  <br/>
                  <span>With our OBC service, your shipment receives personal guidance from start to finish, without any stops or transshipment. Perfect for goods that absolutely must arrive safely and on time.</span>
                    `,
      },
    ],
  },
};
