import { ReactNode } from "react";
import { ROUTE_TRANSITION_CONTENT_DELAY_MS } from "@/lib/routeTransition";

export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <div
      className="w-full animate-page-in"
      // Démarre juste avant la fin de la rétraction des blocs de
      // RouteTransition (voir lib/routeTransition.ts) : sinon ce fondu se
      // joue en douce derrière le rideau, ou laisse un instant à vide.
      style={{ animationDelay: `${ROUTE_TRANSITION_CONTENT_DELAY_MS}ms` }}
    >
      {children}
    </div>
  );
}
