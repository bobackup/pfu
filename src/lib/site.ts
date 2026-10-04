// Organisation details. Values in [brackets] are placeholders to replace with real data.
export const ORG = {
  name: "People for Ukraine",
  legalName: "[Associazione People for Ukraine APS]",
  legalForm: "[Associazione di Promozione Sociale — da verificare]",
  address: "[Via Esempio 1, 47921 Rimini (RN), Italia]",
  codiceFiscale: "[00000000000]",
  iban: "[IT00 X000 0000 0000 0000 0000 000]",
  bankHolder: "[Associazione People for Ukraine]",
  bankName: "[Nome Banca]",
  paymentUrl: "https://example.com/dona", // placeholder external payment link
  email: "[info@example.org]",
  phone: "[+39 000 000 0000]",
  mapEmbed: "https://www.google.com/maps?q=Rimini&output=embed",
  mapLink: "https://maps.google.com/?q=Rimini",
  socials: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    telegram: "https://t.me/",
  },
  statutoUrl: "#", // replace with the uploaded Statuto PDF
};

// Supporting partners. Each entry: name, website, logo (CDN asset URL).
// Add new partners here as logos arrive; remove a placeholder slot from
// the home page "Con il sostegno di" grid when the list is full.
import omegaLogo from "@/assets/omega-logistica.svg.asset.json";
import smartLogo from "@/assets/smart-technologies.png.asset.json";

export const PARTNERS: { name: string; url: string; logo: string }[] = [
  { name: "Omega Logistica", url: "https://www.omegalogistica.it", logo: omegaLogo.url },
  { name: "Smart Technologies", url: "https://www.smarttechnologies.com.ua/", logo: smartLogo.url },
];
