import HeroSection from "@/components/HeroSection";
import MosaicGrid from "@/components/MosaicGrid";
import SectionTitle from "@/components/SectionTitle";
import StaggeredAnimation from "@/components/StaggeredAnimation";
import { getProjects } from "@/lib/getProjects";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arnaud Ban - Réalisateur & Monteur Vidéo à Avignon | Portfolio",
  description: "Portfolio d'Arnaud Ban, réalisateur indépendant spécialisé en montage et étalonnage vidéo à Avignon. Découvrez ses projets de court-métrage, clips musicaux et productions audiovisuelles.",
  keywords: [
    "réalisateur Avignon",
    "monteur vidéo Avignon",
    "étalonnage Avignon", 
    "audiovisuel Avignon",
    "Arnaud Ban",
    "portfolio réalisateur",
    "court-métrage Avignon",
    "clip musical",
    "production audiovisuelle"
  ],
  authors: [{ name: "Arnaud Ban" }],
  creator: "Arnaud Ban",
  openGraph: {
    title: "Arnaud Ban - Réalisateur & Monteur Vidéo à Avignon | Portfolio",
    description: "Portfolio d'Arnaud Ban, réalisateur indépendant spécialisé en montage et étalonnage vidéo à Avignon. Découvrez ses projets audiovisuels.",
    url: "https://arnaudban.com",
    type: "website",
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
    title: "Arnaud Ban - Réalisateur & Monteur Vidéo à Avignon",
    description: "Portfolio d'Arnaud Ban, réalisateur indépendant spécialisé en montage et étalonnage vidéo à Avignon.",
    images: ["/assets/DOUG.png"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  const items = getProjects();
  return (
    <>
      <HeroSection id="top" />

             {/* SECTION WORK */}
       <section
         id="work"
         aria-labelledby="work-title"
         className="
           relative z-20
           w-[calc(100vw-32px)] md:w-[calc(100vw-128px)] mx-auto
           rounded-t-2xl
           bg-background
           px-4 md:px-8 py-12 md:py-24
         "
       >
        <StaggeredAnimation initialDelay={0.2}>
          <SectionTitle title="Sélection" subtitle="Projects" id="work-title" />
          <MosaicGrid projects={items} />
        </StaggeredAnimation>
      </section>
    </>
  );
}
