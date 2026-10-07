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
  const a = ACTIVITIES.find((x) => x.slug === slug);
  if (!a) return null;
  return (
    <>
      <PageHero title={a.title[lang]} intro={a.summary[lang]} />
      <article className="container-site max-w-3xl py-14">
        <Link to="/$lang/activities" params={{ lang }} className="inline-flex items-center gap-1 text-sm font-semibold text-primary"><ArrowLeft className="size-4" /> {t.nav.activities}</Link>
        <img src={a.image} alt={a.imageAlt[lang]} className="mt-8 aspect-[16/9] w-full rounded-2xl object-cover shadow-card" />
        <div className="prose-site mt-8 text-lg text-foreground/85">
          {a.body[lang].map((p) => <p key={p}>{p}</p>)}
        </div>
        <section className="mt-12" aria-labelledby="activity-gallery-title">
          <h2 id="activity-gallery-title" className="text-2xl font-semibold">{t.activities.gallery}</h2>
          <div className="mt-6 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {a.gallery.filter((photo) => photo.src !== a.image).map((photo) => (
              <img
                key={photo.src}
                src={photo.src}
                alt={photo.alt[lang]}
                loading="lazy"
                className="mb-4 block h-auto w-full break-inside-avoid rounded-2xl shadow-card"
              />
            ))}
          </div>
        </section>
        <div className="mt-10 flex flex-wrap items-center gap-4 rounded-2xl bg-accent-soft p-6">
          <p className="flex-1 font-semibold">{t.activities.related}</p>
          <Button asChild variant="donate" className="rounded-full"><Link to="/$lang/donate" params={{ lang }}><Heart /> {t.nav.donate}</Link></Button>
          <Button asChild variant="outline" className="rounded-full"><Link to="/$lang/get-involved" params={{ lang }}>{t.nav.involved}</Link></Button>
        </div>
      </article>
    </>
  );
}
