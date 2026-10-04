import { createFileRoute } from "@tanstack/react-router";
import { getDict, useT } from "@/i18n";
import { pageHead } from "@/lib/seo";
import { ORG } from "@/lib/site";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/$lang/privacy")({
  head: ({ params, matches }) => {
    const t = getDict(params.lang);
    return pageHead({ lang: params.lang, matches }, "/privacy", t.legal.privacyTitle, t.legal.draft);
  },
  component: Privacy,
});

function Privacy() {
  const { lang, t } = useT();
  return (
    <>
      <PageHero title={t.legal.privacyTitle} />
      <article className="container-site prose-site max-w-3xl py-14">
        <p className="rounded-xl bg-accent-soft p-4 text-sm font-semibold">{t.legal.draft}</p>
        {lang === "uk" ? (
          <>
            <h2>Контролер даних</h2><p>{ORG.legalName}, {ORG.address}, {ORG.email}.</p>
            <h2>Які дані ми збираємо</h2><p>Ім'я, email, телефон і повідомлення, які ви надсилаєте через форми сайту.</p>
            <h2>Мета та правова підстава</h2><p>Відповідь на ваші запити та розсилка новин на підставі вашої згоди (ст. 6.1.a GDPR).</p>
            <h2>Зберігання</h2><p>Дані зберігаються не довше, ніж потрібно для зазначених цілей. [Вкажіть термін]</p>
            <h2>Ваші права</h2><p>Ви можете в будь-який момент запросити доступ, виправлення чи видалення даних, написавши на {ORG.email}.</p>
          </>
        ) : (
          <>
            <h2>Titolare del trattamento</h2><p>{ORG.legalName}, {ORG.address}, {ORG.email}.</p>
            <h2>Dati raccolti</h2><p>Nome, email, telefono e messaggio inviati tramite i moduli del sito.</p>
            <h2>Finalità e base giuridica</h2><p>Rispondere alle richieste e inviare la newsletter, sulla base del consenso (art. 6.1.a GDPR).</p>
            <h2>Conservazione</h2><p>I dati sono conservati per il tempo necessario alle finalità indicate. [Indicare il periodo]</p>
            <h2>Diritti dell'interessato</h2><p>Puoi chiedere in qualsiasi momento accesso, rettifica o cancellazione scrivendo a {ORG.email}. Hai diritto di reclamo al Garante Privacy.</p>
          </>
        )}
      </article>
    </>
  );
}
