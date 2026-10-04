import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { z } from "zod";
import { getDict, useT } from "@/i18n";
import { pageHead } from "@/lib/seo";
import { postsQuery } from "@/lib/queries";
import { CATEGORIES, isPastEvent } from "@/lib/posts";
import { PageHero } from "@/components/site/PageHero";
import { PostCard } from "@/components/site/PostCard";

const search = z.object({ cat: z.enum(["news", "event", "report", "press"]).optional() });

export const Route = createFileRoute("/$lang/news/")({
  validateSearch: search,
  loader: ({ context }) => context.queryClient.ensureQueryData(postsQuery),
  head: ({ params }) => {
    const t = getDict(params.lang);
    return pageHead(params.lang, "/news", t.news.title, t.news.intro);
  },
  component: News,
});

function News() {
  const { lang, t } = useT();
  const { cat } = Route.useSearch();
  const { data: posts } = useSuspenseQuery(postsQuery);
  const filtered = posts.filter((p) => !cat || p.category === cat);
  const current = filtered.filter((p) => !isPastEvent(p));
  const archived = filtered.filter((p) => isPastEvent(p));

  const chip = (active: boolean) =>
    `rounded-full border px-4 py-2 text-sm font-semibold transition ${active ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:border-primary"}`;

  return (
    <>
      <PageHero title={t.news.title} intro={t.news.intro} />
      <section className="container-site py-12">
        <nav className="flex flex-wrap gap-2" aria-label="Filter">
          <Link to="/$lang/news" params={{ lang }} search={{}} className={chip(!cat)}>{t.news.all}</Link>
          {CATEGORIES.map((c) => (
            <Link key={c} to="/$lang/news" params={{ lang }} search={{ cat: c }} className={chip(cat === c)}>{t.news.categories[c]}</Link>
          ))}
        </nav>
        {current.length ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{current.map((p) => <PostCard key={p.id} post={p} />)}</div>
        ) : (
          <p className="mt-10 text-muted-foreground">{t.home.noPosts}</p>
        )}
        {archived.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-semibold">{t.news.archive}</h2>
            <div className="mt-8 grid gap-6 opacity-80 md:grid-cols-2 lg:grid-cols-3">{archived.map((p) => <PostCard key={p.id} post={p} />)}</div>
          </div>
        )}
      </section>
    </>
  );
}
