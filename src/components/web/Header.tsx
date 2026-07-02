"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV, site } from "@/lib/site";
import { BrandMark } from "./ui";
import { Heart } from "./icons";

export default function Header() {
  const pathname = usePathname();

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
          flexWrap: "wrap",
          alignItems: "center",
          gap: 22,
        }}
      >
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", gap: 11 }}
        >
          <BrandMark />
          <div style={{ lineHeight: 1.05 }}>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 20,
                letterSpacing: ".2px",
                color: "#2D3142",
              }}
            >
              {site.name}
            </div>
            <div
              style={{
                fontSize: 9,
                letterSpacing: "2.6px",
                textTransform: "uppercase",
                color: "#9AA0AC",
                fontWeight: 600,
              }}
            >
              {site.tagline}
            </div>
          </div>
        </Link>

        <div style={{ flex: 1 }} />

        <nav
          style={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {NAV.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className="dc-navlink"
                style={{
                  position: "relative",
                  padding: "9px 13px",
                  fontSize: 13,
                  fontWeight: 500,
                  color: active ? "#2D3142" : "#4A4F5E",
                  borderRadius: 9,
                }}
              >
                {link.label}
                {active && (
                  <div
                    style={{
                      position: "absolute",
                      left: 13,
                      right: 13,
                      bottom: 1,
                      height: 2,
                      background: "#C8A96E",
                      borderRadius: 2,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

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
          }}
        >
          <Heart size={16} stroke={1.9} />
          Donar
        </Link>
      </div>
    </div>
  );
}
