import type { CSSProperties, ReactNode } from "react";
import { Cross } from "./icons";

export function Container({
  children,
  max = 1220,
  style,
}: {
  children: ReactNode;
  max?: number;
  style?: CSSProperties;
}) {
  return (
    <div style={{ maxWidth: max, margin: "0 auto", ...style }}>{children}</div>
  );
}

export function Section({
  children,
  bg = "#FFFFFF",
  style,
}: {
  children: ReactNode;
  bg?: string;
  style?: CSSProperties;
}) {
  return <section style={{ background: bg, ...style }}>{children}</section>;
}

export function Eyebrow({
  children,
  color = "#C8A96E",
}: {
  children: ReactNode;
  color?: string;
}) {
  return (
    <div
      style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "1.4px",
        color,
        textTransform: "uppercase",
        marginBottom: 10,
      }}
    >
      {children}
    </div>
  );
}

export function BrandMark({ size = 42 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "linear-gradient(140deg,#D3B87E,#B7965A)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 12px rgba(183,150,90,.35)",
        flexShrink: 0,
      }}
    >
      <Cross size={size * 0.45} color="#fff" stroke={2.1} />
    </div>
  );
}

/** Marcador de foto (placeholder) hasta que se suban imágenes reales. */
export function ImageSlot({
  label,
  height = 320,
  radius = 20,
}: {
  label: string;
  height?: number | string;
  radius?: number;
}) {
  return (
    <div
      style={{
        width: "100%",
        height,
        borderRadius: radius,
        background:
          "linear-gradient(135deg,#FBF7F0 0%,#F1EDE3 55%,#EDE7DA 100%)",
        border: "1px solid #EDE3CE",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        textAlign: "center",
      }}
    >
      <span
        style={{
          fontSize: 12.5,
          fontStyle: "italic",
          color: "#B0A48A",
          maxWidth: 260,
          lineHeight: 1.5,
        }}
      >
        {label}
      </span>
    </div>
  );
}
