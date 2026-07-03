"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/site";
import { Heart } from "./icons";

export default function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <button
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          border: "1.5px solid #E4E0D6",
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
          cursor: "pointer",
        }}
      >
        <Bar rotate={open ? 45 : 0} translateY={open ? 7 : 0} />
        <Bar opacity={open ? 0 : 1} />
        <Bar rotate={open ? -45 : 0} translateY={open ? -7 : 0} />
      </button>

      {open && (
        <>
          {/* Fondo para cerrar al tocar fuera */}
          <div
            onClick={() => setOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              top: 71,
              background: "rgba(45,49,66,.25)",
              zIndex: 40,
            }}
          />
          <nav
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "#fff",
              borderTop: "1px solid #EDEFF5",
              borderBottom: "1px solid #EDEFF5",
              boxShadow: "0 16px 34px rgba(45,49,66,.14)",
              padding: 16,
              display: "flex",
              flexDirection: "column",
              gap: 4,
              zIndex: 50,
            }}
          >
            {NAV.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  style={{
                    padding: "13px 16px",
                    borderRadius: 12,
                    fontSize: 16,
                    fontWeight: 600,
                    color: active ? "#fff" : "#2D3142",
                    background: active ? "#2D3142" : "transparent",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}

            <Link
              href="/donar"
              onClick={() => setOpen(false)}
              style={{
                marginTop: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "14px 20px",
                background: "#C8A96E",
                color: "#fff",
                fontWeight: 600,
                fontSize: 15,
                borderRadius: 12,
                boxShadow: "0 6px 18px rgba(200,169,110,.4)",
              }}
            >
              <Heart size={17} stroke={1.9} />
              Donar
            </Link>
          </nav>
        </>
      )}
    </>
  );
}

function Bar({
  rotate = 0,
  translateY = 0,
  opacity = 1,
}: {
  rotate?: number;
  translateY?: number;
  opacity?: number;
}) {
  return (
    <span
      style={{
        display: "block",
        width: 20,
        height: 2,
        borderRadius: 2,
        background: "#2D3142",
        opacity,
        transform: `translateY(${translateY}px) rotate(${rotate}deg)`,
        transition: "transform .22s ease, opacity .18s ease",
      }}
    />
  );
}
