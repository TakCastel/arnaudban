import { ReactNode } from "react";

/**
 * Simple wrapper plein-largeur pour le contenu d'une page (contact, projets,
 * à propos, services). L'apparition elle-même n'est plus portée ici : chaque
 * section du contenu joue sa propre entrée en cascade via StaggerItem (voir
 * ce composant), pour un effet de haut en bas plutôt qu'un fondu unique sur
 * tout le bloc.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  return <div className="w-full">{children}</div>;
}
