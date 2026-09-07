import type { Metadata } from "next";
import Link from "next/link";
import DonatePanel from "@/components/web/DonatePanel";

export const metadata: Metadata = {
  title: "Donar · Todos con Ucrania",
  description:
    "Haz tu donativo para la ayuda humanitaria de Remar en Ucrania. Pago seguro con tarjeta, Apple Pay o Google Pay.",
  openGraph: {
    title: "Donar · Todos con Ucrania",
    description:
      "Tu donativo se destina íntegramente a la ayuda humanitaria de Remar en Ucrania.",
    images: [
      {
        url: "/fotos/og-todos-por-ucrania.png",
        width: 1200,
        height: 630,
        alt: "Todos con Ucrania · Remar",
      },
    ],
  },
};

/* Paleta del evento (misma que /todos-por-ucrania) */
const BLUE = "#005BBB";
const BLUE_D = "#062A63";
const YELLOW = "#FFD500";
const GREEN = "#2E7D1F";
const INK = "#12233F";
const MUTED = "#5A6472";

/**
 * Pantalla a la que apunta el QR del evento. Sin cabecera de navegación,
 * sin fotos pesadas: entra directo a elegir el importe para que cargue
 * rápido con la cobertura del auditorio.
 */
export default function DonarUcraniaPage() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        background: `linear-gradient(168deg, ${BLUE_D} 0%, ${BLUE} 100%)`,
        fontFamily: "var(--font-body)",
        padding: "24px 16px 40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Cabecera: logos + título */}
      <div style={{ width: "100%", maxWidth: 460, textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            marginBottom: 20,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Iglesia Cuerpo de Cristo"
            style={{ height: 38, width: "auto", borderRadius: 8 }}
          />
          <span
            style={{ width: 1, height: 24, background: "rgba(255,255,255,.3)" }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/fotos/remar-blanco.png"
            alt="Remar ONG"
            style={{ height: 38, width: "auto" }}
          />
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(34px,9vw,46px)",
            lineHeight: 1.05,
            color: "#fff",
            margin: "0 0 10px",
          }}
        >
          Todos con <span style={{ color: YELLOW }}>Ucrania</span>
        </h1>

        <p
          style={{
            color: "rgba(255,255,255,.85)",
            fontSize: 15,
            lineHeight: 1.55,
            margin: "0 0 22px",
            maxWidth: 380,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Tu donativo se destina íntegramente a la ayuda humanitaria de Remar en
          Ucrania.
        </p>
      </div>

      {/* Tarjeta con el importe + pago */}
      <div
        style={{
          width: "100%",
          maxWidth: 460,
          background: "#fff",
          borderRadius: 22,
          boxShadow: "0 24px 60px rgba(6,20,45,.32)",
          padding: 22,
          color: INK,
        }}
      >
        <h2
          style={{
            fontSize: 17,
            fontWeight: 700,
            margin: "0 0 4px",
            textAlign: "center",
          }}
        >
          Elige tu donativo
        </h2>
        <p
          style={{
            fontSize: 13.5,
            color: MUTED,
            textAlign: "center",
            margin: "0 0 18px",
            lineHeight: 1.5,
          }}
        >
          Cada aportación cuenta. Gracias por ayudar.
        </p>

        <DonatePanel
          motivo="Todos con Ucrania · Remar"
          accent={GREEN}
          presets={[10, 25, 50, 100, 250]}
        />
      </div>

      {/* Pie */}
      <div
        style={{
          width: "100%",
          maxWidth: 460,
          textAlign: "center",
          marginTop: 24,
        }}
      >
        <Link
          href="/todos-por-ucrania"
          style={{
            color: "rgba(255,255,255,.9)",
            fontSize: 14,
            textDecoration: "none",
            borderBottom: "1px solid rgba(255,255,255,.35)",
            paddingBottom: 2,
          }}
        >
          Ver los detalles del evento
        </Link>

        <p
          style={{
            color: "rgba(255,255,255,.6)",
            fontSize: 11.5,
            lineHeight: 1.6,
            margin: "18px 0 0",
          }}
        >
          Iglesia Cristiana Cuerpo de Cristo · Remar Canarias
          <br />
          <Link
            href="/privacidad"
            style={{ color: "rgba(255,255,255,.7)" }}
          >
            Privacidad
          </Link>
          {" · "}
          <Link
            href="/aviso-legal"
            style={{ color: "rgba(255,255,255,.7)" }}
          >
            Aviso legal
          </Link>
        </p>
      </div>
    </main>
  );
}
