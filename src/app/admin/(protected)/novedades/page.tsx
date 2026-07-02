"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

type Novedad = {
  id: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string | null;
  image_url: string | null;
  published_at: string;
  is_published: boolean;
};

const input: React.CSSProperties = {
  padding: "11px 13px",
  border: "1.5px solid #E7E3D9",
  borderRadius: 10,
  fontFamily: "inherit",
  fontSize: 14,
  outline: "none",
  background: "#fff",
  width: "100%",
};
const card: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #EDEFF5",
  borderRadius: 16,
  padding: 24,
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
}

export default function AdminNovedades() {
  const [items, setItems] = useState<Novedad[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const [category, setCategory] = useState("Acción social");
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("novedades")
      .select("*")
      .order("published_at", { ascending: false });
    if (error) setErr(error.message);
    setItems((data as Novedad[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setErr(null);
    const { error } = await supabase.from("novedades").insert({
      slug: `${slugify(title)}-${Math.floor(Math.random() * 10000)}`,
      category,
      title,
      excerpt,
      image_url: imageUrl || null,
      is_published: true,
    });
    setSaving(false);
    if (error) {
      setErr(error.message);
    } else {
      setTitle("");
      setExcerpt("");
      setImageUrl("");
      load();
    }
  }

  async function togglePublish(n: Novedad) {
    await supabase
      .from("novedades")
      .update({ is_published: !n.is_published })
      .eq("id", n.id);
    load();
  }

  async function remove(id: string) {
    await supabase.from("novedades").delete().eq("id", id);
    load();
  }

  return (
    <>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 30, margin: "0 0 20px" }}>
        Novedades
      </h1>

      <div style={{ ...card, marginBottom: 26 }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 20, margin: "0 0 16px" }}>
          Nueva publicación
        </h2>
        <form onSubmit={create} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="dc-input"
              style={{ ...input, flex: "1 1 180px" }}
            >
              <option>Acción social</option>
              <option>Evangelización</option>
              <option>Testimonio</option>
              <option>Anuncio</option>
            </select>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título"
              className="dc-input"
              style={{ ...input, flex: "2 1 260px" }}
            />
          </div>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Extracto / resumen"
            rows={2}
            className="dc-input"
            style={{ ...input, resize: "vertical" }}
          />
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="URL de imagen (opcional)"
            className="dc-input"
            style={input}
          />
          {err && <p style={{ fontSize: 13, color: "#C0392B", margin: 0 }}>{err}</p>}
          <button
            type="submit"
            disabled={saving}
            className="dc-gold"
            style={{
              alignSelf: "flex-start",
              padding: "12px 22px",
              background: "#C8A96E",
              color: "#fff",
              fontWeight: 600,
              fontSize: 14,
              border: "none",
              borderRadius: 11,
              cursor: saving ? "default" : "pointer",
              fontFamily: "inherit",
              opacity: saving ? 0.7 : 1,
            }}
          >
            {saving ? "Publicando…" : "Publicar"}
          </button>
        </form>
      </div>

      {loading ? (
        <p style={{ color: "#9AA0AC" }}>Cargando…</p>
      ) : items.length === 0 ? (
        <p style={{ color: "#9AA0AC" }}>
          Aún no hay novedades. Crea la primera arriba. (Si acabas de crear las
          tablas y no aparece nada, revisa la conexión con Supabase.)
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {items.map((n) => (
            <div
              key={n.id}
              style={{ ...card, display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}
            >
              <div style={{ flex: "1 1 240px" }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 4 }}>
                  <span
                    style={{
                      padding: "3px 9px",
                      background: "#FBF7F0",
                      color: "#B7965A",
                      borderRadius: 999,
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    {n.category}
                  </span>
                  {!n.is_published && (
                    <span style={{ fontSize: 11.5, color: "#C0392B", fontWeight: 600 }}>
                      Borrador
                    </span>
                  )}
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18 }}>
                  {n.title}
                </div>
              </div>
              <button
                onClick={() => togglePublish(n)}
                style={btn}
              >
                {n.is_published ? "Ocultar" : "Publicar"}
              </button>
              <button onClick={() => remove(n.id)} style={{ ...btn, color: "#C0392B" }}>
                Borrar
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

const btn: React.CSSProperties = {
  padding: "9px 14px",
  border: "1.5px solid #EDEFF5",
  background: "#fff",
  borderRadius: 10,
  fontSize: 13,
  fontWeight: 600,
  color: "#4A4F5E",
  cursor: "pointer",
  fontFamily: "inherit",
};
