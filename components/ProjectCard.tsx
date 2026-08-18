"use client";

import Link from "next/link";
import Image from "next/image";
import { Project } from "@/data/projects";
import { withBasePath } from "@/lib/basePath";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article role="article" aria-labelledby={`project-title-${project.slug}`}>
      <Link
        href={`/projects/${project.slug}`}
        className="group block"
        aria-label={`Voir le projet ${project.title} - ${project.subtitle}`}
      >
        {/* Image */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-foreground/10">
          <Image
            src={withBasePath(project.cover)}
            alt={`${project.title} - ${project.subtitle} - Projet réalisé par Arnaud Ban`}
            fill
            className="object-cover duotone transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={85}
            loading="lazy"
          />
          {project.videoUrl && (
            <span
              className="absolute top-3 right-3 flex items-center gap-1.5 bg-background text-foreground text-[10px] font-mono font-semibold uppercase tracking-wide px-2.5 py-1"
              aria-hidden="true"
            >
              ▶ Vidéo
            </span>
          )}
          <span
            className="absolute inset-0 border border-transparent group-hover:border-foreground group-focus-visible:border-foreground transition-colors duration-200"
            aria-hidden="true"
          />
        </div>

        {/* Texte toujours visible (pas seulement au survol) */}
        <div className="pt-4 pb-6 px-4">
          <h3
            id={`project-title-${project.slug}`}
            className="text-xl md:text-2xl font-bold text-foreground leading-snug"
          >
            {project.title}
          </h3>
          <p className="text-base text-foreground/60 mt-1 mb-3">
            {project.subtitle} · {project.date}
          </p>
          <span className="inline-flex items-center gap-1.5 text-base font-semibold text-foreground group-hover:gap-2.5 transition-all duration-200">
            Voir le projet
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
