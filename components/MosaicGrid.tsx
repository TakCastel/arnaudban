"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { Project } from "@/data/projects";

export default function MosaicGrid({ projects }: { projects: Project[] }) {
  // Tailles variées pour l'effet Masonry
  const heights = [
    "h-48", "h-56", "h-64", "h-72", "h-80", "h-96", 
    "h-52", "h-60", "h-68", "h-76", "h-84", "h-88",
    "h-44", "h-50", "h-58", "h-66", "h-74", "h-82", "h-90"
  ];

  // Fonction pour mélanger aléatoirement les tailles
  const getRandomHeight = (index: number) => {
    const randomIndex = (index * 7 + 13) % heights.length; // Pseudo-aléatoire mais déterministe
    return heights[randomIndex];
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <motion.div 
      className="columns-1 sm:columns-2 lg:columns-3 gap-6"
      role="grid"
      aria-label="Grille des projets d'Arnaud Ban"
      aria-describedby="work-title"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {projects.map((p, index) => {
        const randomHeight = getRandomHeight(index);
        return (
          <motion.div 
            key={p.slug} 
            className="break-inside-avoid mb-6"
            role="gridcell"
            variants={itemVariants}
          >
            <ProjectCard project={p} imageHeight={randomHeight} />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
