"use client";

/**
 * Galería de fotos reales de la ayuda de Remar en Ucrania.
 * - Escritorio (>= 700px de ancho del contenedor): abanico de fotos
 *   arrastrables (framer-motion), escalado al ancho disponible para no
 *   desbordar nunca.
 * - Móvil (< 700px): rejilla limpia (destacada + 2x2), tap-friendly.
 * Respeta prefers-reduced-motion.
 */

import { useCallback, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Slide = { src: string; caption: string };

const PHOTOS: Slide[] = [
  { src: "/fotos/ucrania/uc-4.jpg", caption: "Reparto de comida caliente" },
  { src: "/fotos/ucrania/uc-1.jpg", caption: "Ayuda a familias desplazadas" },
  { src: "/fotos/ucrania/uc-2.jpg", caption: "Comida y compañía para los desplazados" },
  { src: "/fotos/ucrania/uc-5.jpg", caption: "Acogida a quienes llegan" },
  { src: "/fotos/ucrania/uc-6.jpg", caption: "Un espacio seguro para la infancia" },
];

const BASE = 220; // tamaño de foto a escala 1
const STEP = 150; // separación horizontal a escala 1
const Y_OFF = [12, -8, 14, -6, 16]; // desplazamiento vertical orgánico
const GRID_BREAK = 700;

export default function UcraniaGallery({
  photos = PHOTOS,
}: {
  photos?: Slide[];
}) {
  const [w, setW] = useState(0);
  const reduce = useReducedMotion();

  // Ref callback: mide el ancho al montar (síncrono, sin flash) y observa cambios.
  // setState dentro de un ref callback es válido (no es un efecto).
  const attachWrap = useCallback((el: HTMLDivElement | null) => {
    if (!el) return;
    setW(el.getBoundingClientRect().width);
    const ro = new ResizeObserver((entries) => setW(entries[0].contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const n = photos.length;
  // w === 0 solo en SSR/primer render antes de adjuntar => rejilla; luego corrige.
  const mobile = w < GRID_BREAK;

  // geometría del abanico (escritorio)
  const fanFull = BASE + (n - 1) * STEP;
  const scale = w > 0 ? Math.min(1, (w - 24) / fanFull) : 1;
  const size = BASE * scale;
  const step = STEP * scale;
  const stageH = size + 70 * scale;

  return (
    <div ref={attachWrap} style={{ width: "100%" }}>
      {mobile ? (
        <MobileGrid photos={photos} reduce={!!reduce} />
      ) : (
        <div
          style={{
            position: "relative",
            height: stageH,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "relative", width: size, height: size }}>
            {photos.map((p, i) => {
              const mid = (n - 1) / 2;
              return (
                <DragPhoto
                  key={p.src}
                  photo={p}
                  size={size}
                  x={(i - mid) * step}
                  y={Y_OFF[i % Y_OFF.length] * scale}
                  z={50 - Math.abs(i - mid) * 10}
                  rot={(i - mid) * 3}
                  order={i}
                  reduce={!!reduce}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function DragPhoto({
  photo,
  size,
  x,
  y,
  z,
  rot,
  order,
  reduce,
}: {
  photo: Slide;
  size: number;
  x: number;
  y: number;
  z: number;
  rot: number;
  order: number;
  reduce: boolean;
}) {
  return (
    <motion.div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: size,
        height: size,
        zIndex: z,
        cursor: "grab",
        touchAction: "none",
      }}
      initial={reduce ? false : { x: 0, y: 0, rotate: 0, scale: 0.85, opacity: 0 }}
      animate={{ x, y, rotate: rot, scale: 1, opacity: 1 }}
      transition={
        reduce
          ? { duration: 0 }
          : { type: "spring", stiffness: 80, damping: 14, delay: order * 0.1 }
      }
      drag
      dragElastic={0.6}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileHover={{ scale: 1.06, zIndex: 999 }}
      whileTap={{ scale: 1.04, zIndex: 999 }}
      whileDrag={{ scale: 1.06, zIndex: 999, cursor: "grabbing" }}
    >
      <PhotoCard photo={photo} radius={22} border={5} />
    </motion.div>
  );
}

function MobileGrid({
  photos,
  reduce,
}: {
  photos: Slide[];
  reduce: boolean;
}) {
  const [featured, ...rest] = photos;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <GridImg photo={featured} idx={0} ratio="16 / 10" reduce={reduce} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
        }}
      >
        {rest.map((p, i) => (
          <GridImg key={p.src} photo={p} idx={i + 1} ratio="1 / 1" reduce={reduce} />
        ))}
      </div>
    </div>
  );
}

function GridImg({
  photo,
  idx,
  ratio,
  reduce,
}: {
  photo: Slide;
  idx: number;
  ratio: string;
  reduce: boolean;
}) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={reduce ? { duration: 0 } : { duration: 0.5, delay: idx * 0.06 }}
      style={{ aspectRatio: ratio, width: "100%" }}
    >
      <PhotoCard photo={photo} radius={18} border={4} fill />
    </motion.div>
  );
}

function PhotoCard({
  photo,
  radius,
  border,
  fill,
}: {
  photo: Slide;
  radius: number;
  border: number;
  fill?: boolean;
}) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        borderRadius: radius,
        overflow: "hidden",
        border: `${border}px solid #fff`,
        boxShadow: "0 14px 34px rgba(6,20,45,.26)",
        background: "#0a2340",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo.src}
        alt={photo.caption}
        draggable={false}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          userSelect: "none",
          pointerEvents: "none",
          display: "block",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 8,
          right: 8,
          bottom: 8,
          display: "inline-flex",
          alignItems: "center",
          gap: 7,
          padding: "5px 11px",
          background: "rgba(255,255,255,.94)",
          borderRadius: 999,
          fontFamily: "var(--font-body)",
          fontSize: fill ? 11.5 : 12,
          fontWeight: 600,
          color: "#0A2340",
          width: "fit-content",
          maxWidth: "calc(100% - 16px)",
          boxShadow: "0 4px 12px rgba(6,20,45,.18)",
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#2E7D1F",
            flexShrink: 0,
          }}
        />
        <span
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {photo.caption}
        </span>
      </div>
    </div>
  );
}
