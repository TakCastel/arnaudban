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
      <div className="flex items-center justify-between w-full px-4 md:px-8">
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

        {/* Bouton "Voir tous les projets" à droite - caché sur les pages projets */}
        {!isProjectPage && (
          <a
            href="#work"
            className={`px-5 py-1.5 text-base font-semibold text-text bg-background border-2 border-text rounded-full hover:bg-text hover:text-background transition-all duration-700 ease-out ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-4'
            }`}
            aria-label="Voir la section des projets"
          >
            Voir tous les projets
          </a>
        )}
      </div>
    </header>
  );
}
