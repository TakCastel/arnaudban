"use client";

export default function HeroLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-background/30 backdrop-blur-sm rounded-2xl">
      <div className="text-center">
        {/* Rond qui tourne avec CSS keyframes */}
        <div 
          className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 border-4 border-text/20 border-t-text rounded-full animate-spin"
        />
        
        {/* Texte de chargement */}
        <p className="text-text/70 text-sm md:text-base font-medium animate-pulse">
          Chargement...
        </p>
      </div>
    </div>
  );
}
