"use client";

export default function HeroLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-background/30 backdrop-blur-sm rounded-2xl">
      <div className="text-center">
        {/* Rond qui tourne avec CSS keyframes */}
        <div 
          className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 border-4 border-gray-200 dark:border-gray-600 border-t-blue-500 dark:border-t-blue-400 rounded-full animate-spin"
        />
        
        {/* Texte de chargement */}
        <p className="text-foreground text-sm md:text-base font-medium animate-pulse">
          Chargement...
        </p>
      </div>
    </div>
  );
}
