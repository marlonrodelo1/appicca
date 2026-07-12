"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Efecto máquina de escribir que rota entre varias frases.
 * Respeta prefers-reduced-motion (muestra la primera frase estática) y es
 * accesible (el texto animado va aria-hidden + una copia sr-only para lectores).
 */
export function Typewriter({
  words,
  speed = 80,
  deleteSpeed = 40,
  delayBetweenWords = 2000,
  cursor = true,
  cursorChar = "|",
  className,
}: {
  words: string[];
  speed?: number;
  deleteSpeed?: number;
  delayBetweenWords?: number;
  cursor?: boolean;
  cursorChar?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const current = words[wordIndex % words.length] ?? "";
    const atFullWord = !deleting && text === current;
    const delay = atFullWord
      ? delayBetweenWords
      : deleting
        ? deleteSpeed
        : speed;

    const t = setTimeout(() => {
      if (atFullWord) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      } else {
        setText(
          deleting
            ? current.slice(0, text.length - 1)
            : current.slice(0, text.length + 1),
        );
      }
    }, delay);

    return () => clearTimeout(t);
  }, [
    text,
    deleting,
    wordIndex,
    words,
    speed,
    deleteSpeed,
    delayBetweenWords,
    reduce,
  ]);

  if (reduce) {
    return <span className={className}>{words[0]}</span>;
  }

  return (
    <span className={className}>
      <span aria-hidden="true">{text}</span>
      {cursor && (
        <span
          aria-hidden="true"
          style={{
            marginLeft: "0.06em",
            fontWeight: 400,
            animation: "tw-blink 1.05s steps(1) infinite",
          }}
        >
          {cursorChar}
        </span>
      )}
      <span
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clipPath: "inset(50%)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        {words.join(". ")}
      </span>
      <style>{"@keyframes tw-blink{0%,50%{opacity:1}50.01%,100%{opacity:0}}"}</style>
    </span>
  );
}

export default Typewriter;
