import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Facebook, Instagram, Mail, MapPin, Phone, Send } from "lucide-react";
import { getDict, useT } from "@/i18n";
import { pageHead } from "@/lib/seo";
import { ORG, isRealSocial } from "@/lib/site";
import { PageHero } from "@/components/site/PageHero";
import { SubmissionForm } from "@/components/site/SubmissionForm";

export const Route = createFileRoute("/$lang/contact")({
  head: ({ params, matches }) => {
    const t = getDict(params.lang);
    return pageHead({ lang: params.lang, matches }, "/contact", t.contact.title, t.contact.intro);
  },
  component: Contact,
});

function Contact() {
  const { t } = useT();
  const [showMap, setShowMap] = useState(false);
  return (
    <>
      <PageHero title={t.contact.title} intro={t.contact.intro} />
      <section className="container-site grid gap-10 py-14 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-2xl border bg-card p-6 shadow-card md:p-8">
          <SubmissionForm kind="contact" />
        </div>
        <div className="space-y-6">
          <ul className="space-y-4">
            <li className="flex gap-3"><Mail className="size-5 text-primary" /><a href={`mailto:${ORG.email}`} className="font-semibold">{ORG.email}</a></li>
            <li className="flex gap-3"><Phone className="size-5 text-primary" /><span className="font-semibold">{ORG.phone}</span></li>
            <li className="flex gap-3"><MapPin className="size-5 text-primary" /><span><span className="block text-xs uppercase text-muted-foreground">{t.contact.address}</span><span className="font-semibold">{ORG.address}</span></span></li>
          </ul>
          <div>
            <p className="text-sm font-semibold text-muted-foreground">{t.contact.follow}</p>
            <div className="mt-2 flex gap-3">
              {isRealSocial(ORG.socials.facebook) && <a href={ORG.socials.facebook} aria-label="Facebook" className="rounded-full bg-secondary p-2.5"><Facebook className="size-5 text-primary" /></a>}
              {isRealSocial(ORG.socials.instagram) && <a href={ORG.socials.instagram} aria-label="Instagram" className="rounded-full bg-secondary p-2.5"><Instagram className="size-5 text-primary" /></a>}
              {isRealSocial(ORG.socials.telegram) && <a href={ORG.socials.telegram} aria-label="Telegram" className="rounded-full bg-secondary p-2.5"><Send className="size-5 text-primary" /></a>}
            </div>
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-2xl border bg-muted">
            {showMap ? (
              <iframe title="Google Maps" src={ORG.mapEmbed} className="size-full" loading="lazy" />
            ) : (
              <div className="grid size-full place-items-center p-6 text-center">
                <div>
                  <MapPin className="mx-auto mb-2 size-8 text-primary" />
                  <p className="text-sm font-semibold">Google Maps — San Giovanni in Marignano</p>
                  <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm font-semibold">
                    <button type="button" onClick={() => setShowMap(true)} className="rounded-full bg-primary px-4 py-2 text-primary-foreground">{t.contact.showMap}</button>
                    <a href={ORG.mapLink} target="_blank" rel="noopener noreferrer" className="rounded-full border px-4 py-2 text-primary">{t.contact.openMap}</a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
