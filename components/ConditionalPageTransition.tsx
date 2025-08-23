"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface ConditionalPageTransitionProps {
  children: ReactNode;
}

export default function ConditionalPageTransition({ children }: ConditionalPageTransitionProps) {
  const pathname = usePathname();
  const isProjectPage = pathname?.startsWith('/projects/');
  const isHomePage = pathname === '/';

  // Pas de transition sur les pages de projets (elles ont leur propre transition)
  if (isProjectPage) {
    return <>{children}</>;
  }

  // Transition simple pour la page d'accueil
  if (isHomePage) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="w-full"
      >
        {children}
      </motion.div>
    );
  }

  // Transition par défaut pour les autres pages
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
