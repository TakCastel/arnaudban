"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function ConditionalPageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isProjectPage = pathname?.startsWith("/projects/");

  // Pas de transition sur les pages de projets (elles ont leur propre transition)
  if (isProjectPage) {
    return <>{children}</>;
  }

  return <div className="w-full animate-page-in">{children}</div>;
}
