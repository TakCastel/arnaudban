import { ReactNode } from "react";
import { textDelayMs } from "@/lib/routeTransition";

/**
 * Le texte qui suit immédiatement le titre d'une page (fondu + légère
 * montée), avec un léger décalage par rapport à lui — voir
 * ROUTE_TRANSITION_TEXT_STEP_MS. Le titre gère sa propre cascade lettre par
 * lettre via SplitText ; le reste du contenu de la page, lui, apparaît au
 * scroll plutôt que sur ce même minutage — voir components/ScrollReveal.
 */
export default function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`animate-stagger-item ${className}`} style={{ animationDelay: `${textDelayMs()}ms` }}>
      {children}
    </div>
  );
}
