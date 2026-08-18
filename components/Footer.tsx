import Link from "next/link";
import PageContainer from "./PageContainer";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full footer-bg py-12 md:py-16 relative z-30" role="contentinfo">
      <PageContainer width="full">
        {/* CTA */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-10 md:pb-12">
          <p className="font-heading text-3xl md:text-5xl footer-text tracking-tight max-w-xl">
            Un projet vidéo en tête ? Discutons-en.
          </p>
          <a
            href="mailto:ban.arnaud@outlook.fr"
            className="footer-cta-btn shrink-0 px-6 py-3 text-lg font-semibold"
            aria-label="Envoyer un email à Arnaud Ban"
          >
            Écrire un mail
          </a>
        </div>

      </PageContainer>
      <div className="footer-divider" />
      <PageContainer width="full">
        {/* Colonnes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 py-10 md:py-12 text-base">
          <div className="col-span-2 md:col-span-1">
            <p className="font-bold footer-text mb-2">Arnaud Ban</p>
            <p className="footer-text-secondary leading-relaxed">
              Réalisateur &amp; monteur vidéo indépendant, basé à Avignon,
              Vaucluse.
            </p>
          </div>

          <nav aria-label="Navigation du pied de page">
            <p className="text-xs font-semibold uppercase tracking-wide footer-text-muted mb-3">
              Navigation
            </p>
            <ul className="space-y-2 footer-text-secondary">
              <li>
                <Link href="/projets" className="footer-hover transition-colors duration-300" aria-label="Voir les projets">
                  Projets
                </Link>
              </li>
              <li>
                <Link href="/services" className="footer-hover transition-colors duration-300" aria-label="Voir les services">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="footer-hover transition-colors duration-300" aria-label="À propos d'Arnaud Ban">
                  À propos
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide footer-text-muted mb-3">
              Contact
            </p>
            <ul className="space-y-2 footer-text-secondary">
              <li>
                <a
                  href="mailto:ban.arnaud@outlook.fr"
                  className="footer-hover transition-colors duration-300"
                  aria-label="Envoyer un email à Arnaud Ban"
                >
                  ban.arnaud@outlook.fr
                </a>
              </li>
              <li className="footer-text-muted">Avignon, Vaucluse</li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide footer-text-muted mb-3">
              Informations
            </p>
            <ul className="space-y-2 footer-text-secondary">
              <li>
                <Link
                  href="/mentions-legales"
                  className="footer-hover transition-colors duration-300"
                  aria-label="Lire les mentions légales"
                >
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </PageContainer>
      <div className="footer-divider" />
      <PageContainer width="full">
        {/* Bas de page */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs footer-text-muted">
          <span>© {year} Arnaud Ban. Tous droits réservés.</span>
          <a
            href="https://github.com/TakCastel"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-hover transition-colors duration-300"
          >
            Site conçu par Tarik Talhaoui
          </a>
        </div>
      </PageContainer>

      {/* Signature géante en clôture : ARNAUD à plat, BAN en vertical sur le
          côté (à peu près à la hauteur d'une lettre d'ARNAUD) — même esprit
          que les gros wordmarks de footer type "Diana's Seafood". */}
      <div className="footer-divider" />
      <PageContainer width="full">
        <div className="flex items-center justify-between overflow-hidden py-2">
          <span className="font-heading uppercase footer-text leading-none tracking-tight text-[26vw] whitespace-nowrap -ml-1 md:-ml-2">
            Arnaud
          </span>
          <span className="shrink-0 font-heading uppercase footer-text leading-none tracking-tight [writing-mode:vertical-rl] rotate-180 text-[10.5vw] whitespace-nowrap">
            Ban
          </span>
        </div>
      </PageContainer>
    </footer>
  );
}
