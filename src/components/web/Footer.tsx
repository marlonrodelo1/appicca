import Link from "next/link";
import { NAV, site } from "@/lib/site";
import { Cross, Heart, Facebook, Instagram, Radio } from "./icons";

const socialBox: React.CSSProperties = {
  width: 38,
  height: 38,
  borderRadius: 10,
  background: "rgba(255,255,255,.08)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default function Footer() {
  return (
    <footer style={{ background: "#22252F", color: "#B9BDC7" }}>
      <div
        style={{
          maxWidth: 1220,
          margin: "0 auto",
          padding: "56px 28px 28px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
          gap: 36,
        }}
      >
        <div style={{ gridColumn: "1 / -1", maxWidth: 340 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 11,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "linear-gradient(140deg,#D3B87E,#B7965A)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Cross size={18} color="#fff" stroke={2.1} />
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 20,
                color: "#fff",
              }}
            >
              {site.name}
            </div>
          </div>
          <p style={{ fontSize: 13.5, lineHeight: 1.7, margin: "0 0 18px" }}>
            Iglesia Cristiana en Tenerife, parte de la ONG Remar. Fe, comunidad
            y ayuda real cada semana.
          </p>
          <Link
            href="/donar"
            className="dc-gold"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "11px 20px",
              background: "#C8A96E",
              color: "#fff",
              fontWeight: 600,
              fontSize: 13.5,
              borderRadius: 999,
            }}
          >
            <Heart size={15} stroke={1.9} />
            Donar por Bizum
          </Link>
        </div>

        <div>
          <div style={footerHead}>Navegación</div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 11,
              fontSize: 13.5,
            }}
          >
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="dc-flink">
                {n.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div style={footerHead}>Horarios</div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 11,
              fontSize: 13.5,
            }}
          >
            <div>
              Jueves ·{" "}
              <strong style={{ color: "#fff", fontWeight: 600 }}>20:00</strong>{" "}
              — Oración
            </div>
            <div>
              Domingos ·{" "}
              <strong style={{ color: "#fff", fontWeight: 600 }}>11:30</strong>{" "}
              — Culto
            </div>
            <div>Domingos · Entrega de víveres</div>
            <div>Sábados · Evangelización</div>
          </div>
        </div>

        <div>
          <div style={footerHead}>Síguenos</div>
          <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
            <a
              href={site.social.facebook}
              className="dc-soft"
              style={socialBox}
              aria-label="Facebook"
            >
              <Facebook size={18} color="#fff" stroke={1.7} />
            </a>
            <a
              href={site.social.instagram}
              className="dc-soft"
              style={socialBox}
              aria-label="Instagram"
            >
              <Instagram size={18} color="#fff" stroke={1.7} />
            </a>
            <a
              href={site.radioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="dc-soft"
              style={socialBox}
              aria-label={site.radioName}
            >
              <Radio size={18} color="#fff" stroke={1.7} />
            </a>
          </div>
          <div style={{ fontSize: 12, color: "#8B909C" }}>{site.radioName}</div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,.08)" }}>
        <div
          style={{
            maxWidth: 1220,
            margin: "0 auto",
            padding: "20px 28px",
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 12.5,
            color: "#8B909C",
          }}
        >
          <div>
            © 2025 {site.legalName} · en alianza con Remar
          </div>
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
            <Link href="/aviso-legal" className="dc-flink">
              Aviso legal
            </Link>
            <Link href="/privacidad" className="dc-flink">
              Privacidad
            </Link>
            <Link href="/cookies" className="dc-flink">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

const footerHead: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: "1px",
  color: "#fff",
  textTransform: "uppercase",
  marginBottom: 16,
};
