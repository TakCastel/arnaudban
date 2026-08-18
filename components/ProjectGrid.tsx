import ProjectCard from "./ProjectCard";
import { Project } from "@/data/projects";

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-foreground/15"
      role="list"
      aria-label="Liste des projets d'Arnaud Ban"
      aria-describedby="work-title"
    >
      {projects.map((project) => (
        <div
          key={project.slug}
          className="border-r border-b border-foreground/15"
          role="listitem"
        >
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
}
