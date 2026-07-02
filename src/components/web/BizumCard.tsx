"use client";

import { useRef, useState } from "react";
import { site } from "@/lib/site";
import { Check, Copy } from "./icons";

const PASOS = [
  { n: "1", texto: "Abre la app de tu banco y entra en el apartado Bizum." },
  { n: "2", texto: "Elige la opción «Donar a una ONG»." },
  {
    n: "3",
    texto: `Introduce el código ${site.bizumCode} y el importe que desees.`,
  },
  {
    n: "4",
    texto:
      "Confirma. ¡Gracias! Tu donativo llega directo a las familias.",
  },
];

export default function BizumCard() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = () => {
    try {
      navigator.clipboard?.writeText(site.bizumCode);
    } catch {
      /* noop */
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #EDEFF5",
        borderRadius: 24,
        padding: 38,
        boxShadow: "0 18px 44px rgba(45,49,66,.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 22,
        }}
      >
        <div
          style={{
            padding: "6px 12px",
            background: "#EAF4EA",
            color: "#3E8E43",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: ".4px",
          }}
        >
          Bizum · Donaciones ONG
        </div>
      </div>

      <div
        style={{
          fontSize: 13,
          color: "#6B7280",
          marginBottom: 8,
          fontWeight: 500,
        }}
      >
        Código de donaciones
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          background: "#FBF7F0",
          border: "1.5px dashed #E0CBA0",
          borderRadius: 16,
          padding: "22px 26px",
          marginBottom: 16,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 52,
            letterSpacing: "6px",
            color: "#B7965A",
            lineHeight: 1,
          }}
        >
          {site.bizumCode}
        </div>
      </div>

      <button
        onClick={copy}
        className="dc-gold"
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 9,
          padding: 15,
          background: "#C8A96E",
          color: "#fff",
          fontWeight: 600,
          fontSize: 15,
          border: "none",
          borderRadius: 13,
          cursor: "pointer",
          boxShadow: "0 8px 20px rgba(200,169,110,.35)",
          marginBottom: 30,
          fontFamily: "inherit",
        }}
      >
        {copied ? (
          <Check size={18} stroke={2.2} />
        ) : (
          <Copy size={17} stroke={1.9} />
        )}
        {copied ? "¡Código copiado!" : "Copiar código"}
      </button>

      <div
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: "#2D3142",
          marginBottom: 16,
          letterSpacing: ".3px",
        }}
      >
        CÓMO DONAR EN 4 PASOS
      </div>
      {PASOS.map((paso) => (
        <div
          key={paso.n}
          style={{
            display: "flex",
            gap: 14,
            alignItems: "flex-start",
            marginBottom: 14,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "#FBF7F0",
              color: "#B7965A",
              fontWeight: 700,
              fontSize: 13,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {paso.n}
          </div>
          <div
            style={{
              fontSize: 14,
              lineHeight: 1.5,
              color: "#4A4F5E",
              paddingTop: 3,
            }}
          >
            {paso.texto}
          </div>
        </div>
      ))}
    </div>
  );
}
