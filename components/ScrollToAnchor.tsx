"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToAnchor() {
  const pathname = usePathname();

  useEffect(() => {
    // Attendre que la page soit complètement chargée
    const timer = setTimeout(() => {
      const hash = window.location.hash;
      if (hash && pathname === "/") {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ 
            behavior: "smooth",
            block: "start"
          });
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
