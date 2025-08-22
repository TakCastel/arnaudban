"use client";

import Link from "next/link";
import { Project } from "@/data/projects";
import Image from "next/image";
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
    <div 
      ref={cardRef}
      className={`transition-all duration-700 ease-out ${
        isVisible 
          ? 'scale-100 opacity-100' 
          : 'scale-90 opacity-0'
      }`}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="block rounded-2xl overflow-hidden border border-gray-200 shadow-none hover:shadow-xl transition-all duration-500 ease-out hover:scale-[1.02] bg-background group"
      >
        {/* Container avec dimensions fixes et stables */}
        <div className={`w-full ${imageHeight} bg-gray-300 overflow-hidden relative`}>
          {/* Image avec dimensions fixes */}
          <Image
            src={project.cover}
            alt={project.title}
            width={400}
            height={300}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          
          {/* Overlay avec texte qui apparaît au hover */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out flex flex-col justify-center items-center p-4 text-center">
            {/* Titre qui apparaît en premier */}
            <h3 className="text-white text-3xl font-bold opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 ease-out delay-200">
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
      
      {/* Texte du projet en dehors de la carte */}
      <div className="mt-3">
        <p className="text-blue-600 text-xl leading-relaxed mb-2">
          {project.description.split(' ').length > 15 
            ? `${project.description.split(' ').slice(0, 15).join(' ')}...` 
            : project.description
          }
        </p>
        <span className="text-blue-600 text-xs font-medium hover:underline cursor-pointer">
          Voir plus
        </span>
      </div>
    </div>
  );
}
