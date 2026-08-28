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
        {/* Image : hauteur fixe (même hauteur sur toute la ligne, la largeur
            varie selon la case — voir ProjectGrid), effet photo — image
            de couverture nette, léger zoom au survol, pas d'overlay. */}
        <div className="relative w-full h-[280px] md:h-[380px] overflow-hidden bg-foreground/10">
          <Image
            src={withBasePath(project.cover)}
            alt={`${project.title} - ${project.subtitle} - Projet réalisé par Arnaud Ban`}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 60vw"
            quality={90}
            loading="lazy"
          />
        </div>

        {/* Barre d'info sous l'image : titre + sous-titre à gauche, lien à
            droite, sur la même ligne. */}
        <div className="flex items-center justify-between gap-4 pt-4 pb-2">
          <div>
            <h3
              id={`project-title-${project.slug}`}
              className="text-lg md:text-xl font-bold text-foreground leading-snug"
            >
              {project.title}
            </h3>
            <p className="text-sm text-foreground/50 mt-0.5">
              {project.subtitle} · {project.date}
            </p>
          </div>
          <span className="shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground group-hover:gap-2.5 transition-all duration-200">
            Voir le projet
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
