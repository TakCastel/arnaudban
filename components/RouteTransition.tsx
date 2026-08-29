"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ROUTE_TRANSITION_BLOCK_COUNT as BLOCK_COUNT,
  ROUTE_TRANSITION_COVER_MS as COVER_MS,
  ROUTE_TRANSITION_COVER_TOTAL_MS as COVER_TOTAL_MS,
  ROUTE_TRANSITION_HOLD_MS as HOLD_MS,
  ROUTE_TRANSITION_REVEAL_MS as REVEAL_MS,
  ROUTE_TRANSITION_STAGGER_MS as STAGGER_MS,
} from "@/lib/routeTransition";

// useLayoutEffect n'a aucun effet côté serveur (avertissement React sans
// conséquence ici, mais autant l'éviter) : useEffect pendant le rendu
// serveur/export statique, useLayoutEffect une fois dans le navigateur.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Phase = "idle" | "hidden" | "covering" | "covered" | "revealing";

/**
 * Transition de page : de gros blocs rectangulaires (couleur de marque)
 * grandissent en cascade pour couvrir l'écran, PUIS seulement la navigation
 * a réellement lieu, PUIS les blocs se rétractent en cascade pour révéler la
 * page suivante. Monté une seule fois à la racine (voir app/layout.tsx).
 *
 * Deux mécanismes combinés :
 * 1. Un clic sur un lien interne est intercepté (capture, avant le
 *    handler de next/link) : on ne le laisse PAS naviguer tout de suite,
 *    on joue d'abord la couverture, et c'est seulement une fois l'écran
 *    entièrement couvert qu'on déclenche `router.push` nous-mêmes.
 * 2. Pour tout changement de route qu'on n'a pas soi-même déclenché
 *    (premier chargement de la page, navigation précédent/suivant du
 *    navigateur) : on rejoue la séquence complète cover → pause → reveal,
 *    en réaction au changement de pathname plutôt qu'en amont d'un clic.
 */
export default function RouteTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("idle");
  // true entre le moment où on déclenche nous-mêmes router.push (une fois
  // l'écran couvert) et le moment où le pathname change effectivement :
  // indique à l'effet ci-dessous qu'il n'a qu'à révéler, pas à tout rejouer.
  const weNavigatedRef = useRef(false);
  // Le tout premier montage (chargement direct de la page, F5...) ne doit
  // rien jouer du tout — la transition n'a de sens qu'entre deux pages,
  // pas au démarrage.
  const isFirstRenderRef = useRef(true);

  // Cet effet (deps [pathname]) doit être déclaré AVANT celui juste en
  // dessous (deps []) : React exécute les effets dans l'ordre de
  // déclaration, et c'est justement en lisant isFirstRenderRef avant que
  // l'autre effet ait pu le repasser à false que celui-ci sait qu'il doit
  // s'abstenir au tout premier montage.
  useIsomorphicLayoutEffect(() => {
    if (isFirstRenderRef.current) {
      return;
    }

    if (weNavigatedRef.current) {
      weNavigatedRef.current = false;
      setPhase("revealing");
      const idleTimer = setTimeout(() => setPhase("idle"), REVEAL_MS + BLOCK_COUNT * STAGGER_MS);
      return () => clearTimeout(idleTimer);
    }

    setPhase("hidden");
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setPhase("covering"));
    });
    const revealTimer = setTimeout(() => setPhase("revealing"), COVER_MS + HOLD_MS);
    const idleTimer = setTimeout(
      () => setPhase("idle"),
      COVER_MS + HOLD_MS + REVEAL_MS + BLOCK_COUNT * STAGGER_MS
    );
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      clearTimeout(revealTimer);
      clearTimeout(idleTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Deps VIDES : ne se redéclenche jamais à cause d'un changement de route
  // (RouteTransition ne démonte jamais, il est monté une fois à la racine),
  // seulement au tout premier montage. En dev, le StrictMode de React le
  // rejoue une fois (mount → cleanup → mount) pour vérifier qu'il est
  // idempotent — le cleanup qui restaure le flag gère ce cas précis, sans
  // jamais se redéclencher lors d'une vraie navigation (contrairement à un
  // cleanup posé dans l'effet du dessus : celui-là se relance à CHAQUE
  // changement de pathname, ce qui causait le bug — la 1ère vraie
  // navigation redéclenchait ce cleanup et se faisait passer pour un
  // premier chargement, plus aucune transition ne se jouait jamais après).
  useIsomorphicLayoutEffect(() => {
    isFirstRenderRef.current = false;
    return () => {
      isFirstRenderRef.current = true;
    };
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; // ouverture nouvel onglet, etc.

      const anchor = (e.target as HTMLElement)?.closest?.("a");
      if (!anchor || !(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      // Simple ancre sur la même page (ex. #work) : le scroll natif fait le
      // travail, pas besoin d'une transition plein écran pour ça.
      if (url.pathname === window.location.pathname) return;

      e.preventDefault();
      // url.pathname sort de anchor.href, donc contient déjà le basePath tel
      // qu'écrit dans le HTML par next/link (ex. "/arnaudban/projets/" en
      // preview GitHub Pages, voir next.config.js). Or router.push() (comme
      // le `href` d'un <Link>) attend un chemin SANS basePath : il le
      // rajoute lui-même. Sans ce retrait, on obtenait un doublon
      // ("/arnaudban/arnaudban/projets/") → 404 au clic. Invisible en prod
      // (VPS) où le basePath est vide, donc jamais remarqué avant la preview.
      const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
      const pathname =
        basePath && url.pathname.startsWith(basePath) ? url.pathname.slice(basePath.length) || "/" : url.pathname;
      const target = pathname + url.search + url.hash;

      setPhase("hidden");
      let raf2 = 0;
      requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setPhase("covering"));
      });
      setTimeout(() => {
        setPhase("covered");
        weNavigatedRef.current = true;
        router.push(target);
      }, COVER_TOTAL_MS);
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [router]);

  // Rien dans le DOM entre deux transitions : pas de calque fixed qui traîne
  // (et pointer-events) une fois la révélation terminée.
  if (phase === "idle") return null;

  const scale = phase === "covering" || phase === "covered" ? 1 : 0;
  const animated = phase === "covering" || phase === "revealing";
  const duration = phase === "covering" ? COVER_MS : REVEAL_MS;

  return (
    <div className="fixed inset-0 z-[200] flex pointer-events-none" aria-hidden="true">
      {Array.from({ length: BLOCK_COUNT }).map((_, i) => (
        <div
          key={i}
          className="flex-1 origin-bottom ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{
            backgroundColor: "var(--blue)",
            transform: `scaleY(${scale})`,
            transitionProperty: "transform",
            transitionDuration: animated ? `${duration}ms` : "0ms",
            transitionDelay: animated ? `${i * STAGGER_MS}ms` : "0ms",
          }}
        />
      ))}
    </div>
  );
}
