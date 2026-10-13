import { useState } from "react";
import { ArrowUpRight, Facebook } from "lucide-react";
import { useT } from "@/i18n";
import { ORG } from "@/lib/site";
import { Button } from "@/components/ui/button";

/** Facebook Page Plugin (posts + events), loaded only after an explicit click for privacy. */
export function FacebookFeed() {
  const { t } = useT();
  const [show, setShow] = useState(false);
  const src = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(ORG.socials.facebook)}&tabs=timeline%2Cevents&width=500&height=800&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false`;
  return (
    <div className="mx-auto flex w-full max-w-[500px] flex-col items-center gap-4">
      {show ? (
        <iframe title="Facebook — People for Ukraine" src={src} className="h-[800px] w-full rounded-xl border bg-card" style={{ border: "none", overflow: "hidden" }} scrolling="no" allow="encrypted-media; clipboard-write; web-share" loading="lazy" />
      ) : (
        <div className="w-full rounded-xl border bg-card p-8 text-center">
          <Facebook className="mx-auto size-10 text-primary" />
          <p className="mt-4 text-sm text-muted-foreground">{t.news.fbNotice}</p>
          <Button size="lg" className="mt-6" onClick={() => setShow(true)}>{t.news.fbShow}</Button>
        </div>
      )}
      <a href={ORG.socials.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
        {t.news.fbOpen} <ArrowUpRight className="size-4" />
      </a>
    </div>
  );
}
