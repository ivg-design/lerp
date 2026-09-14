"use client";

import { useEffect, useRef, useState } from "react";

interface WordDef {
  text: string;
  fontFamily: string;
  fontSize: string;
  fontWeight?: number;
  fontStyle?: string;
  letterSpacing?: string;
}

const WORDS: WordDef[] = [
  { text: "interactive", fontFamily: "var(--font-display)", fontSize: "clamp(60px, 8vw, 100px)", fontWeight: 900 },
  { text: "motion", fontFamily: "'Playfair Display', serif", fontSize: "clamp(68px, 9vw, 110px)", fontWeight: 700, fontStyle: "italic" },
  { text: "technical", fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(62px, 8vw, 100px)", fontWeight: 700 },
  { text: "inventive", fontFamily: "'Caveat', cursive", fontSize: "clamp(72px, 9vw, 115px)", fontWeight: 700 },
  { text: "ambitious", fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(70px, 9vw, 112px)", letterSpacing: "6px" },
  { text: "visual", fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(68px, 9vw, 110px)", fontWeight: 700 },
  { text: "expressive", fontFamily: "'Satisfy', cursive", fontSize: "clamp(62px, 8vw, 100px)" },
  { text: "modern", fontFamily: "'Josefin Sans', sans-serif", fontSize: "clamp(66px, 8.5vw, 105px)", fontWeight: 700, letterSpacing: "4px" },
  { text: "experimental", fontFamily: "'Architects Daughter', cursive", fontSize: "clamp(52px, 6.5vw, 85px)" },
  { text: "dynamic", fontFamily: "'Abril Fatface', serif", fontSize: "clamp(68px, 8.5vw, 108px)" },
  { text: "curious", fontFamily: "'Righteous', sans-serif", fontSize: "clamp(66px, 8.5vw, 105px)" },
  { text: "multidimensional", fontFamily: "'Oswald', sans-serif", fontSize: "clamp(42px, 5vw, 72px)", fontWeight: 700, letterSpacing: "2px" },
  { text: "bold", fontFamily: "'Archivo Black', sans-serif", fontSize: "clamp(76px, 10vw, 120px)" },
  { text: "adaptive", fontFamily: "'Raleway', sans-serif", fontSize: "clamp(62px, 8vw, 100px)", fontWeight: 800, letterSpacing: "3px" },
  { text: "realtime", fontFamily: "'Inconsolata', monospace", fontSize: "clamp(60px, 8vw, 100px)", fontWeight: 800, letterSpacing: "2px" },
  { text: "immersive", fontFamily: "'Lobster', cursive", fontSize: "clamp(62px, 8vw, 100px)" },
  { text: "versatile", fontFamily: "'Bitter', serif", fontSize: "clamp(60px, 8vw, 98px)", fontWeight: 800 },
  { text: "forward-thinking", fontFamily: "'Staatliches', sans-serif", fontSize: "clamp(46px, 5.5vw, 78px)", letterSpacing: "3px" },
  { text: "innovative", fontFamily: "'Dancing Script', cursive", fontSize: "clamp(64px, 8.5vw, 105px)", fontWeight: 700 },
  { text: "boundary-pushing", fontFamily: "'Bangers', cursive", fontSize: "clamp(50px, 6vw, 85px)", letterSpacing: "2px" },
  { text: "imaginative", fontFamily: "'Pacifico', cursive", fontSize: "clamp(54px, 7vw, 88px)" },
  { text: "precise", fontFamily: "'Amatic SC', cursive", fontSize: "clamp(76px, 10vw, 120px)", fontWeight: 700 },
];

const INTERVAL = 2800;
const ANIM = 800; // ms for the transition

function wordStyle(w: WordDef): React.CSSProperties {
  return {
    fontFamily: w.fontFamily,
    fontSize: w.fontSize,
    fontWeight: w.fontWeight ?? 400,
    fontStyle: w.fontStyle ?? "normal",
    letterSpacing: w.letterSpacing ?? "-3px",
  };
}

function charDelay(i: number, total: number): string {
  const normalized = i / Math.max(total - 1, 1);
  const delay = Math.round(normalized * 300) / 1000; // 0 to 0.3s stagger
  return `${delay}s`;
}

function WordChars({ word, mode }: { word: WordDef; mode: "static" | "in" | "out" }) {
  const chars = word.text.split("");
  return (
    <span
      className={`flip-word flip-word-${mode}`}
      style={wordStyle(word)}
    >
      {chars.map((char, i) => (
        <span
          key={i}
          className="flip-char"
          style={{ "--flip-stagger": charDelay(i, chars.length) } as React.CSSProperties}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

export default function WordRotator({ className }: { className?: string }) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [nearViewport, setNearViewport] = useState(false);
  const [current, setCurrent] = useState(0);
  const [phase, setPhase] = useState<"idle" | "transition">("idle");
  const next = (current + 1) % WORDS.length;
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const target = containerRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => {
      setNearViewport(entry.isIntersecting);
    }, { rootMargin: "500px" });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!nearViewport || document.getElementById("lerp-decorative-fonts")) return;
    // The rotating display faces are needed below the fold, not on the initial render path.
    const link = document.createElement("link");
    link.id = "lerp-decorative-fonts";
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Caveat:wght@700&family=Space+Grotesk:wght@700&family=Bebas+Neue&family=Cormorant+Garamond:wght@700&family=Righteous&family=Satisfy&family=Josefin+Sans:wght@700&family=Abril+Fatface&family=Architects+Daughter&family=Oswald:wght@700&family=Pacifico&family=Raleway:wght@800&family=Bitter:wght@800&family=Staatliches&family=Dancing+Script:wght@700&family=Inconsolata:wght@800&family=Lobster&family=Bangers&family=Amatic+SC:wght@700&family=Archivo+Black&display=swap";
    document.head.appendChild(link);
  }, [nearViewport]);

  useEffect(() => {
    if (!nearViewport) return;
    const iv = setInterval(() => {
      setPhase("transition");
      timerRef.current = setTimeout(() => {
        setCurrent((c) => (c + 1) % WORDS.length);
        setPhase("idle");
      }, ANIM);
    }, INTERVAL);
    return () => {
      clearInterval(iv);
      clearTimeout(timerRef.current);
    };
  }, [nearViewport]);

  return (
    <span ref={containerRef} className={`flip-drum ${className ?? ""}`} aria-live="polite">
      {/* Current word — static or flipping out */}
      <WordChars
        word={WORDS[current]}
        mode={phase === "transition" ? "out" : "static"}
        key={`w-${current}`}
      />
      {/* Next word — flipping in (only during transition) */}
      {phase === "transition" && (
        <WordChars
          word={WORDS[next]}
          mode="in"
          key={`w-${next}`}
        />
      )}
    </span>
  );
}
