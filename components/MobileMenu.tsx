"use client";

import { useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const links = [
  { href: "/projets", label: "Projets", aria: "Voir les projets" },
  { href: "/services", label: "Services", aria: "Aller à la page Services" },
  { href: "/about", label: "À propos", aria: "Aller à la page À propos" },
  { href: "/contact", label: "Contact", aria: "Aller à la page Contact" },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
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
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label="Fermer le menu"
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
        <div className="px-6 pb-10 pt-[calc(env(safe-area-inset-top)_+_88px)] h-full flex flex-col justify-between">
          <nav
            className="w-full border-t border-foreground/15"
            role="navigation"
            aria-label="Menu mobile"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                aria-label={link.aria}
                className="group flex items-center gap-4 py-5 border-b border-foreground/15"
              >
                <span className="font-heading text-5xl text-foreground transition-transform duration-300 group-hover:translate-x-2">
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-between pt-8">
            <p className="text-base text-foreground/60">Thème</p>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
