import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { SiLinkedin } from "react-icons/si";
import PageContainer from "./PageContainer";
import { withBasePath } from "@/lib/basePath";

/**
 * Icône blanche dans un carré qui se dessine au survol (4 traits qui
 * scalent depuis 0, même esprit que EdgeToEdgeSection mais déclenché au
 * hover plutôt qu'au scroll). Boîte au plus près de l'icône (pas de marge
 * négative) pour ne jamais déborder du container de la colonne.
 */
function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group relative flex items-center justify-center w-11 h-11 text-white"
    >
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px bg-white origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px bg-white origin-right scale-x-0 transition-transform duration-300 ease-out delay-150 group-hover:scale-x-100"
      />
      <span
        aria-hidden="true"
        className="absolute top-0 bottom-0 left-0 w-px bg-white origin-top scale-y-0 transition-transform duration-300 ease-out delay-75 group-hover:scale-y-100"
      />
      <span
        aria-hidden="true"
        className="absolute top-0 bottom-0 right-0 w-px bg-white origin-bottom scale-y-0 transition-transform duration-300 ease-out delay-75 group-hover:scale-y-100"
      />
      {children}
    </a>
  );
}

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
          <Link
            href="/contact"
            className="footer-cta-btn shrink-0 px-6 py-3 text-lg font-semibold"
            aria-label="Aller à la page contact"
          >
            Écrire un mail
          </Link>
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
            <div className="flex items-center gap-2 mt-3">
              <SocialIcon
                href="https://www.linkedin.com/in/arnaud-ban-6467b7140/"
                label="Profil LinkedIn d'Arnaud Ban (nouvel onglet)"
              >
                <SiLinkedin aria-hidden="true" className="w-6 h-6" />
              </SocialIcon>
              {/* Pas d'icône Malt "juste la fleur" dans aucune librairie
                  (react-icons, Iconify...) : elles reprennent toutes le
                  même wordmark Simple Icons. Favicon officiel en image. */}
              <SocialIcon
                href="https://en.malt.fr/profile/arnaudban"
                label="Profil Malt d'Arnaud Ban (nouvel onglet)"
              >
                <Image
                  src={withBasePath("/assets/malt-icon.png")}
                  alt=""
                  aria-hidden="true"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </SocialIcon>
            </div>
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
              <li>
                <Link href="/contact" className="footer-hover transition-colors duration-300" aria-label="Contacter Arnaud Ban">
                  Contact
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
            Site conçu par @tkcstl
          </a>
        </div>
      </PageContainer>
    </footer>
  );
}
