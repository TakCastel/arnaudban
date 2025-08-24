"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroLoader from "./HeroLoader";

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
      className="w-[calc(100vw-32px)] md:w-[calc(100vw-128px)] h-[calc(100vh-72px)] mx-auto sticky top-[72px] z-10"

      role="banner"
      aria-label="Section d'accueil - Arnaud Ban"
    >
      <div className="w-full h-full pb-16 relative">
        {/* Loader qui s'affiche pendant le chargement */}
        <AnimatePresence>
          {!isLoaded && (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-20"
            >
              <HeroLoader />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Image avec animation d'apparition */}
        <motion.div
          className="w-full h-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94] as const,
            delay: 0.2
          }}
        >
          <img
            src="https://picsum.photos/1600/900"
            alt="Image de fond représentant l'univers cinématographique d'Arnaud Ban"
            className="w-full h-full object-cover rounded-2xl"
            onLoad={() => {
              // Délai pour laisser le loader s'afficher un peu
              setTimeout(() => setIsLoaded(true), 500);
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
