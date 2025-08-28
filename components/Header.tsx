"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";
import HamburgerButton from "./HamburgerButton";
import DesktopNav from "./DesktopNav";

export default function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToProjects = () => {
    if (pathname === "/") {
      const projectsSection = document.getElementById("work");
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = "/#work";
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-background z-[70] transition-all duration-300">
      <div className="w-[calc(100vw-32px)] md:w-[calc(100vw-128px)] mx-auto py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className={`text-2xl font-bold text-foreground transition-all duration-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-4"
            }`}
            aria-label="Retour à l'accueil"
          >
            Arnaud Ban
          </Link>

          {/* Navigation */}
          <DesktopNav
            isVisible={isVisible}
            onScrollToProjects={scrollToProjects}
          />

          {/* Burger mobile */}
          <HamburgerButton
            open={isMenuOpen}
            onToggle={() => setIsMenuOpen((v) => !v)}
          />
        </div>
      </div>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onGoToProjects={scrollToProjects}
      />
    </header>
  );
}
