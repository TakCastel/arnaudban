"use client";

import { createElement, ReactNode, useEffect, useRef, useState } from "react";
import { ROUTE_TRANSITION_CONTENT_DELAY_MS } from "@/lib/routeTransition";

/**
 * Apparition lettre par lettre (pas un simple fondu) : chaque lettre monte
 * et pivote légèrement en entrant, en cascade — jouée une fois quand le
 * texte entre dans le viewport (IntersectionObserver, même pattern que
 * EdgeToEdgeSection ailleurs sur le site). Découpé en mots d'abord, puis en
 * lettres à l'intérieur de chaque mot, pour qu'un mot ne se coupe jamais en
 * fin de ligne au retour à la ligne.
 *
 * Délai par défaut = durée de la transition de page (voir
 * lib/routeTransition.ts) : ces titres sont presque toujours déjà dans le
 * viewport au montage (IntersectionObserver se déclenche donc tout de
 * suite), sans ce délai la cascade de lettres se jouerait en douce derrière
 * les blocs de RouteTransition. Passer `delay={0}` explicitement pour un
 * usage hors navigation de page (pas encore le cas actuellement).
 *
 * Accessibilité : le texte réel reste porté par `aria-label` sur l'élément
 * englobant ; chaque lettre individuelle est `aria-hidden` pour ne pas être
 * lue lettre par lettre par un lecteur d'écran.
 */
export default function SplitText({
  children,
  as = "span",
  className = "",
  delay = ROUTE_TRANSITION_CONTENT_DELAY_MS,
  id,
}: {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
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
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = children.split(" ");
  let letterIndex = 0;

  // `as any` sur le ref/les props : `as` est une union de tags (h1..span),
  // createElement ne peut pas résoudre un seul type de ref/attrs précis pour
  // un tag polymorphe — cast pragmatique plutôt que dupliquer ce composant
  // par tag.
  return createElement(
    as,
    { ref: ref as any, id, className, "aria-label": children } as any,
    words.map((word, wi) => (
      <span key={wi} className="inline-block whitespace-nowrap" aria-hidden="true">
        {word.split("").map((letter, li) => {
          const i = letterIndex++;
          return (
            <span
              key={li}
              className="split-text-letter inline-block"
              style={{ transitionDelay: `${delay + i * 22}ms` }}
              data-revealed={revealed || undefined}
            >
              {letter}
            </span>
          );
        })}
      </span>
    )).reduce((acc: ReactNode[], word, i) => {
      // Espace normal (pas aria-hidden) entre chaque mot, pour que la
      // sélection/copie du texte visuel reste correcte.
      if (i > 0) acc.push(" ");
      acc.push(word);
      return acc;
    }, [])
  );
}
