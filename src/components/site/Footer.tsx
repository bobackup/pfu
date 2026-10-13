import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Send } from "lucide-react";
import { useT } from "@/i18n";
import { ORG, isRealSocial } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  const { lang, t } = useT();
  return (
    <footer className="mt-24 bg-primary-deep text-primary-foreground">
      <div className="bg-accent text-accent-foreground">
        <div className="container-site flex flex-wrap items-center justify-center gap-2 py-3 text-center text-sm font-semibold">
          {t.footer.five} <span className="font-mono">{ORG.codiceFiscale}</span>
        </div>
      </div>
      <div className="container-site grid gap-10 py-14 md:grid-cols-4">
        <div className="space-y-4">
          <Logo lang={lang} inverted />
          <p className="text-sm text-primary-foreground/70">{t.footer.tagline}</p>
          <div className="flex gap-3">
            {isRealSocial(ORG.socials.facebook) && <a href={ORG.socials.facebook} aria-label="Facebook" className="rounded-full bg-primary-foreground/10 p-2 hover:bg-primary-foreground/20"><Facebook className="size-4" /></a>}
            {isRealSocial(ORG.socials.instagram) && <a href={ORG.socials.instagram} aria-label="Instagram" className="rounded-full bg-primary-foreground/10 p-2 hover:bg-primary-foreground/20"><Instagram className="size-4" /></a>}
            {isRealSocial(ORG.socials.telegram) && <a href={ORG.socials.telegram} aria-label="Telegram" className="rounded-full bg-primary-foreground/10 p-2 hover:bg-primary-foreground/20"><Send className="size-4" /></a>}
          </div>
        </div>
        <div>
          <h2 className="mb-3 font-sans text-sm font-bold uppercase tracking-wider text-accent">{t.footer.nav}</h2>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/$lang/about" params={{ lang }}>{t.nav.about}</Link></li>
            <li><Link to="/$lang/activities" params={{ lang }}>{t.nav.activities}</Link></li>
            <li><Link to="/$lang/news" params={{ lang }}>{t.nav.news}</Link></li>
            <li><Link to="/$lang/get-involved" params={{ lang }}>{t.nav.involved}</Link></li>
            <li><Link to="/$lang/donate" params={{ lang }}>{t.nav.donate}</Link></li>
            <li><Link to="/$lang/contact" params={{ lang }}>{t.nav.contact}</Link></li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <h2 className="mb-3 font-sans text-sm font-bold uppercase tracking-wider text-accent">{t.footer.legal}</h2>
          <address className="space-y-1 text-sm not-italic text-primary-foreground/80">
            <p className="font-semibold text-primary-foreground">{ORG.legalName}</p>
            <p>{ORG.legalForm}</p>
            <p>{ORG.address}</p>
            <p>C.F. {ORG.codiceFiscale}</p>
            <p>{ORG.email} · {ORG.phone}</p>
          </address>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="container-site flex flex-wrap justify-between gap-3 py-5 text-xs text-primary-foreground/60">
          <span>© {new Date().getFullYear()} People for Ukraine. {t.footer.rights}</span>
          <span className="flex gap-4">
            <Link to="/$lang/privacy" params={{ lang }}>{t.footer.privacy}</Link>
            <Link to="/$lang/cookies" params={{ lang }}>{t.footer.cookies}</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
