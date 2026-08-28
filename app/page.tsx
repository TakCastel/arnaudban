import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import ProjectAccordion from "@/components/ProjectAccordion";
import StackedSections from "@/components/StackedSections";
import PageContainer from "@/components/PageContainer";
import EdgeToEdgeSection from "@/components/EdgeToEdgeSection";
import { getProjects } from "@/lib/getProjects";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arnaud Ban - Réalisateur & Monteur Vidéo à Avignon | Portfolio",
  description: "Portfolio d'Arnaud Ban, réalisateur et monteur vidéo à Avignon. Courts métrages, clips musicaux, vidéos d'entreprise et événementiel.",
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
    url: "https://arnaudban.fr",
    type: "website",
    images: [
      {
        url: "/assets/ARABESQUE.webp",
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
    images: ["/assets/ARABESQUE.webp"],
  },
  alternates: {
    canonical: "/",
  },
};

// Reprend les 3 mêmes compétences que /services (cohérence avec la
// signature du hero "Réalisation / Montage"), mais en version courte : le
// détail complet vit sur /services pour éviter le contenu dupliqué.
const skills = [
  {
    title: "Réalisation",
    text: "De l'écriture à la mise en scène, je conçois et tourne courts métrages, documentaires et vidéos de commande, du repérage jusqu'au dernier plan.",
  },
  {
    title: "Montage",
    text: "Sur Premiere Pro, je construis le rythme et la narration de chaque film : clips musicaux, courts métrages, captations d'événements ou vidéos d'entreprise.",
  },
  {
    title: "Étalonnage",
    text: "Sur DaVinci Resolve, je donne à l'image sa tonalité finale : cohérence colorimétrique et identité visuelle propre à chaque projet.",
  },
];

const featuredSlugs = ["arabesque-2019", "on-dit-delle-2021", "id-logistics"];

export default function HomePage() {
  const featured = getProjects().filter((p) => featuredSlugs.includes(p.slug));

  return (
    <>
      {/* H1 accessible (sr-only) : le hero reste un pur visuel, sans texte
          superposé — l'intro éditoriale, juste en dessous, porte le message. */}
      <h1 className="sr-only">
        Arnaud Ban, réalisateur et monteur vidéo à Avignon
      </h1>

      <HeroSection id="top" />

      {/* LANDING — même fond que le reste du site (beige en clair, ink en
          sombre), pas le bloc bleu constant utilisé pour la grille Projets. */}
      <section className="relative z-20 bg-background text-foreground border-t border-foreground/15">
        <PageContainer className="pt-12 md:pt-20">
          {/* Empilées : le paragraphe puis chaque card se recouvrent au
              scroll plutôt que de s'enchaîner l'un sous l'autre. */}
          <div className="mb-16 md:mb-24">
            <StackedSections>
              {/* id ciblé par la flèche "scroller en bas" du hero (voir
                  components/HeroSection.tsx). */}
              <p
                id="intro-title"
                className="font-heading text-3xl md:text-5xl leading-snug max-w-3xl"
              >
                Réalisateur et monteur vidéo indépendant à Avignon, je
                raconte des histoires en images, du court métrage à la
                vidéo d&apos;entreprise.
              </p>
              {skills.map((skill, i) => (
                <EdgeToEdgeSection
                  key={skill.title}
                  // Alternance gauche/droite : 1er à gauche (par défaut),
                  // 2e à droite (ml-auto la colle au trait de droite), 3e
                  // repasse à gauche.
                  className={`max-w-2xl ${i % 2 === 1 ? "ml-auto" : ""}`}
                >
                  <h2 className="text-2xl mb-3">{skill.title}</h2>
                  <p className="text-base md:text-lg text-foreground/70 leading-relaxed">
                    {skill.text}
                  </p>
                </EdgeToEdgeSection>
              ))}
            </StackedSections>
          </div>
        </PageContainer>

        {/* Carrousel en accordéon, bord à bord : "Projets" en vertical,
            les projets récents repliés, "Voir plus" en dernier panneau. */}
        <div id="work">
          <ProjectAccordion projects={featured} />
        </div>

        <PageContainer className="pt-12 pb-12 md:pt-20 md:pb-20">
          {/* CTA de clôture */}
          <div className="border border-foreground p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="font-heading text-3xl md:text-4xl mb-1">
                Un projet vidéo en tête ?
              </p>
              <p className="text-foreground/70">
                Montage, étalonnage, réalisation : découvrez mes services ou
                écrivez-moi directement.
              </p>
            </div>
            <div className="shrink-0 flex flex-wrap gap-3">
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-6 py-3 text-lg font-semibold text-foreground bg-background border border-foreground hover:bg-foreground hover:text-background transition-all duration-300"
              >
                Voir mes services
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 text-lg font-semibold text-background bg-foreground border border-foreground hover:opacity-90 transition-all duration-300"
              >
                Écrire un mail
              </Link>
            </div>
          </div>
        </PageContainer>
      </section>
    </>
  );
}
