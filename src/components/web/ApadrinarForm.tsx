"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { site } from "@/lib/site";
import { Check } from "./icons";

const inputStyle: React.CSSProperties = {
  padding: "13px 15px",
  border: "1.5px solid #EDEFF5",
  borderRadius: 11,
  fontFamily: "inherit",
  fontSize: 14,
  outline: "none",
  width: "100%",
};

type Status = "idle" | "sending" | "sent" | "error";

export default function ApadrinarForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    const { error } = await supabase
      .from("sponsorship_requests")
      .insert({ name, email, phone, message });
    setStatus(error ? "error" : "sent");
  }

  return (
    <div style={{ background: "#fff", borderRadius: 18, padding: 28 }}>
      {status === "sent" ? (
        <div style={{ textAlign: "center", padding: "16px 0" }}>
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: "50%",
              background: "#FBF7F0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 14px",
            }}
          >
            <Check size={26} color="#B7965A" stroke={2.2} />
          </div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: 22,
              marginBottom: 6,
            }}
          >
            ¡Solicitud recibida!
          </div>
          <p style={{ fontSize: 13.5, color: "#6B7280", margin: 0 }}>
            Gracias por tu interés. Nos pondremos en contacto contigo para
            explicarte el proceso de apadrinamiento.
          </p>
        </div>
      ) : (
        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 13 }}>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre y apellidos"
            className="dc-input"
            style={inputStyle}
          />
          <div style={{ display: "flex", gap: 13, flexWrap: "wrap" }}>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="dc-input"
              style={{ ...inputStyle, flex: "1 1 140px" }}
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Teléfono"
              className="dc-input"
              style={{ ...inputStyle, flex: "1 1 140px" }}
            />
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tu mensaje (opcional)"
            rows={3}
            className="dc-input"
            style={{ ...inputStyle, resize: "vertical" }}
          />
          {status === "error" && (
            <p style={{ fontSize: 13, color: "#C0392B", margin: 0 }}>
              No hemos podido enviar tu solicitud. Escríbenos a {site.email} o
              llámanos al {site.phone}.
            </p>
          )}
          <button
            type="submit"
            disabled={status === "sending"}
            className="dc-gold"
            style={{
              textAlign: "center",
              padding: 14,
              background: "#C8A96E",
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
            {status === "sending" ? "Enviando…" : "Enviar solicitud"}
          </button>
        </form>
      )}
    </div>
  );
}
