import { useParams } from "@tanstack/react-router";
import { it, type Dict } from "./it";
import { uk } from "./uk";

// To add English: create en.ts (typed as Dict), add "en" here and to DICTS.
export const LOCALES = ["it", "uk"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "it";

export const LOCALE_LABELS: Record<Locale, { short: string; name: string; htmlLang: string; og: string }> = {
  it: { short: "IT", name: "Italiano", htmlLang: "it", og: "it_IT" },
  uk: { short: "UA", name: "Українська", htmlLang: "uk", og: "uk_UA" },
};

const DICTS: Record<Locale, Dict> = { it, uk };

export function isLocale(v: unknown): v is Locale {
  return typeof v === "string" && (LOCALES as readonly string[]).includes(v);
}

export function getDict(lang: string): Dict {
  return DICTS[isLocale(lang) ? lang : DEFAULT_LOCALE];
}

export function useLang(): Locale {
  const params = useParams({ strict: false }) as { lang?: string };
  return isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
}

export function useT() {
  const lang = useLang();
  return { lang, t: getDict(lang) };
}

/** Pick a localized DB field (e.g. title_it / title_uk), falling back to Italian. */
export function pickLocalized<T extends Record<string, unknown>>(row: T, field: string, lang: Locale): string {
  const v = row[`${field}_${lang}`];
  if (typeof v === "string" && v.trim()) return v;
  const fb = row[`${field}_it`];
  return typeof fb === "string" ? fb : "";
}

export type { Dict };
