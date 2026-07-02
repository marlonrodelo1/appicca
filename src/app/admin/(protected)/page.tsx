import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

async function count(table: string): Promise<number | null> {
  try {
    const supabase = await createClient();
    const { count, error } = await supabase
      .from(table)
      .select("id", { count: "exact", head: true });
    return error ? null : (count ?? 0);
  } catch {
    return null;
  }
}

const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #EDEFF5",
  borderRadius: 16,
  padding: 24,
  display: "block",
};

export default async function AdminHome() {
  const [nov, ev, contact, food, spons] = await Promise.all([
    count("novedades"),
    count("events"),
    count("contact_messages"),
    count("food_requests"),
    count("sponsorship_requests"),
  ]);

  const solicitudes =
    (contact ?? 0) + (food ?? 0) + (spons ?? 0);

  const cards = [
    { href: "/admin/novedades", label: "Novedades", value: nov, hint: "publicadas y borradores" },
    { href: "/admin/eventos", label: "Eventos", value: ev, hint: "en la agenda" },
    { href: "/admin/solicitudes", label: "Solicitudes", value: solicitudes, hint: "contacto, alimento y apadrinamiento" },
  ];

  return (
    <>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: 30,
          margin: "0 0 6px",
        }}
      >
        Bienvenido
      </h1>
      <p style={{ fontSize: 14.5, color: "#6B7280", margin: "0 0 26px" }}>
        Gestiona el contenido de la web y revisa las solicitudes recibidas.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: 18,
        }}
      >
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="dc-lift" style={cardStyle}>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 40,
                color: "#C8A96E",
                lineHeight: 1,
              }}
            >
              {c.value ?? "—"}
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 20,
                margin: "8px 0 4px",
              }}
            >
              {c.label}
            </div>
            <div style={{ fontSize: 13, color: "#9AA0AC" }}>{c.hint}</div>
          </Link>
        ))}
      </div>

      <p style={{ fontSize: 12.5, color: "#B9BDC7", marginTop: 26 }}>
        Si ves un guion (—) en los contadores, aún no se han creado las tablas en
        Supabase o no hay conexión.
      </p>
    </>
  );
}
