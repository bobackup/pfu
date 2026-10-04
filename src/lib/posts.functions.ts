import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const listPublishedPosts = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient()
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(200);
  if (error) {
    console.error(error);
    return [];
  }
  return data ?? [];
});

export const getPublishedPost = createServerFn({ method: "GET" })
  .inputValidator((d) => z.object({ slug: z.string().min(1).max(200) }).parse(d))
  .handler(async ({ data }) => {
    const { data: post, error } = await publicClient()
      .from("posts")
      .select("*")
      .eq("published", true)
      .eq("slug", data.slug)
      .maybeSingle();
    if (error) console.error(error);
    return post ?? null;
  });
