"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/data/projects";
import { withBasePath } from "@/lib/basePath";

/**
 * Carrousel en accordéon : chaque projet est replié (titre en vertical sur
 * fond image assombri), et se déplie au survol/focus — pur CSS via
 * flex-grow, pas de JS. Le dernier panneau, "Voir plus", renvoie vers la
 * page Projets.
 */
export default function ProjectAccordion({ projects }: { projects: Project[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setRevealed(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const panelClass =
    "group relative flex-1 hover:flex-[3] focus-visible:flex-[3] transition-[flex] duration-500 ease-out overflow-hidden border-r border-foreground/15 last:border-r-0";

  return (
    <div
      ref={rootRef}
      className="relative flex h-[70vh] md:h-[560px] w-full"
      role="list"
      aria-label="Projets récents"
    >
      {/* Traits haut/bas : bleu de marque constant (--blue), pas
          `border-foreground` — sinon ils passeraient en beige en thème
          sombre (voir --foreground dans globals.css) au lieu de rester
          bleus comme le reste de cette section (même logique que
          --invert-bg / .duotone). Se révèlent (scaleX 0 → 1) à l'entrée
          dans le viewport, comme les sections de compétences de l'accueil
          (voir EdgeToEdgeSection). */}
      <span
        aria-hidden="true"
        className={`absolute top-0 left-0 right-0 h-px origin-center transition-transform duration-700 ease-out ${revealed ? "scale-x-100" : "scale-x-0"}`}
        style={{ backgroundColor: "var(--blue)" }}
      />
      <span
        aria-hidden="true"
        className={`absolute bottom-0 left-0 right-0 h-px origin-center transition-transform duration-700 ease-out delay-150 ${revealed ? "scale-x-100" : "scale-x-0"}`}
        style={{ backgroundColor: "var(--blue)" }}
      />

      {/* Étiquette de section : un vrai titre, pas juste un onglet — grosse
          typo, calée en bas à gauche comme les panneaux repliés, pour un
          rendu plus arty que centré. Le padding-gauche = --content-gutter,
          la même variable CSS que PageContainer (voir globals.css), pour
          démarrer pile à la limite du contenu sans mesurer le DOM en JS
          (et sans flash de mauvais alignement le temps que l'hydratation
          tourne). */}
      <div
        className="flex-none flex flex-col items-start justify-end pb-6 md:pb-8 border-r border-foreground/15 bg-background"
        style={{
          width: "calc(var(--content-gutter) + 96px)",
          paddingLeft: "var(--content-gutter)",
        }}
      >
        <span
          id="work-title"
          className="[writing-mode:vertical-rl] rotate-180 font-heading text-4xl md:text-6xl uppercase tracking-wide text-foreground whitespace-nowrap"
        >
          Projets
        </span>
      </div>

      {projects.map((project) => (
        <Link
          key={project.slug}
          href={`/projects/${project.slug}`}
          className={panelClass}
          role="listitem"
          aria-label={`Voir le projet ${project.title}, ${project.subtitle}`}
        >
          <Image
            src={withBasePath(project.cover)}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
            quality={85}
            loading="lazy"
          />
          <span
            className="absolute inset-0 bg-black/45 group-hover:bg-black/25 transition-colors duration-500"
            aria-hidden="true"
          />

          {/* Titre vertical, en bas, visible replié */}
          <div className="absolute left-2 md:left-3 bottom-6 md:bottom-8 group-hover:opacity-0 transition-opacity duration-200">
            <span className="[writing-mode:vertical-rl] rotate-180 font-heading text-lg md:text-xl uppercase tracking-wide text-white whitespace-nowrap">
              {project.title}
            </span>
          </div>

          {/* Infos, visibles déplié */}
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
            <p className="font-heading text-2xl md:text-3xl text-white">
              {project.title}
            </p>
            <p className="text-white/75 text-base mt-1">
              {project.subtitle} · {project.date}
            </p>
          </div>
        </Link>
      ))}

      {/* Voir plus */}
      <Link
        href="/projets"
        className={`${panelClass} flex items-center justify-center bg-foreground text-background`}
        role="listitem"
        aria-label="Voir tous les projets"
      >
        <div className="absolute left-2 md:left-3 bottom-6 md:bottom-8 group-hover:opacity-0 transition-opacity duration-200">
          <span className="[writing-mode:vertical-rl] rotate-180 font-heading text-lg md:text-xl uppercase tracking-wide whitespace-nowrap">
            Voir plus
          </span>
        </div>
        <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150 px-4 text-center">
          <span className="font-heading text-2xl md:text-3xl">Tous les projets</span>
          <span aria-hidden="true" className="text-xl">→</span>
        </span>
      </Link>
    </div>
  );
}
