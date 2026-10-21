"use client";

import { useState, useEffect } from "react";
import ProjectImageWithSkeleton from "./ProjectImageWithSkeleton";

interface VimeoWithFallbackProps {
  videoUrl: string;
  fallbackImage: string;
  title: string;
  alt: string;
}

/**
 * Lecteur Vimeo de la page projet. Le cadre reste en 16:9 (on ne recadre
 * jamais un lecteur : ce serait couper l'image du film) ; c'est la page qui
 * l'entoure de noir pour l'effet salle. En cas d'échec, on retombe sur la
 * couverture, cadrée en 2.39:1.
 */
export default function VimeoWithFallback({
  videoUrl,
  fallbackImage,
  title,
  alt,
}: VimeoWithFallbackProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setHasError(false);
    setIsLoading(true);

    // Sans signal de l'iframe au bout de 10 s, on l'affiche quand même :
    // mieux vaut le lecteur natif de Vimeo qu'un "chargement" éternel.
    const timeout = setTimeout(() => setIsLoading(false), 10000);

    // Le lecteur Vimeo signale ses erreurs par postMessage (l'événement
    // `error` de l'iframe, lui, ne se déclenche pas pour un contenu tiers).
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "https://player.vimeo.com") return;
      if (typeof event.data !== "string") return;
      try {
        const data = JSON.parse(event.data);
        if (data.event === "error" || data.method === "error") {
          console.warn("Erreur détectée via postMessage Vimeo:", data);
          setHasError(true);
          setIsLoading(false);
        }
      } catch {
        // Message non JSON d'un autre script Vimeo : sans intérêt ici.
      }
    };
    window.addEventListener("message", handleMessage);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("message", handleMessage);
    };
  }, [videoUrl]);

  if (hasError) {
    return <ProjectImageWithSkeleton src={fallbackImage} alt={alt} title={title} />;
  }

  return (
    <div className="relative w-full aspect-video bg-black">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/5">
          <p className="font-heading uppercase tracking-[0.25em] text-xs md:text-sm opacity-70 animate-pulse">
            Chargement de la bobine…
          </p>
        </div>
      )}

      <iframe
        src={`${videoUrl}?title=0&byline=0&portrait=0`}
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
        allowFullScreen
        title={`${title} - vidéo`}
        className={`absolute inset-0 w-full h-full ${isLoading ? "opacity-0" : "opacity-100"}`}
        onLoad={() => {
          setIsLoading(false);
          setHasError(false);
        }}
        onError={() => {
          console.warn(`Erreur de chargement Vimeo pour: ${videoUrl}`);
          setHasError(true);
          setIsLoading(false);
        }}
      />
    </div>
  );
}
