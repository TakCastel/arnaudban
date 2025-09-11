import Link from "next/link";
import { Metadata } from "next";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "À propos - Arnaud Ban | Réalisateur & Monteur Vidéo à Avignon",
  description:
    "Arnaud Ban, réalisateur indépendant basé à Avignon, spécialisé en montage et étalonnage vidéo. Découvrez son parcours, ses compétences et contactez-le pour vos projets audiovisuels.",
  keywords: [
    "réalisateur Avignon",
    "monteur vidéo Avignon", 
    "étalonnage Avignon",
    "audiovisuel Avignon",
    "Arnaud Ban",
    "réalisateur indépendant",
    "montage vidéo professionnel"
  ],
  authors: [{ name: "Arnaud Ban" }],
  creator: "Arnaud Ban",
  openGraph: {
    title: "À propos - Arnaud Ban | Réalisateur & Monteur Vidéo à Avignon",
    description:
      "Arnaud Ban, réalisateur indépendant basé à Avignon, spécialisé en montage et étalonnage vidéo. Découvrez son parcours et ses compétences.",
    url: "https://arnaudban.com/about",
    type: "profile",
    images: [
      {
        url: "/assets/DOUG.png",
        width: 1200,
        height: 630,
        alt: "Arnaud Ban - Réalisateur et monteur vidéo à Avignon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "À propos - Arnaud Ban | Réalisateur & Monteur Vidéo à Avignon",
    description: "Arnaud Ban, réalisateur indépendant basé à Avignon, spécialisé en montage et étalonnage vidéo.",
    images: ["/assets/DOUG.png"],
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="bg-background w-[calc(100vw-32px)] md:w-[calc(100vw-128px)] max-w-7xl mx-auto py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Contenu texte à gauche */}
          <div className="space-y-8 md:space-y-10">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 md:mb-12 tracking-tight text-foreground">
              À propos
            </h1>

            <div className="space-y-6 md:space-y-8 text-xl md:text-2xl leading-relaxed">
              <p className="text-3xl md:text-4xl">
                Salut ! Je m&apos;appelle Arnaud Ban et je suis un réalisateur
                indépendant qui travaille sur Avignon.
              </p>

              <p className="text-3xl md:text-4xl">
                Mes spécialités sont le montage et l&apos;étalonnage.
              </p>

              <p className="text-3xl md:text-4xl">
                Pour toute demande professionnelle, merci de me contacter par
                mail :{" "}
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
                className="inline-block px-6 py-3 text-base font-semibold text-foreground bg-background rounded-full hover:bg-background/90 dark:text-background dark:bg-foreground dark:hover:bg-foreground/90 transition-all duration-300"
                aria-label="Retour à l'accueil"
              >
                Retour à l&apos;accueil
              </Link>
            </div>
          </div>

          {/* Image à droite */}
          <div className="aspect-square w-full max-w-lg mx-auto lg:mx-0 bg-gray-300 rounded-2xl"></div>
        </div>
      </div>
    </PageTransition>
  );
}
