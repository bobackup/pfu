import { Link } from "@tanstack/react-router";
import { useRef, useState, type FormEvent } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useT } from "@/i18n";

type Kind = "contact" | "volunteer" | "member" | "partner" | "newsletter";

interface Props {
  kind: Kind;
  compact?: boolean; // newsletter: email only
  messageLabel?: string;
  submitLabel?: string;
}

export function SubmissionForm({ kind, compact, messageLabel, submitLabel }: Props) {
  const { lang, t } = useT();
  const started = useRef(Date.now());
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const schema = z.object({
    name: compact ? z.string().optional() : z.string().trim().min(1, t.common.required).max(200),
    email: z.string().trim().email(t.common.invalidEmail).max(255),
    phone: z.string().trim().max(50).optional(),
    message: compact ? z.string().optional() : z.string().trim().min(1, t.common.required).max(5000),
    consent: z.literal(true, { message: t.common.consentRequired }),
  });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    // Anti-spam: honeypot field + minimum fill time
    if (fd.get("website") || Date.now() - started.current < 2500) {
      setStatus("sent");
      return;
    }
    const parsed = schema.safeParse({
      name: fd.get("name") ?? undefined,
      email: fd.get("email"),
      phone: (fd.get("phone") as string) || undefined,
      message: fd.get("message") ?? undefined,
      consent: fd.get("consent") === "on",
    });
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("sending");
    const { error } = await supabase.from("submissions").insert({
      kind,
      name: parsed.data.name || null,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      message: parsed.data.message || null,
      locale: lang,
      consent: true,
    });
    setStatus(error ? "error" : "sent");
  }

  if (status === "sent") {
    return <p role="status" className="rounded-xl bg-accent-soft p-5 font-semibold text-accent-foreground">{t.common.sent}</p>;
  }

  const err = (k: string) => errors[k] && <p id={`${kind}-${k}-err`} className="mt-1 text-sm text-destructive">{errors[k]}</p>;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div aria-hidden className="absolute -left-[9999px]">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      {!compact && (
        <div>
          <Label htmlFor={`${kind}-name`}>{t.common.name} *</Label>
          <Input id={`${kind}-name`} name="name" autoComplete="name" className="mt-1" aria-invalid={!!errors.name} aria-describedby={errors.name ? `${kind}-name-err` : undefined} />
          {err("name")}
        </div>
      )}
      <div className={compact ? "flex flex-col gap-2 sm:flex-row" : ""}>
        <div className="flex-1">
          <Label htmlFor={`${kind}-email`} className={compact ? "sr-only" : ""}>{t.common.email} *</Label>
          <Input id={`${kind}-email`} name="email" type="email" autoComplete="email" placeholder={compact ? t.common.email : undefined} className="mt-1" aria-invalid={!!errors.email} aria-describedby={errors.email ? `${kind}-email-err` : undefined} />
          {err("email")}
        </div>
        {compact && (
          <Button type="submit" className="mt-1" disabled={status === "sending"}>
            {status === "sending" ? t.common.sending : submitLabel ?? t.common.send}
          </Button>
        )}
      </div>
      {!compact && (
        <>
          <div>
            <Label htmlFor={`${kind}-phone`}>{t.common.phone}</Label>
            <Input id={`${kind}-phone`} name="phone" type="tel" autoComplete="tel" className="mt-1" />
          </div>
          <div>
            <Label htmlFor={`${kind}-message`}>{messageLabel ?? t.common.message} *</Label>
            <Textarea id={`${kind}-message`} name="message" rows={5} className="mt-1" aria-invalid={!!errors.message} aria-describedby={errors.message ? `${kind}-message-err` : undefined} />
            {err("message")}
          </div>
        </>
      )}
      <div>
        <label className="flex items-start gap-3 text-sm text-muted-foreground">
          <input type="checkbox" name="consent" className="mt-1 size-4 accent-primary" aria-invalid={!!errors.consent} />
          <span>
            {t.common.consent}{" "}
            <Link to="/$lang/privacy" params={{ lang }} className="font-semibold text-primary underline">{t.common.privacyLink}</Link>
          </span>
        </label>
        {err("consent")}
      </div>
      {status === "error" && <p role="alert" className="text-sm text-destructive">{t.common.error}</p>}
      {!compact && (
        <Button type="submit" size="lg" disabled={status === "sending"}>
          {status === "sending" ? t.common.sending : submitLabel ?? t.common.send}
        </Button>
      )}
    </form>
  );
}
