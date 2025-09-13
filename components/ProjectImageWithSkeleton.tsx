"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

interface ProjectImageWithSkeletonProps {
  src: string;
  alt: string;
  title: string;
}

export default function ProjectImageWithSkeleton({ src, alt, title }: ProjectImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Réinitialiser l'état de chargement quand la source change
  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
    
    // Vérifier si l'image est déjà en cache (problème connu avec Next.js)
    const img = new window.Image();
    img.onload = () => {
      // Si l'image est déjà en cache, elle se charge immédiatement
      setIsLoaded(true);
      setHasError(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
    img.onerror = () => {
      setHasError(true);
      setIsLoaded(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
    img.src = src;
    
    // Timeout de sécurité pour forcer l'affichage de l'image après 10 secondes
    timeoutRef.current = setTimeout(() => {
      if (!isLoaded && !hasError) {
        console.warn(`Image ${src} n'a pas pu se charger dans les temps, forçage de l'affichage`);
        setIsLoaded(true);
      }
    }, 10000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [src]);

  return (
    <section className="w-[calc(100vw-32px)] md:w-[70vw] max-w-4xl mx-auto rounded-2xl overflow-hidden mb-8">
      <div className="relative">
        {/* Skeleton intégré avec les mêmes dimensions que l'image */}
        {!isLoaded && !hasError && (
          <div className="w-full aspect-[3/2] bg-gray-200 animate-pulse rounded-2xl">
            <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-2xl">
              {/* Effet de shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse rounded-2xl"></div>
            </div>
          </div>
        )}
        
        {/* Message d'erreur si l'image ne peut pas être chargée */}
        {hasError && (
          <div className="w-full aspect-[3/2] bg-gray-200 rounded-2xl flex items-center justify-center">
            <div className="text-center text-gray-500">
              <p className="text-lg font-medium">Impossible de charger l'image</p>
              <p className="text-sm mt-2">{alt}</p>
            </div>
          </div>
        )}
        
        {/* Image avec gestion du chargement */}
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={800}
          className={`w-full aspect-[3/2] object-cover rounded-2xl transition-opacity duration-300 ${
            isLoaded && !hasError ? 'opacity-100' : 'opacity-0 absolute inset-0'
          }`}
          sizes="(max-width: 768px) 100vw, 70vw"
          quality={90}
          priority
          onLoad={() => {
            setIsLoaded(true);
            setHasError(false);
            // Nettoyer le timeout si l'image se charge correctement
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
            }
          }}
          onError={(e) => {
            console.error(`Erreur de chargement de l'image ${src}:`, e);
            setHasError(true);
            setIsLoaded(false);
            // Nettoyer le timeout en cas d'erreur
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
            }
          }}
        />
      </div>
    </section>
  );
}
