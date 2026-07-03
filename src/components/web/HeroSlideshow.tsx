"use client";

import { useCallback, useEffect, useState } from "react";

type Slide = { img: string; caption: string };

const SLIDES: Slide[] = [
  { img: "/fotos/hero/hero-1.jpg", caption: "Voluntariado con la infancia" },
  { img: "/fotos/hero/hero-2.jpg", caption: "Apadrinamiento de niños" },
  { img: "/fotos/hero/hero-3.jpg", caption: "Comedores sociales" },
  { img: "/fotos/hero/hero-4.jpg", caption: "Reparto de alimentos" },
];

const INTERVAL = 4500;

export default function HeroSlideshow({
  height = 460,
  radius = 24,
}: {
  height?: number;
  radius?: number;
}) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (n: number) => setCurrent((prev) => (n + SLIDES.length) % SLIDES.length),
    []
  );

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(current + 1), INTERVAL);
    return () => clearInterval(t);
  }, [current, paused, go]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        position: "relative",
        width: "100%",
        height,
        borderRadius: radius,
        overflow: "hidden",
        background: "#EDE7DA",
      }}
    >
      {SLIDES.map((slide, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={slide.img}
          src={slide.img}
          alt={slide.caption}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: i === current ? 1 : 0,
            transition: "opacity .8s ease",
          }}
        />
      ))}

      {/* Degradado inferior para legibilidad */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(45,49,66,.55) 0%, rgba(45,49,66,0) 42%)",
          pointerEvents: "none",
        }}
      />

      {/* Pie de foto */}
      <div
        style={{
          position: "absolute",
          left: 18,
          bottom: 16,
          padding: "7px 14px",
          background: "rgba(255,255,255,.92)",
          borderRadius: 999,
          fontSize: 12.5,
          fontWeight: 600,
          color: "#2D3142",
          display: "flex",
          alignItems: "center",
          gap: 8,
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
        {SLIDES[current].caption}
      </div>

      {/* Contador */}
      <div
        style={{
          position: "absolute",
          top: 14,
          right: 16,
          padding: "5px 11px",
          background: "rgba(45,49,66,.5)",
          borderRadius: 999,
          fontSize: 12,
          fontWeight: 600,
          color: "#fff",
          letterSpacing: ".5px",
        }}
      >
        0{current + 1} / 0{SLIDES.length}
      </div>

      {/* Flechas */}
      <button
        aria-label="Anterior"
        onClick={() => go(current - 1)}
        style={arrowStyle("left")}
      >
        ‹
      </button>
      <button
        aria-label="Siguiente"
        onClick={() => go(current + 1)}
        style={arrowStyle("right")}
      >
        ›
      </button>

      {/* Puntos */}
      <div
        style={{
          position: "absolute",
          bottom: 18,
          right: 16,
          display: "flex",
          gap: 7,
        }}
      >
        {SLIDES.map((s, i) => (
          <button
            key={s.img}
            aria-label={`Ir a ${s.caption}`}
            onClick={() => go(i)}
            style={{
              width: i === current ? 22 : 8,
              height: 8,
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              padding: 0,
              background:
                i === current ? "#fff" : "rgba(255,255,255,.55)",
              transition: ".25s",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function arrowStyle(side: "left" | "right"): React.CSSProperties {
  return {
    position: "absolute",
    top: "50%",
    [side]: 12,
    transform: "translateY(-50%)",
    width: 38,
    height: 38,
    borderRadius: "50%",
    border: "none",
    background: "rgba(255,255,255,.85)",
    color: "#2D3142",
    fontSize: 22,
    lineHeight: 1,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(45,49,66,.2)",
  };
}
