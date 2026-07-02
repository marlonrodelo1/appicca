"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { site } from "@/lib/site";
import { BasketSimple, Copy } from "./icons";

const inputStyle: React.CSSProperties = {
  padding: "13px 15px",
  border: "1.5px solid #CFE6CF",
  borderRadius: 11,
  fontFamily: "inherit",
  fontSize: 14,
  outline: "none",
  background: "#fff",
  width: "100%",
};

function makeCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 6; i++)
    out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

type Status = "idle" | "sending" | "done" | "error";

export default function FoodRequestForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    const newCode = makeCode();
    const { error } = await supabase
      .from("food_requests")
      .insert({ name, phone, code: newCode });
    if (error) {
      setStatus("error");
    } else {
      setCode(newCode);
      setStatus("done");
    }
  }

  return (
    <div
      style={{
        background: "linear-gradient(120deg,#F1F8F1,#EAF4EA)",
        border: "1px solid #DCEEDC",
        borderRadius: 20,
        padding: 30,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 11,
          marginBottom: 12,
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 11,
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <BasketSimple size={22} color="#4CAF50" stroke={1.6} />
        </div>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 23,
            margin: 0,
          }}
        >
          Solicitar bolsa de alimento
        </h3>
      </div>

      {status === "done" && code ? (
        <div style={{ textAlign: "center", padding: "6px 0" }}>
          <p style={{ fontSize: 13.5, color: "#4A5060", margin: "0 0 12px" }}>
            Presenta este código el domingo en el reparto:
          </p>
          <div
            style={{
              background: "#fff",
              border: "1.5px dashed #4CAF50",
              borderRadius: 14,
              padding: "18px 0",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 38,
              letterSpacing: "6px",
              color: "#3E8E43",
              marginBottom: 12,
            }}
          >
            {code}
          </div>
          <button
            onClick={() => {
              try {
                navigator.clipboard?.writeText(code);
              } catch {
                /* noop */
              }
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "9px 16px",
              background: "#fff",
              border: "1px solid #CFE6CF",
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 600,
              color: "#3E8E43",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            <Copy size={15} color="#3E8E43" /> Copiar código
          </button>
        </div>
      ) : (
        <>
          <p
            style={{
              fontSize: 13.5,
              lineHeight: 1.6,
              color: "#4A5060",
              margin: "0 0 16px",
            }}
          >
            Rellena tus datos y te generamos un código para recoger tu bolsa en
            el reparto del domingo.
          </p>
          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre y apellidos"
              className="dc-input-green"
              style={inputStyle}
            />
            <input
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Teléfono de contacto"
              className="dc-input-green"
              style={inputStyle}
            />
            {status === "error" && (
              <p style={{ fontSize: 13, color: "#C0392B", margin: 0 }}>
                No hemos podido registrar tu solicitud. Llámanos al {site.phone}{" "}
                o escríbenos a {site.email}.
              </p>
            )}
            <button
              type="submit"
              disabled={status === "sending"}
              className="dc-green"
              style={{
                textAlign: "center",
                padding: 14,
                background: "#4CAF50",
                color: "#fff",
                fontWeight: 600,
                fontSize: 15,
                border: "none",
                borderRadius: 12,
                cursor: status === "sending" ? "default" : "pointer",
                fontFamily: "inherit",
                opacity: status === "sending" ? 0.7 : 1,
              }}
            >
              {status === "sending" ? "Generando…" : "Generar mi código"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
