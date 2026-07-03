import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section, Eyebrow, ImageSlot } from "@/components/web/ui";

export const metadata: Metadata = {
  title: "Acción social",
  description:
    "Reparto de alimentos con Remar, entrega de víveres cada domingo y apadrinamiento de niños. La acción social de la Iglesia Cuerpo de Cristo en Tenerife.",
};

const PROYECTOS = [
  { titulo: "Acogida", texto: "Casas de acogida para personas sin hogar." },
  { titulo: "Rehabilitación", texto: "Programas de recuperación y nueva vida." },
  { titulo: "Ropero solidario", texto: "Recogida y entrega de ropa a quien la necesita." },
  { titulo: "Emergencias", texto: "Respuesta ante crisis humanitarias." },
];

const pill = (bg: string, color: string): React.CSSProperties => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 7,
  padding: "5px 12px",
  background: bg,
  color,
  borderRadius: 999,
  fontSize: 11.5,
  fontWeight: 700,
  marginBottom: 14,
});

export default function AccionSocialPage() {
  return (
    <>
      <Section bg="#FFFFFF">
        <Container max={1120} style={{ padding: "56px 28px 20px" }}>
          <Eyebrow color="#4CAF50">Acción social</Eyebrow>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(32px, 7vw, 48px)",
              lineHeight: 1.05,
              margin: "0 0 18px",
              maxWidth: 720,
            }}
          >
            La fe que se toca con las manos
          </h1>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.7,
              color: "#6B7280",
              maxWidth: 660,
              margin: 0,
            }}
          >
            Parte de nuestros proyectos son locales y otros forman parte de la
            red de Remar. Aquí te contamos qué hacemos y de dónde viene cada
            iniciativa.
          </p>
        </Container>
      </Section>

      {/* Reparto */}
      <Section bg="#FFFFFF">
        <Container
          max={1120}
          style={{
            padding: "36px 28px 20px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: 28,
            alignItems: "center",
          }}
        >
          <ImageSlot label="Reparto de alimentos a familias" src="/fotos/reparto-alimentos.jpg" height={320} radius={20} />
          <div>
            <div style={pill("#EAF4EA", "#3E8E43")}>Junto a Remar</div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 30,
                margin: "0 0 12px",
              }}
            >
              Reparto de alimentos
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "#5A6070", margin: 0 }}>
              Recogemos y distribuimos comida a familias en situación vulnerable.
              Un trabajo constante, mano a mano con la red de Remar en Canarias,
              para que nadie se quede sin lo básico.
            </p>
          </div>
        </Container>
      </Section>

      {/* Víveres destacado */}
      <Section bg="#F7F5F1">
        <Container max={1120} style={{ padding: "40px 28px" }}>
          <div
            style={{
              background: "linear-gradient(120deg,#F1F8F1,#EAF4EA)",
              border: "1px solid #DCEEDC",
              borderRadius: 22,
              padding: 40,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
              gap: 32,
              alignItems: "center",
            }}
          >
            <div>
              <div style={pill("#fff", "#3E8E43")}>Local · Destacado</div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 32,
                  lineHeight: 1.08,
                  margin: "0 0 12px",
                }}
              >
                Entrega de víveres los domingos
              </h2>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: "#4A5060",
                  margin: "0 0 20px",
                }}
              >
                Nuestra seña de identidad: cada domingo, al terminar el culto,
                entregamos una bolsa de mercado a las familias que lo necesitan.
                Si necesitas ayuda o conoces a alguien que la necesite,
                escríbenos.
              </p>
              <Link
                href="/contacto"
                className="dc-green"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "13px 22px",
                  background: "#4CAF50",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: 14,
                  borderRadius: 12,
                }}
              >
                Solicitar bolsa de alimento
              </Link>
            </div>
            <ImageSlot label="Bolsa de víveres para las familias" src="/fotos/bolsa-viveres.jpg" height={280} radius={18} />
          </div>
        </Container>
      </Section>

      {/* Apadrinamiento */}
      <Section bg="#FFFFFF">
        <Container
          max={1120}
          style={{
            padding: "56px 28px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: 28,
            alignItems: "center",
          }}
        >
          <div>
            <div style={pill("#FBF7F0", "#B7965A")}>Proyecto Remar</div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 30,
                margin: "0 0 12px",
              }}
            >
              Apadrinamiento de niños
            </h2>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.7,
                color: "#5A6070",
                margin: "0 0 18px",
              }}
            >
              Remar impulsa el apadrinamiento de niños en situación de necesidad,
              garantizándoles alimento, educación y un futuro. Desde aquí puedes
              iniciar tu solicitud para apadrinar.
            </p>
            <Link
              href="/donar"
              className="dc-gold"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "13px 22px",
                background: "#C8A96E",
                color: "#fff",
                fontWeight: 600,
                fontSize: 14,
                borderRadius: 12,
              }}
            >
              Quiero apadrinar
            </Link>
          </div>
          <ImageSlot
            label="Apadrinamiento de niños — proyecto Remar"
            src="/fotos/apadrinamiento-ninos.jpg"
            height={300}
            radius={20}
          />
        </Container>
      </Section>

      {/* Otros proyectos */}
      <Section bg="#F7F5F1">
        <Container max={1120} style={{ padding: "56px 28px" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 30,
              margin: "0 0 8px",
              textAlign: "center",
            }}
          >
            Otros proyectos de Remar
          </h2>
          <p
            style={{
              fontSize: 14.5,
              color: "#6B7280",
              textAlign: "center",
              margin: "0 auto 30px",
              maxWidth: 520,
            }}
          >
            La red de Remar abarca mucho más. Estos proyectos se coordinan a
            nivel de la ONG.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: 18,
            }}
          >
            {PROYECTOS.map((pr) => (
              <div
                key={pr.titulo}
                style={{
                  background: "#fff",
                  border: "1px solid #EDEFF5",
                  borderRadius: 16,
                  padding: 24,
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: 19,
                    margin: "0 0 8px",
                  }}
                >
                  {pr.titulo}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    lineHeight: 1.6,
                    color: "#6B7280",
                    margin: 0,
                  }}
                >
                  {pr.texto}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
