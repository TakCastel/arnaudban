import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import ProjectReel from "@/components/ProjectReel";
import Cut from "@/components/Cut";
import Slugline from "@/components/Slugline";
import Words from "@/components/Words";
import Marquee from "@/components/Marquee";
import { getProjects } from "@/lib/getProjects";
import { withBasePath } from "@/lib/basePath";
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

// Les 3 savoir-faire, en version courte (le détail vit sur /services).
// Chaque mot se remplit d'un plan du portfolio au survol : `still` est la
// couverture qui sert de matière.
const skills = [
  {
    title: "Réalisation",
    still: "/assets/ARABESQUE.webp",
    text: "De l'écriture au dernier plan : courts métrages, documentaires et vidéos de commande, pensés et tournés de bout en bout.",
  },
  {
    title: "Montage",
    still: "/assets/BELITRE.webp",
    text: "Le rythme et la narration : clips, fictions, captations d'événements ou films d'entreprise.",
  },
  {
    title: "Étalonnage",
    still: "/assets/TEL_ESPRIT.webp",
    text: "La tonalité finale de l'image : une identité colorimétrique propre à chaque film.",
  },
];

const REEL_COUNT = 10;

export default function HomePage() {
  const all = getProjects();
  const reel = all.slice(0, REEL_COUNT);

  return (
    <>
      {/* H1 accessible (sr-only) : le hero reste un pur visuel. */}
      <h1 className="sr-only">
        Arnaud Ban, réalisateur et monteur vidéo à Avignon
      </h1>

      <HeroSection id="top" />

      <div className="relative z-20 bg-background text-foreground">
        {/* l'intention, posée comme un sous-titre géant. */}
        <section className="pt-20 md:pt-32 pb-24 md:pb-40" aria-labelledby="intro-title">
          <Slugline>Int. Atelier — Avignon — Jour</Slugline>
          <Cut className="px-4 md:px-10">
            <p
              id="intro-title"
              className="text-[clamp(1.8rem,3.8vw,4.2rem)] leading-[1.05] tracking-[-0.02em] max-w-[18ch]"
            >
              <Words>Je raconte des histoires</Words>{" "}
              <em className="italic"><Words start={4}>en images</Words></em>
              <Words start={6}>, du court métrage à la vidéo d&apos;entreprise.</Words>
            </p>
          </Cut>
          <Cut className="px-4 md:px-10 mt-10 md:mt-16 md:ml-[50%] max-w-md">
            <p className="text-base md:text-lg leading-relaxed opacity-80">
              Réalisateur, monteur et étalonneur indépendant, basé à Avignon.
              Je fabrique des films de bout en bout, ou je reprends vos rushs
              pour leur donner un rythme et une couleur.
            </p>
          </Cut>
        </section>

        {/* Bandeau qui file entre deux séquences, accéléré par le scroll. */}
        <Marquee
          className="font-heading font-bold uppercase tracking-tight text-[13vw] md:text-[6vw] leading-none pb-24 md:pb-36"
          items={["Réalisation", "Montage", "Étalonnage", "Courts métrages", "Clips", "Documentaires", "Films d'entreprise"]}
        />

        {/* savoir-faire : des mots-plans pleine largeur. */}
        <section className="pb-24 md:pb-40" aria-label="Savoir-faire">
          <Slugline>Ext. Plateau — Salle de montage — Nuit</Slugline>
          <ul>
            {skills.map((skill) => (
              <li key={skill.title} className="skill-row group/skill border-t border-foreground/20">
                <Cut className="grid md:grid-cols-[1fr_minmax(0,22rem)] items-end gap-x-4 gap-y-3 px-4 md:px-10 py-6 md:py-8">
                  <h2
                    className="skill-word font-heading font-bold uppercase leading-[0.86] pt-[0.16em] tracking-tighter text-[16vw] md:text-[11vw] transition-transform duration-700 ease-out md:group-hover/skill:translate-x-6"
                    style={{ "--still": `url("${withBasePath(skill.still)}")` } as React.CSSProperties}
                  >
                    <Words>{skill.title}</Words>
                  </h2>
                  <p className="text-base md:text-lg leading-relaxed opacity-80 md:pb-[1.2vw]">
                    {skill.text}
                  </p>
                </Cut>
              </li>
            ))}
          </ul>
        </section>

        {/* les films, en typo seule ; l'image arrive au survol. */}
        <section id="work" className="pb-12 md:pb-16" aria-labelledby="work-title">
          <Slugline>
            <span id="work-title">Projets — {REEL_COUNT} sur {all.length}</span>
          </Slugline>
          <ProjectReel projects={reel} />
          <div className="px-4 md:px-10 pt-8 border-t border-foreground/20 flex justify-end">
            <Link
              href="/projets"
              className="group font-heading uppercase tracking-[0.2em] text-sm md:text-base inline-flex items-center gap-3"
            >
              Tous les projets ({all.length})
              <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-2">→</span>
            </Link>
          </div>
        </section>

        {/* FIN — carton de fin, qui sert d'appel à l'action. */}
        <section className="end-credits bg-[var(--ink)] text-[var(--beige)] py-24 md:py-40" aria-labelledby="end-title">
          <Cut className="px-4 md:px-10 text-center">
            <p
              id="end-title"
              className="font-heading font-bold uppercase leading-[0.86] pt-[0.16em] tracking-tighter text-[18vw] md:text-[11vw]"
            >
              <Words>Votre film&nbsp;?</Words>
            </p>
            <div className="mt-10 md:mt-14 flex flex-wrap justify-center gap-x-10 gap-y-4 font-heading uppercase tracking-[0.2em] text-sm md:text-base">
              <Link href="/contact" className="end-link">
                Écrire un mail →
              </Link>
              <Link href="/services" className="end-link opacity-70 hover:opacity-100">
                Voir les services →
              </Link>
            </div>
          </Cut>
        </section>
      </div>
    </>
  );
}
