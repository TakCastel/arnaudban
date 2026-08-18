import { Metadata } from "next";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import HomeButton from "@/components/HomeButton";
import FilmCard from "@/components/FilmCard";
import PageContainer from "@/components/PageContainer";

export const metadata: Metadata = {
  title: "À propos - Arnaud Ban | Réalisateur & Monteur Vidéo à Avignon",
  description:
    "Arnaud Ban, réalisateur indépendant basé à Avignon, spécialisé en montage et étalonnage vidéo. Découvrez son parcours et ses compétences.",
  keywords: [
    "réalisateur Avignon",
    "monteur vidéo Avignon",
    "étalonnage Avignon",
    "audiovisuel Avignon",
    "Arnaud Ban",
    "réalisateur indépendant",
    "montage vidéo professionnel",
  ],
  authors: [{ name: "Arnaud Ban" }],
  creator: "Arnaud Ban",
  openGraph: {
    title: "À propos - Arnaud Ban | Réalisateur & Monteur Vidéo à Avignon",
    description:
      "Arnaud Ban, réalisateur indépendant basé à Avignon, spécialisé en montage et étalonnage vidéo. Découvrez son parcours et ses compétences.",
    url: "https://arnaudban.fr/about",
    type: "profile",
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
    title: "À propos - Arnaud Ban | Réalisateur & Monteur Vidéo à Avignon",
    description: "Arnaud Ban, réalisateur indépendant basé à Avignon, spécialisé en montage et étalonnage vidéo.",
    images: ["/assets/DOUG.webp"],
  },
  alternates: {
    canonical: "/about",
  },
};

const linkClass =
  "font-mono font-bold hover:text-foreground/80 transition-colors duration-300 text-foreground underline decoration-2 underline-offset-4 hover:decoration-4";

// TODO(placeholder) : lorem ipsum le temps de valider la mise en page,
// à remplacer par le vrai copywriting avant mise en ligne.
const skills = [
  {
    title: "Lorem Ipsum",
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    title: "Dolor Sit Amet",
    text: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
  },
  {
    title: "Consectetur",
    text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.",
  },
];

export default function AboutPage() {
  return (
    <PageTransition>
      <PageContainer className="py-8 md:py-16">
        <h1 className="text-5xl md:text-7xl text-foreground mb-3 tracking-tight">
          Arnaud Ban
        </h1>
        <p className="text-2xl md:text-3xl font-serif italic text-foreground/70 mb-10 md:mb-14">
          Réalisateur &amp; monteur vidéo — Avignon, Vaucluse
        </p>

        <div className="space-y-6 md:space-y-8 text-xl md:text-2xl leading-relaxed">
          <p>
            Bonjour ! Je m&apos;appelle Arnaud Ban et je suis un réalisateur
            indépendant qui travaille sur Avignon.
          </p>

          <p>Mes spécialités sont le montage et l&apos;étalonnage.</p>

          <p>
            Pour toute demande professionnelle, merci de me contacter par
            mail :{" "}
            <a
              href="mailto:ban.arnaud@outlook.fr"
              className={linkClass}
              aria-label="Envoyer un email à ban.arnaud@outlook.fr"
            >
              ban.arnaud@outlook.fr
            </a>
          </p>
        </div>

        {/* Compétences */}
        <div className="grid sm:grid-cols-3 gap-8 md:gap-10 my-12 md:my-16">
          {skills.map((skill) => (
            <FilmCard key={skill.title}>
              <h2 className="text-xl text-foreground mb-2">
                {skill.title}
              </h2>
              <p className="text-base text-foreground/70 leading-relaxed">
                {skill.text}
              </p>
            </FilmCard>
          ))}
        </div>

        {/* CTA */}
        <div className=" border border-foreground p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="font-heading text-3xl md:text-4xl text-foreground mb-1">
              Un projet vidéo en tête ?
            </p>
            <p className="text-foreground/70">
              Parlons-en :{" "}
              <a
                href="mailto:ban.arnaud@outlook.fr"
                className={linkClass}
                aria-label="Envoyer un email à ban.arnaud@outlook.fr"
              >
                ban.arnaud@outlook.fr
              </a>
            </p>
          </div>
          <Link
            href="/services"
            className="shrink-0 inline-flex items-center justify-center px-6 py-3 text-lg font-semibold text-foreground bg-background border border-foreground hover:bg-foreground hover:text-background transition-all duration-300"
          >
            Voir mes services
          </Link>
        </div>

        <div className="pt-10">
          <HomeButton centered={false} />
        </div>
      </PageContainer>
    </PageTransition>
  );
}
