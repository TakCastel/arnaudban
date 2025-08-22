"use client";

import Link from "next/link";
import { Project } from "@/data/projects";
import Image from "next/image";

interface ProjectCardProps {
  project: Project;
  imageHeight: string;
}

export default function ProjectCard({ project, imageHeight }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="block rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-background group"
    >
      <div className="w-full">
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
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center p-4 text-center">
            {/* Titre qui apparaît en premier */}
            <h3 className="text-white text-3xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
              {project.title}
            </h3>
            {/* Sous-titre qui commence juste après */}
            {project.subtitle && (
              <p className="text-white/90 text-xl mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                {project.subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
