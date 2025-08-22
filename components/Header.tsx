"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-[90vw] h-20 flex items-center sticky top-0 z-50 mx-auto">
      <div className="flex items-center justify-between w-full px-2">
        {/* Nom à gauche */}
        <Link
          href="/"
          className="font-extrabold text-lg sm:text-xl md:text-2xl tracking-tight text-blue-900"
        >
          Arnaud Ban
        </Link>

        {/* Bouton "Voir tous les projets" à droite */}
        <a
          href="#work"
          className="px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors"
        >
          Voir tous les projets
        </a>
      </div>
    </header>
  );
}
