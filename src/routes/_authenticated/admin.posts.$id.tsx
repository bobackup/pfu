import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { CATEGORIES } from "@/lib/posts";

type Insert = Database["public"]["Tables"]["posts"]["Insert"];

export const Route = createFileRoute("/_authenticated/admin/posts/$id")({
  component: EditPost,
});

const empty: Insert = {
  slug: "", category: "news", title_it: "", title_uk: "", excerpt_it: "", excerpt_uk: "", body_it: "", body_uk: "",
  cover_url: null, event_date: null, event_time: null, location: null, map_url: null, registration_url: null, published: false,
};

const slugify = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);

function EditPost() {
  const { id } = Route.useParams();
  const isNew = id === "new";
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [form, setForm] = useState<Insert>(empty);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const { data } = useQuery({
    queryKey: ["admin-post", id],
    enabled: !isNew,
    queryFn: async () => {
      const { data, error } = await supabase.from("posts").select("*").eq("id", id).single();
      if (error) throw error;
      return data;
    },
  });
  useEffect(() => { if (data) setForm(data); }, [data]);

  const set = <K extends keyof Insert>(k: K, v: Insert[K]) => setForm((f) => ({ ...f, [k]: v }));
  const field = (k: keyof Insert) => ({
    value: (form[k] as string | null) ?? "",
    onChange: (e: { target: { value: string } }) => set(k, (e.target.value || (k.startsWith("title") || k.startsWith("excerpt") || k.startsWith("body") ? "" : null)) as never),
  });

  async function upload(file: File) {
    setUploading(true);
    const path = `${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;
    const { error } = await supabase.storage.from("post-images").upload(path, file);
    if (error) { setUploading(false); { toast.error(error.message); return; } }
    // Long-lived signed URL (bucket is private)
    const { data: signed, error: e2 } = await supabase.storage.from("post-images").createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
    setUploading(false);
    if (e2 || !signed) { toast.error(e2?.message ?? "Errore"); return; }
    set("cover_url", signed.signedUrl);
  }

  async function save(e: FormEvent) {
    e.preventDefault();
    if (!form.title_it.trim()) { toast.error("Il titolo italiano è obbligatorio"); return; }
    const payload = { ...form, slug: form.slug?.trim() ? slugify(form.slug) : slugify(form.title_it) };
    setSaving(true);
    const { error } = isNew
      ? await supabase.from("posts").insert(payload)
      : await supabase.from("posts").update(payload).eq("id", id);
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Salvato");
    qc.invalidateQueries({ queryKey: ["admin-posts"] });
    qc.invalidateQueries({ queryKey: ["posts"] });
    navigate({ to: "/admin" });
  }

  const isEvent = form.category === "event";

  return (
    <form onSubmit={save} className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{isNew ? "Nuovo contenuto" : "Modifica contenuto"}</h1>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm font-semibold">
            <input type="checkbox" checked={!!form.published} onChange={(e) => set("published", e.target.checked)} className="size-4 accent-primary" /> Pubblicato
          </label>
          <Button type="submit" disabled={saving}>{saving ? "Salvataggio…" : "Salva"}</Button>
        </div>
      </div>

      <div className="grid gap-4 rounded-2xl border bg-card p-6 md:grid-cols-3">
        <div>
          <Label htmlFor="cat">Categoria</Label>
          <select id="cat" value={form.category} onChange={(e) => set("category", e.target.value as Insert["category"])} className="mt-1 h-10 w-full rounded-md border bg-background px-3">
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div><Label htmlFor="slug">Slug (URL)</Label><Input id="slug" {...field("slug")} placeholder="generato dal titolo" className="mt-1" /></div>
        <div><Label htmlFor="pub">Data pubblicazione</Label><Input id="pub" type="date" value={(form.published_at ?? new Date().toISOString()).slice(0, 10)} onChange={(e) => set("published_at", new Date(e.target.value).toISOString())} className="mt-1" /></div>
        <div className="md:col-span-3">
          <Label>Immagine di copertina</Label>
          <div className="mt-1 flex items-center gap-4">
            {form.cover_url && <img src={form.cover_url} alt="" className="h-16 w-28 rounded object-cover" />}
            <Input type="file" accept="image/*" disabled={uploading} onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
            {form.cover_url && <Button type="button" variant="ghost" size="sm" onClick={() => set("cover_url", null)}>Rimuovi</Button>}
          </div>
        </div>
      </div>

      {isEvent && (
        <div className="grid gap-4 rounded-2xl border bg-card p-6 md:grid-cols-3">
          <div><Label htmlFor="ed">Data evento</Label><Input id="ed" type="date" {...field("event_date")} className="mt-1" /></div>
          <div><Label htmlFor="et">Ora</Label><Input id="et" type="time" {...field("event_time")} className="mt-1" /></div>
          <div><Label htmlFor="loc">Luogo</Label><Input id="loc" {...field("location")} className="mt-1" /></div>
          <div className="md:col-span-1"><Label htmlFor="map">Link mappa</Label><Input id="map" type="url" {...field("map_url")} className="mt-1" /></div>
          <div className="md:col-span-2"><Label htmlFor="reg">Link iscrizione</Label><Input id="reg" type="url" {...field("registration_url")} className="mt-1" /></div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {(["it", "uk"] as const).map((l) => (
          <div key={l} className="space-y-4 rounded-2xl border bg-card p-6">
            <h2 className="font-sans text-sm font-bold uppercase tracking-wider text-primary">{l === "it" ? "Italiano" : "Українська"}</h2>
            <div><Label htmlFor={`t-${l}`}>Titolo{l === "it" && " *"}</Label><Input id={`t-${l}`} {...field(`title_${l}`)} className="mt-1" /></div>
            <div><Label htmlFor={`e-${l}`}>Sommario</Label><Textarea id={`e-${l}`} rows={2} {...field(`excerpt_${l}`)} className="mt-1" /></div>
            <div><Label htmlFor={`b-${l}`}>Testo (paragrafi separati da riga vuota)</Label><Textarea id={`b-${l}`} rows={12} {...field(`body_${l}`)} className="mt-1" /></div>
          </div>
        ))}
      </div>
    </form>
  );
}
