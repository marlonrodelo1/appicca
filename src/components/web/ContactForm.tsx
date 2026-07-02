"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { site } from "@/lib/site";
import { Check } from "./icons";

const inputStyle: React.CSSProperties = {
  padding: "13px 15px",
  border: "1.5px solid #E7E3D9",
  borderRadius: 11,
  fontFamily: "inherit",
  fontSize: 14,
  outline: "none",
  background: "#fff",
  width: "100%",
};

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    const { error } = await supabase
      .from("contact_messages")
      .insert({ name, email, message });
    setStatus(error ? "error" : "sent");
  }

  if (status === "sent") {
    return (
      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <div
          style={{
            width: 54,
            height: 54,
            borderRadius: "50%",
            background: "#EAF4EA",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 14px",
          }}
        >
          <Check size={26} color="#3E8E43" stroke={2.2} />
        </div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 22,
            marginBottom: 6,
          }}
        >
          ¡Mensaje enviado!
        </div>
        <p style={{ fontSize: 13.5, color: "#6B7280", margin: 0 }}>
          Gracias por escribirnos. Te responderemos lo antes posible.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 13 }}>
      <input
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre"
        className="dc-input"
        style={inputStyle}
      />
      <input
        required
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="dc-input"
        style={inputStyle}
      />
      <textarea
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="¿En qué podemos ayudarte?"
        rows={4}
        className="dc-input"
        style={{ ...inputStyle, resize: "vertical" }}
      />
      {status === "error" && (
        <p style={{ fontSize: 13, color: "#C0392B", margin: 0 }}>
          No hemos podido enviar tu mensaje. Escríbenos a {site.email} o llámanos
          al {site.phone}.
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
        {status === "sending" ? "Enviando…" : "Enviar mensaje"}
      </button>
    </form>
  );
}
