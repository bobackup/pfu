import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isLocale, useT } from "@/i18n";
import { pageHead } from "@/lib/seo";
import { ACTIVITIES } from "@/lib/activities";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/$lang/activities/$slug")({
  loader: ({ params }) => {
    const a = ACTIVITIES.find((x) => x.slug === params.slug);
    if (!a) throw notFound();
    return { slug: a.slug };
  },
  head: ({ params, matches }) => {
    const a = ACTIVITIES.find((x) => x.slug === params.slug);
    const l = isLocale(params.lang) ? params.lang : "it";
    if (!a) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    return pageHead({ lang: params.lang, matches }, `/activities/${a.slug}`, a.title[l], a.summary[l]);
  },
  component: ActivityDetail,
});

function ActivityDetail() {
  const { slug } = Route.useLoaderData();
  const { lang, t } = useT();
  const a = ACTIVITIES.find((x) => x.slug === slug)!;
  return (
    <>
      <PageHero title={a.title[lang]} intro={a.summary[lang]} />
      <article className="container-site max-w-3xl py-14">
        <Link to="/$lang/activities" params={{ lang }} className="inline-flex items-center gap-1 text-sm font-semibold text-primary"><ArrowLeft className="size-4" /> {t.nav.activities}</Link>
        <div className="prose-site mt-8 text-lg text-foreground/85">
          {a.body[lang].map((p) => <p key={p}>{p}</p>)}
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-4 rounded-2xl bg-accent-soft p-6">
          <p className="flex-1 font-semibold">{t.activities.related}</p>
          <Button asChild variant="donate" className="rounded-full"><Link to="/$lang/donate" params={{ lang }}><Heart /> {t.nav.donate}</Link></Button>
          <Button asChild variant="outline" className="rounded-full"><Link to="/$lang/get-involved" params={{ lang }}>{t.nav.involved}</Link></Button>
        </div>
      </article>
    </>
  );
}
