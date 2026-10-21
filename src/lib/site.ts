// Organisation details. Values in [brackets] are placeholders to replace with real data.
import statutoPdf from "@/assets/statuto-public.pdf.asset.json";

export const ORG = {
  name: "People for Ukraine",
  legalName: "People for Ukraine ODV-ETS",
  legalForm: "ODV — Organismo di Volontariato (Ente del Terzo Settore)",
  address: "Via Dei Mille, 16 — 47842 San Giovanni in Marignano (RN), Italia",
  codiceFiscale: "91185700407",
  iban: "IT07S0306909606100000186199",
  ibanDisplay: "IT07 S030 6909 6061 0000 0186 199",
  bankHolder: "PEOPLEFORUKRAINE ODV-ETS",
  bankName: "Intesa Sanpaolo",
  swift: "BCITITMM",
  donationCausal: "Donazione di beneficenza",
  paymentUrl: "https://paypal.me/PeopleforUkraine",
  email: "info@people4ukraine.org",
  mapEmbed: "https://www.google.com/maps?q=Via%20Dei%20Mille%2016%2C%2047842%20San%20Giovanni%20in%20Marignano%20(RN)%2C%20Italia&output=embed",
  mapLink: "https://maps.google.com/?q=Via+Dei+Mille+16,+47842+San+Giovanni+in+Marignano+(RN),+Italia",
  socials: {
    facebook: "https://www.facebook.com/peopleforukraine",
    instagram: "https://www.instagram.com/people_for_ukraine",
    telegram: "https://t.me/",
  },
  statutoUrl: statutoPdf.url,
};

/** True when a value is filled in (not empty and not a [bracketed] placeholder). */
export function isReal(v: string | null | undefined): v is string {
  return !!v && !/^\s*\[.*\]\s*$/.test(v);
}

/** Social URLs that point to an actual profile (a bare domain like https://facebook.com/ counts as unset). */
export function isRealSocial(u: string | null | undefined): boolean {
  return isReal(u) && /^https?:\/\/[^/]+\/[^/?#]+/.test(u);
}

export function realSocials(): string[] {
  return Object.values(ORG.socials).filter(isRealSocial);
}

// Supporting partners. Each entry: name, website, logo (CDN asset URL).
// Add new partners here as logos arrive; remove a placeholder slot from
// the home page "Con il sostegno di" grid when the list is full.
import omegaLogo from "@/assets/omega-logistica.svg.asset.json";
import smartLogo from "@/assets/smart-technologies.png.asset.json";
import aidCorpLogo from "@/assets/aid-corp-ukraine.jpg.asset.json";

export const PARTNERS: { name: string; url?: string; logo: string }[] = [
  { name: "Omega Logistica", url: "https://www.omegalogistica.it", logo: omegaLogo.url },
  { name: "Smart Technologies", url: "https://www.smarttechnologies.com.ua/", logo: smartLogo.url },
  { name: "Aid Corp Ukraine charitable foundation", logo: aidCorpLogo.url },
];

/** Share of donations per area, same order as dict donate.where. */
export const DONATION_SHARES = [40, 20, 40] as const;
