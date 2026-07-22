"use client";

import { useCallback, useEffect, useState } from "react";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { stripePromise } from "@/lib/stripe";
import { Heart } from "./icons";

type Props = {
  /** Texto del botón. */
  label?: string;
  /** Motivo del donativo (viaja a Stripe como concepto y metadata). */
  motivo?: string;
  /** Color de acento para que encaje con cada página. */
  accent?: string;
  /** Importes sugeridos (en euros). */
  presets?: number[];
  /** Estilo del botón: sólido (por defecto) o contorno claro sobre fondo oscuro. */
  variant?: "solid" | "light";
  /** Logo opcional para la cabecera del pop-up (ej. el de Remar). Si se pasa,
   *  sustituye al icono de corazón. */
  logoSrc?: string;
  /** Radio de las esquinas del botón (px). Por defecto tipo píldora. */
  radius?: number;
  /** Tamaño del corazón del botón (px). */
  iconSize?: number;
  /** Anima el corazón con un latido (respeta prefers-reduced-motion). */
  pulse?: boolean;
  style?: React.CSSProperties;
};

const MIN = 2;
const MAX = 5000;

export default function DonateButton({
  label = "Donar",
  motivo = "Donativo general",
  accent = "#2E7D1F",
  presets = [5, 10, 20, 50, 100],
  variant = "solid",
  logoSrc,
  radius = 999,
  iconSize = 18,
  pulse = false,
  style,
}: Props) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"amount" | "pay">("amount");
  const [amount, setAmount] = useState<number | null>(null);
  const [custom, setCustom] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Bloquea el scroll del fondo mientras el pop-up está abierto.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function close() {
    setOpen(false);
    // Reset diferido para que no parpadee al cerrar.
    setTimeout(() => {
      setStep("amount");
      setAmount(null);
      setCustom("");
      setError(null);
    }, 200);
  }

  function chosenAmount(): number | null {
    if (custom.trim()) {
      const v = Number(custom.replace(",", "."));
      return Number.isFinite(v) ? v : null;
    }
    return amount;
  }

  function goToPay() {
    const v = chosenAmount();
    if (v == null || v < MIN || v > MAX) {
      setError(`Introduce un importe entre ${MIN} y ${MAX} €.`);
      return;
    }
    setError(null);
    setAmount(Math.round(v * 100) / 100);
    setStep("pay");
  }

  // EmbeddedCheckoutProvider llama a esto una vez al montarse (ya con el importe fijado).
  const fetchClientSecret = useCallback(async () => {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, motivo }),
    });
    const data = await res.json();
    if (!res.ok || data.error) {
      throw new Error(data.error || "No se pudo iniciar el pago.");
    }
    return data.clientSecret as string;
  }, [amount, motivo]);

  const solid = variant === "solid";

  return (
    <>
      {pulse && (
        <style>{`
          @keyframes donateHeartbeat {
            0%, 62%, 100% { transform: scale(1) translateY(0); }
            14% { transform: scale(1.95) translateY(-7px); }
            28% { transform: scale(1) translateY(0); }
            40% { transform: scale(1.5) translateY(-3px); }
          }
          @media (prefers-reduced-motion: reduce) {
            .donate-heart { animation: none !important; }
          }
        `}</style>
      )}
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 9,
          background: solid ? accent : "#fff",
          color: solid ? "#fff" : accent,
          border: solid ? "none" : `1.5px solid ${accent}`,
          fontWeight: 700,
          fontSize: 15.5,
          padding: "13px 26px",
          borderRadius: radius,
          cursor: "pointer",
          fontFamily: "var(--font-body)",
          boxShadow: solid ? "0 8px 22px rgba(6,20,45,.16)" : "none",
          ...style,
        }}
      >
        <span
          className="donate-heart"
          style={{
            display: "inline-flex",
            transformOrigin: "center",
            animation: pulse
              ? "donateHeartbeat 1.9s ease-in-out infinite"
              : undefined,
          }}
        >
          <svg
            width={iconSize}
            height={iconSize}
            viewBox="0 0 24 24"
            fill={solid ? "#fff" : accent}
            stroke={solid ? "#fff" : accent}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M19 14c1.4-1.4 3-3.3 3-5.5A5.5 5.5 0 0 0 12 5 5.5 5.5 0 0 0 2 8.5c0 2.2 1.6 4.1 3 5.5l7 7Z" />
          </svg>
        </span>
        {label}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Hacer un donativo"
          onClick={close}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(9,17,33,.55)",
            backdropFilter: "blur(3px)",
            WebkitBackdropFilter: "blur(3px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: step === "pay" ? 480 : 420,
              maxHeight: "92vh",
              overflowY: "auto",
              background: "#fff",
              borderRadius: 22,
              boxShadow: "0 30px 70px rgba(6,20,45,.4)",
              fontFamily: "var(--font-body)",
              color: "#12233F",
            }}
          >
            {/* Cabecera */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "18px 20px 12px",
                borderBottom: "1px solid #F0EEE8",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {logoSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={logoSrc}
                    alt=""
                    style={{ height: 30, width: "auto", display: "block" }}
                  />
                ) : (
                  <span
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 10,
                      background: `${accent}18`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Heart size={18} color={accent} stroke={2} />
                  </span>
                )}
                <strong style={{ fontSize: 16 }}>
                  {step === "amount" ? "Elige tu donativo" : "Completa tu pago"}
                </strong>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Cerrar"
                style={{
                  border: "none",
                  background: "#F4F2EC",
                  width: 32,
                  height: 32,
                  borderRadius: 9,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#5A6472"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {step === "amount" ? (
              <div style={{ padding: 20 }}>
                <p
                  style={{
                    fontSize: 13.5,
                    color: "#5A6472",
                    margin: "0 0 16px",
                    lineHeight: 1.5,
                  }}
                >
                  {motivo}. Cada aportación se destina íntegramente a la ayuda.
                </p>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3,1fr)",
                    gap: 10,
                    marginBottom: 14,
                  }}
                >
                  {presets.map((p) => {
                    const active = !custom && amount === p;
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => {
                          setAmount(p);
                          setCustom("");
                          setError(null);
                        }}
                        style={{
                          padding: "14px 0",
                          borderRadius: 12,
                          border: active
                            ? `2px solid ${accent}`
                            : "1.5px solid #E4E0D6",
                          background: active ? `${accent}12` : "#fff",
                          color: active ? accent : "#12233F",
                          fontWeight: 700,
                          fontSize: 17,
                          cursor: "pointer",
                        }}
                      >
                        {p} €
                      </button>
                    );
                  })}
                </div>

                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    border: "1.5px solid #E4E0D6",
                    borderRadius: 12,
                    padding: "0 14px",
                    marginBottom: error ? 8 : 18,
                  }}
                >
                  <span style={{ color: "#5A6472", fontSize: 15 }}>Otro:</span>
                  <input
                    inputMode="decimal"
                    placeholder="importe"
                    value={custom}
                    onChange={(e) => {
                      setCustom(e.target.value.replace(/[^\d.,]/g, ""));
                      setAmount(null);
                      setError(null);
                    }}
                    style={{
                      flex: 1,
                      border: "none",
                      outline: "none",
                      fontSize: 16,
                      padding: "13px 0",
                      background: "transparent",
                      fontFamily: "var(--font-body)",
                    }}
                  />
                  <span style={{ color: "#5A6472", fontSize: 15 }}>€</span>
                </label>

                {error && (
                  <p
                    style={{
                      color: "#B91C1C",
                      fontSize: 13,
                      margin: "0 0 14px",
                    }}
                  >
                    {error}
                  </p>
                )}

                <button
                  type="button"
                  onClick={goToPay}
                  style={{
                    width: "100%",
                    padding: "15px 0",
                    borderRadius: 12,
                    border: "none",
                    background: accent,
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 16,
                    cursor: "pointer",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Continuar al pago
                </button>

                <p
                  style={{
                    fontSize: 11.5,
                    color: "#8A8F98",
                    textAlign: "center",
                    margin: "12px 0 0",
                  }}
                >
                  Pago seguro con Stripe · Apple Pay · Google Pay · tarjeta
                </p>
              </div>
            ) : (
              <div style={{ padding: "8px 8px 16px" }}>
                <button
                  type="button"
                  onClick={() => setStep("amount")}
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "#5A6472",
                    fontSize: 13.5,
                    cursor: "pointer",
                    padding: "8px 12px",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  ← Cambiar importe ({amount} €)
                </button>
                <div style={{ padding: "0 8px" }}>
                  <EmbeddedCheckoutProvider
                    key={amount ?? "x"}
                    stripe={stripePromise}
                    options={{ fetchClientSecret }}
                  >
                    <EmbeddedCheckout />
                  </EmbeddedCheckoutProvider>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
