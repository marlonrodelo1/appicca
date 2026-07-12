import type { Metadata } from "next";
import { Container, Section } from "@/components/web/ui";
import {
  Clock,
  MapPin,
  Users,
  Heart,
  Radio,
  Directions,
  ArrowUpRight,
  Cutlery,
  ArrowRight,
} from "@/components/web/icons";
import UcraniaGallery from "@/components/web/UcraniaGallery";
import { Typewriter } from "@/components/web/Typewriter";
import EventCountdown from "@/components/web/EventCountdown";

export const metadata: Metadata = {
  title: "Todos con Ucrania",
  description:
    "Tarde solidaria de recaudación de fondos a favor de la ayuda humanitaria de Remar en Ucrania. Sábado 12 de septiembre de 2026, 18:00 h, Auditorio IES El Chapatal (Santa Cruz de Tenerife). Entrada libre, donativos voluntarios.",
  openGraph: {
    title: "Todos con Ucrania · Evento solidario",
    description:
      "Una tarde para llevar esperanza a Ucrania. 12 de septiembre de 2026, 18:00 h, Auditorio IES El Chapatal. Entrada libre, donativos voluntarios.",
    images: [
      {
        url: "/fotos/og-todos-por-ucrania.png",
        width: 1200,
        height: 630,
        alt: "Todos con Ucrania · Remar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Todos con Ucrania · Evento solidario",
    description:
      "Una tarde para llevar esperanza a Ucrania. 12 de septiembre de 2026, 18:00 h, Auditorio IES El Chapatal. Entrada libre, donativos voluntarios.",
    images: ["/fotos/og-todos-por-ucrania.png"],
  },
};

/* Paleta del evento */
const BLUE = "#005BBB";
const BLUE_D = "#062A63";
const YELLOW = "#FFD500";
const GREEN = "#2E7D1F";
const INK = "#12233F";
const CREAM = "#F7F5F1";
const MUTED = "#5A6472";

const PAGE_URL = "cuerpodecristoacentejo.com/todos-por-ucrania";
const MAPS_URL = "https://maps.google.com/?cid=8693761232558478632";

/* Fondo del hero: foto real de un voluntario de Remar + overlay azul→verde
   (oscurecido para que el texto blanco/amarillo se lea) */
const HERO_BG =
  "linear-gradient(168deg, rgba(3,44,116,.84) 0%, rgba(8,58,92,.72) 48%, rgba(18,78,42,.9) 100%)," +
  " url('/fotos/hero-ucrania.jpg') center 30% / cover no-repeat";

function Remar({ children = "Remar" }: { children?: string }) {
  return (
    <a
      href="https://remar.org"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: BLUE, fontWeight: 600, textDecoration: "none" }}
    >
      {children}
    </a>
  );
}

function Eyebrow({
  children,
  color = YELLOW,
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <div
      style={{
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: "2px",
        color,
        textTransform: "uppercase",
        marginBottom: 14,
      }}
    >
      {children}
    </div>
  );
}

/* Qué ofrece la tarde (elaborado a partir del cartel, sin horarios inventados) */
const programa = [
  {
    icon: <Users size={22} color={BLUE} stroke={1.8} />,
    titulo: "Ponencia de Miguel Díez",
    texto:
      "El presidente de Remar comparte de primera mano la labor humanitaria sobre el terreno en Ucrania.",
  },
  {
    icon: <Heart size={22} color={BLUE} stroke={1.8} />,
    titulo: "Testimonios en primera persona",
    texto:
      "Voluntarias activas en Ucrania cuentan lo que viven cada día junto a las familias desplazadas.",
  },
  {
    icon: <Cutlery size={22} color={BLUE} stroke={1.8} />,
    titulo: "La campaña Todos con Ucrania",
    texto:
      "Presentación de la recaudación de fondos y de cómo tu ayuda llega directamente a Ucrania.",
  },
  {
    icon: <Radio size={22} color={BLUE} stroke={1.8} />,
    titulo: "Con Radio Solidaria Acentejo",
    texto:
      "El evento cuenta con el apoyo de la radio solidaria de la comunidad.",
  },
];

