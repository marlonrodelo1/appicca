import type { Metadata } from "next";
import { Container, Section, Eyebrow, ImageSlot } from "@/components/web/ui";
import { MapPin, Phone, Mail, Clock, Directions } from "@/components/web/icons";
import { site } from "@/lib/site";
import ContactForm from "@/components/web/ContactForm";
import FoodRequestForm from "@/components/web/FoodRequestForm";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Ven a visitarnos. Dirección, teléfono y horarios de culto de la Iglesia Cuerpo de Cristo en La Cuesta, Tenerife. Escríbenos o solicita tu bolsa de alimento.",
};

const info = [
  { icon: <MapPin size={20} color="#C8A96E" stroke={1.7} />, label: "Dirección", value: site.location },
  { icon: <Phone size={20} color="#C8A96E" stroke={1.7} />, label: "Teléfono", value: site.phone },
  { icon: <Mail size={20} color="#C8A96E" stroke={1.7} />, label: "Email", value: site.email },
  { icon: <Clock size={20} color="#C8A96E" stroke={1.7} />, label: "Horario de culto", value: "Jueves 20:00 · Domingos 11:30" },
];

export default function ContactoPage() {
  return (
    <>
      <Section bg="#FFFFFF">
        <Container max={1120} style={{ padding: "56px 28px 20px" }}>
          <Eyebrow>Contacto</Eyebrow>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 48,
              lineHeight: 1.05,
              margin: "0 0 18px",
            }}
          >
            Ven a visitarnos
          </h1>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.7,
              color: "#6B7280",
              maxWidth: 600,
              margin: 0,
            }}
          >
            Las puertas están abiertas. Escríbenos, llámanos o pásate por el
            templo en horario de culto.
          </p>
        </Container>
      </Section>

      <Section bg="#FFFFFF">
        <Container
          max={1120}
          style={{
            padding: "32px 28px 40px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: 32,
            alignItems: "start",
          }}
        >
          {/* Left: map + info */}
          <div>
            <div
              style={{
                position: "relative",
                borderRadius: 20,
                overflow: "hidden",
                border: "1px solid #EDEFF5",
              }}
            >
              <ImageSlot
                label="Mapa / ubicación del templo"
                height={300}
                radius={0}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: -24,
                position: "relative",
                zIndex: 2,
              }}
            >
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="dc-ink"
                style={{
                  padding: "12px 24px",
                  background: "#2D3142",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: 14,
                  borderRadius: 12,
                  boxShadow: "0 10px 24px rgba(45,49,66,.25)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Directions size={16} stroke={1.8} />
                Cómo llegar
              </a>
            </div>
            <div
              style={{
                marginTop: 28,
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              {info.map((it) => (
                <div
                  key={it.label}
                  style={{ display: "flex", gap: 13, alignItems: "center" }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 11,
                      background: "#FBF7F0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {it.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "#9AA0AC",
                        fontWeight: 600,
                      }}
                    >
                      {it.label}
                    </div>
                    <div style={{ fontSize: 14.5, fontWeight: 500 }}>
                      {it.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: forms */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div
              style={{ background: "#F7F5F1", borderRadius: 20, padding: 30 }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 24,
                  margin: "0 0 16px",
                }}
              >
                Escríbenos
              </h3>
              <ContactForm />
            </div>
            <FoodRequestForm />
          </div>
        </Container>
      </Section>
    </>
  );
}
