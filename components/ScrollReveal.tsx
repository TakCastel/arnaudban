"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

/**
 * Fait apparaître son contenu (fondu + légère montée, voir .scroll-reveal
 * dans globals.css) quand il entre dans le viewport, plutôt qu'à un délai
 * fixe depuis le chargement de la page — pour tout le contenu d'une page qui
 * suit le titre et son texte d'intro (eux restent sur un minuteur court, voir
 * StaggerItem/SplitText) : pas la peine de faire attendre le reste du
 * contenu sur ce même minutage puisqu'il est de toute façon hors écran au
 * chargement. Se déclenche une seule fois, comme SplitText — pas de sortie
 * au scroll.
 */
export default function ScrollReveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      // rootMargin négatif en bas : se déclenche un peu avant que l'élément
      // n'atteigne le bas du viewport, pas seulement une fois pile visible.
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`scroll-reveal ${revealed ? "scroll-reveal--visible" : ""} ${className}`}>
      {children}
    </div>
  );
}
