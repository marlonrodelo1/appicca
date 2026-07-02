"use client";

import { useState } from "react";
import { Clock, MapPin } from "./icons";
import type { Evento } from "@/lib/data";

type Modo = "presencial" | "online";

const FILTROS = [
  { id: "todos", label: "Todos" },
  { id: "presencial", label: "Presencial" },
  { id: "online", label: "Online" },
] as const;

export default function AgendaList({ eventos }: { eventos: Evento[] }) {
  const [filter, setFilter] = useState<"todos" | Modo>("todos");
  const visibles = eventos.filter(
    (e) => filter === "todos" || e.modo === filter,
  );

  return (
    <>
      <div
        style={{
          maxWidth: 1020,
          margin: "0 auto",
          padding: "56px 28px 24px",
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "1.4px",
            color: "#C8A96E",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          Agenda
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 48,
            lineHeight: 1.05,
            margin: "0 0 24px",
          }}
        >
          Próximos eventos
        </h1>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {FILTROS.map((f) => {
            const on = filter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                style={{
                  padding: "10px 20px",
                  borderRadius: 999,
                  fontSize: 13.5,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  background: on ? "#C8A96E" : "#fff",
                  color: on ? "#fff" : "#4A4F5E",
                  border: on ? "1.5px solid #C8A96E" : "1.5px solid #EDEFF5",
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        style={{ maxWidth: 1020, margin: "0 auto", padding: "12px 28px 70px" }}
      >
        {visibles.map((e, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 22,
              alignItems: "center",
              padding: "20px 0",
              borderBottom: "1px solid #EDEFF5",
            }}
          >
            <div
              style={{
                width: 78,
                height: 82,
                borderRadius: 14,
                background: "#FBF7F0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  fontSize: 10.5,
                  fontWeight: 700,
                  letterSpacing: "1px",
                  color: "#C8A96E",
                }}
              >
                {e.dia}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 22,
                  lineHeight: 1,
                }}
              >
                {e.fecha}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 22,
                  marginBottom: 5,
                }}
              >
                {e.titulo}
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  flexWrap: "wrap",
                  fontSize: 13,
                  color: "#6B7280",
                }}
              >
                <span
                  style={{ display: "flex", alignItems: "center", gap: 5 }}
                >
                  <Clock size={14} color="#9AA0AC" stroke={1.7} />
                  {e.hora}
                </span>
                <span
                  style={{ display: "flex", alignItems: "center", gap: 5 }}
                >
                  <MapPin size={14} color="#9AA0AC" stroke={1.7} />
                  {e.lugar}
                </span>
              </div>
            </div>
            <div
              style={{
                padding: "6px 13px",
                borderRadius: 999,
                fontSize: 11.5,
                fontWeight: 700,
                whiteSpace: "nowrap",
                background: e.modo === "online" ? "#F1F7FB" : "#EAF4EA",
                color: e.modo === "online" ? "#5C9BC0" : "#3E8E43",
              }}
            >
              {e.modo === "online" ? "Online" : "Presencial"}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
