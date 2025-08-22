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

  return (
    <div 
      className="columns-1 sm:columns-2 lg:columns-3 gap-6"
      role="grid"
      aria-label="Grille des projets d'Arnaud Ban"
      aria-describedby="work-title"
    >
      {projects.map((p, index) => {
        const randomHeight = getRandomHeight(index);
        return (
          <div 
            key={p.slug} 
            className="break-inside-avoid mb-6"
            role="gridcell"
          >
            <ProjectCard project={p} imageHeight={randomHeight} />
          </div>
        );
      })}
    </div>
  );
}
