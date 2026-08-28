import ProjectCard from "./ProjectCard";
import { Project } from "@/data/projects";

// Groupés par lignes de 2, largeurs qui alternent d'une ligne à l'autre
// (zigzag 58/42 puis 42/58) : même hauteur de ligne partout (fixée dans
// ProjectCard), mais deux cartes de largeurs différentes plutôt qu'un 50/50
// systématique.
const WIDTH_SPLIT = ["md:w-[58%]", "md:w-[42%]"];

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const rows: Project[][] = [];
  for (let i = 0; i < projects.length; i += 2) {
    rows.push(projects.slice(i, i + 2));
  }

  return (
    <div
      className="flex flex-col gap-10 md:gap-14"
      role="list"
      aria-label="Liste des projets d'Arnaud Ban"
      aria-describedby="work-title"
    >
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex flex-col md:flex-row gap-8 md:gap-10">
          {row.map((project, i) => (
            <div
              key={project.slug}
              className={`w-full ${
                row.length === 2 ? WIDTH_SPLIT[rowIndex % 2 === 0 ? i : 1 - i] : ""
              }`}
              role="listitem"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
