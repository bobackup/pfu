import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { formatDate } from "@/lib/posts";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: AdminPosts,
});

function AdminPosts() {
  const qc = useQueryClient();
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["admin-posts"],
    queryFn: async () => {
      const { data, error } = await supabase.from("posts").select("*").order("published_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  async function remove(id: string) {
    if (!confirm("Eliminare questo contenuto?")) return;
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Eliminato");
    qc.invalidateQueries({ queryKey: ["admin-posts"] });
    qc.invalidateQueries({ queryKey: ["posts"] });
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">News & eventi</h1>
        <Button asChild><Link to="/admin/posts/$id" params={{ id: "new" }}><Plus /> Nuovo</Link></Button>
      </div>
      <div className="mt-6 overflow-x-auto rounded-2xl border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted text-left text-xs uppercase text-muted-foreground">
            <tr><th className="p-3">Titolo</th><th className="p-3">Categoria</th><th className="p-3">Data</th><th className="p-3">Stato</th><th className="p-3" /></tr>
          </thead>
          <tbody>
            {isLoading && <tr><td className="p-3" colSpan={5}>Caricamento…</td></tr>}
            {posts.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-3 font-medium">{p.title_it}</td>
                <td className="p-3">{p.category}</td>
                <td className="p-3">{formatDate(p.event_date ?? p.published_at, "it")}</td>
                <td className="p-3">{p.published ? <span className="text-success">Pubblicato</span> : <span className="text-muted-foreground">Bozza</span>}</td>
                <td className="p-3 text-right whitespace-nowrap">
                  <Button asChild size="sm" variant="outline"><Link to="/admin/posts/$id" params={{ id: p.id }}>Modifica</Link></Button>{" "}
                  <Button size="sm" variant="ghost" className="text-destructive" onClick={() => remove(p.id)}>Elimina</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
