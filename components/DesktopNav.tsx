"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function DesktopNav({
  isVisible,
  onScrollToProjects,
}: {
  isVisible: boolean;
  onScrollToProjects: () => void;
}) {
  return (
    <nav className="hidden md:flex items-center space-x-4">
      <button
        onClick={onScrollToProjects}
        className={`px-4 py-2 text-sm font-semibold bg-background text-foreground border-2 border-foreground rounded-full hover:bg-foreground hover:text-background transition-all duration-300 ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
        }`}
        aria-label="Voir la section des projets"
      >
        Projets
      </button>
      <Link
        href="/about"
        className={`px-4 py-2 text-sm font-semibold bg-background text-foreground border-2 border-foreground rounded-full hover:bg-foreground hover:text-background transition-all duration-300 ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
        }`}
        aria-label="À propos"
      >
        À propos
      </Link>
      <ThemeToggle />
    </nav>
  );
}
