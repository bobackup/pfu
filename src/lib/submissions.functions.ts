import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";
import { RATE_LIMITS, isRateLimited, shouldNotify } from "./submission-email";

const schema = z
  .object({
    kind: z.enum(["contact", "volunteer", "member", "partner", "newsletter"]),
    name: z.string().trim().max(200).optional(),
    email: z.string().trim().email().max(255),
    phone: z.string().trim().max(50).optional(),
    message: z.string().trim().max(5000).optional(),
    locale: z.enum(["it", "uk", "en"]),
    consent: z.literal(true),
    website: z.string().max(200).optional(), // honeypot
    elapsedMs: z.number().int().min(0).max(86_400_000),
  })
  .refine((d) => d.kind === "newsletter" || (!!d.name && !!d.message), { message: "missing fields" });

async function sha256(value: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}

export type SubmitResult = { ok: true } | { ok: false; error: "rate_limited" | "failed" };

export const submitForm = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => schema.parse(input))
  .handler(async ({ data }): Promise<SubmitResult> => {
    // Bots: pretend success, store nothing.
    if (data.website || data.elapsedMs < 2500) return { ok: true };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const ip =
      getRequestHeader("cf-connecting-ip") ??
      getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";
    const ipKey = `ip:${await sha256(ip)}`;
    const emailKey = `email:${await sha256(data.email.toLowerCase())}`;

    const countSince = async (key: string, minutes: number) => {
      const since = new Date(Date.now() - minutes * 60_000).toISOString();
      const { count } = await supabaseAdmin
        .from("submission_rate_limits")
        .select("id", { count: "exact", head: true })
        .eq("key_hash", key)
        .gte("created_at", since);
      return count ?? 0;
    };

    // Housekeeping: drop rate-limit rows older than a day.
    await supabaseAdmin
      .from("submission_rate_limits")
      .delete()
      .lt("created_at", new Date(Date.now() - 86_400_000).toISOString());

    const [ipCount, emailCount] = await Promise.all([
      countSince(ipKey, RATE_LIMITS.ip.windowMinutes),
      countSince(emailKey, RATE_LIMITS.email.windowMinutes),
    ]);
    if (isRateLimited(ipCount, RATE_LIMITS.ip.max) || isRateLimited(emailCount, RATE_LIMITS.email.max)) {
      return { ok: false, error: "rate_limited" };
    }
    await supabaseAdmin.from("submission_rate_limits").insert([{ key_hash: ipKey }, { key_hash: emailKey }]);

    const { data: row, error } = await supabaseAdmin
      .from("submissions")
      .insert({
        kind: data.kind,
        name: data.name || null,
        email: data.email,
        phone: data.phone || null,
        message: data.message || null,
        locale: data.locale,
        consent: true,
      })
      .select("id, created_at")
      .single();
    if (error || !row) {
      console.error("[submitForm] insert failed:", error?.message);
      return { ok: false, error: "failed" };
    }

    if (shouldNotify(data.kind)) {
      try {
        const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
        await sendTemplateEmail("submission-notification", "", {
          templateData: {
            kind: data.kind,
            name: data.name,
            email: data.email,
            phone: data.phone,
            message: data.message,
            locale: data.locale,
            receivedAt: new Date(row.created_at).toLocaleString("it-IT", { timeZone: "Europe/Rome" }),
          },
          replyTo: data.email,
          idempotencyKey: `submission-notify-${row.id}`,
        });
      } catch (e) {
        const code = (e as { code?: string })?.code ?? (e as Error)?.message;
        console.error(`[submitForm] notification failed for submission ${row.id}:`, code);
      }
    }
    return { ok: true };
  });
