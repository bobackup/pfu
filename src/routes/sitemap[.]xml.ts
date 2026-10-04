import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { LOCALES } from "@/i18n";
import { ACTIVITIES } from "@/lib/activities";

const STATIC = ["", "/about", "/activities", "/news", "/donate", "/get-involved", "/contact", "/privacy", "/cookies"];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin;
        const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
        const sb = createClient<Database>(process.env["SUPABASE_URL"]!, key, {
          auth: { persistSession: false },
          global: {
            fetch: (input, init) => {
              const h = new Headers(init?.headers);
              if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
              h.set("apikey", key);
              return fetch(input, { ...init, headers: h });
            },
          },
        });
        const { data } = await sb.from("posts").select("slug, updated_at").eq("published", true);
        const paths = [
          ...STATIC,
          ...ACTIVITIES.map((a) => `/activities/${a.slug}`),
          ...(data ?? []).map((p) => `/news/${p.slug}`),
        ];
        const urls = paths
          .map((p) => {
            const alts = LOCALES.map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${origin}/${l}${p}"/>`).join("");
            return LOCALES.map((l) => `<url><loc>${origin}/${l}${p}</loc>${alts}</url>`).join("");
          })
          .join("");
        const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml" } });
      },
    },
  },
});
