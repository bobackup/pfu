import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin — People for Ukraine" }, { name: "robots", content: "noindex" }] }),
  component: AdminLayout,
});

function AdminLayout() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  // claim_first_admin: makes the very first user admin; otherwise returns whether caller is editor.
  const { data: isEditor, isLoading } = useQuery({
    queryKey: ["is-editor", user.id],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("claim_first_admin");
      if (error) throw error;
      return !!data;
    },
  });

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  };

  return (
    <div className="min-h-screen bg-muted">
      <header className="border-b bg-card">
        <div className="container-site flex h-14 items-center justify-between gap-4">
          <nav className="flex items-center gap-4 text-sm font-semibold">
            <span className="font-display text-primary">PFU Admin</span>
            <Link to="/admin" activeOptions={{ exact: true }} activeProps={{ className: "text-primary" }}>News & eventi</Link>
            <Link to="/admin/submissions" activeProps={{ className: "text-primary" }}>Messaggi</Link>
            <a href="/it" className="text-muted-foreground">Sito ↗</a>
          </nav>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden text-muted-foreground sm:inline">{user.email}</span>
            <Button size="sm" variant="outline" onClick={signOut}>Esci</Button>
          </div>
        </div>
      </header>
      <main className="container-site py-8">
        {isLoading ? <p>Caricamento…</p> : isEditor ? <Outlet /> : (
          <div className="rounded-2xl border bg-card p-8">
            <h1 className="text-xl font-semibold">Accesso non autorizzato</h1>
            <p className="mt-2 text-muted-foreground">Il tuo account non ha ancora il ruolo di editor. Chiedi a un amministratore di abilitarlo.</p>
          </div>
        )}
      </main>
    </div>
  );
}
