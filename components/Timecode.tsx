"use client";

import { useEffect, useRef } from "react";

// 25 images/seconde (PAL, la norme de diffusion en France) ; 4px de scroll
// valent une image : une page d'accueil entière fait environ une minute de
// "film", ce qui reste lisible sans que les secondes défilent trop vite.
const FPS = 25;
const PX_PER_FRAME = 4;

const pad = (n: number) => String(n).padStart(2, "0");

function format(frames: number) {
  const f = frames % FPS;
  const totalSeconds = Math.floor(frames / FPS);
  const s = totalSeconds % 60;
  const m = Math.floor(totalSeconds / 60) % 60;
  const h = Math.floor(totalSeconds / 3600);
  return `${pad(h)}:${pad(m)}:${pad(s)}:${pad(f)}`;
}

/**
 * Timecode fixé en bas à gauche, qui avance avec le scroll : le site se lit
 * comme une timeline de montage. En mix-blend-difference pour rester lisible
 * sur la vidéo du hero comme sur les fonds clairs. Mis à jour directement
 * dans le DOM (pas de state React) pour ne pas re-rendre à chaque frame.
 */
export default function Timecode() {
  const valueRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      if (valueRef.current) {
        valueRef.current.textContent = format(
          Math.floor(window.scrollY / PX_PER_FRAME)
        );
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed left-4 bottom-4 md:left-6 md:bottom-6 z-[65] pointer-events-none select-none text-white mix-blend-difference font-heading text-[11px] md:text-xs tracking-[0.2em] tabular-nums"
    >
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-current mr-2 align-middle timecode-rec" />
      TC <span ref={valueRef}>00:00:00:00</span>
    </div>
  );
}
