import { createFileRoute } from "@tanstack/react-router";
import { Handshake, HeartHandshake, UserPlus } from "lucide-react";
import { useState } from "react";
import { getDict, useT } from "@/i18n";
import { pageHead } from "@/lib/seo";
import { PageHero } from "@/components/site/PageHero";
import { SubmissionForm } from "@/components/site/SubmissionForm";

export const Route = createFileRoute("/$lang/get-involved")({
  head: ({ params }) => {
    const t = getDict(params.lang);
    return pageHead(params.lang, "/get-involved", t.involved.title, t.involved.intro);
  },
  component: Involved,
});

const TYPES = [
  { key: "volunteer", icon: HeartHandshake },
  { key: "member", icon: UserPlus },
  { key: "partner", icon: Handshake },
] as const;

function Involved() {
  const { t } = useT();
  const [kind, setKind] = useState<(typeof TYPES)[number]["key"]>("volunteer");
  return (
    <>
      <PageHero title={t.involved.title} intro={t.involved.intro} />
      <section className="container-site max-w-4xl py-14">
        <h2 className="text-xl font-semibold">{t.involved.pick}</h2>
        <div role="radiogroup" className="mt-5 grid gap-4 md:grid-cols-3">
          {TYPES.map(({ key, icon: Icon }) => (
            <button
              key={key}
              role="radio"
              aria-checked={kind === key}
              onClick={() => setKind(key)}
              className={`rounded-2xl border-2 p-5 text-left transition ${kind === key ? "border-primary bg-secondary" : "bg-card hover:border-primary/40"}`}
            >
              <Icon className="size-6 text-primary" />
              <div className="mt-3 font-semibold">{t.involved.types[key]}</div>
              <p className="mt-1 text-sm text-muted-foreground">{t.involved.typeDesc[key]}</p>
            </button>
          ))}
        </div>
        <div className="mt-10 rounded-2xl border bg-card p-6 shadow-card md:p-8">
          <SubmissionForm key={kind} kind={kind} messageLabel={t.involved.messageLabel} />
        </div>
      </section>
    </>
  );
}
