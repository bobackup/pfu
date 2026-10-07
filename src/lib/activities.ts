import { HandHeart, Home, Palette, Truck, type LucideIcon } from "lucide-react";
import type { Locale } from "@/i18n";
import humanitarianWarehouse from "@/assets/humanitarian-warehouse.webp.asset.json";
import ambulanceDelivery from "@/assets/ambulance-delivery.webp.asset.json";
import frontlineAid from "@/assets/frontline-aid.webp.asset.json";
import cultureEvent from "@/assets/culture-event.webp.asset.json";

export interface Activity {
  slug: string;
  icon: LucideIcon;
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  body: Record<Locale, string[]>;
  image: string;
  imageAlt: Record<Locale, string>;
}

// Static content: edit here. Placeholder text is marked as such.
export const ACTIVITIES: Activity[] = [
  {
    slug: "aiuti-umanitari",
    icon: Truck,
    title: { it: "Aiuti umanitari", uk: "Гуманітарна допомога" },
    summary: {
      it: "Raccolta e consegna continuativa di medicinali, alimenti e beni essenziali in Ucraina.",
      uk: "Постійний збір і доставка ліків, продуктів та найнеобхіднішого в Україну.",
    },
    body: {
      it: [
        "Dal 2022 People for Ukraine ha consegnato oltre 600 tonnellate di aiuti umanitari. La raccolta e la preparazione delle spedizioni proseguono su base continuativa.",
        "Forniamo ciò che serve a reparti e brigate militari, orfanotrofi, centri di assistenza e rifugi per animali. La collaborazione con comunità, associazioni e volontari permette agli aiuti di raggiungere chi ne ha bisogno.",
      ],
      uk: [
        "З 2022 року People for Ukraine передала понад 600 тонн гуманітарної допомоги. Збір і підготовка вантажів тривають на постійній основі.",
        "Ми забезпечуємо необхідним військові підрозділи, частини та бригади, дитячі будинки, центри надання допомоги й притулки для тварин. Співпраця з громадами, асоціаціями та волонтерами допомагає доставляти підтримку туди, де вона потрібна.",
      ],
    },
    image: humanitarianWarehouse.url,
    imageAlt: {
      it: "Scatole di aiuti umanitari preparate per la consegna in Ucraina",
      uk: "Коробки гуманітарної допомоги, підготовлені до відправлення в Україну",
    },
  },
  {
    slug: "accoglienza",
    icon: Home,
    title: { it: "Veicoli e soccorso", uk: "Автомобілі та порятунок" },
    summary: {
      it: "Fuoristrada per i militari e ambulanze per comunità e amministrazioni ucraine.",
      uk: "Позашляховики для військових і машини швидкої допомоги для українських громад та адміністрацій.",
    },
    body: {
      it: [
        "People for Ukraine ha preparato e consegnato decine di fuoristrada destinati allo svolgimento di compiti operativi da parte dei militari ucraini.",
        "L'associazione ha inoltre consegnato ambulanze a comunità e amministrazioni ucraine, sostenendo la capacità locale di prestare soccorso.",
      ],
      uk: [
        "People for Ukraine підготувала та передала десятки позашляховиків для виконання завдань українськими військовими.",
        "Асоціація також передала машини швидкої допомоги українським громадам та адміністраціям, підтримуючи їхню спроможність надавати допомогу людям.",
      ],
    },
    image: ambulanceDelivery.url,
    imageAlt: {
      it: "Volontari di People for Ukraine durante la consegna di un'ambulanza",
      uk: "Волонтери People for Ukraine під час передачі машини швидкої допомоги",
    },
  },
  {
    slug: "cultura",
    icon: Palette,
    title: { it: "Advocacy, cultura e integrazione", uk: "Адвокація, культура та інтеграція" },
    summary: {
      it: "Iniziative pubbliche, dialogo istituzionale e cultura per sostenere l'Ucraina e unire le comunità.",
      uk: "Публічні заходи, інституційний діалог і культура задля підтримки України та єднання громад.",
    },
    body: {
      it: [
        "Dal 2022 abbiamo realizzato oltre 100 eventi, manifestazioni, briefing e incontri a diversi livelli civili e politici per sostenere l'Ucraina e gli ucraini.",
        "Promuoviamo la cultura ucraina come ponte di dialogo e comprensione reciproca. Attraverso eventi, incontri e collaborazioni interculturali favoriamo la partecipazione, la tutela dei diritti e un'integrazione autentica nel contesto italiano.",
      ],
      uk: [
        "З 2022 року ми провели понад 100 заходів, мітингів, брифінгів і зустрічей на різних громадських та політичних рівнях для підтримки України та українців.",
        "Ми популяризуємо українську культуру як місток для діалогу та взаєморозуміння. Через події, зустрічі й міжкультурну співпрацю сприяємо громадянській участі, захисту прав та справжній інтеграції в італійському суспільстві.",
      ],
    },
    image: cultureEvent.url,
    imageAlt: {
      it: "Evento pubblico di People for Ukraine con uno stand della comunità ucraina",
      uk: "Публічний захід People for Ukraine зі стендом української громади",
    },
  },
  {
    slug: "bambini",
    icon: HandHeart,
    title: { it: "Sostegno sul campo", uk: "Підтримка на місцях" },
    summary: {
      it: "Aiuto diretto e continuativo a unità, strutture di assistenza e persone colpite dalla guerra.",
      uk: "Пряма й постійна допомога підрозділам, закладам підтримки та людям, яких торкнулася війна.",
    },
    body: {
      it: [
        "Sosteniamo con continuità singole unità, reparti e brigate militari fornendo i beni necessari per affrontare i loro compiti.",
        "La rete di aiuto raggiunge anche orfanotrofi, centri di assistenza e rifugi per animali. Ogni consegna nasce da necessità concrete e dal contatto diretto con i destinatari.",
      ],
      uk: [
        "Ми на постійній основі забезпечуємо необхідним окремі військові підрозділи, частини та бригади для виконання їхніх завдань.",
        "Допомога також надходить до дитячих будинків, центрів надання допомоги та притулків для тварин. Кожна передача ґрунтується на конкретних потребах і прямому зв'язку з отримувачами.",
      ],
    },
    image: frontlineAid.url,
    imageAlt: {
      it: "Consegna di generi alimentari sul campo in Ucraina",
      uk: "Передача продуктів харчування на місці в Україні",
    },
  },
];
