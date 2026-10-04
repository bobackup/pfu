import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { isLocale, useT } from "@/i18n";
import { getRequestOrigin } from "@/lib/origin.functions";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CookieBanner } from "@/components/site/CookieBanner";

export const Route = createFileRoute("/$lang")({
  beforeLoad: ({ params }) => {
    if (!isLocale(params.lang)) throw notFound();
  },
  // Absolute origin for canonical/hreflang/og:url; fetched once per session.
  loader: async () => ({ origin: await getRequestOrigin() }),
  staleTime: Infinity,
  component: LangLayout,
  notFoundComponent: () => (
    <SiteFrame>
      <div className="container-site py-24 text-center">
        <h1 className="text-5xl font-bold text-primary">404</h1>
      </div>
    </SiteFrame>
  ),
});

function SiteFrame({ children }: { children: React.ReactNode }) {
  const { t } = useT();
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">
        {t.common.skip}
      </a>
      <Header />
      <main id="main" className="flex-1">{children}</main>
      <Footer />
      <CookieBanner />
    </div>
  );
}

function LangLayout() {
  return (
    <SiteFrame>
      <Outlet />
    </SiteFrame>
  );
}
