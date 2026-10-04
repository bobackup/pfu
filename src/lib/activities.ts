import { HandHeart, Home, Palette, Truck, type LucideIcon } from "lucide-react";
import type { Locale } from "@/i18n";

export interface Activity {
  slug: string;
  icon: LucideIcon;
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  body: Record<Locale, string[]>;
}

// Static content: edit here. Placeholder text is marked as such.
export const ACTIVITIES: Activity[] = [
  {
    slug: "aiuti-umanitari",
    icon: Truck,
    title: { it: "Aiuti umanitari", uk: "Гуманітарна допомога" },
    summary: {
      it: "Raccolta e spedizione di medicinali, cibo e beni essenziali verso l'Ucraina.",
      uk: "Збір і відправка ліків, їжі та найнеобхіднішого в Україну.",
    },
    body: {
      it: [
        "[Testo segnaposto] Organizziamo raccolte di beni essenziali e li spediamo verso ospedali, centri di accoglienza e comunità in Ucraina, in collaborazione con partner verificati.",
        "Descrivete qui le destinazioni, i partner logistici e cosa serve in questo momento.",
      ],
      uk: [
        "[Текст-заповнювач] Ми організовуємо збори найнеобхіднішого та відправляємо їх до лікарень, центрів прихистку та громад в Україні разом із перевіреними партнерами.",
        "Опишіть тут напрямки, логістичних партнерів і те, що потрібно зараз.",
      ],
    },
  },
  {
    slug: "accoglienza",
    icon: Home,
    title: { it: "Accoglienza e integrazione", uk: "Підтримка переселенців" },
    summary: {
      it: "Supporto alle famiglie ucraine a Rimini: documenti, lingua, lavoro, scuola.",
      uk: "Допомога українським родинам у Ріміні: документи, мова, робота, школа.",
    },
    body: {
      it: [
        "[Testo segnaposto] Accompagniamo chi arriva in Italia nelle pratiche burocratiche, nella ricerca di casa e lavoro e nell'inserimento scolastico dei bambini.",
      ],
      uk: [
        "[Текст-заповнювач] Ми супроводжуємо тих, хто приїжджає до Італії: документи, пошук житла та роботи, влаштування дітей до школи.",
      ],
    },
  },
  {
    slug: "cultura",
    icon: Palette,
    title: { it: "Cultura ed eventi", uk: "Культура та події" },
    summary: {
      it: "Concerti, mostre e incontri per far conoscere la cultura ucraina.",
      uk: "Концерти, виставки та зустрічі, що знайомлять з українською культурою.",
    },
    body: {
      it: ["[Testo segnaposto] Organizziamo eventi aperti alla cittadinanza per raccontare tradizioni, storia e attualità dell'Ucraina."],
      uk: ["[Текст-заповнювач] Ми організовуємо відкриті події, що розповідають про традиції, історію та сьогодення України."],
    },
  },
  {
    slug: "bambini",
    icon: HandHeart,
    title: { it: "Bambini e famiglie", uk: "Діти та родини" },
    summary: {
      it: "Laboratori, doposcuola e momenti di socialità per i più piccoli.",
      uk: "Майстер-класи, позашкільні заняття та дозвілля для найменших.",
    },
    body: {
      it: ["[Testo segnaposto] Creiamo spazi sicuri dove i bambini possono imparare, giocare e mantenere il legame con la lingua ucraina."],
      uk: ["[Текст-заповнювач] Ми створюємо безпечний простір, де діти можуть навчатися, гратися та зберігати зв'язок з українською мовою."],
    },
  },
];
