import { ReactNode } from "react";
import { staggerSectionDelayMs } from "@/lib/routeTransition";

/**
 * Une section de page qui apparaît (fondu + légère montée, voir
 * .animate-stagger-item dans globals.css) après le titre — le titre, lui,
 * gère sa propre cascade lettre par lettre via SplitText, pas besoin de
 * l'envelopper ici. `index` = position de cette section parmi les
 * StaggerItem de la page, dans l'ordre d'apparition voulu (0 = juste après
 * le titre, 1 = la suivante, etc.) : c'est ce qui donne l'effet "de haut en
 * bas" au lieu de tout faire apparaître d'un coup.
 */
export default function StaggerItem({
  children,
  index,
  className = "",
}: {
  children: ReactNode;
  index: number;
  className?: string;
}) {
  return (
    <div className={`animate-stagger-item ${className}`} style={{ animationDelay: `${staggerSectionDelayMs(index)}ms` }}>
      {children}
    </div>
  );
}
