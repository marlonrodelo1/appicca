"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Logo } from "@/components/web/Logo";

const input: React.CSSProperties = {
  padding: "13px 15px",
  border: "1.5px solid #E7E3D9",
  borderRadius: 11,
  fontFamily: "inherit",
  fontSize: 14,
  outline: "none",
  background: "#fff",
  width: "100%",
};

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError("Email o contraseña incorrectos.");
      setLoading(false);
    } else {
      window.location.assign("/admin");
    }
  }

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#F7F5F1",
        padding: 24,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          background: "#fff",
          border: "1px solid #EDEFF5",
          borderRadius: 20,
          padding: 36,
          boxShadow: "0 18px 44px rgba(45,49,66,.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            marginBottom: 24,
          }}
        >
          <Logo height={52} />
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 24,
              }}
            >
              Panel de administración
            </div>
            <div style={{ fontSize: 13, color: "#9AA0AC" }}>
              Iglesia Cuerpo de Cristo
            </div>
          </div>
        </div>

        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 13 }}>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="dc-input"
            style={input}
          />
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="dc-input"
            style={input}
          />
          {error && (
            <p style={{ fontSize: 13, color: "#C0392B", margin: 0 }}>{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="dc-gold"
            style={{
              padding: 14,
              background: "#C8A96E",
              color: "#fff",
              fontWeight: 600,
              fontSize: 15,
              border: "none",
              borderRadius: 12,
              cursor: loading ? "default" : "pointer",
              fontFamily: "inherit",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Entrando…" : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
