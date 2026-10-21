import type { Locale } from "@/i18n";
import home01 from "@/assets/gallery/home-01.webp.asset.json";
import home02 from "@/assets/gallery/home-02.webp.asset.json";
import home03 from "@/assets/gallery/home-03.webp.asset.json";
import home04 from "@/assets/gallery/home-04.webp.asset.json";
import home05 from "@/assets/gallery/home-05.webp.asset.json";
import vehicles01 from "@/assets/gallery/vehicles-01.webp.asset.json";
import vehicles02 from "@/assets/gallery/vehicles-02.webp.asset.json";
import vehicles03 from "@/assets/gallery/vehicles-03.webp.asset.json";
import vehicles04 from "@/assets/gallery/vehicles-04.webp.asset.json";
import vehicles05 from "@/assets/gallery/vehicles-05.webp.asset.json";
import vehicles06 from "@/assets/gallery/vehicles-06.webp.asset.json";
import vehicles07 from "@/assets/gallery/vehicles-07.webp.asset.json";
import vehicles08 from "@/assets/gallery/vehicles-08.webp.asset.json";
import vehicles09 from "@/assets/gallery/vehicles-09.webp.asset.json";
import vehicles10 from "@/assets/gallery/vehicles-10.webp.asset.json";
import humanitarian01 from "@/assets/gallery/humanitarian-01.webp.asset.json";
import humanitarian02 from "@/assets/gallery/humanitarian-02.webp.asset.json";
import humanitarian03 from "@/assets/gallery/humanitarian-03.webp.asset.json";
import humanitarian04 from "@/assets/gallery/humanitarian-04.webp.asset.json";
import culture01 from "@/assets/gallery/culture-01.webp.asset.json";
import culture02 from "@/assets/gallery/culture-02.webp.asset.json";
import culture03 from "@/assets/gallery/culture-03.webp.asset.json";
import culture04 from "@/assets/gallery/culture-04.webp.asset.json";
import culture05 from "@/assets/gallery/culture-05.webp.asset.json";
import culture06 from "@/assets/gallery/culture-06.webp.asset.json";
import culture07 from "@/assets/gallery/culture-07.webp.asset.json";
import culture08 from "@/assets/gallery/culture-08.webp.asset.json";
import culture09 from "@/assets/gallery/culture-09.webp.asset.json";
import culture10 from "@/assets/gallery/culture-10.webp.asset.json";
import culture11 from "@/assets/gallery/culture-11.webp.asset.json";
import culture12 from "@/assets/gallery/culture-12.webp.asset.json";
import culture13 from "@/assets/gallery/culture-13.webp.asset.json";
import culture14 from "@/assets/gallery/culture-14.webp.asset.json";
import culture15 from "@/assets/gallery/culture-15.webp.asset.json";
import field01 from "@/assets/gallery/field-support-01.webp.asset.json";
import field02 from "@/assets/gallery/field-support-02.webp.asset.json";
import field03 from "@/assets/gallery/field-support-03.webp.asset.json";
import field04 from "@/assets/gallery/field-support-04.webp.asset.json";
import field05 from "@/assets/gallery/field-support-05.webp.asset.json";
import field06 from "@/assets/gallery/field-support-06.webp.asset.json";
import field07 from "@/assets/gallery/field-support-07.webp.asset.json";
import field08 from "@/assets/gallery/field-support-08.webp.asset.json";
import vehicles11 from "@/assets/gallery/vehicles-11.webp.asset.json";

export interface GalleryPhoto {
  src: string;
  alt: Record<Locale, string>;
}

const photo = (asset: { url: string }, it: string, uk: string): GalleryPhoto => ({
  src: asset.url,
  alt: { it, uk },
});

export const HOME_GALLERY: GalleryPhoto[] = [
  photo(home01, "Volontari con un'ambulanza destinata all'Ucraina", "Волонтери біля машини швидкої допомоги для України"),
  photo(home02, "Medico ucraino con una targa di riconoscimento", "Український лікар із пам'ятною відзнакою"),
  photo(home03, "Attestato di ringraziamento a People for Ukraine", "Подяка асоціації People for Ukraine"),
  photo(home04, "Incontro della comunità ucraina durante un evento benefico", "Зустріч української громади під час благодійного заходу"),
  photo(home05, "Bandiere delle brigate ucraine sostenute dall'associazione", "Прапори українських бригад, яким допомагає асоціація"),
];

