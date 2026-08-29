import { Metadata } from "next";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import HomeButton from "@/components/HomeButton";
import FilmCard from "@/components/FilmCard";
import PageContainer from "@/components/PageContainer";
import SplitText from "@/components/SplitText";

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

// Fil d'Ariane structuré (SEO) — même logique que faqJsonLd sur /services :
// aide Google à comprendre la place de cette page dans le site.
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://arnaudban.fr" },
    { "@type": "ListItem", position: 2, name: "À propos", item: "https://arnaudban.fr/about" },
  ],
};

// Volontairement différent des 3 cards "compétences" de /services (éviter
// le contenu dupliqué) : ici on raconte le parcours plutôt que les
// techniques, avec des faits réels déjà présents sur le site (voir les
// descriptions de projets dans data/projects.ts : école de cinéma pour
// Doug/Invisible, Insercall pour les commandes institutionnelles, festival
// KINO-A et sélection au festival 1ère Marche pour les fictions).
const skills = [
  {
    title: "Formation",
    text: "Formé au montage et à la réalisation en école de cinéma, où j'ai écrit et réalisé mes premiers films (Doug, Invisible) avant de me spécialiser en montage et étalonnage.",
  },
  {
    title: "Expérience terrain",
    text: "Vidéaste pour des structures comme Insercall à Avignon, j'ai capté et monté des reportages institutionnels et associatifs pour des entreprises et des missions locales du Vaucluse.",
  },
  {
    title: "Fictions & festivals",
    text: "Mes courts métrages personnels ont été présentés au festival KINO-A, et le clip musical On dit d'elle a fait partie de la sélection du festival 1ère Marche en 2023.",
  },
];

export default function AboutPage() {
  return (
    <PageTransition>
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PageContainer className="py-8 md:py-16">
        <SplitText as="h1" className="text-5xl md:text-7xl text-foreground mb-3 tracking-tight">
          Arnaud Ban
        </SplitText>
        <p className="text-2xl md:text-3xl font-serif italic text-foreground/70 mb-10 md:mb-14">
          Réalisateur &amp; monteur vidéo à Avignon, Vaucluse
        </p>

        <div className="space-y-6 md:space-y-8 text-xl md:text-2xl leading-relaxed">
          <p>
            Je m&apos;appelle Arnaud Ban, réalisateur et monteur vidéo
            indépendant basé à Avignon, dans le Vaucluse. Formé au montage
            et à la réalisation en école de cinéma, j&apos;y ai écrit et
            réalisé mes premiers courts métrages,{" "}
            <Link href="/projects/doug-2020" className={linkClass} aria-label="Voir le projet Doug">
              Doug
            </Link>{" "}
            et{" "}
            <Link href="/projects/invisible-2021" className={linkClass} aria-label="Voir le projet Invisible">
              Invisible
            </Link>
            , avant de me spécialiser en montage et étalonnage.
          </p>

          <p>
            J&apos;interviens aujourd&apos;hui sur des projets audiovisuels
            variés : courts métrages et documentaires, clips musicaux comme{" "}
            <Link href="/projects/on-dit-delle-2021" className={linkClass} aria-label="Voir le projet On dit d'elle">
              On dit d&apos;elle
            </Link>
            , vidéos d&apos;entreprise et captations d&apos;événements, pour
            des clients, associations et missions locales d&apos;Avignon et
            du Vaucluse.
          </p>

          <p>
            Pour toute demande professionnelle, contactez-moi via{" "}
            <Link href="/contact" className={linkClass} aria-label="Aller à la page contact">
              ma page contact
            </Link>
            .
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
              <Link href="/contact" className={linkClass} aria-label="Aller à la page contact">
                Parlons-en
              </Link>
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
