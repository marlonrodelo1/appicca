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
const FONDO = `linear-gradient(168deg, ${BLUE_D} 0%, ${BLUE} 100%)`;

export default function DonarUcraniaPage() {
  return (
    <>
      {/* El degradado va también en el body: si no, al hacer scroll de rebote
          en el móvil asoma una banda blanca por debajo. */}
      <style>{`
        html, body { background: ${BLUE_D}; }
        body::before {
          content: "";
          position: fixed;
          inset: 0;
          background: ${FONDO};
          z-index: -1;
        }
      `}</style>

      <main
        style={{
          minHeight: "100dvh",
          fontFamily: "var(--font-body)",
          padding: "14px 16px 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Cabecera: logos + título */}
        <div style={{ width: "100%", maxWidth: 460, textAlign: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              marginBottom: 12,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Iglesia Cuerpo de Cristo"
              style={{ height: 34, width: "auto", borderRadius: 7 }}
            />
            <span
              style={{
                width: 1,
                height: 22,
                background: "rgba(255,255,255,.3)",
              }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/fotos/remar-blanco.png"
              alt="Remar ONG"
              style={{ height: 34, width: "auto" }}
            />
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(29px,7.5vw,40px)",
              lineHeight: 1.05,
              color: "#fff",
              margin: "0 0 6px",
            }}
          >
            Todos con <span style={{ color: YELLOW }}>Ucrania</span>
          </h1>

          <p
            style={{
              color: "rgba(255,255,255,.85)",
              fontSize: 14,
              lineHeight: 1.45,
              margin: "0 auto 14px",
              maxWidth: 340,
            }}
          >
            Tu donativo va íntegro a la ayuda humanitaria de Remar en Ucrania.
          </p>
        </div>

        {/* Tarjeta con el importe + pago */}
        <div
          style={{
            width: "100%",
            maxWidth: 460,
            background: "#fff",
            borderRadius: 20,
            boxShadow: "0 24px 60px rgba(6,20,45,.32)",
            padding: 18,
            color: INK,
          }}
        >
          <h2
            style={{
              fontSize: 16,
              fontWeight: 700,
              margin: "0 0 12px",
              textAlign: "center",
            }}
          >
            Elige tu donativo
          </h2>

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
            marginTop: 16,
          }}
        >
          <Link
            href="/todos-por-ucrania"
            style={{
              color: "rgba(255,255,255,.9)",
              fontSize: 13.5,
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
              fontSize: 11,
              lineHeight: 1.55,
              margin: "12px 0 0",
            }}
          >
            Iglesia Cristiana Cuerpo de Cristo · Remar Canarias
            <br />
            <Link href="/privacidad" style={{ color: "rgba(255,255,255,.7)" }}>
              Privacidad
            </Link>
            {" · "}
            <Link href="/aviso-legal" style={{ color: "rgba(255,255,255,.7)" }}>
              Aviso legal
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
