import Link from "next/link";
import { Logo } from "./Logo";
import { Heart } from "./icons";
import NavHeader from "./NavHeader";
import MobileNav from "./MobileNav";

export default function Header() {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 60,
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid #EDEFF5",
      }}
    >
      <div
        style={{
          maxWidth: 1220,
          margin: "0 auto",
          padding: "12px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center" }}>
          <Logo height={46} />
        </Link>

        {/* Desktop: píldora animada + Donar */}
        <div className="dc-nav-desktop">
          <NavHeader />
          <Link
            href="/donar"
            className="dc-gold"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "11px 20px",
              background: "#C8A96E",
              color: "#fff",
              fontWeight: 600,
              fontSize: 13.5,
              borderRadius: 999,
              boxShadow: "0 6px 18px rgba(200,169,110,.4)",
              letterSpacing: ".2px",
              whiteSpace: "nowrap",
            }}
          >
            <Heart size={16} stroke={1.9} />
            Donar
          </Link>
        </div>

        {/* Móvil: menú hamburguesa */}
        <div className="dc-nav-mobile">
          <MobileNav />
        </div>
      </div>
    </div>
  );
}
