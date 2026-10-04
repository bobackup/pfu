import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/submissions")({
  component: Submissions,
});

const KINDS = ["all", "contact", "volunteer", "member", "partner", "newsletter"] as const;

function Submissions() {
  const qc = useQueryClient();
  const [kind, setKind] = useState<(typeof KINDS)[number]>("all");
  const { data = [], isLoading } = useQuery({
    queryKey: ["submissions"],
    queryFn: async () => {
      const { data, error } = await supabase.from("submissions").select("*").order("created_at", { ascending: false }).limit(500);
      if (error) throw error;
      return data;
    },
  });
  const rows = data.filter((r) => kind === "all" || r.kind === kind);

  async function remove(id: string) {
    if (!confirm("Eliminare questo messaggio?")) return;
    const { error } = await supabase.from("submissions").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    qc.invalidateQueries({ queryKey: ["submissions"] });
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">Messaggi ricevuti</h1>
      <div className="mt-4 flex flex-wrap gap-2">
        {KINDS.map((k) => (
          <Button key={k} size="sm" variant={k === kind ? "default" : "outline"} onClick={() => setKind(k)}>
            {k} {k !== "all" && `(${data.filter((r) => r.kind === k).length})`}
          </Button>
        ))}
      </div>
      <div className="mt-6 space-y-3">
        {isLoading && <p>Caricamento…</p>}
        {!isLoading && rows.length === 0 && <p className="text-muted-foreground">Nessun messaggio.</p>}
        {rows.map((r) => (
          <div key={r.id} className="rounded-2xl border bg-card p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-bold text-primary">{r.kind}</span>
                <span className="font-semibold">{r.name ?? "—"}</span>
                <a href={`mailto:${r.email}`} className="text-primary underline">{r.email}</a>
                {r.phone && <span>{r.phone}</span>}
                <span className="text-xs uppercase text-muted-foreground">{r.locale}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                {new Date(r.created_at).toLocaleString("it-IT")}
                <Button size="sm" variant="ghost" className="text-destructive" onClick={() => remove(r.id)}>Elimina</Button>
              </div>
            </div>
            {r.message && <p className="mt-3 whitespace-pre-line text-sm">{r.message}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
