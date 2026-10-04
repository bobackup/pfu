import { Link } from "@tanstack/react-router";
import { CalendarDays, MapPin } from "lucide-react";
import { pickLocalized, useT } from "@/i18n";
import { formatDate, isPastEvent, type Post } from "@/lib/posts";

export function PostCard({ post }: { post: Post }) {
  const { lang, t } = useT();
  const past = isPastEvent(post);
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-card transition hover:-translate-y-0.5">
      <div className="relative aspect-[16/9] bg-secondary">
        {post.cover_url ? (
          <img src={post.cover_url} alt="" loading="lazy" className="size-full object-cover" />
        ) : (
          <div className="ornament-dots grid size-full place-items-center bg-primary text-primary-foreground/60">
            <span className="font-display text-2xl">{t.news.categories[post.category]}</span>
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-background/95 px-3 py-1 text-xs font-bold text-primary">
          {t.news.categories[post.category]}
        </span>
        {past && <span className="absolute right-3 top-3 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">{t.news.pastBadge}</span>}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="size-3.5" />
            {formatDate(post.event_date ?? post.published_at, lang)}
            {post.event_time ? ` · ${post.event_time}` : ""}
          </span>
          {post.location && <span className="inline-flex items-center gap-1"><MapPin className="size-3.5" />{post.location}</span>}
        </div>
        <h3 className="text-lg font-semibold leading-snug">
          <Link to="/$lang/news/$slug" params={{ lang, slug: post.slug }} className="hover:text-primary">
            {pickLocalized(post, "title", lang)}
          </Link>
        </h3>
        <p className="line-clamp-3 text-sm text-muted-foreground">{pickLocalized(post, "excerpt", lang)}</p>
      </div>
    </article>
  );
}
