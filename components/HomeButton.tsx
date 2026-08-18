"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface HomeButtonProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  centered?: boolean;
}

export default function HomeButton({ 
  className = "", 
  size = "md", 
  centered = true 
}: HomeButtonProps) {
  const router = useRouter();
  
  const sizeClasses = {
    sm: "px-4 py-2 text-base",
    md: "px-6 py-3 text-lg", 
    lg: "px-8 py-4 text-xl"
  };

  const containerClasses = centered ? "text-center" : "";

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Si on est déjà sur la page d'accueil, juste scroller en haut
    if (window.location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    // Sinon, naviguer vers l'accueil (qui remet automatiquement en haut)
    router.push('/');
    
    // Forcer le scroll en haut après navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className={`${containerClasses} ${className}`}>
      <button
        onClick={handleClick}
        className={`inline-block ${sizeClasses[size]} font-semibold text-foreground bg-background border border-foreground hover:bg-foreground hover:text-background hover:scale-105 hover:shadow-lg transition-all duration-300`}
        aria-label="Retour à l'accueil"
      >
        Retour à l&apos;accueil
      </button>
    </div>
  );
}
