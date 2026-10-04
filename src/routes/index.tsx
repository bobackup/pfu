import { createFileRoute, redirect } from "@tanstack/react-router";
import { getPreferredLang } from "@/lib/origin.functions";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    // Server reads Accept-Language; on client navigations use the browser language.
    const lang =
      typeof window === "undefined"
        ? await getPreferredLang()
        : navigator.language.toLowerCase().startsWith("uk") ? "uk" : "it";
    throw redirect({ to: "/$lang", params: { lang } });
  },
  head: () => ({
    meta: [
      { title: "People for Ukraine — Associazione ucraino-italiana a Rimini" },
      { name: "description", content: "Aiuti umanitari, accoglienza e cultura ucraina a Rimini." },
      { property: "og:title", content: "People for Ukraine — Rimini" },
      { property: "og:description", content: "Aiuti umanitari, accoglienza e cultura ucraina a Rimini." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});
