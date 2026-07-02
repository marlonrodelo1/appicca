import type { Metadata } from "next";
import { Container, Section, Eyebrow, ImageSlot } from "@/components/web/ui";
import { Clock, GraduationCap, ArrowUpRight, Radio } from "@/components/web/icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Qué hacemos",
  description:
    "Cultos (jueves 20:00 y domingos 11:30), escuela dominical para niños y evangelización por Tenerife. Actividades y horarios de la Iglesia Cuerpo de Cristo.",
};

const ACTIVIDADES = [
  {
    icon: <Clock size={24} color="#C8A96E" stroke={1.7} />,
    titulo: "Culto de oración",
    horario: "Jueves · 20:00",
    texto: "Una noche para orar juntos, buscar a Dios y sostener a la comunidad en fe.",
  },
  {
    icon: <GraduationCap size={24} color="#C8A96E" stroke={1.7} />,
    titulo: "Escuela dominical",
    horario: "Domingos · durante el culto",
    texto: "Clases para los niños mientras los adultos participan en el culto dominical.",
  },
  {
    icon: <Clock size={24} color="#C8A96E" stroke={1.7} />,
    titulo: "Culto dominical",
    horario: "Domingos · 11:30",
    texto: "Alabanza, palabra y comunidad. Al terminar, entrega de víveres a las familias.",
  },
];

export default function ActividadesPage() {
  return (
    <>
      <Section bg="#FFFFFF">
        <Container max={1120} style={{ padding: "56px 28px 20px" }}>
          <Eyebrow>Qué hacemos</Eyebrow>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 48,
              lineHeight: 1.05,
              margin: "0 0 18px",
              maxWidth: 720,
            }}
          >
            Actividades y horarios
          </h1>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.7,
              color: "#6B7280",
              maxWidth: 640,
              margin: 0,
            }}
          >
            Cultos, escuela dominical y evangelización. Todo el mundo es
            bienvenido, sin importar de dónde vengas.
          </p>
        </Container>
      </Section>

      <Section bg="#FFFFFF">
        <Container
          max={1120}
          style={{
            padding: "36px 28px 20px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: 22,
          }}
        >
          {ACTIVIDADES.map((a) => (
            <div
              key={a.titulo}
              style={{ background: "#FBF7F0", borderRadius: 20, padding: 30 }}
            >
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 13,
                  background: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 18,
                }}
              >
                {a.icon}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 23,
                  margin: "0 0 8px",
                }}
              >
                {a.titulo}
              </h3>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#B7965A",
                  marginBottom: 10,
                }}
              >
                {a.horario}
              </div>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: "#6B7280",
                  margin: 0,
                }}
              >
                {a.texto}
              </p>
            </div>
          ))}
        </Container>
      </Section>

      <Section bg="#F7F5F1">
        <Container
          max={1120}
          style={{
            padding: "56px 28px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: 36,
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "5px 12px",
                background: "#F1F7FB",
                color: "#5C9BC0",
                borderRadius: 999,
                fontSize: 11.5,
                fontWeight: 700,
                marginBottom: 14,
              }}
            >
              Sábados
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 32,
                lineHeight: 1.08,
                margin: "0 0 14px",
              }}
            >
              Evangelización por Tenerife
            </h2>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.7,
                color: "#5A6070",
                margin: "0 0 12px",
              }}
            >
              Los sábados salimos a los pueblos de la isla: visitamos a las
              familias, oramos por el lugar, pasamos por el ayuntamiento y
              compartimos el mensaje del evangelio con quien quiera escucharlo.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "#5A6070", margin: 0 }}>
              Nuestro anhelo es llegar, poco a poco, a todas las Islas Canarias.
            </p>
          </div>
          <ImageSlot
            label="Foto de una salida de evangelización"
            height={320}
            radius={20}
          />
        </Container>
      </Section>

      <Section bg="#2D3142">
        <Container max={1120} style={{ padding: "48px 28px" }}>
          <a
            href={site.radioUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 24,
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                background: "rgba(123,184,217,.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Radio size={30} color="#7BB8D9" stroke={1.6} />
            </div>
            <div style={{ flex: "1 1 300px" }}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 24,
                  color: "#fff",
                  marginBottom: 4,
                }}
              >
                {site.radioName}
              </div>
              <div style={{ fontSize: 14, color: "#B9BDC7" }}>
                Nuestra emisora solidaria, con programación cristiana y contenido
                de la comunidad.
              </div>
            </div>
            <div
              style={{
                padding: "12px 22px",
                border: "1.5px solid rgba(255,255,255,.25)",
                color: "#fff",
                borderRadius: 11,
                fontWeight: 600,
                fontSize: 14,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              Abrir emisora <ArrowUpRight size={15} stroke={1.8} />
            </div>
          </a>
        </Container>
      </Section>
    </>
  );
}
