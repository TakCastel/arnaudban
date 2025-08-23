"use client";

import Link from "next/link";
import Image from "next/image";
import { Project } from "@/data/projects";
import { useState, useEffect, useRef } from "react";

interface ProjectCardProps {
  project: Project;
  imageHeight: string;
}

export default function ProjectCard({ project, imageHeight }: ProjectCardProps) {
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
      className={`transition-all duration-700 ease-out ${
        isVisible 
          ? 'scale-100 opacity-100' 
          : 'scale-90 opacity-0'
      }`}
      role="article"
      aria-labelledby={`project-title-${project.slug}`}
    >
      <div className="bg-background">
        {/* Lien sur l'image avec effet de zoom et arrondi */}
        <Link
          href={`/projects/${project.slug}`}
          className="block overflow-hidden rounded-2xl group"
          aria-label={`Voir le projet ${project.title} - ${project.subtitle}`}
        >
          {/* Container avec dimensions fixes et stables */}
          <div className={`w-full ${imageHeight} bg-gray-300 overflow-hidden relative`}>
            {/* Image avec dimensions fixes */}
            <img
              src={project.cover}
              alt={`Image de couverture du projet ${project.title}`}
              width={600}
              height={450}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            
            {/* Overlay avec texte qui apparaît au hover */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out flex flex-col justify-center items-center p-4 text-center">
              {/* Titre qui apparaît en premier */}
              <h3 
                id={`project-title-${project.slug}`}
                className="text-white text-3xl font-bold opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 ease-out delay-200"
              >
                {project.title}
              </h3>
              {/* Sous-titre qui commence juste après */}
              {project.subtitle && (
                <p className="text-white/90 text-xl mt-4 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 ease-out delay-300">
                  {project.subtitle}
                </p>
              )}
            </div>
          </div>
        </Link>
        
        {/* Texte du projet et "Voir plus" en dessous de l'image */}
        <div className="mt-3">
          <p className="text-text text-2xl leading-relaxed mb-2">
            {project.description.split(' ').length > 15 
              ? `${project.description.split(' ').slice(0, 15).join(' ')}...` 
              : project.description
            }
          </p>
          <Link
            href={`/projects/${project.slug}`}
            className="text-text text-sm font-medium hover:underline cursor-pointer"
          >
            Voir plus
          </Link>
        </div>
      </div>
    </article>
  );
}
