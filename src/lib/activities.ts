import { HandHeart, Home, Palette, Truck, type LucideIcon } from "lucide-react";
import type { Locale } from "@/i18n";
import { CULTURE_GALLERY, FIELD_SUPPORT_GALLERY, HUMANITARIAN_GALLERY, VEHICLES_GALLERY, type GalleryPhoto } from "@/lib/gallery";

export interface ActivitySection {
  title: Record<Locale, string>;
  text: Record<Locale, string>;
}

export interface Activity {
  slug: string;
  icon: LucideIcon;
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  sections: ActivitySection[];
  image: string;
  imageAlt: Record<Locale, string>;
  gallery: GalleryPhoto[];
}

const humanitarianPhotos = [...HUMANITARIAN_GALLERY, ...VEHICLES_GALLERY, ...FIELD_SUPPORT_GALLERY];
const communityPhotos = CULTURE_GALLERY.filter((_, index) => [5, 13, 14].includes(index));
const familyPhotos = CULTURE_GALLERY.filter((_, index) => [0, 4].includes(index));
const culturePhotos = CULTURE_GALLERY.filter((_, index) => ![0, 4, 5, 13, 14].includes(index));

function cover(photos: GalleryPhoto[], index = 0) {
  const selected = photos[index] ?? photos[0];
  if (!selected) throw new Error("An activity requires a documentary cover photo");
  return { image: selected.src, imageAlt: selected.alt };
}

