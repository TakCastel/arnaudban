"use client";

import { useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToProjects: () => void;
}

export default function MobileMenu({
  isOpen,
  onClose,
  onGoToProjects,
}: MobileMenuProps) {
  // Fermer avec la touche ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Empêche le scroll du body quand le menu est ouvert
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      return () => {
        document.documentElement.style.overflow = "";
      };
    }
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-[60] md:hidden transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!isOpen}
    >
      {/* Overlay cliquable */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Panneau PLEIN ÉCRAN qui glisse du haut */}
      <div
        id="mobile-menu-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Menu principal mobile"
        className={`fixed inset-0 w-full h-full bg-background transition-transform duration-300 ease-out ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="px-4 pb-10 pt-[calc(env(safe-area-inset-top)_+_72px)] h-full flex flex-col items-center justify-start space-y-6">
          <nav className="w-full space-y-3">
            <button
              onClick={() => {
                onGoToProjects();
                onClose();
              }}
              className="block w-full px-5 py-4 text-lg font-semibold text-center bg-background text-foreground border-2 border-foreground rounded-xl"
              aria-label="Voir la section des projets"
            >
              Projets
            </button>
            <Link
              href="/about"
              onClick={onClose}
              className="block w-full px-5 py-4 text-lg font-semibold text-center bg-background text-foreground border-2 border-foreground rounded-xl"
              aria-label="Aller à la page À propos"
            >
              À propos
            </Link>
          </nav>

          <div className="w-full pt-2">
            <p className="mb-2 text-sm text-foreground/70">Thème</p>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
