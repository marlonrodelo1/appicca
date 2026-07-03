"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { NAV } from "@/lib/site";

type Pos = { left: number; width: number; opacity: number };

export default function NavHeader() {
  const pathname = usePathname();
  const tabRefs = useRef<Array<HTMLLIElement | null>>([]);

  const activeIndex = NAV.findIndex((l) =>
    l.href === "/" ? pathname === "/" : pathname.startsWith(l.href)
  );

  const [hovered, setHovered] = useState<number | null>(null);
  const [position, setPosition] = useState<Pos>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  // Pestaña resaltada: la del ratón, o la de la página actual al salir.
  const highlighted = hovered ?? activeIndex;

  const moveTo = (i: number) => {
    const el = tabRefs.current[i];
    if (!el) {
      setPosition((p) => ({ ...p, opacity: 0 }));
      return;
    }
    setPosition({ left: el.offsetLeft, width: el.offsetWidth, opacity: 1 });
  };

  useEffect(() => {
    moveTo(highlighted);
    const onResize = () => moveTo(highlighted);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highlighted, pathname]);

  return (
    <ul
      className="dc-navpill"
      onMouseLeave={() => setHovered(null)}
      style={{
        position: "relative",
        display: "flex",
        width: "fit-content",
        margin: 0,
        padding: 5,
        listStyle: "none",
        borderRadius: 999,
        border: "1.5px solid #E4E0D6",
        background: "#fff",
        flexShrink: 0,
        maxWidth: "100%",
        overflowX: "auto",
        scrollbarWidth: "none",
      }}
    >
      {NAV.map((link, i) => (
        <li
          key={link.href}
          ref={(el) => {
            tabRefs.current[i] = el;
          }}
          onMouseEnter={() => setHovered(i)}
          style={{ position: "relative", zIndex: 1 }}
        >
          <Link
            href={link.href}
            style={{
              display: "block",
              whiteSpace: "nowrap",
              padding: "9px 16px",
              fontSize: 13,
              fontWeight: 600,
              color: i === highlighted ? "#fff" : "#2D3142",
              transition: "color .25s ease",
            }}
          >
            {link.label}
          </Link>
        </li>
      ))}

      <motion.li
        aria-hidden
        animate={position}
        transition={{ type: "spring", stiffness: 400, damping: 34 }}
        style={{
          position: "absolute",
          zIndex: 0,
          top: 5,
          bottom: 5,
          left: 0,
          borderRadius: 999,
          background: "#2D3142",
          listStyle: "none",
        }}
      />
    </ul>
  );
}
