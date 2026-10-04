import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useT } from "@/i18n";

const KEY = "pfu-cookie-consent";

export function useCookieConsent() {
  const [value, setValue] = useState<string | null>("pending");
  useEffect(() => {
    setValue(localStorage.getItem(KEY));
    const h = () => setValue(localStorage.getItem(KEY));
    window.addEventListener("pfu-consent", h);
    return () => window.removeEventListener("pfu-consent", h);
  }, []);
  return value;
}

export function CookieBanner() {
  const { lang, t } = useT();
  const consent = useCookieConsent();
  if (consent !== null) return null;
  const set = (v: string) => {
    localStorage.setItem(KEY, v);
    window.dispatchEvent(new Event("pfu-consent"));
  };
  return (
    <div role="dialog" aria-live="polite" aria-label="Cookie" className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-2xl border bg-card p-5 shadow-card md:flex md:items-center md:gap-6">
      <p className="text-sm text-muted-foreground">
        {t.cookie.text}{" "}
        <Link to="/$lang/cookies" params={{ lang }} className="font-semibold text-primary underline">{t.cookie.more}</Link>
      </p>
      <div className="mt-4 flex shrink-0 gap-2 md:mt-0">
        <Button variant="outline" onClick={() => set("necessary")}>{t.cookie.reject}</Button>
        <Button onClick={() => set("all")}>{t.cookie.accept}</Button>
      </div>
    </div>
  );
}
