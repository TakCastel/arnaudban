"use client";

import Image from "next/image";
import ProjectImageLoader from "./ProjectImageLoader";
import { useState, useEffect, useRef } from "react";

interface ProjectImageWithLoaderProps {
  src: string;
  alt: string;
  title: string;
}

export default function ProjectImageWithLoader({ src, alt, title }: ProjectImageWithLoaderProps) {
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
    
    // Timeout de sécurité pour forcer l'affichage de l'image après 8 secondes
    timeoutRef.current = setTimeout(() => {
      if (!isLoaded && !hasError) {
        console.warn(`Image ${src} n'a pas pu se charger dans les temps, forçage de l'affichage`);
        setIsLoaded(true);
      }
    }, 8000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [src]);

  return (
    <div className="relative">
      {/* Loader qui s'affiche pendant le chargement */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 z-10">
          <ProjectImageLoader />
        </div>
      )}
      
      {/* Message d'erreur si l'image ne peut pas être chargée */}
      {hasError && (
        <div className="absolute inset-0 z-10 bg-gray-100/50 dark:bg-gray-800/50 rounded-2xl flex items-center justify-center">
          <div className="text-center text-gray-500">
            <p className="text-sm font-medium">Erreur de chargement</p>
          </div>
        </div>
      )}
      
      {/* Image avec gestion du chargement */}
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={800}
        className={`w-full h-auto object-contain relative z-20 transition-opacity duration-300 ${
          isLoaded && !hasError ? 'opacity-100' : 'opacity-0'
        }`}
        sizes="(max-width: 768px) 375px, (max-width: 1024px) 768px, 1920px"
        priority={true}
        quality={90}
        onLoad={() => {
          setIsLoaded(true);
          setHasError(false);
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
        }}
        onError={(e) => {
          console.error(`Erreur de chargement de l'image ${src}:`, e);
          setHasError(true);
          setIsLoaded(false);
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
        }}
      />
    </div>
  );
}