// Verified content from the association's activity document, with Italian translation.
export const ACTIVITIES: Activity[] = [
  {
    slug: "aiuti-umanitari",
    icon: Truck,
    title: { it: "Aiuti umanitari", uk: "Гуманітарна допомога" },
    summary: {
      it: "Risorse essenziali per chi ne ha più bisogno, attraverso una filiera continua di raccolta, selezione e trasporto degli aiuti dall'Italia all'Ucraina.",
      uk: "Забезпечення життєво необхідними ресурсами тих, хто цього найбільше потребує, шляхом створення безперервного ланцюга збору, сортування та транспортування вантажів з Італії в Україну.",
    },
    sections: [
      {
        title: { it: "Raccolta, logistica e volumi", uk: "Збір, логістика та обсяги" },
        text: {
          it: "Organizziamo la raccolta sistematica di alimenti a lunga conservazione, prodotti per l'igiene, abiti caldi e attrezzature per la casa. Dal 2022 l'associazione ha consegnato oltre 600 tonnellate di aiuti umanitari.",
          uk: "Організація систематичного збору продуктів тривалого зберігання, засобів гігієни, теплого одягу та побутового обладнання. З 2022 року асоціацією передано понад 600 тонн гуманітарної допомоги.",
        },
      },
      {
        title: { it: "Sostegno medico e mezzi di soccorso", uk: "Медична підтримка та автотранспорт" },
        text: {
          it: "Acquistiamo e inviamo medicinali, materiali di consumo e attrezzature specialistiche per ospedali militari e civili, e consegniamo ambulanze a comunità e amministrazioni ucraine.",
          uk: "Закупівля й відправка ліків, витратних матеріалів і спеціалізованого обладнання для шпиталів та лікарень, а також передача автомобілів швидкої допомоги для українських громад та адміністрацій.",
        },
      },
      {
        title: { it: "Sostegno ai militari e mezzi operativi", uk: "Підтримка військових та спецтехніка" },
        text: {
          it: "Prepariamo e consegniamo decine di fuoristrada per le attività dei militari e forniamo regolarmente i beni necessari a singole unità, reparti e brigate, tra cui la 66ª brigata meccanizzata ucraina.",
          uk: "Підготовка та передача десятків позашляховиків для виконання завдань військовими, а також регулярне забезпечення необхідними засобами окремих військових підрозділів, частин та бригад (зокрема 66 ОМБр).",
        },
      },
      {
        title: { it: "Aiuto mirato e sociale", uk: "Адресна та соціальна допомога" },
        text: {
          it: "Facciamo arrivare rapidamente gli aiuti nelle regioni vicine al fronte, colpite dalla guerra e liberate dall'occupazione. Sosteniamo inoltre orfanotrofi, centri di assistenza e rifugi per animali.",
          uk: "Оперативна переправка вантажів безпосередньо у прифронтові, постраждалі та деокуповані регіони, а також підтримка дитячих будинків, центрів надання допомоги та притулків для тварин.",
        },
      },
      {
        title: { it: "Collaborazione e raccolta fondi", uk: "Співпраця та збір коштів" },
        text: {
          it: "Organizziamo raccolte fondi insieme alle comunità locali, ai volontari e alla rete di associazioni NAU (Network Associazioni per Ucraina).",
          uk: "Організація зборів коштів у співпраці з місцевими громадами, волонтерами й об'єднанням асоціацій NAU (Network Associazioni per Ucraina).",
        },
      },
    ],
    ...cover(humanitarianPhotos, 1),
    gallery: humanitarianPhotos,
  },
  {
    slug: "accoglienza",
    icon: Home,
    title: { it: "Sostegno agli sfollati", uk: "Підтримка переселенців" },
    summary: {
      it: "Integrazione, adattamento e assistenza sociale e legale alle famiglie ucraine a Rimini, per superare la barriera linguistica e costruire un ponte solido con la società italiana.",
      uk: "Інтеграція, адаптація та всебічна соціально-юридична допомога українським родинам у Ріміні для подолання мовного бар'єру та створення надійного містка з італійським суспільством.",
    },
    sections: [
      {
        title: { it: "Orientamento e assistenza documentale", uk: "Консультаційна та документальна допомога" },
        text: {
          it: "Offriamo informazioni e accompagnamento per la protezione temporanea e il permesso di soggiorno, il codice fiscale, l'assistenza sanitaria e le prestazioni sociali.",
          uk: "Роз'яснення та супровід у питаннях оформлення тимчасового захисту (permesso di soggiorno), коду фіскале (codice fiscale), медичної страховки та соціальних виплат.",
        },
      },
      {
        title: { it: "Tutela dei diritti e advocacy", uk: "Захист прав та адвокатура" },
        text: {
          it: "Tuteliamo i diritti dei cittadini ucraini in Italia attraverso il dialogo istituzionale, il sostegno legale, la mobilitazione civica e le petizioni pubbliche nell'ambito della rete NAU.",
          uk: "Захист прав громадян України в Італії через інституційний діалог, юридичну підтримку, громадянську мобілізацію та громадські петиції (у рамках мережі NAU).",
        },
      },
      {
        title: { it: "Integrazione linguistica", uk: "Мовна адаптація" },
        text: {
          it: "Organizziamo corsi di lingua italiana per adulti, per favorire la socializzazione e superare la barriera linguistica.",
          uk: "Організація курсів італійської мови для дорослих для швидшої соціалізації та подолання мовного бар'єру.",
        },
      },
      {
        title: { it: "Istruzione e lavoro", uk: "Освіта та працевлаштування" },
        text: {
          it: "Accompagniamo le famiglie nell'inserimento dei bambini nelle scuole e negli asili di Rimini e aiutiamo gli adulti a preparare il curriculum e cercare lavoro.",
          uk: "Супровід у влаштуванні дітей до шкіл і дитячих садків Ріміні, а також допомога дорослим у складанні резюме та пошуку роботи.",
        },
      },
    ],
    ...cover(communityPhotos),
    gallery: communityPhotos,
  },
  {
    slug: "cultura",
    icon: Palette,
    title: { it: "Cultura ed eventi", uk: "Культура та події" },
    summary: {
      it: "Preservare l'identità ucraina, far conoscere il patrimonio culturale e costruire il dialogo interculturale con la comunità italiana.",
      uk: "Збереження української ідентичності, популяризація спадщини та розбудова міжкультурного діалогу з італійською спільнотою.",
    },
    sections: [
      {
        title: { it: "Concerti e serate di beneficenza", uk: "Благодійні концерти та вечори" },
        text: {
          it: "Organizziamo eventi con artisti ucraini e italiani per raccogliere fondi destinati alle necessità umanitarie.",
          uk: "Організація заходів за участю українських та італійських виконавців для збору коштів на гуманітарні потреби.",
        },
      },
      {
        title: { it: "Mostre e divulgazione", uk: "Виставки та просвітництво" },
        text: {
          it: "Realizziamo mostre fotografiche, presentazioni, proiezioni cinematografiche, serate culturali e seminari interculturali.",
          uk: "Проведення фотовиставок, презентацій, кінопоказів, культурних вечорів та міжкультурних семінарів.",
        },
      },
      {
        title: { it: "Iniziative civiche e pubbliche", uk: "Суспільні та публічні акції" },
        text: {
          it: "Abbiamo organizzato oltre 100 eventi, raduni pacifici, cortei, manifestazioni, briefing e incontri a diversi livelli civici e politici, per sostenere l'Ucraina e unire la comunità.",
          uk: "Організація понад 100 заходів, мирних зібрань, ходи, мітингів, брифінгів та зустрічей на різних громадських і політичних рівнях для підтримки України та згуртування громади.",
        },
      },
    ],
    ...cover(culturePhotos),
    gallery: culturePhotos,
  },
  {
    slug: "bambini",
    icon: HandHeart,
    title: { it: "Bambini e famiglie", uk: "Діти та родини" },
    summary: {
      it: "Uno spazio sicuro, accogliente e solidale per la crescita, l'incontro e il benessere emotivo di bambini e famiglie.",
      uk: "Створення безпечного, теплого й підтримуючого простору для розвитку, спілкування та відновлення психоемоційного стану дітей і родин.",
    },
    sections: [
      {
        title: { it: "Laboratori creativi", uk: "Творчі майстер-класи" },
        text: {
          it: "Proponiamo attività di disegno, modellazione, artigianato tradizionale e pratica artistica.",
          uk: "Заняття з малювання, ліплення, традиційних народних ремесел та художньої майстерності.",
        },
      },
      {
        title: { it: "Attività extrascolastiche", uk: "Позашкільне дозвілля" },
        text: {
          it: "Organizziamo giochi interattivi, programmi per le feste, spettacoli per bambini e attività ricreative all'aperto.",
          uk: "Інтерактивні ігри, святкові програми, дитячі ранки та розважальні заходи на свіжому повітрі.",
        },
      },
      {
        title: { it: "Sostegno emotivo", uk: "Психоемоційна підтримка" },
        text: {
          it: "Creiamo un ambiente amichevole per accompagnare con gradualità i bambini nel nuovo Paese, ritrovare un senso di stabilità e conoscere i coetanei.",
          uk: "Створення дружнього середовища для м'якої адаптації дітей у новій країні, відновлення відчуття стабільності та знайомства з однолітками.",
        },
      },
      {
        title: { it: "Sostegno alle strutture per l'infanzia", uk: "Опіка над дитячими закладами" },
        text: {
          it: "Forniamo sostegno umanitario continuativo agli orfanotrofi e ai centri sociali.",
          uk: "Систематичне забезпечення гуманітарною підтримкою дитячих будинків та соціальних центрів.",
        },
      },
    ],
    ...cover(familyPhotos),
    gallery: familyPhotos,
  },
];
