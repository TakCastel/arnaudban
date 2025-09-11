import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-background py-6 relative z-30" role="contentinfo">
      <div className="w-[calc(100vw-32px)] md:w-[calc(100vw-128px)] mx-auto">
        <div className="text-center">
          {/* Version mobile : éléments empilés */}
          <div className="block md:hidden space-y-2">
            <div className="text-sm text-foreground/60">
              Arnaud Ban • Réalisateur & Monteur Vidéo
            </div>
            <div className="text-xs text-foreground/50">
              Avignon, France
            </div>
            <div className="flex justify-center items-center space-x-4 text-xs text-foreground/50">
              <Link
                href="/mentions-legales"
                className="hover:text-foreground/70 hover:underline transition-colors duration-300"
                aria-label="Lire les mentions légales"
              >
                Mentions légales
              </Link>
              <span className="text-foreground/30">•</span>
              <a
                href="mailto:ban.arnaud@outlook.fr"
                className="hover:text-foreground/70 hover:underline transition-colors duration-300"
                aria-label="Envoyer un email à Arnaud Ban"
              >
                Contact
              </a>
            </div>
            <div className="text-xs text-foreground/40">
              © {new Date().getFullYear()} Arnaud Ban. Tous droits réservés.
            </div>
          </div>

          {/* Version desktop : tout sur une ligne */}
          <div className="hidden md:flex justify-center items-center space-x-6 text-sm text-foreground/60">
            <span>Arnaud Ban • Réalisateur & Monteur Vidéo</span>
            <span className="text-foreground/30">•</span>
            <span className="text-xs text-foreground/50">Avignon, France</span>
            <span className="text-foreground/30">•</span>
            <Link
              href="/mentions-legales"
              className="text-xs text-foreground/50 hover:text-foreground/70 hover:underline transition-colors duration-300"
              aria-label="Lire les mentions légales"
            >
              Mentions légales
            </Link>
            <span className="text-foreground/30">•</span>
            <a
              href="mailto:ban.arnaud@outlook.fr"
              className="text-xs text-foreground/50 hover:text-foreground/70 hover:underline transition-colors duration-300"
              aria-label="Envoyer un email à Arnaud Ban"
            >
              Contact
            </a>
            <span className="text-foreground/30">•</span>
            <span className="text-xs text-foreground/40">
              © {new Date().getFullYear()} Arnaud Ban
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}