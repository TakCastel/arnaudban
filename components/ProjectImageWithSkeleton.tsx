"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { withBasePath } from "@/lib/basePath";

interface ProjectImageWithSkeletonProps {
  src: string;
  alt: string;
  title: string;
}

/**
 * Couverture d'un projet sans vidéo (ou dont la vidéo n'a pas chargé),
 * recadrée en 2.39:1 : c'est un photogramme, on le cadre comme au cinéma.
 * Pensée pour être posée sur le fond noir de la "salle" (voir la page projet),
 * d'où le skeleton et le message d'erreur en tons clairs.
 */
export default function ProjectImageWithSkeleton({ src: rawSrc, alt }: ProjectImageWithSkeletonProps) {
  // encodeURI : certains noms de fichiers d'assets contiennent des espaces.
  const src = encodeURI(withBasePath(rawSrc));
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Réinitialiser l'état de chargement quand la source change
  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);

    // Image déjà en cache : onLoad de next/image ne se déclenche pas
    // toujours (problème connu), d'où cette sonde parallèle.
    const img = new window.Image();
    img.onload = () => {
      setIsLoaded(true);
      setHasError(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    img.onerror = () => {
      setHasError(true);
      setIsLoaded(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    img.src = src;

    // Filet de sécurité : on force l'affichage après 10 s plutôt que de
    // laisser un cadre vide indéfiniment.
    timeoutRef.current = setTimeout(() => {
      setIsLoaded(true);
    }, 10000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [src]);

  return (
    <div className="relative w-full aspect-[2.39/1] overflow-hidden bg-white/5">
      {/* Amorce : un aplat qui respire, aux dimensions exactes du cadre. */}
      {!isLoaded && !hasError && (
        <div aria-hidden="true" className="absolute inset-0 bg-white/10 animate-pulse" />
      )}

      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <p className="font-heading uppercase tracking-[0.2em] text-xs md:text-sm">
            Image indisponible
          </p>
          <p className="mt-2 text-sm opacity-70">{alt}</p>
        </div>
      )}

      {!hasError && (
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover ${isLoaded ? "opacity-100" : "opacity-0"}`}
          sizes="100vw"
          quality={90}
          priority
          onLoad={() => {
            setIsLoaded(true);
            setHasError(false);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
          }}
          onError={(e) => {
            console.error(`Erreur de chargement de l'image ${src}:`, e);
            setHasError(true);
            setIsLoaded(false);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
          }}
        />
      )}
    </div>
  );
}
