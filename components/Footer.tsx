import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-background mt-0 py-8 md:py-16 relative z-30" role="contentinfo">
      <div className="w-[calc(100vw-32px)] md:w-[calc(100vw-128px)] mx-auto">
        <div className="bg-text text-background rounded-2xl overflow-hidden px-4 md:px-8 py-8 md:py-16">
          {/* Container pour le texte avec la même largeur que les pages de projets */}
          <div className="w-[calc(100vw-32px)] md:w-[70vw] max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 md:mb-16 tracking-tight">À PROPOS</h2>

            <div className="space-y-6 md:space-y-8 text-lg md:text-xl leading-relaxed">
              <p className="text-xl md:text-2xl">
                Salut ! Je m&apos;appelle <span className="font-bold">Arnaud Ban</span> et je suis un réalisateur indépendant qui travaille sur Avignon.
              </p>

              <p className="text-lg md:text-xl">
                Mes spécialités sont le <span className="font-semibold">montage</span> et l&apos;<span className="font-semibold">étalonnage</span>.
              </p>

              <p className="text-base md:text-lg">
                Pour toute demande professionnelle, merci de me contacter par mail :{' '}
                <a
                  href="mailto:ban.arnaud@outlook.fr"
                  className="font-medium hover:underline transition-colors duration-300"
                  aria-label="Envoyer un email à ban.arnaud@outlook.fr"
                >
                  ban.arnaud@outlook.fr
                </a>
              </p>
            </div>

            {/* Mentions légales */}
            <div className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-background/20">
              <p className="text-xs md:text-sm text-background/70 text-center">
                <Link
                  href="/mentions-legales"
                  className="hover:underline transition-colors duration-300"
                  aria-label="Lire les mentions légales"
                >
                  Mentions légales
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
