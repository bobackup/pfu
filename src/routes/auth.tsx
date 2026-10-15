import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Area riservata — People for Ukraine" },
      { name: "description", content: "Accesso per gli editor dell'associazione." },
      { property: "og:title", content: "Area riservata — People for Ukraine" },
      { property: "og:description", content: "Accesso per gli editor dell'associazione." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"in" | "up" | "reset">("in");
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email"));
    const password = String(fd.get("password"));
    setBusy(true);
    setMsg(null);
    if (mode === "in") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) return setMsg(error.message);
      navigate({ to: "/admin" });
    } else if (mode === "up") {
      const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/auth` } });
      setBusy(false);
      setMsg(error ? error.message : "Controlla la tua email per confermare l'account, poi accedi.");
    } else {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      setBusy(false);
      setMsg(error ? error.message : "Ti abbiamo inviato un'email con il link per impostare una nuova password.");
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-secondary px-4">
      <div className="w-full max-w-sm rounded-2xl border bg-card p-8 shadow-card">
        <div className="ornament-band mb-6" aria-hidden />
        <h1 className="text-2xl font-semibold">Area riservata</h1>
        <p className="mt-1 text-sm text-muted-foreground">People for Ukraine — editor</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" required autoComplete="email" className="mt-1" /></div>
          {mode !== "reset" && (
            <div><Label htmlFor="password">Password</Label><Input id="password" name="password" type="password" required minLength={8} autoComplete={mode === "in" ? "current-password" : "new-password"} className="mt-1" /></div>
          )}
          {msg && <p role="status" className="text-sm text-muted-foreground">{msg}</p>}
          <Button type="submit" className="w-full" disabled={busy}>
            {mode === "in" ? "Accedi" : mode === "up" ? "Crea account" : "Invia link di reimpostazione"}
          </Button>
        </form>
        <div className="mt-4 flex flex-col gap-2 text-sm">
          {mode === "in" && (
            <button className="text-left text-primary underline" onClick={() => { setMode("reset"); setMsg(null); }}>
              Password dimenticata?
            </button>
          )}
          <button className="text-left text-primary underline" onClick={() => { setMode(mode === "in" ? "up" : "in"); setMsg(null); }}>
            {mode === "in" ? "Nuovo editor? Crea un account" : "Hai già un account? Accedi"}
          </button>
        </div>
      </div>
    </div>
  );
}
