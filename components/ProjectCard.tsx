"use client";

import Link from "next/link";
import Image from "next/image";
import { Project } from "@/data/projects";
import { useState, useEffect, useRef } from "react";

interface ProjectCardProps {
  project: Project;
  imageHeight: string;
}

export default function ProjectCard({
  project,
  imageHeight,
}: ProjectCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={cardRef}
      className={`transition-all duration-300 ease-out ${
        isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
      }`}
      role="article"
      aria-labelledby={`project-title-${project.slug}`}
    >
      <div className="bg-background">
        {/* Lien sur l'image avec effet de zoom et arrondi */}
        <Link
          href={`/projects/${project.slug}`}
          className="block rounded-2xl group outline outline-2 outline-transparent outline-offset-2 transition-shadow duration-300 hover:outline-blue-600 dark:hover:outline-white focus:outline-2 focus:outline-blue-600 dark:focus:outline-white"
          aria-label={`Voir le projet ${project.title} - ${project.subtitle}`}
        >
          {/* Container avec dimensions fixes et stables - IMPORTANT: position relative pour fill */}
          <div
            className={`w-full ${imageHeight} bg-gray-300 relative rounded-2xl`}
          >
            <div className="h-full w-full overflow-hidden rounded-2xl">
              {/* Image optimisée avec Next.js Image */}
              <Image
                src={project.cover}
                alt={`${project.title} - ${project.subtitle} - Projet réalisé par Arnaud Ban`}
                width={600}
                height={450}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                quality={85}
                loading="lazy"
              />

              {/* Overlay avec texte qui apparaît au hover */}
              <div className="absolute inset-0 rounded-2xl bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out flex flex-col justify-center items-center p-4 text-center">
                {/* Titre qui apparaît en premier */}
                <h3
                  id={`project-title-${project.slug}`}
                  className="text-white text-xl md:text-3xl font-bold opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300 ease-out delay-100"
                >
                  {project.title}
                </h3>
                {/* Sous-titre qui commence juste après */}
                {project.subtitle && (
                  <p className="text-white/90 text-sm md:text-xl mt-2 md:mt-4 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300 ease-out delay-150">
                    {project.subtitle}
                  </p>
                )}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </article>
  );
}
