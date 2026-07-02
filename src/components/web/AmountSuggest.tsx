"use client";

import { useState } from "react";

const AMOUNTS = [5, 10, 25, 50];

export default function AmountSuggest() {
  const [amount, setAmount] = useState(25);

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #EDEFF5",
        borderRadius: 22,
        padding: 32,
      }}
    >
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: 24,
          margin: "0 0 6px",
        }}
      >
        Importe sugerido
      </h3>
      <p style={{ fontSize: 13.5, color: "#6B7280", margin: "0 0 20px" }}>
        Solo una referencia — tú decides cuánto aportar por Bizum.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 12,
          marginBottom: 14,
        }}
      >
        {AMOUNTS.map((a) => {
          const on = amount === a;
          return (
            <button
              key={a}
              onClick={() => setAmount(a)}
              style={{
                padding: "16px 0",
                textAlign: "center",
                borderRadius: 13,
                border: on ? "1.5px solid #C8A96E" : "1.5px solid #EDEFF5",
                background: on ? "#C8A96E" : "#fff",
                color: on ? "#fff" : "#2D3142",
                fontWeight: 700,
                fontSize: 17,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "all .15s",
              }}
            >
              €{a}
            </button>
          );
        })}
      </div>
      <div style={{ textAlign: "center", fontSize: 13, color: "#9AA0AC" }}>
        …o el importe que tu corazón decida
      </div>
    </div>
  );
}
