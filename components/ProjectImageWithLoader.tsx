"use client";

import Image from "next/image";
import ProjectImageLoader from "./ProjectImageLoader";

interface ProjectImageWithLoaderProps {
  src: string;
  alt: string;
  title: string;
}

export default function ProjectImageWithLoader({ src, alt, title }: ProjectImageWithLoaderProps) {
  return (
    <div className="relative">
      {/* Loader qui s'affiche pendant le chargement */}
      <div className="absolute inset-0 z-10">
        <ProjectImageLoader />
      </div>
      
      {/* Image avec gestion du chargement */}
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={800}
        className="w-full h-auto object-contain relative z-20"
        sizes="(max-width: 768px) 375px, (max-width: 1024px) 768px, 1920px"
        priority={true}
        quality={90}
        onLoad={(e) => {
          // Masquer le loader une fois l'image chargée
          const target = e.target as HTMLImageElement;
          const loader = target.previousElementSibling as HTMLElement;
          if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
              loader.style.display = 'none';
            }, 300);
          }
        }}
      />
    </div>
  );
}
