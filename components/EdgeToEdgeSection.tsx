"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

// Trait plein écran (bord à bord du navigateur, comme le Footer via
// PageContainer width="full") quelle que soit la largeur de l'ancêtre
// bloquant (ici StackedSections/PageContainer) : le classique "left-1/2
// -translate-x-1/2 w-screen" ne fonctionne que si cet ancêtre est
// lui-même centré à l'écran (mx-auto) — c'est le cas ici.
const fullBleedRule = "relative left-1/2 -translate-x-1/2 w-screen h-px";

// Traits animés à part (pas de `border` natif) : on doit pouvoir scaler
// chaque trait indépendamment du texte qu'il encadre, sans rétrécir ce
// texte avec lui.
const lineBase = "bg-foreground transition-transform duration-700 ease-out";

/**
 * Pense comme une section encadrée par deux HR bord à bord, avec deux
 * traits verticaux qui ne courent que sur la hauteur du contenu (largeur
 * du texte) et rejoignent ces HR — pas une card classique à 4 bords égaux
 * (voir FilmCard pour ça).
 *
 * Les 4 traits se révèlent (scale 0 → 1) à l'entrée dans le viewport, en
 * léger décalage (haut, puis les deux côtés, puis bas) façon "le cadre se
 * dessine". Rejoué à chaque passage (IntersectionObserver, pas une
 * animation one-shot) puisqu'on peut remonter dans la pile au scroll.
 */
export default function EdgeToEdgeSection({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setRevealed(entry.isIntersecting),
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    // Div englobante volontairement sans max-width : le calcul de
    // fullBleedRule (left-1/2 -translate-x-1/2) se base sur SA largeur à
    // elle, qui doit rester celle — centrée — de PageContainer pour que
    // le bord-à-bord tombe juste. Le `className` (largeur/alignement du
    // texte) va uniquement sur le bloc de contenu, pas ici.
    //
    // mt- : chaque section empilée (StackedSections) arrive au même point
    // sticky (top-24) que la précédente — sans cette marge, le trait du
    // haut tombe pile là où s'arrêtait le titre/la section d'avant, sans
    // aucun espace pendant la transition au scroll.
    <div ref={rootRef} className="mt-10 md:mt-16">
      <div
        className={`${fullBleedRule} ${lineBase} origin-center ${revealed ? "scale-x-100" : "scale-x-0"}`}
        aria-hidden="true"
      />
      <div className={`relative px-6 md:px-7 py-6 md:py-7 ${className}`}>
        <span
          aria-hidden="true"
          className={`absolute inset-y-0 left-0 w-px origin-top delay-150 ${lineBase} ${revealed ? "scale-y-100" : "scale-y-0"}`}
        />
        <span
          aria-hidden="true"
          className={`absolute inset-y-0 right-0 w-px origin-top delay-150 ${lineBase} ${revealed ? "scale-y-100" : "scale-y-0"}`}
        />
        {children}
      </div>
      <div
        className={`${fullBleedRule} ${lineBase} origin-center delay-300 ${revealed ? "scale-x-100" : "scale-x-0"}`}
        aria-hidden="true"
      />
    </div>
  );
}
