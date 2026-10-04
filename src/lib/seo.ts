import { LOCALES, LOCALE_LABELS, type Locale } from "@/i18n";

/** Builds per-page head() with hreflang alternates. `path` is the part after /{lang}. */
export function pageHead(lang: string, path: string, title: string, description: string) {
  const l = (LOCALES as readonly string[]).includes(lang) ? (lang as Locale) : "it";
  const fullTitle = title.includes("People for Ukraine") ? title : `${title} — People for Ukraine`;
  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: LOCALE_LABELS[l].og },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      ...LOCALES.map((loc) => ({ rel: "alternate", hrefLang: loc, href: `/${loc}${path}` })),
      { rel: "alternate", hrefLang: "x-default", href: `/it${path}` },
    ],
  };
}
