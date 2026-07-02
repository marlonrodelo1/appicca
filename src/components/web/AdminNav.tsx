"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { BrandMark } from "./ui";

const LINKS = [
  { href: "/admin", label: "Inicio" },
  { href: "/admin/novedades", label: "Novedades" },
  { href: "/admin/eventos", label: "Eventos" },
  { href: "/admin/solicitudes", label: "Solicitudes" },
];

export default function AdminNav({ email }: { email: string | null }) {
  const pathname = usePathname();

  async function logout() {
    await supabase.auth.signOut();
    window.location.assign("/admin/login");
  }

  return (
    <div
      style={{
        borderBottom: "1px solid #EDEFF5",
        background: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 40,
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <Link href="/admin" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <BrandMark size={34} />
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 18,
            }}
          >
            Panel
          </span>
        </Link>

        <nav style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {LINKS.map((l) => {
            const active =
              l.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className="dc-navlink"
                style={{
                  padding: "8px 13px",
                  borderRadius: 9,
                  fontSize: 13.5,
                  fontWeight: 500,
                  color: active ? "#2D3142" : "#6B7280",
                  background: active ? "#F7F5F1" : "transparent",
                }}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ flex: 1 }} />

        <span style={{ fontSize: 12.5, color: "#9AA0AC" }}>{email}</span>
        <button
          onClick={logout}
          style={{
            padding: "8px 14px",
            border: "1.5px solid #EDEFF5",
            background: "#fff",
            borderRadius: 9,
            fontSize: 13,
            fontWeight: 600,
            color: "#C0392B",
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          Salir
        </button>
      </div>
    </div>
  );
}
