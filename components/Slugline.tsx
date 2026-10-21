import { ReactNode } from "react";
import Cut from "./Cut";

// En-tête de section façon scénario : la "ligne de lieu" (ex. « Int.
// Atelier — Avignon — Jour »), puis un trait qui court jusqu'au bord et se
// trace à l'entrée de la section (voir .slugline dans globals.css).
export default function Slugline({ children }: { children: ReactNode }) {
  return (
    <Cut as="p" className="slugline flex items-baseline gap-4 font-heading uppercase text-xs md:text-sm tracking-[0.25em] px-4 md:px-10 mb-8 md:mb-12">
      <span className="opacity-70 min-w-0 truncate">{children}</span>
      <span aria-hidden="true" className="slugline-rule flex-1 h-px bg-current opacity-30 translate-y-[-0.3em]" />
    </Cut>
  );
}
