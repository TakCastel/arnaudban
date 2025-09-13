import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full footer-bg py-12 relative z-30 rounded-t-2xl" role="contentinfo">
      <div className="w-[calc(100vw-32px)] md:w-[calc(100vw-128px)] mx-auto">
        <div className="text-center">
          {/* Version mobile : éléments empilés */}
          <div className="block md:hidden space-y-2">
            <div className="text-xs footer-text">
              Arnaud Ban • Réalisateur & Monteur Vidéo
            </div>
            <div className="text-xs footer-text-secondary">
              Avignon, France
            </div>
            <div className="flex justify-center items-center space-x-4 text-xs footer-text-secondary">
              <Link
                href="/mentions-legales"
                className="footer-hover transition-colors duration-300"
                aria-label="Lire les mentions légales"
              >
                Mentions légales
              </Link>
              <span className="footer-text-muted">•</span>
              <a
                href="mailto:ban.arnaud@outlook.fr"
                className="footer-hover transition-colors duration-300"
                aria-label="Envoyer un email à Arnaud Ban"
              >
                Contact
              </a>
            </div>
            <div className="text-xs footer-text-dimmed">
              © {new Date().getFullYear()} Arnaud Ban. Tous droits réservés.
            </div>
          </div>

          {/* Version desktop : tout sur une ligne */}
          <div className="hidden md:flex justify-center items-center space-x-6 text-xs footer-text">
            <span>Arnaud Ban • Réalisateur & Monteur Vidéo</span>
            <span className="footer-text-muted">•</span>
            <span className="text-xs footer-text-secondary">Avignon, France</span>
            <span className="footer-text-muted">•</span>
            <Link
              href="/mentions-legales"
              className="text-xs footer-text-secondary footer-hover transition-colors duration-300"
              aria-label="Lire les mentions légales"
            >
              Mentions légales
            </Link>
            <span className="footer-text-muted">•</span>
            <a
              href="mailto:ban.arnaud@outlook.fr"
              className="text-xs footer-text-secondary footer-hover transition-colors duration-300"
              aria-label="Envoyer un email à Arnaud Ban"
            >
              Contact
            </a>
            <span className="footer-text-muted">•</span>
            <span className="text-xs footer-text-dimmed">
              © {new Date().getFullYear()} Arnaud Ban
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}