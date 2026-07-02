import type { Metadata } from "next";
import { Container, Section, Eyebrow, ImageSlot } from "@/components/web/ui";

export const metadata: Metadata = {
  title: "Quiénes somos",
  description:
    "La Iglesia Cristiana Cuerpo de Cristo, una familia de fe al servicio de Tenerife y parte de la ONG Remar. Nuestra historia, misión y valores.",
};

const VALORES = [
  { n: "01", titulo: "Fe", texto: "Cristo en el centro de todo lo que somos y hacemos." },
  { n: "02", titulo: "Servicio", texto: "Amar al prójimo con hechos, no solo con palabras." },
  { n: "03", titulo: "Comunidad", texto: "Nadie camina solo: somos familia los unos de los otros." },
  { n: "04", titulo: "Esperanza", texto: "Creemos que siempre hay una puerta abierta y un nuevo comienzo." },
];

const h2col: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontWeight: 700,
  fontSize: 30,
  margin: "0 0 14px",
};
const pcol: React.CSSProperties = {
  fontSize: 15,
  lineHeight: 1.72,
  color: "#5A6070",
};

export default function QuienesSomosPage() {
  return (
    <>
      <Section bg="#FFFFFF">
        <Container max={1120} style={{ padding: "56px 28px 20px" }}>
          <Eyebrow>Quiénes somos</Eyebrow>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 48,
              lineHeight: 1.05,
              margin: "0 0 18px",
              maxWidth: 760,
            }}
          >
            Una familia de fe al servicio de Tenerife
          </h1>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.7,
              color: "#6B7280",
              maxWidth: 680,
              margin: 0,
            }}
          >
            La Iglesia Cristiana Cuerpo de Cristo nació con una convicción
            sencilla: la fe se demuestra con hechos. Somos una comunidad
            cristiana que anuncia el evangelio y, al mismo tiempo, tiende la mano
            a quien atraviesa un momento difícil.
          </p>
        </Container>
      </Section>

      <Section bg="#FFFFFF">
        <Container max={1120} style={{ padding: "24px 28px 48px" }}>
          <ImageSlot
            label="Foto de la congregación o del templo"
            height={380}
            radius={22}
          />
        </Container>
      </Section>

      <Section bg="#F7F5F1">
        <Container
          max={1120}
          style={{
            padding: "60px 28px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: 40,
          }}
        >
          <div>
            <h2 style={h2col}>Nuestra historia y misión</h2>
            <p style={{ ...pcol, margin: "0 0 14px" }}>
              Empezamos siendo un pequeño grupo reunido para orar. Con el
              tiempo, esa oración se transformó en acción: repartos de comida,
              visitas, apoyo a familias y una entrega de víveres cada domingo que
              hoy es seña de identidad de la iglesia.
            </p>
            <p style={{ ...pcol, margin: 0 }}>
              Nuestra misión es doble: acercar a las personas al amor de Cristo y
              cubrir necesidades reales de nuestra comunidad, sin distinción y
              sin juzgar a nadie.
            </p>
          </div>
          <div>
            <h2 style={h2col}>Nuestra relación con Remar</h2>
            <p style={{ ...pcol, margin: "0 0 14px" }}>
              Remar (Rehabilitación de Marginados) es una ONG cristiana con
              presencia internacional dedicada a la ayuda social: alimentos,
              acogida, rehabilitación y apadrinamiento de niños.
            </p>
            <p style={{ ...pcol, margin: 0 }}>
              Como parte de su red en Canarias, canalizamos localmente muchos de
              sus proyectos y aportamos manos, oración y presencia en cada pueblo
              de Tenerife.
            </p>
          </div>
        </Container>
      </Section>

      <Section bg="#FFFFFF">
        <Container max={1120} style={{ padding: "60px 28px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: 36,
              alignItems: "center",
            }}
          >
            <ImageSlot
              label="Foto del equipo pastoral"
              height={320}
              radius={20}
            />
            <div>
              <Eyebrow>Equipo pastoral</Eyebrow>
              <h2 style={h2col}>Al frente de la iglesia</h2>
              <p style={{ ...pcol, margin: 0 }}>
                Nuestro pastor y el equipo de servidores acompañan a la
                congregación en la enseñanza, la oración y la acción social. Un
                equipo cercano, disponible para escuchar y ayudar a cualquiera
                que llame a nuestra puerta.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section bg="#F7F5F1">
        <Container max={1120} style={{ padding: "60px 28px" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 32,
              margin: "0 0 30px",
              textAlign: "center",
            }}
          >
            Nuestros valores
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: 20,
            }}
          >
            {VALORES.map((v) => (
              <div
                key={v.n}
                style={{
                  background: "#fff",
                  border: "1px solid #EDEFF5",
                  borderRadius: 18,
                  padding: 28,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 36,
                    color: "#C8A96E",
                    marginBottom: 10,
                  }}
                >
                  {v.n}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: 20,
                    margin: "0 0 8px",
                  }}
                >
                  {v.titulo}
                </h3>
                <p
                  style={{
                    fontSize: 13.5,
                    lineHeight: 1.6,
                    color: "#6B7280",
                    margin: 0,
                  }}
                >
                  {v.texto}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
