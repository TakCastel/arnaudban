/**
 * Grain de pellicule posé sur tout le site : un bruit SVG (feTurbulence) en
 * fond, fixe, qui "grouille" par sauts (steps) plutôt qu'en glissé continu —
 * comme une image projetée, 12 positions par seconde. Purement décoratif,
 * aucun événement souris (pointer-events: none), coupé si l'utilisateur a
 * demandé moins d'animations (voir .film-grain dans globals.css).
 */
export default function FilmGrain() {
  return <div className="film-grain" aria-hidden="true" />;
}
