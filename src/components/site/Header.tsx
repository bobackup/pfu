import { Link, useLocation } from "@tanstack/react-router";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LOCALES, LOCALE_LABELS, useT } from "@/i18n";
import { Logo } from "./Logo";
import { ORG } from "@/lib/site";

export function Header() {
  const { lang, t } = useT();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const rest = pathname.replace(/^\/(it|uk)/, "");

  const links = [
    { to: "/$lang/about", label: t.nav.about },
    { to: "/$lang/activities", label: t.nav.activities },
    { to: "/$lang/news", label: t.nav.news, external: true },
    { to: "/$lang/get-involved", label: t.nav.involved },
    { to: "/$lang/contact", label: t.nav.contact },
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="ornament-band" aria-hidden />
      <div className="container-site flex h-16 items-center justify-between gap-4">
        <Logo lang={lang} />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {links.map((l) => ("external" in l ? (
            <a key={l.to} href={ORG.socials.facebook} target="_blank" rel="noopener noreferrer" className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary">{l.label}</a>
          ) : (
            <Link
              key={l.to}
              to={l.to}
              params={{ lang }}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              {l.label}
            </Link>
          )))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="flex rounded-full border p-0.5 text-xs font-semibold" role="group" aria-label={t.nav.language}>
            {LOCALES.map((loc) => (
              <a
                key={loc}
                href={`/${loc}${rest}`}
                hrefLang={loc}
                lang={loc}
                aria-current={loc === lang ? "true" : undefined}
                className={`rounded-full px-2.5 py-1 ${loc === lang ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-primary"}`}
                title={LOCALE_LABELS[loc].name}
              >
                {LOCALE_LABELS[loc].short}
              </a>
            ))}
          </div>
          <Button asChild variant="donate" className="hidden rounded-full sm:inline-flex">
            <Link to="/$lang/donate" params={{ lang }}>
              <Heart /> {t.nav.donate}
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? t.nav.close : t.nav.menu}>
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {open && (
        <nav className="border-t bg-background lg:hidden" aria-label="Mobile">
          <div className="container-site flex flex-col py-3">
            {links.map((l) => ("external" in l ? (
              <a key={l.to} href={ORG.socials.facebook} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="py-3 text-base font-medium">{l.label}</a>
            ) : (
              <Link key={l.to} to={l.to} params={{ lang }} onClick={() => setOpen(false)} className="py-3 text-base font-medium">
                {l.label}
              </Link>
            )))}
            <Button asChild variant="donate" className="mt-2 rounded-full">
              <Link to="/$lang/donate" params={{ lang }} onClick={() => setOpen(false)}>
                <Heart /> {t.nav.donate}
              </Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
