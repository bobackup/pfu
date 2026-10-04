import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { getDict, useT } from "@/i18n";
import { pageHead } from "@/lib/seo";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/$lang/cookies")({
  head: ({ params, matches }) => {
    const t = getDict(params.lang);
    return pageHead({ lang: params.lang, matches }, "/cookies", t.legal.cookieTitle, t.cookie.text);
  },
  component: Cookies,
});

function Cookies() {
  const { lang, t } = useT();
  const reset = () => {
    localStorage.removeItem("pfu-cookie-consent");
    window.dispatchEvent(new Event("pfu-consent"));
  };
  return (
    <>
      <PageHero title={t.legal.cookieTitle} />
      <article className="container-site prose-site max-w-3xl py-14">
        <p className="rounded-xl bg-accent-soft p-4 text-sm font-semibold">{t.legal.draft}</p>
        {lang === "uk" ? (
          <>
            <h2>Технічні cookie</h2><p>Необхідні для роботи сайту (напр. збереження вашого вибору щодо cookie та сесії адміністраторів). Не потребують згоди.</p>
            <h2>Сторонні cookie</h2><p>Вбудовані карти Google завантажуються лише після вашої згоди.</p>
          </>
        ) : (
          <>
            <h2>Cookie tecnici</h2><p>Necessari al funzionamento del sito (es. memorizzare la tua scelta sui cookie e la sessione degli amministratori). Non richiedono consenso.</p>
            <h2>Cookie di terze parti</h2><p>Le mappe di Google incorporate vengono caricate solo dopo il tuo consenso.</p>
          </>
        )}
        <Button variant="outline" onClick={reset} className="mt-4">{t.cookie.more} — reset</Button>
      </article>
    </>
  );
}
