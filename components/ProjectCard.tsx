import Link from "next/link";
import { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="block rounded-2xl overflow-hidden border border-gray-200"
    >
      <div>
        {/* Image de couverture */}
        <img
          src={project.cover}
          alt={project.title}
          className="w-full h-64 object-cover"
        />

        {/* Contenu du projet */}
        <div className="p-4">
          <h3 className="text-blue-900 text-xl font-semibold">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="text-blue-700 text-sm mt-2">
              {project.subtitle}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
