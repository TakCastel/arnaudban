// Timings de la transition de page (voir components/RouteTransition.tsx),
// centralisés ici pour être réutilisés par toute animation d'apparition
// PROPRE à une page (PageTransition, SplitText...) : elle ne doit démarrer
// qu'une fois les blocs entièrement rétractés, pas pendant qu'ils couvrent
// encore l'écran — sinon elle se joue en douce derrière le rideau et
// personne ne la voit.
export const ROUTE_TRANSITION_BLOCK_COUNT = 5;
export const ROUTE_TRANSITION_COVER_MS = 380;
export const ROUTE_TRANSITION_HOLD_MS = 120;
export const ROUTE_TRANSITION_REVEAL_MS = 380;
export const ROUTE_TRANSITION_STAGGER_MS = 40;

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

// Vrai uniquement après qu'un clic ait déclenché une vraie transition de
// page (cover → navigation → reveal, voir RouteTransition.tsx) — jamais au
// tout premier chargement d'une page (URL tapée, F5) : aucun rideau n'y
// cache jamais le contenu, donc lui appliquer ce même délai ne ferait
// qu'attendre pour rien. Simple variable de module (pas de state React) :
// le gestionnaire de clic de RouteTransition la bascule à true de façon
// synchrone, juste avant router.push — donc déjà à true quand la page
// suivante commence à se monter.
export const routeTransitionState = { hasNavigatedOnce: false };

/** Délai de base avant l'apparition du titre/texte d'une page (voir ci-dessus). */
export function contentEntryDelayMs(): number {
  return routeTransitionState.hasNavigatedOnce ? ROUTE_TRANSITION_CONTENT_DELAY_MS : 0;
}

// Écart entre l'apparition du titre (SplitText, sa propre cascade lettre par
// lettre démarrant à contentEntryDelayMs()) et celle du texte qui le suit
// (voir components/StaggerItem). Le reste du contenu de la page, lui,
// apparaît au scroll plutôt qu'à un délai fixe (voir components/ScrollReveal) :
// pas la peine de tout caler sur le même minutage, l'essentiel est de toute
// façon hors écran au chargement.
export const ROUTE_TRANSITION_TEXT_STEP_MS = 160;

/** Délai (ms) du texte qui suit le titre. Voir components/StaggerItem. */
export function textDelayMs(): number {
  return contentEntryDelayMs() + ROUTE_TRANSITION_TEXT_STEP_MS;
}
