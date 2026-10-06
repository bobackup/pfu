import { createFileRoute } from "@tanstack/react-router";
import { CreditCard, Landmark, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDict, useT } from "@/i18n";
import { pageHead } from "@/lib/seo";
import { ORG } from "@/lib/site";
import { PageHero } from "@/components/site/PageHero";
import { CopyField } from "@/components/site/CopyField";

export const Route = createFileRoute("/$lang/donate")({
  head: ({ params, matches }) => {
    const t = getDict(params.lang);
    return pageHead({ lang: params.lang, matches }, "/donate", t.donate.title, t.donate.intro);
  },
  component: Donate,
});

function Donate() {
  const { t } = useT();
  return (
    <>
      <PageHero title={t.donate.title} intro={t.donate.intro} />
      <section className="container-site grid gap-6 py-14 lg:grid-cols-3">
        <div className="rounded-2xl border bg-card p-7 shadow-card lg:col-span-2">
          <div className="flex items-center gap-3"><Landmark className="size-6 text-primary" /><h2 className="text-2xl font-semibold">{t.donate.bankTitle}</h2></div>
          <div className="mt-6 space-y-4">
            <CopyField label={t.donate.iban} value={ORG.iban} display={ORG.ibanDisplay} />
            <div className="grid gap-4 text-sm sm:grid-cols-3">
              <div><div className="text-xs font-semibold uppercase text-muted-foreground">{t.donate.holder}</div><div className="mt-1 font-semibold">{ORG.bankHolder}</div></div>
              <div><div className="text-xs font-semibold uppercase text-muted-foreground">{t.donate.bank}</div><div className="mt-1 font-semibold">{ORG.bankName}</div></div>
              <div><div className="text-xs font-semibold uppercase text-muted-foreground">{t.donate.swift}</div><div className="mt-1 font-mono font-semibold">{ORG.swift}</div></div>
            </div>
            <p className="text-sm text-muted-foreground">{t.donate.causalLabel} <span className="font-medium text-foreground">{ORG.donationCausal}</span></p>
          </div>
        </div>
        <div className="flex flex-col rounded-2xl bg-primary p-7 text-primary-foreground">
          <CreditCard className="size-6 text-accent" />
          <h2 className="mt-3 text-2xl font-semibold">{t.donate.onlineTitle}</h2>
          <p className="mt-2 flex-1 text-primary-foreground/80">{t.donate.onlineText}</p>
          <Button asChild variant="donate" size="lg" className="mt-6">
            <a href={ORG.paymentUrl} target="_blank" rel="noopener noreferrer">{t.donate.onlineCta}</a>
          </Button>
        </div>
        <div className="rounded-2xl border-2 border-accent bg-accent-soft p-7 lg:col-span-3">
          <h2 className="text-2xl font-semibold">{t.donate.fiveTitle}</h2>
          <p className="mt-2 mb-5 text-muted-foreground">{t.donate.fiveText}</p>
          <div className="max-w-md"><CopyField label={t.donate.cf} value={ORG.codiceFiscale} /></div>
        </div>
      </section>
      <section className="container-site py-8">
        <h2 className="text-3xl font-semibold">{t.donate.whereTitle}</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {t.donate.where.map(([title, desc]) => (
            <div key={title} className="rounded-2xl border bg-card p-6">
              <div className="placeholder-mark mb-3">[ — %]</div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">{t.donate.whereNote}</p>
      </section>
      <section className="container-site py-14">
        <div className="rounded-2xl bg-secondary p-8">
          <div className="flex items-center gap-3"><ShieldCheck className="size-6 text-success" /><h2 className="text-2xl font-semibold">{t.donate.trustTitle}</h2></div>
          <ul className="mt-5 grid gap-3 md:grid-cols-3">
            {t.donate.trust.map((x) => <li key={x} className="rounded-xl bg-card p-4 text-sm font-medium">{x}</li>)}
          </ul>
        </div>
      </section>
    </>
  );
}
