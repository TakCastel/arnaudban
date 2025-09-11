"use client";

import { useEffect, useRef } from "react";

export default function SkipToMain() {
  const skipRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab" && !e.shiftKey && document.activeElement === skipRef.current) {
        // Focus sur le contenu principal quand on appuie sur Tab depuis le lien skip
        const main = document.querySelector("main");
        if (main) {
          main.focus();
          main.scrollIntoView();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <a
      ref={skipRef}
      href="#work"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-foreground focus:text-background focus:rounded focus:font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground"
      onClick={(e) => {
        e.preventDefault();
        const main = document.querySelector("main");
        if (main) {
          main.focus();
          main.scrollIntoView({ behavior: "smooth" });
        }
      }}
    >
      Aller au contenu principal
    </a>
  );
}
