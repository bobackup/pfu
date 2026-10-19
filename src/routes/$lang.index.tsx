import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, CalendarDays, Heart, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDict, pickLocalized, useT } from "@/i18n";
import { pageHead } from "@/lib/seo";
import { postsQuery } from "@/lib/queries";
import { formatDate, isPastEvent } from "@/lib/posts";
import { ACTIVITIES } from "@/lib/activities";
import { ORG, PARTNERS } from "@/lib/site";
import { HOME_GALLERY } from "@/lib/gallery";
import { CopyField } from "@/components/site/CopyField";
import { SubmissionForm } from "@/components/site/SubmissionForm";
import hero from "@/assets/hero.jpg";
import community from "@/assets/community.jpg";

export const Route = createFileRoute("/$lang/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(postsQuery),
  head: ({ params, matches }) => {
    const t = getDict(params.lang);
    return pageHead({ lang: params.lang, matches }, "", `People for Ukraine — ${t.home.heroTitle}`, t.meta.siteDescription);
  },
  component: Home,
});

function Home() {
  const { lang, t } = useT();
  const { data: posts } = useSuspenseQuery(postsQuery);
  const nextEvent = posts
    .filter((p) => p.category === "event" && p.event_date && !isPastEvent(p))
    .sort((a, b) => ((a.event_date ?? "").localeCompare(b.event_date ?? "")))[0];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-deep text-primary-foreground">
        <img src={hero} alt="" width={1600} height={1008} className="absolute inset-0 size-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-deep via-primary-deep/85 to-primary-deep/30" aria-hidden />
        <div className="container-site relative py-24 md:py-36">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-accent">{t.home.heroEyebrow}</p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.1] md:text-6xl">{t.home.heroTitle}</h1>
          <p className="mt-6 max-w-xl text-lg text-primary-foreground/85">{t.home.heroText}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild variant="donate" size="lg">
              <Link to="/$lang/donate" params={{ lang }}><Heart /> {t.home.ctaDonate}</Link>
            </Button>
            <Button asChild variant="heroOutline" size="lg">
              <Link to="/$lang/get-involved" params={{ lang }}>{t.home.ctaInvolved} <ArrowRight /></Link>
            </Button>
          </div>
        </div>
        <div className="ornament-band relative" aria-hidden />
      </section>

      {/* Next event banner */}
      {nextEvent && (
        <section className="border-b bg-accent-soft">
          <div className="container-site flex flex-col gap-3 py-5 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent-foreground">{t.home.nextEvent}</span>
              <span className="font-semibold">{pickLocalized(nextEvent, "title", lang)}</span>
              <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                <CalendarDays className="size-4" /> {formatDate(nextEvent.event_date ?? "", lang)} {nextEvent.event_time && `· ${nextEvent.event_time}`}
              </span>
              {nextEvent.location && <span className="inline-flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="size-4" /> {nextEvent.location}</span>}
            </div>
            <a href={ORG.socials.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
              {t.common.readMore} <ArrowRight className="size-4" />
            </a>
          </div>
        </section>
      )}

      {/* About */}
      <section className="container-site grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
        <div>
          <p className="eyebrow">{t.home.aboutTitle}</p>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">{t.home.heroEyebrow.split("·")[0]}</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{t.home.aboutText}</p>
          <Link to="/$lang/about" params={{ lang }} className="mt-6 inline-flex items-center gap-1 font-semibold text-primary">
            {t.home.aboutLink} <ArrowRight className="size-4" />
          </Link>
        </div>
        <img src={community} alt="" loading="lazy" width={1200} height={912} className="aspect-[4/3] w-full rounded-3xl object-cover shadow-card" />
      </section>

      {/* Activities */}
      <section className="bg-secondary py-20 md:py-24">
        <div className="container-site">
          <h2 className="text-3xl font-semibold md:text-4xl">{t.home.activitiesTitle}</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ACTIVITIES.map((a) => (
              <Link key={a.slug} to="/$lang/activities/$slug" params={{ lang, slug: a.slug }} className="group rounded-2xl border bg-card p-6 shadow-card transition hover:-translate-y-1">
                <span className="grid size-12 place-items-center rounded-xl bg-primary text-primary-foreground"><a.icon className="size-6" /></span>
                <h3 className="mt-5 text-lg font-semibold group-hover:text-primary">{a.title[lang]}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{a.summary[lang]}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Verified impact */}
      <section className="container-site py-20">
        <h2 className="text-center text-2xl font-semibold md:text-3xl">{t.home.impactTitle}</h2>
        <dl className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
          {t.home.impact.map((item) => (
            <div key={item.label} className="rounded-2xl border bg-card p-7 text-center">
              <dd className="font-display text-4xl font-semibold text-primary">{item.value}</dd>
              <dt className="mt-3 text-sm text-muted-foreground">{item.label}</dt>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-center text-xs text-muted-foreground">{t.home.impactNote}</p>
      </section>

      <section className="container-site pb-20">
        <h2 className="text-2xl font-semibold md:text-3xl">{t.home.galleryTitle}</h2>
        <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {HOME_GALLERY.map((photo) => (
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

      {/* Donate CTA + 5x1000 */}
      <section className="container-site">
        <div className="ornament-dots grid gap-10 overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground md:grid-cols-2 md:p-14">
          <div>
            <h2 className="text-3xl font-semibold md:text-4xl">{t.home.donateTitle}</h2>
            <p className="mt-4 text-primary-foreground/85">{t.home.donateText}</p>
            <Button asChild variant="donate" size="lg" className="mt-8">
              <Link to="/$lang/donate" params={{ lang }}><Heart /> {t.nav.donate}</Link>
            </Button>
          </div>
          <div className="rounded-2xl bg-card p-6 text-card-foreground">
            <h3 className="text-xl font-semibold">{t.home.fiveTitle}</h3>
            <p className="mt-2 mb-4 text-sm text-muted-foreground">{t.home.fiveText}</p>
            <CopyField label={t.donate.cf} value={ORG.codiceFiscale} />
          </div>
        </div>
      </section>

      {/* Latest */}
      <section className="container-site py-20 md:py-24">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl font-semibold md:text-4xl"><a href={ORG.socials.facebook} target="_blank" rel="noopener noreferrer">{t.home.latestTitle}</a></h2>
          <a href={ORG.socials.facebook} target="_blank" rel="noopener noreferrer" className="hidden items-center gap-1 font-semibold text-primary sm:inline-flex">
            {t.common.allNews} <ArrowRight className="size-4" />
          </a>
        </div>
        <p className="mt-8 text-muted-foreground">{t.news.intro}</p>
        <Button asChild variant="outline" className="mt-6">
          <a href={ORG.socials.facebook} target="_blank" rel="noopener noreferrer">Facebook <ArrowRight /></a>
        </Button>
      </section>

      {/* Partners */}
      <section className="border-y bg-muted py-12">
        <div className="container-site">
          <h2 className="text-center font-sans text-sm font-bold uppercase tracking-widest text-muted-foreground">{t.home.partnersTitle}</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-5">
            {PARTNERS.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={p.name}
                title={p.name}
                className="grid h-16 place-items-center rounded-lg border bg-card px-4 shadow-card transition hover:-translate-y-0.5"
              >
                <img src={p.logo} alt={p.name} className="h-11 w-auto max-w-full" />
              </a>
            ))}
            {Array.from({ length: Math.max(0, 5 - PARTNERS.length) }).map((_, i) => (
              <div key={`ph-${i}`} className="grid h-16 place-items-center rounded-lg border border-dashed text-xs text-muted-foreground">
                {t.home.partnerPlaceholder} {i + 1}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container-site py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold md:text-3xl">{t.home.newsletterTitle}</h2>
          <p className="mt-3 text-muted-foreground">{t.home.newsletterText}</p>
          <div className="mt-6 text-left">
            <SubmissionForm kind="newsletter" compact submitLabel={t.home.newsletterCta} />
          </div>
        </div>
      </section>
    </>
  );
}
