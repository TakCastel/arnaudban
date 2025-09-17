import { Metadata } from "next";
import PageTransition from "@/components/PageTransition";
import HomeButton from "@/components/HomeButton";
import Image from "next/image";

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
    <>
      <PageTransition>
        <div className="bg-background w-[calc(100vw-32px)] md:w-[calc(100vw-128px)] max-w-7xl mx-auto min-h-[calc(100vh-160px)] lg:min-h-[calc(100vh-184px)] flex flex-col lg:grid lg:grid-cols-2 lg:items-center">
          {/* Contenu texte - Colonne 1 */}
          <div className="w-full space-y-8 md:space-y-10 flex-1 flex flex-col justify-center lg:justify-start">
            <h1 className="sr-only">À propos</h1>
            <div className="text-2xl md:text-4xl font-semibold font-serif italic mb-8 md:mb-12 tracking-tight text-foreground">
              Bonjour !
            </div>

            <div className="space-y-6 md:space-y-8 text-base md:text-lg leading-relaxed">
              <p className="text-xl md:text-2xl">
                Je m&apos;appelle <strong className="font-mono">Arnaud Ban</strong> et je suis un <strong>réalisateur
                indépendant</strong> qui travaille sur <strong>Avignon</strong>.
              </p>

              <p className="text-xl md:text-2xl">
                Mes spécialités sont le <strong>montage</strong> et l&apos;<strong>étalonnage</strong>.
              </p>

              <p className="text-xl md:text-2xl">
                Pour toute demande <strong>professionnelle</strong>, <em className="font-serif">merci de me contacter</em> par
                mail :{" "}
                <a
                  href="mailto:ban.arnaud@outlook.fr"
                  className="font-mono font-bold hover:text-foreground/80 transition-colors duration-300 text-foreground underline decoration-2 underline-offset-4 hover:decoration-4"
                  aria-label="Envoyer un email à ban.arnaud@outlook.fr"
                >
                  ban.arnaud@outlook.fr
                </a>
              </p>
            </div>

            <div className="pt-4 flex justify-start">
              <HomeButton />
            </div>
          </div>

          {/* Colonne vide - Colonne 2 */}
          <div className="hidden lg:block"></div>
        </div>
      </PageTransition>

      {/* Image */}
      <div className="lg:fixed lg:right-0 lg:bottom-[112px] lg:w-auto lg:max-w-[60vw] lg:z-10">
        <Image
          src="/assets/photo-site.jpg"
          alt="Arnaud Ban - Réalisateur et monteur vidéo à Avignon"
          className="w-full h-auto max-w-full transition-all duration-300 scale-x-[-1] object-cover"
          style={{ 
            borderRadius: '1rem',
            maxWidth: '100%',
            height: 'auto',
            minHeight: '0'
          }}
          width={600}
          height={750}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 60vw, 60vw"
          priority
        />
      </div>
    </>
  );
}
