// Timings de la transition de page (voir components/RouteTransition.tsx),
// centralisés ici pour être réutilisés par toute animation d'apparition
// PROPRE à une page (PageTransition, SplitText...) : elle ne doit démarrer
// qu'une fois les blocs entièrement rétractés, pas pendant qu'ils couvrent
// encore l'écran — sinon elle se joue en douce derrière le rideau et
// personne ne la voit.
export const ROUTE_TRANSITION_BLOCK_COUNT = 5;
export const ROUTE_TRANSITION_COVER_MS = 550;
export const ROUTE_TRANSITION_HOLD_MS = 200;
export const ROUTE_TRANSITION_REVEAL_MS = 550;
export const ROUTE_TRANSITION_STAGGER_MS = 60;

// Temps pour que TOUS les blocs (le dernier de la cascade compris) aient
// fini de couvrir / de se rétracter.
export const ROUTE_TRANSITION_COVER_TOTAL_MS =
  ROUTE_TRANSITION_COVER_MS + (ROUTE_TRANSITION_BLOCK_COUNT - 1) * ROUTE_TRANSITION_STAGGER_MS;

export const ROUTE_TRANSITION_REVEAL_TOTAL_MS =
  ROUTE_TRANSITION_REVEAL_MS + (ROUTE_TRANSITION_BLOCK_COUNT - 1) * ROUTE_TRANSITION_STAGGER_MS;

// Délai à poser sur une animation d'apparition de page : à 75% de la durée
// de la rétraction des blocs plutôt qu'à 100% — sinon il y a un instant à
// vide (blocs partis, contenu pas encore animé). Chevauche la fin du
// "fade out" des blocs plutôt que d'attendre qu'il soit entièrement fini.
export const ROUTE_TRANSITION_CONTENT_DELAY_MS = Math.round(ROUTE_TRANSITION_REVEAL_TOTAL_MS * 0.75);
