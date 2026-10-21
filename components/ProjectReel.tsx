"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Project } from "@/data/projects";
import { withBasePath } from "@/lib/basePath";
import Cut from "./Cut";
import Words from "./Words";

const coverSrc = (p: Project) => encodeURI(withBasePath(p.cover));

/**
 * "Étalonne" une couverture : moyenne de ses couleurs (image réduite à
 * 12×12 dans un canvas), puis on garde la teinte en la poussant vers un ton
 * sombre et saturé — de quoi servir de fond à du texte clair, comme un
 * look de film appliqué à toute la page.
 */
function gradeFromImage(img: HTMLImageElement): string | null {
  try {
    const size = 12;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(img, 0, 0, size, size);
    const data = ctx.getImageData(0, 0, size, size).data;
    let r = 0, g = 0, b = 0;
    for (let i = 0; i < data.length; i += 4) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
    }
    const n = data.length / 4;
    const [h, s] = rgbToHsl(r / n, g / n, b / n);
    return `hsl(${Math.round(h)} ${Math.round(Math.max(s, 0.45) * 100)}% 14%)`;
  } catch {
    return null;
  }
}

function rgbToHsl(r: number, g: number, b: number): [number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  if (d === 0) return [0, 0];
  const s = d / (1 - Math.abs(2 * l - 1));
  let h: number;
  if (max === r) h = ((g - b) / d) % 6;
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  return [(h * 60 + 360) % 360, s];
}

/**
 * Liste de projets en typo seule, pleine largeur. Au survol d'un titre :
 * la couverture suit le curseur (recadrée en 2.39:1, format cinéma) et tout
 * le bloc prend l'étalonnage du projet — on montre le métier plutôt que de
 * le décrire. Sur écran tactile (pas de survol), l'image s'affiche
 * directement dans la ligne.
 */
export default function ProjectReel({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<number | null>(null);
  const [grades, setGrades] = useState<Record<string, string>>({});
  const followerRef = useRef<HTMLDivElement>(null);
  const skewRef = useRef<HTMLDivElement>(null);

  // Calcul des étalonnages une fois les couvertures chargées (mêmes fichiers
  // que ceux du suiveur, donc déjà en cache navigateur).
  useEffect(() => {
    projects.forEach((p) => {
      const img = new Image();
      img.onload = () => {
        const grade = gradeFromImage(img);
        if (grade) setGrades((prev) => ({ ...prev, [p.slug]: grade }));
      };
      img.src = coverSrc(p);
    });
  }, [projects]);

  // Le suiveur rattrape le curseur avec un léger retard (interpolation à
  // chaque frame), et s'incline selon sa vitesse horizontale.
  useEffect(() => {
    const follower = followerRef.current;
    if (!follower) return;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf = 0;

    const loop = () => {
      const dx = tx - x;
      x += dx * 0.16;
      y += (ty - y) * 0.16;
      const tilt = Math.max(Math.min(dx * 0.04, 6), -6);
      follower.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${tilt}deg)`;
      raf = requestAnimationFrame(loop);
    };
    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // La liste s'incline selon la vitesse du scroll, comme une bobine qui
  // défile trop vite, puis se redresse dès qu'on ralentit.
  useEffect(() => {
    const el = skewRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let lastY = window.scrollY;
    let skew = 0;
    let raf = 0;
    const loop = () => {
      const y = window.scrollY;
      const target = Math.max(Math.min((y - lastY) * 0.12, 7), -7);
      lastY = y;
      skew += (target - skew) * 0.12;
      el.style.transform = Math.abs(skew) < 0.01 ? "" : `skewY(${-skew}deg)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const activeProject = active !== null ? projects[active] : null;
  const graded = activeProject ? grades[activeProject.slug] : undefined;

  return (
    <div
      className="reel relative"
      style={
        graded
          ? { backgroundColor: graded, color: "var(--beige)" }
          : undefined
      }
      onPointerLeave={() => setActive(null)}
    >
      <div ref={skewRef} className="relative z-10 will-change-transform">
      <Cut as="ol">
        {projects.map((project, i) => (
          <li key={project.slug}>
            <Link
              href={`/projects/${project.slug}`}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              className={`reel-row group grid grid-cols-1 md:grid-cols-[1fr_auto] items-baseline gap-x-4 px-4 md:px-10 py-4 md:py-5 ${
                active !== null && active !== i ? "opacity-30" : "opacity-100"
              }`}
            >
              {/* Au survol, le titre glisse et une flèche entre par la gauche. */}
              <span className="font-heading uppercase font-bold leading-[0.9] tracking-tight text-[12vw] md:text-[6vw] break-words transition-transform duration-500 ease-out md:group-hover:translate-x-[1.1em] md:group-focus-visible:translate-x-[1.1em] relative">
                <span aria-hidden="true" className="hidden md:inline absolute right-full mr-[0.25em] opacity-0 -translate-x-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0">→</span>
                <Words>{project.title}</Words>
              </span>
              <span className="mt-2 md:mt-0 text-sm md:text-base md:text-right whitespace-nowrap">
                {project.subtitle}
                <span className="mx-2" aria-hidden="true">·</span>
                {project.date}
              </span>
              {/* Tactile : pas de suiveur, l'image vit dans la ligne. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={coverSrc(project)}
                alt=""
                loading="lazy"
                className="hover-none-only mt-3 w-full aspect-[2.39/1] object-cover"
              />
            </Link>
          </li>
        ))}
      </Cut>
      </div>

      {/* Suiveur : toutes les couvertures empilées, seule l'active est
          visible — pas d'attente de chargement au passage d'une ligne. */}
      <div
        ref={followerRef}
        aria-hidden="true"
        className={`reel-follower hover-only fixed left-0 top-0 z-20 pointer-events-none w-[34vw] max-w-[560px] aspect-[2.39/1] overflow-hidden ${
          activeProject ? "opacity-100" : "opacity-0"
        }`}
      >
        {projects.map((project, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={project.slug}
            src={coverSrc(project)}
            alt=""
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover ${
              active === i ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