export const VEHICLES_GALLERY: GalleryPhoto[] = [
  photo(vehicles01, "Fuoristrada preparato per la consegna in Ucraina", "Позашляховик, підготовлений до передачі в Україну"),
  photo(vehicles02, "Consegna di un veicolo con la bandiera ucraina", "Передача автомобіля з українським прапором"),
  photo(vehicles03, "Fuoristrada blu destinato alle necessità operative", "Синій позашляховик для оперативних потреб"),
  photo(vehicles04, "Vista laterale di un fuoristrada consegnato", "Вигляд збоку переданого позашляховика"),
  photo(vehicles05, "Veicolo fuoristrada con il simbolo di People for Ukraine", "Позашляховик із символікою People for Ukraine"),
  photo(vehicles06, "Caricamento di aiuti in un veicolo diretto in Ucraina", "Завантаження допомоги в автомобіль, що прямує в Україну"),
  photo(vehicles07, "Ambulanza consegnata con il sostegno dei volontari", "Машина швидкої допомоги, передана за підтримки волонтерів"),
  photo(vehicles08, "Attrezzature mediche e aiuti all'interno di un'ambulanza", "Медичне обладнання й допомога всередині швидкої"),
  photo(vehicles09, "Consegna di materiali accanto alle ambulanze", "Передача матеріалів поруч із машинами швидкої допомоги"),
  photo(vehicles10, "Vano di un mezzo di soccorso carico di aiuti", "Відсік рятувального автомобіля, завантажений допомогою"),
];

export const HUMANITARIAN_GALLERY: GalleryPhoto[] = [
  photo(humanitarian01, "Carico di aiuti umanitari preparato dai volontari", "Вантаж гуманітарної допомоги, підготовлений волонтерами"),
  photo(humanitarian02, "Camion carico di scatole destinate all'Ucraina", "Вантажівка з коробками допомоги для України"),
  photo(humanitarian03, "Raccolta di aiuti e mezzi nel centro logistico", "Збір допомоги й транспорт у логістичному центрі"),
  photo(humanitarian04, "Bancali di aiuti umanitari pronti per la spedizione", "Палети гуманітарної допомоги, готові до відправлення"),
];

export const CULTURE_GALLERY: GalleryPhoto[] = [
  photo(culture01, "Famiglie e bambini durante un'iniziativa della comunità", "Родини й діти під час заходу громади"),
  photo(culture02, "Veglia pubblica con candele per l'Ucraina", "Громадська акція зі свічками на підтримку України"),
  photo(culture03, "Comunità ucraina riunita con bandiere e candele", "Українська громада з прапорами та свічками"),
  photo(culture04, "Partecipanti in attesa all'ingresso di un'iniziativa", "Учасники біля входу на громадський захід"),
  photo(culture05, "Bambina durante un'attività dedicata alle famiglie", "Дівчинка під час заходу для родин"),
  photo(culture06, "Volontari e famiglie durante un incontro di sostegno", "Волонтери й родини під час зустрічі підтримки"),
  photo(culture07, "Manifestazione serale con bandiere ucraine", "Вечірня акція з українськими прапорами"),
  photo(culture08, "Partecipanti con un cartello per la vittoria e la pace in Ucraina", "Учасники з плакатом за перемогу та мир в Україні"),
  photo(culture09, "Grande bandiera ucraina portata durante una manifestazione pubblica", "Великий український прапор під час громадської акції"),
  photo(culture10, "Intervento pubblico accanto alle bandiere ucraina ed europea", "Публічний виступ поруч із прапорами України та Європейського Союзу"),
  photo(culture11, "Comunità riunita con una grande bandiera ucraina", "Громада з великим українським прапором під час акції"),
  photo(culture12, "Partecipanti a una manifestazione per l'Ucraina nel centro cittadino", "Учасники акції на підтримку України в центрі міста"),
  photo(culture13, "Manifestazione cittadina con bandiere ucraine e una grande bandiera condivisa", "Міська акція з українськими прапорами та великим спільним прапором"),
  photo(culture14, "Incontro internazionale a sostegno dell'Ucraina e dell'Europa", "Міжнародна зустріч на підтримку України та Європи"),
  photo(culture15, "Delegazione di People for Ukraine durante un incontro associativo", "Делегація People for Ukraine під час зустрічі асоціацій"),
  photo(vehicles11, "Ambulanza colpita dalle forze russe, esposta durante un'iniziativa pubblica", "Машина швидкої допомоги, обстріляна російськими військами, показана на публічній акції"),
];

export const FIELD_SUPPORT_GALLERY: GalleryPhoto[] = [
  photo(field01, "Militare ucraino con una fornitura ricevuta", "Український військовий з отриманою допомогою"),
  photo(field02, "Consegna di generi alimentari a un militare", "Передача продуктів харчування військовому"),
  photo(field03, "Militari con medicinali e materiali consegnati", "Військові з переданими ліками та матеріалами"),
  photo(field04, "Gruppo di militari con le forniture ricevute", "Група військових з отриманим спорядженням"),
  photo(field05, "Consegna diretta di equipaggiamento e beni essenziali", "Безпосередня передача спорядження й необхідних речей"),
  photo(field06, "Militari con materiali ricevuti sul campo", "Військові з матеріалами, отриманими на місцях"),
  photo(field07, "Aiuti consegnati a persone in una zona colpita dalla guerra", "Допомога, передана людям у постраждалому від війни районі"),
  photo(field08, "Cura degli animali sostenuti dalla rete di volontari", "Догляд за тваринами, яким допомагає волонтерська мережа"),
];