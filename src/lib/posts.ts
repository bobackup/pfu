import type { Database } from "@/integrations/supabase/types";

export type Post = Database["public"]["Tables"]["posts"]["Row"];
export type PostCategory = Database["public"]["Enums"]["post_category"];
export const CATEGORIES: PostCategory[] = ["news", "event", "report", "press"];

/** An event is archived once its date is strictly before today (Europe/Rome calendar day). */
export function isPastEvent(post: Pick<Post, "category" | "event_date">, now: Date = new Date()): boolean {
  if (post.category !== "event" || !post.event_date) return false;
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Rome" }).format(now); // YYYY-MM-DD
  return post.event_date < today;
}

export function formatDate(date: string, lang: string) {
  const d = new Date(date.length === 10 ? `${date}T12:00:00` : date);
  return new Intl.DateTimeFormat(lang === "uk" ? "uk-UA" : "it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}
