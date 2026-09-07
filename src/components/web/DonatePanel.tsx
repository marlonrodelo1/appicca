"use client";

import { useCallback, useState } from "react";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { stripePromise } from "@/lib/stripe";

type Props = {
  /** Motivo del donativo (viaja a Stripe como concepto y metadata). */
  motivo?: string;
  /** Color de acento. */
  accent?: string;
  /** Importes sugeridos (en euros). */
  presets?: number[];
};

const MIN = 1;
const MAX = 5000;

/**
 * Igual que DonateButton pero SIN pop-up: se pinta directamente en la página.
 * Pensado para la pantalla a la que llega el QR del evento, donde cada clic
 * de más es un donativo menos.
 */
export default function DonatePanel({
  motivo = "Donativo general",
  accent = "#2E7D1F",
  presets = [10, 25, 50, 100, 250],
}: Props) {
  const [step, setStep] = useState<"amount" | "pay">("amount");
  const [amount, setAmount] = useState<number | null>(null);
  const [custom, setCustom] = useState("");
  const [error, setError] = useState<string | null>(null);

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

  if (step === "pay") {
    return (
      <div>
        <button
          type="button"
          onClick={() => setStep("amount")}
          style={{
            border: "none",
            background: "transparent",
            color: "#5A6472",
            fontSize: 14,
            cursor: "pointer",
            padding: "4px 0 12px",
            fontFamily: "var(--font-body)",
          }}
        >
          ← Cambiar importe ({amount} €)
        </button>
        <EmbeddedCheckoutProvider
          key={amount ?? "x"}
          stripe={stripePromise}
          options={{ fetchClientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 9,
          marginBottom: 10,
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
                padding: "15px 0",
                borderRadius: 12,
                border: active ? `2px solid ${accent}` : "1.5px solid #E4E0D6",
                background: active ? `${accent}12` : "#fff",
                color: active ? accent : "#12233F",
                fontWeight: 700,
                fontSize: 18,
                cursor: "pointer",
                fontFamily: "var(--font-body)",
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
          marginBottom: error ? 8 : 14,
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
        <p style={{ color: "#B91C1C", fontSize: 13.5, margin: "0 0 14px" }}>
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={goToPay}
        style={{
          width: "100%",
          padding: "16px 0",
          borderRadius: 12,
          border: "none",
          background: accent,
          color: "#fff",
          fontWeight: 700,
          fontSize: 17,
          cursor: "pointer",
          fontFamily: "var(--font-body)",
          boxShadow: "0 8px 22px rgba(6,20,45,.16)",
        }}
      >
        Continuar al pago
      </button>

      <p
        style={{
          fontSize: 11.5,
          color: "#8A8F98",
          textAlign: "center",
          margin: "11px 0 0",
          lineHeight: 1.45,
        }}
      >
        Pago seguro con Stripe · Apple&nbsp;Pay · Google&nbsp;Pay · tarjeta
      </p>
    </div>
  );
}
