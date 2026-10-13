import { createFileRoute } from "@tanstack/react-router";
import { getDict, useT } from "@/i18n";
import { pageHead } from "@/lib/seo";
import { FacebookFeed } from "@/components/site/FacebookFeed";
import { PageHero } from "@/components/site/PageHero";

// Keep existing public URLs usable while news is published on Facebook.
export const Route = createFileRoute("/$lang/news/")({
  head: ({ params, matches }) => {
    const t = getDict(params.lang);
    return pageHead({ lang: params.lang, matches }, "/news", t.news.title, t.news.intro);
  },
  component: News,
});

function News() {
  const { t } = useT();
  return (
    <>
      <PageHero title={t.news.title} intro={t.news.intro} />
      <section className="container-site py-12">
        <FacebookFeed />
      </section>
    </>
  );
}
