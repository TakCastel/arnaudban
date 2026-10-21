"use client";

import { useEffect, useRef } from "react";

/**
 * Bandeau de texte qui défile en continu, comme un générique qui file à
 * l'horizontale. Il accélère avec la vitesse du scroll puis revient à son
 * allure de croisière, et part dans l'autre sens quand on remonte.
 * Décoratif (aria-hidden) : le texte répété n'apporte rien à un lecteur
 * d'écran.
 */
export default function Marquee({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = 0;
    let boost = 0;
    let direction = 1;
    let lastY = window.scrollY;
    let raf = 0;

    const loop = () => {
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      if (dy !== 0) direction = dy > 0 ? 1 : -1;
      boost += (Math.min(Math.abs(dy), 80) * 0.12 - boost) * 0.1;

      // La piste contient deux copies identiques : on boucle sur la moitié.
      const half = track.scrollWidth / 2;
      x -= (0.6 + boost) * direction;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      track.style.transform = `translate3d(${x}px, 0, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const row = (key: string) => (
    <div key={key} className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="marquee-word">{item}</span>
          <span className="mx-[0.5em] opacity-40">✳</span>
        </span>
      ))}
    </div>
  );

  return (
    <div aria-hidden="true" className={`overflow-hidden whitespace-nowrap select-none ${className}`}>
      <div ref={trackRef} className="flex w-max will-change-transform">
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}
