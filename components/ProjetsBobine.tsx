"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Project } from "@/data/projects";
import { withBasePath } from "@/lib/basePath";
import ProjectReel from "@/components/ProjectReel";
import Cut from "@/components/Cut";

const coverSrc = (p: Project) => encodeURI(withBasePath(p.cover));

// Les sous-titres des projets sont trop fins pour servir de filtres (une
// catégorie par projet ou presque) : on les regroupe en quatre familles,
// ce qu'un monteur rangerait dans des chutiers distincts.
const FAMILIES: { id: string; label: string; subtitles: string[] }[] = [
  { id: "fiction", label: "Fiction", subtitles: ["Court métrage de fiction"] },
  { id: "documentaire", label: "Documentaire", subtitles: ["Documentaire", "Reportage"] },
  {
    id: "musique",
    label: "Musique & scène",
    subtitles: ["Clip musical", "Clip promotionnel", "Live session", "Concert", "Théâtre"],
  },
  {
    id: "commande",
    label: "Commande",
    subtitles: ["After movie", "Publicité", "Reportage corporate"],
  },
];

type View = "liste" | "planche";

const label = "font-heading uppercase tracking-[0.2em] text-xs md:text-sm";

/**
 * La bobine complète : filtres par famille + bascule entre la liste typo
 * (ProjectReel, comme sur l'accueil) et une planche contact, la feuille où
 * l'on regarde tous les photogrammes d'un coup avant de choisir.
 */
export default function ProjetsBobine({ projects }: { projects: Project[] }) {
  const [family, setFamily] = useState<string | null>(null);
  const [view, setView] = useState<View>("liste");

  const filtered = useMemo(() => {
    const f = FAMILIES.find((x) => x.id === family);
    return f ? projects.filter((p) => f.subtitles.includes(p.subtitle)) : projects;
  }, [family, projects]);

  // Compte par famille, affiché en exposant comme un numéro de chutier ;
  // une famille vide (données modifiées) disparaît plutôt que de mener nulle part.
  const families = FAMILIES.map((f) => ({
    ...f,
    count: projects.filter((p) => f.subtitles.includes(p.subtitle)).length,
  })).filter((f) => f.count > 0);

  const chip = (active: boolean) =>
    `${label} py-2 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current ${
      active ? "opacity-100 underline underline-offset-[6px] decoration-1" : "opacity-50 hover:opacity-100"
    }`;

  return (
    <div>
      {/* Barre de contrôle : familles à gauche, mode d'affichage à droite. */}
      <div className="px-4 md:px-10 pb-4 md:pb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-10">
        <div role="group" aria-label="Filtrer par famille" className="flex flex-wrap gap-x-6 gap-y-1">
          <button type="button" aria-pressed={family === null} onClick={() => setFamily(null)} className={chip(family === null)}>
            Tout<sup className="ml-1 text-[0.7em] tabular-nums">{projects.length}</sup>
          </button>
          {families.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={family === f.id}
              onClick={() => setFamily(family === f.id ? null : f.id)}
              className={chip(family === f.id)}
            >
              {f.label}
              <sup className="ml-1 text-[0.7em] tabular-nums">{f.count}</sup>
            </button>
          ))}
        </div>
        <div role="group" aria-label="Mode d'affichage" className="flex gap-6 shrink-0">
          <button type="button" aria-pressed={view === "liste"} onClick={() => setView("liste")} className={chip(view === "liste")}>
            Liste
          </button>
          <button type="button" aria-pressed={view === "planche"} onClick={() => setView("planche")} className={chip(view === "planche")}>
            Planche contact
          </button>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {filtered.length} projet{filtered.length > 1 ? "s" : ""} affiché{filtered.length > 1 ? "s" : ""}
      </p>

      {/* La clé force un nouveau montage à chaque changement de filtre ou de
          vue : la Cut rejoue sa coupe franche, comme un raccord de plan. */}
      {view === "liste" ? (
        <Cut key={`liste-${family}`}>
          <ProjectReel projects={filtered} />
        </Cut>
      ) : (
        <Cut key={`planche-${family}`}>
          <ContactSheet projects={filtered} />
        </Cut>
      )}
    </div>
  );
}

/**
 * Planche contact : la pellicule (fond encre, perforations en haut et en
 * bas de chaque bande) avec ses photogrammes 2.39:1 numérotés. Au survol ou
 * au focus, un cadre au crayon gras entoure le plan — la marque du monteur
 * qui retient une prise.
 */
function ContactSheet({ projects }: { projects: Project[] }) {
  // Perforations : un motif répété en CSS plutôt que des dizaines de nœuds.
  const sprockets = {
    backgroundImage:
      "repeating-linear-gradient(90deg, transparent 0 10px, color-mix(in srgb, var(--beige) 55%, transparent) 10px 22px, transparent 22px 34px)",
  } as React.CSSProperties;

  return (
    <div className="bg-[var(--ink)] text-[var(--beige)]">
      <div aria-hidden="true" className="h-2.5 mx-4 md:mx-10 mt-0 pt-0 relative top-3 rounded-[2px] opacity-60" style={sprockets} />
      <ol className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 md:gap-x-6 gap-y-8 md:gap-y-10 px-4 md:px-10 py-10 md:py-14">
        {projects.map((project) => (
          <li key={project.slug}>
            <Link
              href={`/projects/${project.slug}`}
              className="group block relative focus-visible:outline-none"
            >
              <div className="relative wipe">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coverSrc(project)}
                  alt={`${project.title} — ${project.subtitle}, ${project.date}`}
                  loading="lazy"
                  className="block w-full aspect-[2.39/1] object-cover"
                />
                {/* Cadre "crayon gras", légèrement de travers comme tracé à la main. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-2 border-2 border-[#ff4a2e] rounded-[3px] rotate-[-0.8deg] opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                />
              </div>
              <div className="mt-3 flex items-baseline gap-3">
                <span className="font-heading uppercase font-bold text-xl md:text-2xl leading-none tracking-tight truncate">
                  {project.title}
                </span>
              </div>
              <p className="mt-1 text-sm opacity-60">
                {project.subtitle}
                <span className="mx-2" aria-hidden="true">·</span>
                {project.date}
              </p>
            </Link>
          </li>
        ))}
      </ol>
      <div aria-hidden="true" className="h-2.5 mx-4 md:mx-10 relative -top-3 rounded-[2px] opacity-60" style={sprockets} />
    </div>
  );
}