const detalles = [
  {
    icon: <Clock size={22} color={BLUE} stroke={1.8} />,
    label: "Fecha y hora",
    value: "Sábado 12 de septiembre de 2026",
    sub: "18:00 h",
  },
  {
    icon: <MapPin size={22} color={BLUE} stroke={1.8} />,
    label: "Lugar",
    value: "Auditorio IES El Chapatal",
    sub: "Santa Cruz de Tenerife",
  },
  {
    icon: <Heart size={22} color={BLUE} stroke={1.8} />,
    label: "Cómo se entra",
    value: "Entrada libre",
    sub: "Donativos voluntarios para la ayuda humanitaria",
  },
];

/* Contexto: a dónde va la ayuda (datos reales de Remar) */
const impacto = [
  { n: "+300", t: "personas cada día en el comedor de Kiev" },
  { n: "~2.000", t: "atendidas al día en Chernivtsi" },
  { n: "~3.000", t: "personas por semana en Rivne" },
  { n: "100", t: "familias acogidas en Mostyska" },
];

export default function TodosPorUcraniaPage() {
  return (
    <main style={{ fontFamily: "var(--font-body)", color: INK }}>
      {/* ===== CABECERA STICKY CON CUENTA ATRÁS ===== */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(6,25,58,.92)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255,255,255,.12)",
        }}
      >
        <div
          style={{
            maxWidth: 1220,
            margin: "0 auto",
            padding: "5px 12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,.72)",
              whiteSpace: "nowrap",
            }}
          >
            <Clock size={13} color={YELLOW} stroke={2} />
            Faltan
          </span>
          <EventCountdown />
        </div>
      </header>

      {/* ===== HERO ===== */}
      <Section bg={HERO_BG}>
        <Container
          max={960}
          style={{
            padding: "clamp(40px,7vw,72px) 22px clamp(46px,7vw,72px)",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 14,
              marginBottom: 26,
              flexWrap: "wrap",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Iglesia Cuerpo de Cristo"
              style={{ height: 40, width: "auto", borderRadius: 8 }}
            />
            <span style={{ width: 1, height: 26, background: "rgba(255,255,255,.3)" }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/fotos/remar-blanco.png"
              alt="Remar ONG"
              style={{ height: 40, width: "auto" }}
            />
          </div>

          <Eyebrow>Evento solidario · Recaudación de fondos</Eyebrow>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(46px,10vw,84px)",
              lineHeight: 1.02,
              margin: "0 0 8px",
              letterSpacing: "-0.5px",
            }}
          >
            Todos con <span style={{ color: YELLOW }}>Ucrania</span>
          </h1>
          <div
            style={{
              width: 74,
              height: 5,
              borderRadius: 999,
              background: YELLOW,
              margin: "14px auto 22px",
            }}
          />
          <p
            style={{
              fontSize: "clamp(18px,3.4vw,23px)",
              fontWeight: 700,
              margin: "0 0 8px",
              textTransform: "uppercase",
              letterSpacing: ".5px",
              lineHeight: 1.2,
              minHeight: "2.6em",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Typewriter
              words={[
                "Tu ayuda puede marcar la diferencia",
                "Cada gesto de solidaridad cuenta",
                "Juntos llevamos esperanza a Ucrania",
              ]}
              speed={70}
              deleteSpeed={35}
              delayBetweenWords={2000}
              cursorChar="|"
            />
          </p>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "clamp(18px,3.2vw,22px)",
              color: "rgba(255,255,255,.85)",
              margin: "0 auto 30px",
              maxWidth: 540,
            }}
          >
            Una tarde solidaria a favor de la ayuda humanitaria en Ucrania.
          </p>

          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 12 }}>
            {[
              { ic: <Clock size={17} color={INK} stroke={2} />, t: "Sáb 12 sep 2026 · 18:00 h" },
              { ic: <MapPin size={17} color={INK} stroke={2} />, t: "Auditorio IES El Chapatal" },
              { ic: <Heart size={17} color={INK} stroke={2} />, t: "Entrada libre" },
            ].map((c) => (
              <span
                key={c.t}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(255,255,255,.94)",
                  color: INK,
                  padding: "9px 15px",
                  borderRadius: 999,
                  fontSize: 13.5,
                  fontWeight: 600,
                }}
              >
                {c.ic}
                {c.t}
              </span>
            ))}
          </div>
        </Container>
      </Section>

      {/* ===== EL EVENTO ===== */}
      <Section bg="#FFFFFF">
        <Container max={820} style={{ padding: "clamp(52px,8vw,84px) 22px 10px", textAlign: "center" }}>
          <Eyebrow color={BLUE}>El evento</Eyebrow>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(30px,5.5vw,46px)",
              lineHeight: 1.08,
              margin: "0 0 18px",
            }}
          >
            Una tarde para llevar esperanza a Ucrania
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.75, color: "#3B4453", margin: 0 }}>
            El sábado 12 de septiembre, la Iglesia Cuerpo de Cristo Acentejo y{" "}
            <Remar>Remar</Remar> te invitan a una tarde solidaria de recaudación
            de fondos a favor de la ayuda humanitaria en Ucrania. Ven a conocer,
            de la mano de quienes están sobre el terreno, cómo tu ayuda transforma
            vidas. La entrada es libre y los donativos, voluntarios.
          </p>
        </Container>

        {/* La tarde incluirá */}
        <Container style={{ padding: "26px 22px clamp(52px,8vw,84px)" }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "2px",
              color: GREEN,
              textTransform: "uppercase",
              textAlign: "center",
              marginBottom: 24,
            }}
          >
            La tarde incluirá
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
              gap: 20,
            }}
          >
            {programa.map((p) => (
              <div
                key={p.titulo}
                style={{
                  background: "#fff",
                  border: "1px solid #E9E4D8",
                  borderRadius: 20,
                  padding: 26,
                  boxShadow: "0 10px 30px rgba(6,20,45,.05)",
                }}
              >
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 13,
                    background: "#EAF2FB",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  {p.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: 22,
                    lineHeight: 1.15,
                    margin: "0 0 8px",
                  }}
                >
                  {p.titulo}
                </h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.6, color: MUTED, margin: 0 }}>
                  {p.texto}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ===== GALERÍA ===== */}
      <Section bg={CREAM}>
        <Container style={{ padding: "clamp(52px,8vw,84px) 22px clamp(40px,6vw,64px)" }}>
          <div style={{ textAlign: "center", marginBottom: 34 }}>
            <Eyebrow color={GREEN}>La ayuda que apoyamos</Eyebrow>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(30px,5.5vw,46px)",
                lineHeight: 1.08,
                margin: "0 auto 12px",
                maxWidth: 640,
              }}
            >
              La labor de <Remar>Remar</Remar> en Ucrania
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.65, color: MUTED, maxWidth: 560, margin: "0 auto" }}>
              Esto es lo que hace posible tu asistencia y tu donativo: comedores
              sociales, reparto de alimentos y acogida a familias desplazadas.
              Arrastra las fotos para verlas de cerca.
            </p>
          </div>
          <UcraniaGallery />
        </Container>
      </Section>

      {/* ===== DETALLES DEL EVENTO ===== */}
      <Section bg="#FFFFFF">
        <Container style={{ padding: "clamp(52px,8vw,84px) 22px" }}>
          <div style={{ textAlign: "center", marginBottom: 34 }}>
            <Eyebrow color={BLUE}>Toda la información</Eyebrow>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(30px,5.5vw,46px)",
                margin: 0,
              }}
            >
              Detalles del evento
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
              gap: 20,
            }}
          >
            {detalles.map((d) => (
              <div
                key={d.label}
                style={{
                  background: "#fff",
                  border: "1px solid #E9E4D8",
                  borderRadius: 20,
                  padding: 26,
                  boxShadow: "0 10px 30px rgba(6,20,45,.05)",
                }}
              >
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 13,
                    background: "#EAF2FB",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  {d.icon}
                </div>
                <div
                  style={{
                    fontSize: 11.5,
                    fontWeight: 700,
                    letterSpacing: "1.2px",
                    textTransform: "uppercase",
                    color: MUTED,
                    marginBottom: 7,
                  }}
                >
                  {d.label}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: 23,
                    lineHeight: 1.15,
                    marginBottom: 4,
                  }}
                >
                  {d.value}
                </div>
                <div style={{ fontSize: 14, color: MUTED, lineHeight: 1.5 }}>{d.sub}</div>
              </div>
            ))}
          </div>

          {/* Ponente destacado */}
          <div
            style={{
              marginTop: 20,
              background: `linear-gradient(120deg,${BLUE_D},${BLUE})`,
              borderRadius: 22,
              padding: "clamp(26px,5vw,40px)",
              color: "#fff",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
              gap: 24,
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 11.5,
                  fontWeight: 700,
                  letterSpacing: "1.6px",
                  textTransform: "uppercase",
                  color: YELLOW,
                  marginBottom: 12,
                }}
              >
                Con la participación de
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(28px,5vw,40px)",
                  lineHeight: 1.05,
                  marginBottom: 8,
                }}
              >
                Miguel Díez
              </div>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: "rgba(255,255,255,.88)" }}>
                Presidente de <Remar>Remar</Remar>, junto a voluntarias activas
                en Ucrania que compartirán su testimonio.
              </p>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/fotos/miguel-diez.jpg"
                alt="Miguel Díez, presidente de Remar"
                style={{
                  width: 210,
                  maxWidth: "100%",
                  aspectRatio: "4 / 5",
                  objectFit: "cover",
                  objectPosition: "center top",
                  borderRadius: 18,
                  border: "5px solid rgba(255,255,255,.92)",
                  boxShadow: "0 16px 40px rgba(0,0,0,.32)",
                }}
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* ===== CÓMO COLABORAR ===== */}
      <Section bg={GREEN}>
        <Container max={1000} style={{ padding: "clamp(52px,8vw,84px) 22px", color: "#fff" }}>
          <div style={{ textAlign: "center", marginBottom: 34 }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "2px",
                color: YELLOW,
                textTransform: "uppercase",
                marginBottom: 14,
              }}
            >
              Cómo colaborar
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(28px,5vw,44px)",
                margin: "0 auto",
                maxWidth: 620,
              }}
            >
              Hay muchas formas de sumarte
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))",
              gap: 18,
            }}
          >
            {[
              {
                t: "Ven al evento",
                d: "Entrada libre el 12 de septiembre. Tu presencia ya es apoyo.",
              },
              {
                t: "Aporta tu donativo",
                d: "Donativos voluntarios en el evento, destinados íntegramente a la ayuda en Ucrania.",
              },
              {
                t: "Comparte e invita",
                d: "Difunde el cartel y esta página, y trae contigo a quien quieras.",
              },
            ].map((c) => (
              <div
                key={c.t}
                style={{
                  background: "rgba(255,255,255,.08)",
                  border: "1px solid rgba(255,255,255,.2)",
                  borderRadius: 18,
                  padding: "26px 24px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: 23,
                    margin: "0 0 8px",
                  }}
                >
                  {c.t}
                </h3>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: "rgba(255,255,255,.85)" }}>
                  {c.d}
                </p>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: 26, fontSize: 14, color: "rgba(255,255,255,.8)" }}>
            Comparte esta página: <strong>{PAGE_URL}</strong>
          </p>
        </Container>
      </Section>

      {/* ===== POR QUÉ UCRANIA (contexto) ===== */}
      <Section bg={BLUE_D}>
        <Container style={{ padding: "clamp(52px,8vw,84px) 22px" }}>
          <div style={{ textAlign: "center", marginBottom: 18 }}>
            <Eyebrow>A dónde va tu ayuda</Eyebrow>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(28px,5vw,44px)",
                color: "#fff",
                margin: "0 auto 14px",
                maxWidth: 640,
              }}
            >
              Ayuda real que llega cada día a Ucrania
            </h2>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.7,
                color: "rgba(255,255,255,.8)",
                maxWidth: 640,
                margin: "0 auto",
              }}
            >
              Los fondos sostienen la labor de <Remar>Remar</Remar> SOS sobre el
              terreno: comedores sociales, reparto de alimentos, ropa de abrigo y
              acogida a familias desplazadas en Kiev, Lviv, Rivne, Chernivtsi y
              Mostyska.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
              gap: 18,
              marginTop: 24,
            }}
          >
            {impacto.map((s) => (
              <div
                key={s.t}
                style={{
                  background: "rgba(255,255,255,.06)",
                  border: "1px solid rgba(255,255,255,.14)",
                  borderRadius: 18,
                  padding: "26px 22px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "clamp(38px,6vw,52px)",
                    color: YELLOW,
                    lineHeight: 1,
                    marginBottom: 10,
                  }}
                >
                  {s.n}
                </div>
                <div style={{ fontSize: 14.5, lineHeight: 1.5, color: "rgba(255,255,255,.85)" }}>
                  {s.t}
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 26 }}>
            <a
              href="https://remar.org/emergencias/sos-ucrania/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                color: "#fff",
                fontWeight: 600,
                fontSize: 15,
                textDecoration: "none",
                borderBottom: `2px solid ${YELLOW}`,
                paddingBottom: 3,
              }}
            >
              Conoce la emergencia SOS Ucrania de Remar
              <ArrowUpRight size={17} color={YELLOW} stroke={2} />
            </a>
          </div>
        </Container>
      </Section>

      {/* ===== CÓMO LLEGAR ===== */}
      <Section bg="#FFFFFF">
        <Container max={900} style={{ padding: "clamp(52px,8vw,80px) 22px", textAlign: "center" }}>
          <Eyebrow color={BLUE}>Cómo llegar</Eyebrow>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(28px,5vw,42px)",
              margin: "0 0 10px",
            }}
          >
            Auditorio IES El Chapatal
          </h2>
          <p style={{ fontSize: 16.5, color: MUTED, margin: "0 0 24px" }}>
            Santa Cruz de Tenerife · Sábado 12 de septiembre de 2026, 18:00 h
          </p>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              background: INK,
              color: "#fff",
              fontWeight: 600,
              fontSize: 15,
              padding: "13px 24px",
              borderRadius: 12,
              textDecoration: "none",
            }}
          >
            <Directions size={18} color="#fff" stroke={1.9} />
            Ver ubicación en Google Maps
          </a>
        </Container>
      </Section>

      {/* ===== ORGANIZAN / APOYO / COLABORACIÓN ===== */}
      <Section bg={CREAM}>
        <Container style={{ padding: "clamp(48px,7vw,72px) 22px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))",
              gap: 22,
            }}
          >
            <CreditCard title="Organizan">
              <span style={{ fontWeight: 600 }}>Iglesia Cuerpo de Cristo Acentejo</span>
              <span style={{ color: MUTED }}> · </span>
              <Remar>Remar</Remar> S.O.S
            </CreditCard>
            <CreditCard title="Con el apoyo de">
              <a
                href={"https://www.radiosolidariaacentejo.com"}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  color: INK,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                <Radio size={18} color={GREEN} stroke={1.8} />
                Radio Solidaria Acentejo
              </a>
            </CreditCard>
            <CreditCard title="Con la colaboración de">
              <span style={{ fontWeight: 600 }}>I.E.S. El Chapatal</span>
            </CreditCard>
          </div>
        </Container>
      </Section>

      {/* ===== CIERRE ===== */}
      <Section bg={`linear-gradient(120deg,${BLUE} 0%, ${GREEN} 100%)`}>
        <Container max={820} style={{ padding: "clamp(52px,8vw,88px) 22px", textAlign: "center" }}>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "clamp(26px,5vw,42px)",
              lineHeight: 1.2,
              color: "#fff",
              margin: "0 0 22px",
            }}
          >
            Juntos llevamos esperanza donde más se necesita.
          </p>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              background: "#fff",
              color: INK,
              fontWeight: 700,
              fontSize: 15.5,
              padding: "14px 26px",
              borderRadius: 999,
              textDecoration: "none",
            }}
          >
            Te esperamos el 12 de septiembre
            <ArrowRight size={18} color={INK} stroke={2} />
          </a>
        </Container>
      </Section>
    </main>
  );
}

function CreditCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #E9E4D8",
        borderRadius: 18,
        padding: "22px 24px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "1.4px",
          textTransform: "uppercase",
          color: "#C8A96E",
          marginBottom: 12,
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: 15.5, lineHeight: 1.5, color: INK }}>{children}</div>
    </div>
  );
}
