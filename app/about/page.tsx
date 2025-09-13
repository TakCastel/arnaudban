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
    <PageTransition>
      <div className="bg-background w-[calc(100vw-32px)] md:w-[calc(100vw-128px)] max-w-7xl mx-auto py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Contenu texte à gauche */}
          <div className="space-y-8 md:space-y-10">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 md:mb-12 tracking-tight text-foreground">
              À propos
            </h1>

            <div className="space-y-6 md:space-y-8 text-base md:text-lg leading-relaxed">
              <p className="text-xl md:text-2xl">
                <em className="font-serif">Salut !</em> Je m&apos;appelle <strong className="font-mono">Arnaud Ban</strong> et je suis un <strong>réalisateur
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

            <div className="pt-4">
              <HomeButton />
            </div>
          </div>

           {/* Image à droite avec effet chromatique Anamorphose */}
           <div className="aspect-square w-full max-w-lg mx-auto lg:mx-0 relative rounded-2xl overflow-hidden group">
             <Image
               src="/assets/photo-site.jpg"
               alt="Arnaud Ban - Réalisateur et monteur vidéo à Avignon"
               width={600}
               height={600}
               className="w-full h-full object-cover transition-all duration-300 brightness-110 contrast-105"
               priority
             />
             {/* Overlay chromatique bleu - style Anamorphose */}
             <div 
               className="absolute inset-0 pointer-events-none"
               style={{
                 background: 'rgba(30, 58, 138, 0.6)', // Couleur bleue du site
                 mixBlendMode: 'multiply'
               }}
             ></div>
           </div>
        </div>
      </div>
    </PageTransition>
  );
}
