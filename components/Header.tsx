"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-[90vw] h-20 flex items-center sticky top-0 z-50 mx-auto">
      <div className="flex items-center justify-between w-full px-4 md:px-8">
        {/* Nom à gauche */}
        <Link
          href="/"
          className="font-extrabold text-2xl sm:text-3xl md:text-4xl tracking-tight text-text"
        >
          Arnaud Ban
        </Link>

        {/* Bouton "Voir tous les projets" à droite */}
        <a
          href="#work"
          className="px-6 py-3 text-lg font-semibold text-text bg-background border-2 border-text rounded-full hover:bg-text hover:text-background transition-all duration-300"
        >
          Voir tous les projets
        </a>
      </div>
    </header>
  );
}
