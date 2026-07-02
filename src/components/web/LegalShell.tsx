import type { ReactNode } from "react";
import { Container, Section } from "./ui";

export default function LegalShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <Section bg="#FFFFFF">
      <Container max={820} style={{ padding: "56px 28px 80px" }}>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 40,
            lineHeight: 1.08,
            margin: "0 0 24px",
          }}
        >
          {title}
        </h1>
        <div
          style={{
            fontSize: 15,
            lineHeight: 1.75,
            color: "#5A6070",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {children}
          <p
            style={{
              marginTop: 12,
              padding: "14px 18px",
              background: "#FBF7F0",
              border: "1px solid #EDE3CE",
              borderRadius: 12,
              fontSize: 13.5,
              color: "#8A7A57",
            }}
          >
            Texto pendiente de revisión legal. Se completará con los datos
            oficiales de la entidad antes de la publicación definitiva.
          </p>
        </div>
      </Container>
    </Section>
  );
}
