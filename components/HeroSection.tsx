"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function HeroSection({ id }: { id?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const heroRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroTop = heroRef.current?.offsetTop || 0;
      const heroHeight = heroRef.current?.offsetHeight || 0;
      
      // Si on scroll vers le haut et qu'on approche de la hero section
      if (currentScrollY < lastScrollY.current && currentScrollY < heroTop + heroHeight) {
        setShouldRender(true);
        setIsVisible(true);
      }
      
      // Si on scroll vers le bas et qu'on dépasse la hero section OU si la section projets arrive en haut
      if (currentScrollY > heroTop + heroHeight - 100) {
        setIsVisible(false);
        // Délai avant de retirer du DOM pour laisser l'animation se terminer
        setTimeout(() => setShouldRender(false), 1000);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Réinitialiser la visibilité quand on revient en haut
  useEffect(() => {
    if (shouldRender) {
      setIsVisible(true);
    }
  }, [shouldRender]);

  if (!shouldRender) {
    return null;
  }

  return (
    <section
      ref={heroRef}
      id={id}
      className="w-[calc(100vw-32px)] md:w-[calc(100vw-128px)] h-[calc(100vh-64px)] mx-auto sticky top-16 z-10"
      style={{
        marginBottom: '16px'
      }}
      role="banner"
      aria-label="Section d'accueil - Arnaud Ban"
    >
      <div className={`w-full h-full pb-16 transition-all duration-1000 ease-out ${
        isLoaded && isVisible
          ? 'scale-100 opacity-100' 
          : 'scale-75 opacity-0'
      }`}>
        <Image
          src="https://picsum.photos/1600/900"
          alt="Image de fond représentant l'univers cinématographique d'Arnaud Ban"
          width={1600}
          height={900}
          className="w-full h-full object-cover rounded-2xl"
          priority
          onLoad={() => setIsLoaded(true)}
        />
      </div>
    </section>
  );
}
