"use client";

export default function HeroLoader({ hasError = false }: { hasError?: boolean }) {
  if (hasError) {
    return (
      <div
        className="w-full h-full flex items-center justify-center"
        role="alert"
      >
        <div className="text-center px-4">
          <p className="text-hero-block-text text-base md:text-lg font-medium">
            La vidéo n&apos;a pas pu être chargée.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center">
        {/* Rond qui tourne avec CSS keyframes */}
        <div
          className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 border-4 border-hero-block-text/20 border-t-hero-block-text rounded-full animate-spin"
        />

        {/* Texte de chargement */}
        <p className="text-hero-block-text text-base md:text-lg font-medium animate-pulse">
          Chargement...
        </p>
      </div>
    </div>
  );
}
