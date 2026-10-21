"use client";

import { ElementType, ReactNode, useEffect, useRef, useState } from "react";

// idle  : rendu serveur, avant que le JS ne décide quoi faire (contenu caché
//         seulement si le script du <head> a posé la classe .js — et un
//         filet de sécurité CSS le réaffiche de toute façon, voir globals.css)
// armed : sous la ligne de flottaison, en attente d'entrer dans l'écran
// in    : le contenu entre (montée, mots qui sortent du cache, balayages)
type Phase = "idle" | "armed" | "in";

// Écart minimal entre deux blocs qui démarrent "en même temps" (plusieurs
// blocs visibles au chargement) : ils s'enchaînent en cascade, comme une
// suite de plans, au lieu d'apparaître tous d'un coup.
const CASCADE_MS = 140;

// Au-delà, on n'attend plus son tour : en scroll rapide, des dizaines de
// blocs entrent d'un coup et la file accumulerait des secondes de retard.
const MAX_WAIT_MS = 300;

let nextSlot = 0;
function scheduleSlot(): number {
  const now = performance.now();
  const at = Math.max(now, Math.min(nextSlot, now + MAX_WAIT_MS));
  nextSlot = at + CASCADE_MS;
  return at - now;
}

/**
 * Apparition à l'entrée dans l'écran : le contenu entre (voir
 * .cut dans globals.css : montée en cascade des enfants, mots qui sortent
 * d'un cache avec <Words>, images en balayage avec .wipe).
 *
 * Joue aussi au chargement pour les blocs déjà visibles. Si le JS ne tourne
 * pas, le contenu reste (ou redevient) visible : jamais de page vide.
 */
export default function Cut({
  children,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("in");
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    const play = () => {
      timers.push(setTimeout(() => setPhase("in"), scheduleSlot()));
    };

    setPhase("armed");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        play();
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <Tag ref={ref} className={`cut relative ${className}`} data-phase={phase}>
      {children}
    </Tag>
  );
}
