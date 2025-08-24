import Link from "next/link";
import { Metadata } from "next";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "À propos - Arnaud Ban",
  description: "Découvrez Arnaud Ban, réalisateur indépendant spécialisé en montage et étalonnage vidéo à Avignon. Contactez-le pour vos projets audiovisuels.",
  openGraph: {
    title: "À propos - Arnaud Ban | Réalisateur & Monteur Vidéo",
    description: "Découvrez Arnaud Ban, réalisateur indépendant spécialisé en montage et étalonnage vidéo à Avignon.",
    url: "https://arnaudban.com/about",
    images: [
      {
        url: "/assets/DOUG.png",
        width: 1200,
        height: 630,
        alt: "Arnaud Ban - À propos",
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <PageTransition>
      <main className="h-[calc(100vh-8.625rem)] bg-background pt-16 w-[calc(100vw-32px)] md:w-[calc(100vw-128px)] mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Contenu texte à gauche */}
          <div className="space-y-8 md:space-y-10">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 md:mb-12 tracking-tight text-foreground">
              À propos
            </h1>

            <div className="space-y-6 md:space-y-8 text-xl md:text-2xl leading-relaxed">
              <p className="text-3xl md:text-4xl">
                Salut ! Je m&apos;appelle Arnaud Ban et je suis un réalisateur indépendant qui travaille sur Avignon.
              </p>

              <p className="text-3xl md:text-4xl">
                Mes spécialités sont le montage et l&apos;étalonnage.
              </p>

              <p className="text-3xl md:text-4xl">
                Pour toute demande professionnelle, merci de me contacter par mail :{' '}
                <a
                  href="mailto:ban.arnaud@outlook.fr"
                  className="font-medium hover:underline transition-colors duration-300 text-foreground"
                  aria-label="Envoyer un email à ban.arnaud@outlook.fr"
                >
                  ban.arnaud@outlook.fr
                </a>
              </p>
            </div>

            <div className="pt-4">
              <Link
                href="/"
                className="inline-block px-6 py-3 text-base font-semibold text-background bg-text rounded-full hover:bg-text/90 transition-all duration-300"
                aria-label="Retour à la page d'accueil"
              >
                Retour à l&apos;accueil
              </Link>
            </div>
          </div>

          {/* Image à droite */}
          <div className="aspect-square w-full max-w-lg mx-auto lg:mx-0 bg-gray-300 rounded-2xl"></div>
        </div>
      </main>
    </PageTransition>
  );
}
