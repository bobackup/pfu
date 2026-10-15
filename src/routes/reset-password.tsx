import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Reimposta password — People for Ukraine" },
      { name: "description", content: "Imposta una nuova password per l'area riservata." },
      { property: "og:title", content: "Reimposta password — People for Ukraine" },
      { property: "og:description", content: "Imposta una nuova password per l'area riservata." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    // The recovery link lands here with type=recovery in the URL hash;
    // the Supabase client exchanges it for a recovery session automatically.
    const hash = window.location.hash;
    if (hash.includes("type=recovery")) {
      setReady(true);
      return;
    }
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setReady(true);
    });
    return () => subscription.unsubscribe();
  }, []);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const password = String(fd.get("password"));
    setBusy(true);
    setMsg(null);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) return setMsg(error.message);
    setMsg("Password aggiornata. Ora puoi accedere.");
    setTimeout(() => navigate({ to: "/auth" }), 1500);
  }

  return (
    <div className="grid min-h-screen place-items-center bg-secondary px-4">
      <div className="w-full max-w-sm rounded-2xl border bg-card p-8 shadow-card">
        <div className="ornament-band mb-6" aria-hidden />
        <h1 className="text-2xl font-semibold">Reimposta password</h1>
        <p className="mt-1 text-sm text-muted-foreground">People for Ukraine — editor</p>
        {ready ? (
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <Label htmlFor="password">Nuova password</Label>
              <Input id="password" name="password" type="password" required minLength={8} autoComplete="new-password" className="mt-1" />
            </div>
            {msg && <p role="status" className="text-sm text-muted-foreground">{msg}</p>}
            <Button type="submit" className="w-full" disabled={busy}>Salva nuova password</Button>
          </form>
        ) : (
          <p className="mt-6 text-sm text-muted-foreground">
            Il link di reimpostazione non è valido o è scaduto. Richiedine uno nuovo dalla pagina di accesso.
          </p>
        )}
      </div>
    </div>
  );
}
