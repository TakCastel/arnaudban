import { ReactNode } from "react";

/**
 * Carte simple : un trait fin (1px), aucun border-radius, pas de calque
 * dupliqué derrière.
 */
export default function FilmCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`h-full bg-background border border-foreground p-6 md:p-7 ${className}`}>
      {children}
    </div>
  );
}
