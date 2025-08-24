"use client";

import { useEffect, useRef, useState } from "react";
import ProjectCard from "./ProjectCard";
import { Project } from "@/data/projects";
import Masonry from "masonry-layout";

export default function MosaicGrid({ projects }: { projects: Project[] }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const masonryRef = useRef<Masonry | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Fonction pour recalculer Masonry
  const recalculateMasonry = () => {
    if (gridRef.current && masonryRef.current) {
      try {
        const containerWidth = gridRef.current.offsetWidth;
        const gutter = 24;
        const columns = 3;
        
        // Calculer la largeur exacte pour 3 colonnes
        const columnWidth = Math.floor((containerWidth - (gutter * (columns - 1))) / columns);
        


        // Mettre à jour la configuration de Masonry
        const masonry = masonryRef.current;
        if (masonry) {
          masonry.option('columnWidth', columnWidth);
          masonry.layout();
        }
      } catch (error) {
        console.error('Erreur lors du recalcul Masonry:', error);
      }
    }
  };

  useEffect(() => {
    if (gridRef.current) {
      // Attendre un peu que le DOM soit prêt
      const timer = setTimeout(() => {
        if (gridRef.current) {
          try {
            // Forcer 3 colonnes avec une largeur fixe
            const containerWidth = gridRef.current.offsetWidth;
            const gutter = 24;
            const columns = 3;
            
            // Calculer la largeur exacte pour 3 colonnes
            const columnWidth = Math.floor((containerWidth - (gutter * (columns - 1))) / columns);
            


            // Initialiser Masonry avec 3 colonnes fixes
            const masonry = new Masonry(gridRef.current, {
              itemSelector: '.grid-item',
              columnWidth: columnWidth,
              percentPosition: false,
              gutter: gutter,
              transitionDuration: '0.3s'
            });
            
            masonryRef.current = masonry;

            // Mettre à jour le layout après le chargement des images
            const images = gridRef.current.querySelectorAll('img');
            
            if (images.length === 0) {
              // Pas d'images, marquer comme chargé et faire le layout
              setIsLoaded(true);
              if (masonry) {
                masonry.layout();
              }
            } else {
              // Attendre que toutes les images soient chargées
              let loadedImages = 0;
              
              const onImageLoad = () => {
                loadedImages++;
                if (loadedImages === images.length) {
                  setIsLoaded(true);
                  if (masonryRef.current) {
                    masonryRef.current.layout();
                  }
                }
              };

              images.forEach(img => {
                if (img.complete) {
                  onImageLoad();
                } else {
                  img.addEventListener('load', onImageLoad);
                }
              });

              // Layout initial même si les images ne sont pas encore chargées
              if (masonry) {
                masonry.layout();
              }
            }
          } catch (error) {
            console.error('Erreur Masonry, utilisation du fallback CSS:', error);
            setIsLoaded(true);
          }
        }
      }, 100);

      return () => clearTimeout(timer);
    }

    // Cleanup
    return () => {
      if (masonryRef.current) {
        masonryRef.current.destroy();
        masonryRef.current = null;
      }
    };
  }, [projects]);

  // Gestion du redimensionnement de la fenêtre
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;
    
    const handleResize = () => {
      // Debounce pour éviter trop de recalculs
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        recalculateMasonry();
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Tailles variées pour l'effet Masonry
  const heights = [
    "h-48", "h-56", "h-64", "h-72", "h-80", "h-96", 
    "h-52", "h-60", "h-68", "h-76", "h-84", "h-88",
    "h-44", "h-50", "h-58", "h-66", "h-74", "h-82", "h-90"
  ];

  const getRandomHeight = (index: number) => {
    const randomIndex = (index * 7 + 13) % heights.length;
    return heights[randomIndex];
  };

  return (
    <div 
      ref={gridRef}
      className="w-full transition-opacity duration-300"
      role="grid"
      aria-label="Grille des projets d'Arnaud Ban"
      aria-describedby="work-title"
    >
      {projects.map((project, index) => {
        const randomHeight = getRandomHeight(index);
        return (
          <div 
            key={project.slug} 
            className="grid-item"
            role="gridcell"
          >
            <ProjectCard project={project} imageHeight={randomHeight} />
          </div>
        );
      })}
    </div>
  );
}
