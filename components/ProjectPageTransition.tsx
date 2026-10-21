import { ReactNode } from "react";

// Enveloppe de la page projet. Plus de fondu d'entrée : dans la direction
// "film monté", on arrive sur un plan en coupe franche (voir Cut), pas en
// fondu enchaîné.
export default function ProjectPageTransition({ children }: { children: ReactNode }) {
  return <article className="bg-background text-foreground">{children}</article>;
}
