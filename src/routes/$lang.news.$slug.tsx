import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft, CalendarDays, Clock, ExternalLink, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDict, isLocale, pickLocalized, useT } from "@/i18n";
import { pageHead } from "@/lib/seo";
import { postQuery } from "@/lib/queries";
import { formatDate, isPastEvent } from "@/lib/posts";

export const Route = createFileRoute("/$lang/news/$slug")({
  loader: async ({ context, params }) => {
    const post = await context.queryClient.ensureQueryData(postQuery(params.slug));
    if (!post) throw notFound();
    return post;
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    const l = isLocale(params.lang) ? params.lang : "it";
    const title = pickLocalized(loaderData, "title", l);
    const head = pageHead(params.lang, `/news/${params.slug}`, title, pickLocalized(loaderData, "excerpt", l));
    const meta: Array<Record<string, string>> = [...head.meta];
    if (loaderData.cover_url?.startsWith("https://")) {
      meta.push({ property: "og:image", content: loaderData.cover_url }, { name: "twitter:image", content: loaderData.cover_url });
    }
    const scripts =
      loaderData.category === "event" && loaderData.event_date
        ? [{
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              name: title,
              startDate: `${loaderData.event_date}${loaderData.event_time ? `T${loaderData.event_time}` : ""}`,
              location: { "@type": "Place", name: loaderData.location ?? "Rimini", address: loaderData.location ?? "Rimini" },
              organizer: { "@type": "Organization", name: "People for Ukraine" },
            }),
          }]
        : [];
    return { ...head, meta, scripts };
  },
  notFoundComponent: () => {
    const t = getDict("it");
    return <div className="container-site py-24 text-center text-xl">{t.news.notFound}</div>;
  },
  component: PostDetail,
});

function PostDetail() {
  const { slug } = Route.useParams();
  const { data: post } = useSuspenseQuery(postQuery(slug));
  const { lang, t } = useT();
  if (!post) return null;
  const past = isPastEvent(post);
  return (
    <article className="container-site max-w-3xl py-12">
      <Link to="/$lang/news" params={{ lang }} className="inline-flex items-center gap-1 text-sm font-semibold text-primary"><ArrowLeft className="size-4" /> {t.nav.news}</Link>
      <p className="eyebrow mt-8">{t.news.categories[post.category]}{past && ` · ${t.news.pastBadge}`}</p>
      <h1 className="mt-3 text-3xl font-semibold md:text-5xl">{pickLocalized(post, "title", lang)}</h1>
      <p className="mt-4 text-lg text-muted-foreground">{pickLocalized(post, "excerpt", lang)}</p>

      {post.category === "event" && post.event_date && (
        <div className="mt-8 grid gap-4 rounded-2xl border bg-secondary p-6 sm:grid-cols-3">
          <div><div className="text-xs font-semibold uppercase text-muted-foreground">{t.news.date}</div><div className="mt-1 flex items-center gap-2 font-semibold"><CalendarDays className="size-4 text-primary" />{formatDate(post.event_date, lang)}</div></div>
          {post.event_time && <div><div className="text-xs font-semibold uppercase text-muted-foreground">{t.news.time}</div><div className="mt-1 flex items-center gap-2 font-semibold"><Clock className="size-4 text-primary" />{post.event_time}</div></div>}
          {post.location && <div><div className="text-xs font-semibold uppercase text-muted-foreground">{t.news.place}</div><div className="mt-1 flex items-center gap-2 font-semibold"><MapPin className="size-4 text-primary" />{post.location}</div></div>}
          <div className="flex flex-wrap gap-2 sm:col-span-3">
            {post.map_url && <Button asChild variant="outline" size="sm"><a href={post.map_url} target="_blank" rel="noopener noreferrer"><MapPin /> {t.news.map}</a></Button>}
            {post.registration_url && !past && <Button asChild size="sm"><a href={post.registration_url} target="_blank" rel="noopener noreferrer"><ExternalLink /> {t.news.register}</a></Button>}
          </div>
        </div>
      )}

      {post.cover_url && <img src={post.cover_url} alt="" className="mt-10 w-full rounded-2xl object-cover" />}
      <div className="prose-site mt-10 text-lg text-foreground/85">
        {pickLocalized(post, "body", lang).split(/\n{2,}/).map((p, i) => <p key={i} className="whitespace-pre-line">{p}</p>)}
      </div>
      <p className="mt-10 text-sm text-muted-foreground">{formatDate(post.published_at, lang)}</p>
    </article>
  );
}
