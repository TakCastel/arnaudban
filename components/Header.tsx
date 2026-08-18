"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";
import HamburgerButton from "./HamburgerButton";
import DesktopNav from "./DesktopNav";
import PageContainer from "./PageContainer";

export default function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  // Initialisé directement à partir du pathname (pas juste `false`) : sinon,
  // le premier rendu affiche le header un instant sur la home, avant que
  // l'effet ne le masque — un flash visible à l'ouverture.
  const [overHero, setOverHero] = useState(isHome);
  // Une fois que le header est apparu la première fois, il reste "construit" :
  // pas besoin de rejouer l'animation à chaque va-et-vient de scroll.
  const [hasBuilt, setHasBuilt] = useState(!isHome);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!overHero) setHasBuilt(true);
  }, [overHero]);

  useEffect(() => {
    if (!isHome) {
      setOverHero(false);
      return;
    }
    const handleScroll = () => {
      // Le hero reste collé (sticky) pendant ~90vh de scroll (voir
      // HeroSection.tsx) : le header reste invisible jusqu'à ce que le
      // titre ait presque fini de s'estomper, il apparaît juste après.
      setOverHero(window.scrollY < window.innerHeight * 0.85);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  return (
    <header
      // Sur le hero : pas de header du tout, juste la vidéo et "ARNAUD BAN".
      // Il réapparaît (fondu) une fois qu'on a quitté le hero.
      className={`fixed top-0 left-0 right-0 z-[70] h-20 bg-hero-block-bg border-b border-hero-block-text transition-opacity duration-300 ${
        overHero ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <PageContainer width="full" className="h-full">
        <div className="h-full flex items-stretch justify-between">
          {/* Logo dans sa propre cellule (trait des deux côtés), les boutons
              de nav restent à droite, séparés par le vide comme avant. */}
          <div className="flex items-stretch">
            <span className="w-px h-full bg-hero-block-text shrink-0" aria-hidden="true" />
            {/* "Arnaud Ban" n'apparaît dans le header qu'une fois qu'on a quitté
                le hero : le grand titre y est déjà, pas besoin de le dupliquer.
                Il vient prendre sa place au scroll plutôt que d'être là dès le
                départ. */}
            <Link
              href="/"
              className={`flex items-center px-10 font-heading font-bold uppercase text-3xl text-hero-block-text transition-all duration-500 ease-out ${
                isVisible && !overHero
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-3 pointer-events-none"
              }`}
              aria-label="Retour à l'accueil"
            >
              Arnaud Ban
            </Link>
            <span className="w-px h-full bg-hero-block-text shrink-0" aria-hidden="true" />
          </div>

          {/* Navigation : à droite, comme à l'origine */}
          <DesktopNav play={hasBuilt} />

          {/* Burger mobile */}
          <div className="md:hidden flex items-center">
            <HamburgerButton
              open={isMenuOpen}
              onToggle={() => setIsMenuOpen((v) => !v)}
            />
          </div>
        </div>
      </PageContainer>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </header>
  );
}
