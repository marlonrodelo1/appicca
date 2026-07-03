"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { format } from "date-fns";
import { es } from "date-fns/locale";

type Evento = {
  id: string;
  title: string;
  starts_at: string;
  location: string | null;
  mode: "presencial" | "online";
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

export default function AdminEventos() {
  const [items, setItems] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [startsAt, setStartsAt] = useState("");
  const [location, setLocation] = useState("Templo · La Matanza de Acentejo");
  const [mode, setMode] = useState<"presencial" | "online">("presencial");
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("starts_at", { ascending: true });
    if (error) setErr(error.message);
    setItems((data as Evento[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setErr(null);
    const { error } = await supabase.from("events").insert({
      title,
      starts_at: new Date(startsAt).toISOString(),
      location,
      mode,
      is_published: true,
    });
    setSaving(false);
    if (error) {
      setErr(error.message);
    } else {
      setTitle("");
      setStartsAt("");
      load();
    }
  }

  async function remove(id: string) {
    await supabase.from("events").delete().eq("id", id);
    load();
  }

  return (
    <>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 30, margin: "0 0 20px" }}>
        Eventos
      </h1>

      <div style={{ ...card, marginBottom: 26 }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 20, margin: "0 0 16px" }}>
          Nuevo evento
        </h2>
        <form onSubmit={create} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título del evento"
            className="dc-input"
            style={input}
          />
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <input
              required
              type="datetime-local"
              value={startsAt}
              onChange={(e) => setStartsAt(e.target.value)}
              className="dc-input"
              style={{ ...input, flex: "1 1 200px" }}
            />
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value as "presencial" | "online")}
              className="dc-input"
              style={{ ...input, flex: "1 1 160px" }}
            >
              <option value="presencial">Presencial</option>
              <option value="online">Online</option>
            </select>
          </div>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Lugar"
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
            {saving ? "Guardando…" : "Añadir evento"}
          </button>
        </form>
      </div>

      {loading ? (
        <p style={{ color: "#9AA0AC" }}>Cargando…</p>
      ) : items.length === 0 ? (
        <p style={{ color: "#9AA0AC" }}>
          No hay eventos. Añade el primero arriba.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {items.map((ev) => (
            <div
              key={ev.id}
              style={{ ...card, display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}
            >
              <div style={{ flex: "1 1 240px" }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18 }}>
                  {ev.title}
                </div>
                <div style={{ fontSize: 13, color: "#6B7280", marginTop: 3 }}>
                  {format(new Date(ev.starts_at), "EEE d LLL · HH:mm", { locale: es })}
                  {ev.location ? ` · ${ev.location}` : ""} ·{" "}
                  {ev.mode === "online" ? "Online" : "Presencial"}
                </div>
              </div>
              <button
                onClick={() => remove(ev.id)}
                style={{
                  padding: "9px 14px",
                  border: "1.5px solid #EDEFF5",
                  background: "#fff",
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#C0392B",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                Borrar
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
