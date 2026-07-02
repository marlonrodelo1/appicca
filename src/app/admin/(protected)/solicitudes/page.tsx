"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { format } from "date-fns";
import { es } from "date-fns/locale";

type Row = Record<string, unknown> & { id: string; created_at: string };

const card: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #EDEFF5",
  borderRadius: 16,
  padding: 24,
};

function fecha(iso: string) {
  try {
    return format(new Date(iso), "d LLL yyyy · HH:mm", { locale: es });
  } catch {
    return iso;
  }
}

export default function AdminSolicitudes() {
  const [contact, setContact] = useState<Row[]>([]);
  const [food, setFood] = useState<Row[]>([]);
  const [spons, setSpons] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [c, f, s] = await Promise.all([
        supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
        supabase.from("food_requests").select("*").order("created_at", { ascending: false }),
        supabase.from("sponsorship_requests").select("*").order("created_at", { ascending: false }),
      ]);
      setContact((c.data as Row[]) ?? []);
      setFood((f.data as Row[]) ?? []);
      setSpons((s.data as Row[]) ?? []);
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 30, margin: "0 0 6px" }}>
        Solicitudes
      </h1>
      <p style={{ fontSize: 14.5, color: "#6B7280", margin: "0 0 26px" }}>
        Mensajes de contacto, solicitudes de bolsa de alimento y de apadrinamiento.
      </p>

      {loading && <p style={{ color: "#9AA0AC" }}>Cargando…</p>}

      <Bloque titulo="Mensajes de contacto" vacio="Sin mensajes.">
        {contact.map((r) => (
          <div key={r.id} style={card}>
            <Cabecera nombre={String(r.name)} extra={String(r.email)} fecha={fecha(r.created_at)} />
            <p style={{ fontSize: 14, color: "#4A4F5E", margin: "8px 0 0", lineHeight: 1.6 }}>
              {String(r.message)}
            </p>
          </div>
        ))}
      </Bloque>

      <Bloque titulo="Solicitudes de alimento" vacio="Sin solicitudes.">
        {food.map((r) => (
          <div key={r.id} style={card}>
            <Cabecera
              nombre={String(r.name)}
              extra={`Tel: ${String(r.phone)} · Código: ${String(r.code)}`}
              fecha={fecha(r.created_at)}
            />
          </div>
        ))}
      </Bloque>

      <Bloque titulo="Solicitudes de apadrinamiento" vacio="Sin solicitudes.">
        {spons.map((r) => (
          <div key={r.id} style={card}>
            <Cabecera
              nombre={String(r.name)}
              extra={`${String(r.email)}${r.phone ? " · " + String(r.phone) : ""}`}
              fecha={fecha(r.created_at)}
            />
            {r.message ? (
              <p style={{ fontSize: 14, color: "#4A4F5E", margin: "8px 0 0", lineHeight: 1.6 }}>
                {String(r.message)}
              </p>
            ) : null}
          </div>
        ))}
      </Bloque>
    </>
  );
}

function Bloque({
  titulo,
  vacio,
  children,
}: {
  titulo: string;
  vacio: string;
  children: React.ReactNode;
}) {
  const arr = Array.isArray(children) ? children : [children];
  const empty = arr.flat().filter(Boolean).length === 0;
  return (
    <div style={{ marginBottom: 34 }}>
      <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 21, margin: "0 0 14px" }}>
        {titulo}
      </h2>
      {empty ? (
        <p style={{ color: "#9AA0AC", fontSize: 14 }}>{vacio}</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>{children}</div>
      )}
    </div>
  );
}

function Cabecera({
  nombre,
  extra,
  fecha,
}: {
  nombre: string;
  extra: string;
  fecha: string;
}) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
      <div>
        <div style={{ fontWeight: 600, fontSize: 15 }}>{nombre}</div>
        <div style={{ fontSize: 13, color: "#6B7280" }}>{extra}</div>
      </div>
      <div style={{ fontSize: 12.5, color: "#9AA0AC" }}>{fecha}</div>
    </div>
  );
}
