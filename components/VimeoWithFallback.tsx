"use client";

import { useState, useEffect } from "react";
import ProjectImageWithSkeleton from "./ProjectImageWithSkeleton";

interface VimeoWithFallbackProps {
  videoUrl: string;
  fallbackImage: string;
  title: string;
  alt: string;
}

export default function VimeoWithFallback({ 
  videoUrl, 
  fallbackImage, 
  title, 
  alt 
}: VimeoWithFallbackProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reset état quand l'URL change
    setHasError(false);
    setIsLoading(true);
    
    // Timeout pour détecter si l'iframe ne se charge pas
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 10000); // 10 secondes

    return () => clearTimeout(timeout);
  }, [videoUrl]);

  // Fonction pour détecter les erreurs de chargement de l'iframe
  const handleIframeLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleIframeError = () => {
    console.warn(`Erreur de chargement Vimeo pour: ${videoUrl}`);
    setHasError(true);
    setIsLoading(false);
  };

  // Si erreur détectée, afficher l'image de fallback
  if (hasError) {
    return (
      <ProjectImageWithSkeleton
        src={fallbackImage}
        alt={alt}
        title={title}
      />
    );
  }

  return (
    <section className="w-[calc(100vw-32px)] md:w-[70vw] max-w-4xl mx-auto rounded-2xl overflow-hidden mb-8">
      <div className="relative pt-[56.25%]">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-2xl flex items-center justify-center">
            <div className="text-gray-500">
              <p className="text-lg">Chargement de la vidéo...</p>
            </div>
          </div>
        )}
        
        <iframe
          src={`${videoUrl}?title=0&byline=0&portrait=0`}
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
          title={`${title} - vidéo`}
          className={`absolute inset-0 w-full h-full rounded-2xl transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          // Tentative de détection d'erreur via postMessage
          ref={(iframe) => {
            if (iframe) {
              // Écouter les messages de l'iframe pour détecter les erreurs
              const handleMessage = (event: MessageEvent) => {
                if (event.origin === 'https://player.vimeo.com') {
                  if (event.data && typeof event.data === 'string') {
                    try {
                      const data = JSON.parse(event.data);
                      if (data.event === 'error' || data.method === 'error') {
                        console.warn('Erreur détectée via postMessage Vimeo:', data);
                        setHasError(true);
                        setIsLoading(false);
                      }
                    } catch (e) {
                      // Ignorer les erreurs de parsing JSON
                    }
                  }
                }
              };

              window.addEventListener('message', handleMessage);
              
              // Nettoyer l'event listener
              return () => {
                window.removeEventListener('message', handleMessage);
              };
            }
          }}
        />
      </div>
    </section>
  );
}
