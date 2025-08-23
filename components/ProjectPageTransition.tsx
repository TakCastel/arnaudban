"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ProjectPageTransitionProps {
  children: ReactNode;
}

export default function ProjectPageTransition({ children }: ProjectPageTransitionProps) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.3,
        ease: "easeOut"
      }}
      className="bg-background py-8 md:py-16"
      role="main"
    >
      {children}
    </motion.main>
  );
}
