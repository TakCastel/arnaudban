import { Metadata } from "next";
import PageTransition from "@/components/PageTransition";
import HomeButton from "@/components/HomeButton";
import PageContainer from "@/components/PageContainer";
import ProjectGrid from "@/components/ProjectGrid";
import { getProjects } from "@/lib/getProjects";
import SplitText from "@/components/SplitText";
import StaggerItem from "@/components/StaggerItem";

export const metadata: Metadata = {
  title: "Projets - Portfolio vidéo | Arnaud Ban, Avignon",
  description:
    "Le portfolio complet d'Arnaud Ban : courts métrages, clips musicaux, vidéos d'entreprise et événementiel réalisés à Avignon et dans le Vaucluse.",
  keywords: [
    "portfolio vidéo Avignon",
    "réalisations monteur vidéo",
    "courts métrages Avignon",
    "clip musical Avignon",
    "Arnaud Ban",
  ],
  authors: [{ name: "Arnaud Ban" }],
  creator: "Arnaud Ban",
  openGraph: {
    title: "Projets - Portfolio vidéo | Arnaud Ban, Avignon",
    description:
      "Le portfolio complet d'Arnaud Ban : courts métrages, clips musicaux, vidéos d'entreprise et événementiel réalisés à Avignon et dans le Vaucluse.",
    url: "https://arnaudban.fr/projets",
    type: "website",
    images: [
      {
        url: "/assets/DOUG.webp",
        width: 1200,
        height: 630,
        alt: "Arnaud Ban - Réalisateur et monteur vidéo à Avignon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projets - Portfolio vidéo | Arnaud Ban, Avignon",
    description: "Le portfolio complet d'Arnaud Ban, réalisateur et monteur vidéo à Avignon.",
    images: ["/assets/DOUG.webp"],
  },
  alternates: {
    canonical: "/projets",
  },
};

export default function ProjetsPage() {
  const items = getProjects();
  return (
    <PageTransition>
      {/* Même fond que Services/À propos (--background/--foreground du thème
          courant) et même structure de page : header (h1 + intro) dans
          PageContainer, contenu, puis retour à l'accueil. */}
      <PageContainer className="pt-8 md:pt-16">
        <header className="max-w-3xl mb-14 md:mb-20">
          <SplitText as="h1" id="work-title" className="text-5xl md:text-7xl text-foreground mb-5 tracking-tight">
            Projets
          </SplitText>
          <StaggerItem index={0}>
            <p className="text-2xl md:text-3xl leading-relaxed text-foreground/90">
              {items.length} projets : courts métrages, clips musicaux, vidéos
              d&apos;entreprise, captations d&apos;événements et projets
              associatifs, réalisés à Avignon et dans le Vaucluse.
            </p>
          </StaggerItem>
        </header>
      </PageContainer>

      {/* Grille dans le container (comme le reste du contenu), tailles de
          cases variées — voir ProjectGrid. */}
      <PageContainer className="pb-8 md:pb-16">
        <StaggerItem index={1}>
          <ProjectGrid projects={items} />
        </StaggerItem>

        <StaggerItem index={2} className="pt-10">
          <HomeButton centered={false} />
        </StaggerItem>
      </PageContainer>
    </PageTransition>
  );
}
