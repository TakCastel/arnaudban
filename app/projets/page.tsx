import { Metadata } from "next";
import Link from "next/link";
import Cut from "@/components/Cut";
import Words from "@/components/Words";
import Slugline from "@/components/Slugline";
import ProjetsBobine from "@/components/ProjetsBobine";
import { getProjects } from "@/lib/getProjects";

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
  // Années extrêmes de la bobine, pour la ligne de "carton" sous le titre.
  const years = items.map((p) => Number(p.date));
  const from = Math.min(...years);
  const to = Math.max(...years);

  return (
    <div className="bg-background text-foreground">
      {/* OUVERTURE — le titre plein cadre, puis une seule ligne de contexte
          décalée à droite : la page s'ouvre comme un carton de début. */}
      <header className="pt-10 md:pt-16 pb-16 md:pb-28">
        <Slugline>Int. Projection — Nuit</Slugline>
        <Cut className="px-4 md:px-10">
          <h1
            id="work-title"
            className="font-heading font-bold uppercase leading-[0.86] pt-[0.16em] tracking-tighter text-[18vw] md:text-[11vw] -ml-[0.04em]"
          >
            <Words>Projets</Words>
          </h1>
        </Cut>
        <Cut className="px-4 md:px-10 mt-8 md:mt-12 md:ml-[50%] max-w-xl">
          <p className="font-heading uppercase tracking-[0.2em] text-xs md:text-sm opacity-70 mb-3 tabular-nums">
            {items.length} films — {from}–{to}
          </p>
          <p className="text-base md:text-lg leading-relaxed opacity-80">
            Courts métrages, clips musicaux, vidéos d&apos;entreprise,
            captations d&apos;événements et projets associatifs, réalisés à
            Avignon et dans le Vaucluse.
          </p>
        </Cut>
      </header>

      {/* la bobine elle-même : filtres, liste ou planche contact.
          Pas d'appel à l'action ici : le pied de page s'en charge déjà. */}
      <section className="pb-12 md:pb-16" aria-label="Tous les projets">
        <Slugline>Int. Chutiers — Bobine complète</Slugline>
        <ProjetsBobine projects={items} />
        <div className="px-4 md:px-10 pt-8 border-t border-foreground/20 flex font-heading uppercase tracking-[0.2em] text-sm md:text-base">
          <Link href="/" className="end-link opacity-70 hover:opacity-100">
            ← Accueil
          </Link>
        </div>
      </section>
    </div>
  );
}
