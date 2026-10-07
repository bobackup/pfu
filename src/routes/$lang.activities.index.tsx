import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { getDict, useT } from "@/i18n";
import { pageHead } from "@/lib/seo";
import { ACTIVITIES } from "@/lib/activities";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/$lang/activities/")({
  head: ({ params, matches }) => {
    const t = getDict(params.lang);
    return pageHead({ lang: params.lang, matches }, "/activities", t.activities.title, t.activities.intro);
  },
  component: Activities,
});

function Activities() {
  const { lang, t } = useT();
  return (
    <>
      <PageHero title={t.activities.title} intro={t.activities.intro} />
      <section className="container-site grid gap-6 py-16 md:grid-cols-2">
        {ACTIVITIES.map((a) => (
          <Link key={a.slug} to="/$lang/activities/$slug" params={{ lang, slug: a.slug }} className="group overflow-hidden rounded-2xl border bg-card shadow-card transition hover:-translate-y-1">
            <img src={a.image} alt={a.imageAlt[lang]} loading="lazy" className="aspect-[16/7] w-full object-cover" />
            <div className="p-7">
              <span className="grid size-12 place-items-center rounded-xl bg-primary text-primary-foreground"><a.icon className="size-6" /></span>
              <h2 className="text-xl font-semibold group-hover:text-primary">{a.title[lang]}</h2>
              <p className="mt-2 text-muted-foreground">{a.summary[lang]}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">{t.common.readMore} <ArrowRight className="size-4" /></span>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
