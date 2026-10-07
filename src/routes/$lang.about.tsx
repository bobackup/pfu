import { createFileRoute } from "@tanstack/react-router";
import { Check, FileDown } from "lucide-react";
import { getDict, useT } from "@/i18n";
import { pageHead } from "@/lib/seo";
import { ORG } from "@/lib/site";
import { PageHero } from "@/components/site/PageHero";
import institutionalMeeting from "@/assets/institutional-meeting.webp.asset.json";

export const Route = createFileRoute("/$lang/about")({
  head: ({ params, matches }) => {
    const t = getDict(params.lang);
    return pageHead({ lang: params.lang, matches }, "/about", t.about.title, t.about.intro);
  },
  component: About,
});

function About() {
  const { lang, t } = useT();
  return (
    <>
      <PageHero title={t.about.title} intro={t.about.intro} />
      <section className="container-site grid gap-12 py-16 md:grid-cols-[2fr_1fr]">
        <div>
          <h2 className="text-2xl font-semibold">{t.about.historyTitle}</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{t.about.history}</p>
        </div>
        <div className="rounded-2xl bg-secondary p-6">
          <h2 className="text-xl font-semibold">{t.about.missionTitle}</h2>
          <ul className="mt-4 space-y-3">
            {t.about.mission.map((m) => (
              <li key={m} className="flex gap-3 text-sm"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{m}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="bg-secondary py-16">
        <div className="container-site grid items-center gap-10 md:grid-cols-2">
          <img
            src={institutionalMeeting.url}
            alt={lang === "uk" ? "Зустріч People for Ukraine з представниками українських та італійських інституцій" : "Incontro di People for Ukraine con rappresentanti delle istituzioni ucraine e italiane"}
            loading="lazy"
            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-card"
          />
          <div>
            <h2 className="text-2xl font-semibold">{t.about.developmentTitle}</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{t.about.development}</p>
          </div>
        </div>
      </section>
      <section className="container-site py-16">
        <div className="rounded-2xl border bg-card p-8">
          <h2 className="text-2xl font-semibold">{t.about.legalTitle}</h2>
          <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
            <div><dt className="text-muted-foreground">Denominazione</dt><dd className="font-semibold">{ORG.legalName}</dd></div>
            <div><dt className="text-muted-foreground">Forma giuridica</dt><dd className="font-semibold">{ORG.legalForm}</dd></div>
            <div><dt className="text-muted-foreground">Sede legale</dt><dd className="font-semibold">{ORG.address}</dd></div>
            <div><dt className="text-muted-foreground">Codice fiscale</dt><dd className="font-mono font-semibold">{ORG.codiceFiscale}</dd></div>
          </dl>
          <a href={ORG.statutoUrl} target="_blank" rel="noopener noreferrer" download className="mt-6 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold text-primary hover:bg-secondary">
            <FileDown className="size-4" /> {t.about.statuto}
          </a>
        </div>
      </section>
    </>
  );
}
