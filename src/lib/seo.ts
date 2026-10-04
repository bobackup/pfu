import { LOCALES, LOCALE_LABELS, type Locale } from "@/i18n";

type MatchLike = { routeId: string; loaderData?: unknown };

/** Reads the absolute origin loaded by the /$lang layout route. */
export function originFromMatches(matches: readonly MatchLike[] | undefined): string {
  const m = matches?.find((x) => x.routeId === "/$lang");
  const o = (m?.loaderData as { origin?: string } | undefined)?.origin;
  return o ?? "";
}

/** Builds per-page head() with absolute canonical, og:url, og:image and hreflang. `path` is the part after /{lang}. */
export function pageHead(
  ctx: { lang: string; matches?: readonly MatchLike[] },
  path: string,
  title: string,
  description: string,
  image?: string | null,
) {
  const lang = ctx.lang;
  const origin = originFromMatches(ctx.matches);
  const l = (LOCALES as readonly string[]).includes(lang) ? (lang as Locale) : "it";
  const fullTitle = title.includes("People for Ukraine") ? title : `${title} — People for Ukraine`;
  const url = `${origin}/${l}${path}`;
  const img = image && /^https?:\/\//.test(image) ? image : origin ? `${origin}/og-default.jpg` : null;
  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:locale", content: LOCALE_LABELS[l].og },
      { name: "twitter:card", content: "summary_large_image" },
      ...(img ? [{ property: "og:image", content: img }, { name: "twitter:image", content: img }] : []),
    ],
    links: [
      { rel: "canonical", href: url },
      ...LOCALES.map((loc) => ({ rel: "alternate", hrefLang: loc, href: `${origin}/${loc}${path}` })),
      { rel: "alternate", hrefLang: "x-default", href: `${origin}/it${path}` },
    ],
  };
}
