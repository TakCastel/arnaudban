"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const isProjectPage = pathname?.startsWith('/projects/');

  useEffect(() => {
    // Animation d'apparition au chargement
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToProjects = () => {
    if (pathname === '/') {
      // Si on est sur la page d'accueil, scroll vers la section projets
      const projectsSection = document.getElementById('work');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Si on est sur une autre page, naviguer vers l'accueil puis scroll
      window.location.href = '/#work';
    }
  };

  return (
    <header 
      className={`w-[calc(100vw-32px)] md:w-[calc(100vw-128px)] h-16 flex items-center sticky top-0 z-50 mx-auto transition-all duration-300 ${
        isScrolled 
          ? 'bg-background' 
          : 'bg-background'
      }`}
      role="banner"
      aria-label="Navigation principale"
    >
      <div className="flex items-center justify-between w-full">
        {/* Nom à gauche */}
        <Link
          href="/"
          className={`font-extrabold text-xl sm:text-2xl md:text-3xl tracking-tight text-text transition-all duration-700 ease-out ${
            isVisible 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 -translate-x-4'
          }`}
          aria-label="Retour à la page d'accueil - Arnaud Ban"
        >
          Arnaud Ban
        </Link>

        {/* Navigation à droite */}
        <nav className="flex items-center space-x-4">
          <button
            onClick={scrollToProjects}
            className={`px-4 py-2 text-sm font-semibold text-text bg-background border-2 border-text rounded-full hover:bg-text hover:text-background transition-all duration-300 ${
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
            className={`px-4 py-2 text-sm font-semibold text-text bg-background border-2 border-text rounded-full hover:bg-text hover:text-background transition-all duration-300 ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-4'
            }`}
            aria-label="À propos"
          >
            À propos
          </Link>
        </nav>
      </div>
    </header>
  );
}
