"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToProjects = () => {
    if (pathname === '/') {
      const projectsSection = document.getElementById('work');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = '/#work';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-background z-50 transition-all duration-300">
      <div className="w-[calc(100vw-32px)] md:w-[calc(100vw-128px)] mx-auto py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className={`text-2xl font-bold text-foreground transition-all duration-300 ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-4'
            }`}
            aria-label="Retour à l'accueil"
          >
            Arnaud Ban
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            <button
              onClick={scrollToProjects}
              className={`px-4 py-2 text-sm font-semibold bg-background text-foreground border-2 border-foreground rounded-full hover:bg-foreground hover:text-background transition-all duration-300 ${
                isVisible 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-4'
              }`}
              aria-label="Voir la section des projets"
            >
              Projets
            </button>
            <Link
              href="/about"
              className={`px-4 py-2 text-sm font-semibold bg-background text-foreground border-2 border-foreground rounded-full hover:bg-foreground hover:text-background transition-all duration-300 ${
                isVisible 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-4'
              }`}
              aria-label="À propos"
            >
              À propos
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
