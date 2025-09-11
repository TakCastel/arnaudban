"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface ProjectImageWithSkeletonProps {
  src: string;
  alt: string;
  title: string;
}

export default function ProjectImageWithSkeleton({ src, alt, title }: ProjectImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Réinitialiser l'état de chargement quand la source change
  useEffect(() => {
    setIsLoaded(false);
  }, [src]);

  return (
    <section className="w-[calc(100vw-32px)] md:w-[70vw] max-w-4xl mx-auto rounded-2xl overflow-hidden mb-8">
      <div className="relative">
        {/* Skeleton intégré avec les mêmes dimensions que l'image */}
        {!isLoaded && (
          <div className="w-full aspect-[3/2] bg-gray-200 animate-pulse rounded-2xl">
            <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-2xl">
              {/* Effet de shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse rounded-2xl"></div>
            </div>
          </div>
        )}
        
        {/* Image avec gestion du chargement */}
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={800}
          className={`w-full aspect-[3/2] object-cover rounded-2xl transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'
          }`}
          sizes="(max-width: 768px) 100vw, 70vw"
          quality={90}
          priority
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            // En cas d'erreur de chargement, masquer le skeleton
            setIsLoaded(true);
          }}
        />
      </div>
    </section>
  );
}
