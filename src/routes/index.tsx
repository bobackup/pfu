import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/$lang", params: { lang: "it" } });
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
