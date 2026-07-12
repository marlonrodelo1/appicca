"use client";

import { useState } from "react";

const PAGE_URL = "https://cuerpodecristoacentejo.com/todos-por-ucrania";
const MESSAGE =
  "💙💛 Todos con Ucrania — únete a la tarde solidaria a favor de la ayuda humanitaria en Ucrania. " +
  "Sábado 12 de septiembre, 18:00 h · Auditorio IES El Chapatal. ¡Entrada libre! " +
  "Tu ayuda puede marcar la diferencia.";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const onShare = async () => {
    const data = { title: "Todos con Ucrania", text: MESSAGE, url: PAGE_URL };
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(data);
        return;
      } catch {
        // el usuario canceló el diálogo de compartir
      }
    }
    // Fallback (escritorio): copiar el mensaje + enlace
    try {
      await navigator.clipboard.writeText(`${MESSAGE} ${PAGE_URL}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(`${MESSAGE} ${PAGE_URL}`)}`,
        "_blank",
        "noopener,noreferrer",
      );
    }
  };

  return (
    <button
      type="button"
      onClick={onShare}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 9,
        background: "#fff",
        color: "#12233F",
        fontFamily: "var(--font-body)",
        fontWeight: 700,
        fontSize: 15,
        padding: "12px 24px",
        borderRadius: 999,
        border: "none",
        cursor: "pointer",
        boxShadow: "0 8px 22px rgba(0,0,0,.16)",
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2E7D1F"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
      </svg>
      {copied ? "¡Enlace copiado!" : "Compartir esta página"}
    </button>
  );
}
