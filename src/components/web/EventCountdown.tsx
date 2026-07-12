"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* Instante del evento: 12 sep 2026, 18:00 h (Canarias, WEST = UTC+1 en septiembre) */
const TARGET = new Date("2026-09-12T18:00:00+01:00").getTime();

function calc() {
  const diff = Math.max(0, TARGET - Date.now());
  const s = Math.floor(diff / 1000);
  return {
    total: diff,
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

export default function EventCountdown() {
  // null hasta montar (evita desajuste de hidratación SSR/cliente)
  const [t, setT] = useState<ReturnType<typeof calc> | null>(null);

  useEffect(() => {
    const update = () => setT(calc());
    const raf = requestAnimationFrame(update); // primer valor tras montar (async)
    const id = setInterval(update, 1000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
    };
  }, []);

  if (t && t.total <= 0) {
    return (
      <span
        style={{
          fontWeight: 800,
          color: "#FFD500",
          letterSpacing: ".05em",
          textTransform: "uppercase",
          fontSize: 14,
        }}
      >
        ¡Hoy es el gran día!
      </span>
    );
  }

  const units = [
    { v: t?.days ?? 0, l: "días" },
    { v: t?.hours ?? 0, l: "hrs" },
    { v: t?.minutes ?? 0, l: "min" },
    { v: t?.seconds ?? 0, l: "seg" },
  ];

  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 5 }}>
      {units.map((u, i) => (
        <div key={u.l} style={{ display: "flex", alignItems: "flex-start", gap: 5 }}>
          <FlipUnit value={u.v} label={u.l} />
          {i < units.length - 1 && (
            <span
              style={{
                color: "rgba(255,255,255,.35)",
                fontWeight: 700,
                fontSize: 14,
                lineHeight: "30px",
              }}
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function FlipUnit({ value, label }: { value: number; label: string }) {
  const v = String(value).padStart(2, "0");
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <div
        style={{
          position: "relative",
          width: 30,
          height: 30,
          perspective: 200,
          background: "rgba(255,255,255,.1)",
          border: "1px solid rgba(255,255,255,.18)",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={v}
            initial={{ rotateX: -55, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: 55, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 17,
              lineHeight: 1,
              color: "#fff",
              backfaceVisibility: "hidden",
            }}
          >
            {v}
          </motion.div>
        </AnimatePresence>
      </div>
      <span
        style={{
          fontSize: 8,
          fontWeight: 700,
          letterSpacing: ".08em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,.65)",
        }}
      >
        {label}
      </span>
    </div>
  );
}
