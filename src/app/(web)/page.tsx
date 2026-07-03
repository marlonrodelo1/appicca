import Link from "next/link";
import { site } from "@/lib/site";
import { Container, Section, Eyebrow, ImageSlot } from "@/components/web/ui";
import {
  Heart,
  ArrowRight,
  ArrowUpRight,
  Clock,
  MapPin,
  Basket,
  BasketSimple,
  Users,
} from "@/components/web/icons";
import { getNovedades } from "@/lib/data";
import HeroSlideshow from "@/components/web/HeroSlideshow";

export const revalidate = 300;

/** Foto de portada para cada tarjeta de novedad según su categoría. */
function fotoNovedad(cat: string): string {
  const c = cat.toLowerCase();
  if (c.includes("evangel")) return "/fotos/evangelizacion.jpg";
  if (c.includes("testimon")) return "/fotos/testimonio.jpg";
  return "/fotos/reparto-alimentos.jpg";
}

const heading38: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontWeight: 700,
  fontSize: "clamp(28px, 5.5vw, 38px)",
  lineHeight: 1.05,
  margin: 0,
};

export default async function Home() {
  const novedades = await getNovedades();
  return (
    <>
      {/* HERO */}
      <Section bg="#FFFFFF">
        <Container
          style={{
            padding: "70px 28px 64px",
            display: "flex",
            flexWrap: "wrap",
            gap: 52,
            alignItems: "center",
          }}
        >
          <div style={{ flex: "1 1 400px", minWidth: 300 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 14px",
                background: "#F7F5F1",
                border: "1px solid #EDEFF5",
                borderRadius: 999,
                fontSize: 11.5,
                fontWeight: 600,
                letterSpacing: ".6px",
                color: "#6B7280",
                marginBottom: 24,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#4CAF50",
                }}
              />
              TENERIFE · ISLAS CANARIAS
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(38px, 8vw, 58px)",
                lineHeight: 1.04,
                letterSpacing: "-.5px",
                margin: "0 0 22px",
              }}
            >
              Fe que se convierte en{" "}
              <span style={{ color: "#C8A96E" }}>ayuda real</span>
            </h1>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.72,
                color: "#6B7280",
                maxWidth: 520,
                margin: "0 0 30px",
              }}
            >
              Somos una iglesia cristiana en Tenerife, parte de la ONG Remar.
              Cada semana compartimos el evangelio y llevamos alimento, abrigo y
              esperanza a quien más lo necesita.
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 14,
                marginBottom: 34,
              }}
            >
              <Link
                href="/donar"
                className="dc-gold"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                  padding: "15px 26px",
                  background: "#C8A96E",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: 15,
                  borderRadius: 12,
                  boxShadow: "0 8px 22px rgba(200,169,110,.4)",
                }}
              >
                <Heart size={18} stroke={1.9} />
                Donar por Bizum
              </Link>
              <Link
                href="/quienes-somos"
                className="dc-outline"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "15px 26px",
                  background: "#fff",
                  color: "#2D3142",
                  fontWeight: 600,
                  fontSize: 15,
                  borderRadius: 12,
                  border: "1.5px solid #E4E0D6",
                }}
              >
                Conócenos
                <ArrowRight size={17} stroke={1.9} />
              </Link>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {[
                { d: "Jueves", t: "Culto de oración 20:00" },
                { d: "Domingos", t: "Escuela y culto 11:30" },
              ].map((c) => (
                <div
                  key={c.d}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 9,
                    padding: "11px 15px",
                    background: "#F7F5F1",
                    borderRadius: 11,
                    fontSize: 13,
                  }}
                >
                  <Clock size={16} color="#C8A96E" stroke={1.8} />
                  <span>
                    <strong style={{ fontWeight: 600 }}>{c.d}</strong> · {c.t}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ flex: "1 1 400px", minWidth: 300, position: "relative" }}>
            <HeroSlideshow height={460} radius={24} />
          </div>
        </Container>
      </Section>

      {/* VÍVERES HIGHLIGHT */}
      <Section bg="#F7F5F1">
        <Container style={{ padding: "44px 28px" }}>
          <div
            style={{
              background: "linear-gradient(120deg,#F1F8F1,#EAF4EA)",
              border: "1px solid #DCEEDC",
              borderRadius: 22,
              padding: "36px 40px",
              display: "flex",
              flexWrap: "wrap",
              gap: 28,
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 16,
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 6px 16px rgba(76,175,80,.18)",
                flexShrink: 0,
              }}
            >
              <Basket size={30} color="#4CAF50" stroke={1.6} />
            </div>
            <div style={{ flex: "1 1 320px" }}>
              <Eyebrow color="#4CAF50">Cada domingo</Eyebrow>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 29,
                  lineHeight: 1.1,
                  margin: "0 0 8px",
                }}
              >
                Entrega de víveres al terminar el culto
              </h2>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: "#5A6070",
                  margin: 0,
                  maxWidth: 560,
                }}
              >
                Al finalizar el culto dominical entregamos una bolsa de mercado
                a las familias que lo necesitan. Un gesto sencillo que sostiene a
                muchos hogares del barrio.
              </p>
            </div>
            <Link
              href="/contacto"
              className="dc-green"
              style={{
                padding: "14px 24px",
                background: "#4CAF50",
                color: "#fff",
                fontWeight: 600,
                fontSize: 14,
                borderRadius: 12,
                boxShadow: "0 8px 20px rgba(76,175,80,.3)",
                whiteSpace: "nowrap",
              }}
            >
              Solicitar bolsa
            </Link>
          </div>
        </Container>
      </Section>

      {/* PRÓXIMOS CULTOS */}
      <Section bg="#FFFFFF">
        <Container style={{ padding: "64px 28px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 16,
              marginBottom: 32,
            }}
          >
            <div>
              <Eyebrow>Reuniones</Eyebrow>
              <h2 style={heading38}>Próximos cultos</h2>
            </div>
            <Link
              href="/agenda"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                fontSize: 14,
                fontWeight: 600,
                color: "#B7965A",
              }}
            >
              Ver agenda completa <ArrowRight size={16} stroke={1.9} />
            </Link>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: 22,
            }}
          >
            {[
              { d: "JUE", h: "20", m: ":00", t: "Culto de oración" },
              { d: "DOM", h: "11", m: ":30", t: "Escuela dominical y culto" },
            ].map((c) => (
              <div
                key={c.d}
                className="dc-lift"
                style={{
                  border: "1px solid #EDEFF5",
                  borderRadius: 18,
                  padding: 28,
                  display: "flex",
                  gap: 20,
                  alignItems: "center",
                  background: "#fff",
                }}
              >
                <div
                  style={{
                    width: 74,
                    height: 78,
                    borderRadius: 14,
                    background: "#FBF7F0",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "1px",
                      color: "#C8A96E",
                    }}
                  >
                    {c.d}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 26,
                      lineHeight: 1,
                    }}
                  >
                    {c.h}
                    <span style={{ fontSize: 14 }}>{c.m}</span>
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      fontSize: 22,
                      marginBottom: 4,
                    }}
                  >
                    {c.t}
                  </div>
                  <div
                    style={{
                      fontSize: 13.5,
                      color: "#6B7280",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <MapPin size={14} color="#9AA0AC" stroke={1.7} /> Templo · La
                    Matanza de Acentejo
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ACCIÓN SOCIAL 3 CARDS */}
      <Section bg="#F7F5F1">
        <Container style={{ padding: "64px 28px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <Eyebrow>Lo que hacemos</Eyebrow>
            <h2 style={heading38}>Amor puesto en acción</h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: 24,
            }}
          >
            {[
              {
                icon: <BasketSimple size={26} color="#4CAF50" stroke={1.6} />,
                bg: "#F1F8F1",
                titulo: "Reparto de alimentos",
                texto:
                  "Junto a Remar recogemos y distribuimos comida a familias en situación vulnerable de la zona.",
                link: "/accion-social",
                color: "#4CAF50",
              },
              {
                icon: <Heart size={26} color="#C8A96E" stroke={1.6} />,
                bg: "#FBF7F0",
                titulo: "Apadrinamiento de niños",
                texto:
                  "Proyecto de Remar para dar futuro, alimento y educación a la infancia más necesitada.",
                link: "/accion-social",
                color: "#B7965A",
              },
              {
                icon: <Users size={26} color="#7BB8D9" stroke={1.6} />,
                bg: "#F1F7FB",
                titulo: "Evangelización",
                texto:
                  "Salidas los sábados por Tenerife llevando fe, oración y una mano amiga a cada pueblo.",
                link: "/actividades",
                color: "#5C9BC0",
              },
            ].map((c) => (
              <div
                key={c.titulo}
                className="dc-lift"
                style={{
                  background: "#fff",
                  border: "1px solid #EDEFF5",
                  borderRadius: 20,
                  padding: 32,
                }}
              >
                <div
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 14,
                    background: c.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                  }}
                >
                  {c.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: 23,
                    margin: "0 0 10px",
                  }}
                >
                  {c.titulo}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.65,
                    color: "#6B7280",
                    margin: "0 0 16px",
                  }}
                >
                  {c.texto}
                </p>
                <Link
                  href={c.link}
                  style={{
                    fontSize: 13.5,
                    fontWeight: 600,
                    color: c.color,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  Saber más <ArrowRight size={15} stroke={2} />
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* NOVEDADES */}
      <Section bg="#FFFFFF">
        <Container style={{ padding: "64px 28px" }}>
          <div style={{ marginBottom: 32 }}>
            <Eyebrow>Comunidad</Eyebrow>
            <h2 style={heading38}>Novedades y testimonios</h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: 24,
            }}
          >
            {novedades.map((n) => (
              <div
                key={n.titulo}
                className="dc-lift"
                style={{
                  background: "#fff",
                  border: "1px solid #EDEFF5",
                  borderRadius: 20,
                  overflow: "hidden",
                }}
              >
                <ImageSlot
                  label={n.titulo}
                  src={fotoNovedad(n.cat)}
                  height={200}
                  radius={0}
                />
                <div style={{ padding: 24 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 12,
                      fontSize: 11,
                      color: "#9AA0AC",
                      fontWeight: 600,
                      letterSpacing: ".4px",
                    }}
                  >
                    <span
                      style={{
                        padding: "4px 10px",
                        background: "#FBF7F0",
                        color: "#B7965A",
                        borderRadius: 999,
                      }}
                    >
                      {n.cat}
                    </span>
                    <span>{n.fecha}</span>
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      fontSize: 21,
                      lineHeight: 1.15,
                      margin: "0 0 10px",
                    }}
                  >
                    {n.titulo}
                  </h3>
                  <p
                    style={{
                      fontSize: 13.5,
                      lineHeight: 1.6,
                      color: "#6B7280",
                      margin: 0,
                    }}
                  >
                    {n.extracto}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* REMAR + RADIO BAND */}
      <Section bg="#2D3142">
        <Container
          style={{
            padding: "56px 28px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: 28,
          }}
        >
          <div style={{ display: "flex", gap: 22, alignItems: "center" }}>
            <div
              style={{
                width: 66,
                height: 66,
                borderRadius: 16,
                background: "rgba(255,255,255,.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 26,
                color: "#C8A96E",
              }}
            >
              R
            </div>
            <div>
              <Eyebrow>En alianza con</Eyebrow>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 24,
                  color: "#fff",
                  marginBottom: 4,
                }}
              >
                ONG Remar
              </div>
              <div
                style={{ fontSize: 13.5, lineHeight: 1.55, color: "#B9BDC7" }}
              >
                Rehabilitación de Marginados. Formamos parte de su red de ayuda
                social en las Islas Canarias.
              </div>
            </div>
          </div>
          <a
            href={site.radioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="dc-soft"
            style={{
              display: "flex",
              gap: 22,
              alignItems: "center",
              padding: 22,
              borderRadius: 18,
              background: "rgba(255,255,255,.04)",
              border: "1px solid rgba(255,255,255,.08)",
            }}
          >
            <div
              style={{
                width: 66,
                height: 66,
                borderRadius: 16,
                background: "rgba(123,184,217,.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <RadioIcon />
            </div>
            <div>
              <Eyebrow color="#7BB8D9">Escúchanos</Eyebrow>
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
              <div
                style={{
                  fontSize: 13.5,
                  color: "#B9BDC7",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                Abrir emisora <ArrowUpRight size={14} stroke={1.8} />
              </div>
            </div>
          </a>
        </Container>
      </Section>
    </>
  );
}

function RadioIcon() {
  return (
    <svg
      width={30}
      height={30}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#7BB8D9"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9M7.8 16.2a6 6 0 0 1 0-8.4M16.2 7.8a6 6 0 0 1 0 8.4M19.1 4.9c3.9 3.9 3.9 10.3 0 14.2" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
