import type { Metadata } from "next";
import { Container, Section } from "@/components/web/ui";
import { Cutlery, BasketSimple, Heart } from "@/components/web/icons";
import BizumCard from "@/components/web/BizumCard";
import ApadrinarForm from "@/components/web/ApadrinarForm";
import DonateButton from "@/components/web/DonateButton";

export const metadata: Metadata = {
  title: "Dona por Bizum",
  description:
    "Dona por Bizum a la Iglesia Cuerpo de Cristo. Tu donativo se convierte en alimento, víveres y esperanza para las familias de Tenerife.",
};

const destino = [
  {
    icon: <Cutlery size={22} color="#4CAF50" stroke={1.7} />,
    bg: "#F1F8F1",
    titulo: "Alimentos para familias",
    texto: "Compra de comida para el reparto semanal.",
  },
  {
    icon: <BasketSimple size={22} color="#C8A96E" stroke={1.6} />,
    bg: "#FBF7F0",
    titulo: "Bolsa de víveres dominical",
    texto: "La bolsa de mercado que entregamos cada domingo.",
  },
  {
    icon: <Heart size={22} color="#7BB8D9" stroke={1.7} />,
    bg: "#F1F7FB",
    titulo: "Apadrinamiento de niños",
    texto: "Apoyo al proyecto de infancia de Remar.",
  },
];

export default function DonarPage() {
  return (
    <>
      <Section bg="linear-gradient(160deg,#FBF7F0,#F7F5F1)">
        <Container
          style={{ padding: "56px 28px 30px", textAlign: "center" }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "1.4px",
              color: "#C8A96E",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Tu ayuda cuenta
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 50,
              lineHeight: 1.04,
              margin: "0 0 14px",
            }}
          >
            Dona por Bizum
          </h1>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.65,
              color: "#6B7280",
              maxWidth: 560,
              margin: "0 auto",
            }}
          >
            Cada donativo se convierte en alimento, víveres y esperanza para las
            familias de nuestra comunidad. Donar es rápido y seguro desde la app
            de tu banco.
          </p>
        </Container>
      </Section>

      <Section bg="#F7F5F1">
        <Container
          max={1120}
          style={{
            padding: "20px 28px 70px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: 28,
            alignItems: "start",
          }}
        >
          <BizumCard />

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Donar online con tarjeta / Apple Pay / Google Pay */}
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
                  margin: "0 0 8px",
                }}
              >
                Donar online
              </h3>
              <p
                style={{
                  fontSize: 14.5,
                  lineHeight: 1.6,
                  color: "#6B7280",
                  margin: "0 0 20px",
                }}
              >
                Con tarjeta, Apple Pay o Google Pay. Rápido y seguro, sin salir
                de la página.
              </p>
              <DonateButton
                label="Donar con tarjeta"
                motivo="Donativo · Iglesia Cuerpo de Cristo"
                accent="#2E7D1F"
                presets={[5, 10, 20, 50, 100]}
                style={{ width: "100%", justifyContent: "center" }}
              />
            </div>

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
                  margin: "0 0 20px",
                }}
              >
                ¿A dónde va tu donativo?
              </h3>
              {destino.map((d, i) => (
                <div
                  key={d.titulo}
                  style={{
                    display: "flex",
                    gap: 14,
                    alignItems: "center",
                    marginBottom: i === destino.length - 1 ? 0 : 16,
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: d.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {d.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14.5 }}>
                      {d.titulo}
                    </div>
                    <div style={{ fontSize: 13, color: "#6B7280" }}>
                      {d.texto}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>

        {/* Apadrinar */}
        <Container max={1120} style={{ padding: "0 28px 80px" }}>
          <div
            style={{
              background: "#2D3142",
              borderRadius: 24,
              padding: 44,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: 36,
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "1.4px",
                  color: "#C8A96E",
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                Proyecto Remar
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 34,
                  lineHeight: 1.08,
                  color: "#fff",
                  margin: "0 0 14px",
                }}
              >
                Quiero apadrinar a un niño
              </h2>
              <p
                style={{
                  fontSize: 14.5,
                  lineHeight: 1.65,
                  color: "#B9BDC7",
                  margin: 0,
                }}
              >
                Déjanos tus datos y nos pondremos en contacto contigo para
                explicarte el proceso. Es una solicitud sin compromiso — no se
                realiza ningún cobro online.
              </p>
            </div>
            <ApadrinarForm />
          </div>
        </Container>
      </Section>
    </>
  );
}
