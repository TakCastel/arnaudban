// Timings de la transition de page (voir components/RouteTransition.tsx),
// centralisés ici pour être réutilisés par toute animation d'apparition
// PROPRE à une page (PageTransition, SplitText...) : elle ne doit démarrer
// qu'une fois les blocs entièrement rétractés, pas pendant qu'ils couvrent
// encore l'écran — sinon elle se joue en douce derrière le rideau et
// personne ne la voit.
export const ROUTE_TRANSITION_BLOCK_COUNT = 5;
export const ROUTE_TRANSITION_COVER_MS = 450;
export const ROUTE_TRANSITION_HOLD_MS = 150;
export const ROUTE_TRANSITION_REVEAL_MS = 450;
export const ROUTE_TRANSITION_STAGGER_MS = 50;

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

// Pas entre chaque section empilée d'une page (voir components/StaggerItem)
// qui apparaissent l'une après l'autre, de haut en bas, une fois le titre
// (SplitText, sa propre cascade lettre par lettre) déjà lancé — au lieu de
// tout faire apparaître d'un coup.
export const ROUTE_TRANSITION_STAGGER_ITEM_STEP_MS = 90;
// Au-delà de cet index, les sections suivantes partagent le même délai que
// la dernière : une page longue (FAQ, listes) ne doit pas faire attendre ses
// premières sections visibles le temps que toutes les autres, hors écran au
// chargement, aient chacune leur tour.
const ROUTE_TRANSITION_STAGGER_ITEM_MAX_STEPS = 4;

/**
 * Délai (ms) d'une section de page qui suit le titre : `index` = position de
 * cette section parmi celles-là (0 = juste après le titre). Voir
 * components/StaggerItem.
 */
export function staggerSectionDelayMs(index: number): number {
  const step = Math.min(index, ROUTE_TRANSITION_STAGGER_ITEM_MAX_STEPS) + 1;
  return ROUTE_TRANSITION_CONTENT_DELAY_MS + step * ROUTE_TRANSITION_STAGGER_ITEM_STEP_MS;
}
