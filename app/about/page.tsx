import { Metadata } from "next";
import Link from "next/link";
import Cut from "@/components/Cut";
import Words from "@/components/Words";
import Slugline from "@/components/Slugline";
import { getProjects } from "@/lib/getProjects";

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

// Lien dans le texte "sous-titré" : un trait fin qui s'épaissit au survol,
// pas de graisse ni de mono qui casseraient la lecture d'un sous-titre.
const inlineLink =
  "underline decoration-1 underline-offset-[0.14em] hover:decoration-[0.07em] transition-[text-decoration-thickness]";

// Le parcours raconté comme une voix off : une réplique par bloc, posée en
// alternance gauche / décalé à droite comme des sous-titres qui changent de
// locuteur. `tc` imite le repère d'entrée d'un fichier .srt — pur décor,
// masqué aux lecteurs d'écran.
const lines: { tc: string; content: React.ReactNode }[] = [
  {
    tc: "00:00:01,200",
    content: (
      <>
        Je m&apos;appelle Arnaud Ban. Je réalise et je monte des films depuis
        Avignon, dans le Vaucluse.
      </>
    ),
  },
  {
    tc: "00:00:06,480",
    content: (
      <>
        Tout a commencé en école de cinéma, où j&apos;ai écrit et réalisé mes
        premiers films,{" "}
        <Link href="/projects/doug-2020" className={inlineLink} aria-label="Voir le projet Doug">
          <em className="italic">Doug</em>
        </Link>{" "}
        et{" "}
        <Link href="/projects/invisible-2021" className={inlineLink} aria-label="Voir le projet Invisible">
          <em className="italic">Invisible</em>
        </Link>
        .
      </>
    ),
  },
  {
    tc: "00:00:12,040",
    content: <>Puis je me suis spécialisé en montage et en étalonnage.</>,
  },
  {
    tc: "00:00:15,920",
    content: (
      <>
        Aujourd&apos;hui&nbsp;: des courts métrages et des documentaires, des
        clips comme{" "}
        <Link href="/projects/on-dit-delle-2021" className={inlineLink} aria-label="Voir le projet On dit d'elle">
          <em className="italic">On dit d&apos;elle</em>
        </Link>
        , des vidéos d&apos;entreprise et des captations d&apos;événements.
      </>
    ),
  },
  {
    tc: "00:00:22,360",
    content: (
      <>
        Pour des clients, des associations et des missions locales
        d&apos;Avignon et du Vaucluse.
      </>
    ),
  },
];

// Volontairement différent des savoir-faire de /services (éviter le contenu
// dupliqué) : ici le parcours, avec des faits réels déjà présents sur le site
// (voir data/projects.ts : école de cinéma pour Doug/Invisible, Insercall
// pour les commandes institutionnelles, festival KINO-A et sélection au
// festival 1ère Marche pour les fictions).
const path = [
  {
    title: "Formation",
    text: "Formé au montage et à la réalisation en école de cinéma, où j'ai écrit et réalisé mes premiers films (Doug, Invisible) avant de me spécialiser en montage et étalonnage.",
  },
  {
    title: "Terrain",
    text: "Vidéaste pour des structures comme Insercall à Avignon, j'ai capté et monté des reportages institutionnels et associatifs pour des entreprises et des missions locales du Vaucluse.",
  },
  {
    title: "Festivals",
    text: "Des courts métrages présentés au festival KINO-A, et le clip On dit d'elle dans la sélection du festival 1ère Marche en 2023.",
  },
];

export default function AboutPage() {
  // Chiffres sobres, tous vérifiables sur le site : le nombre de films vient
  // des données, pour ne jamais se désynchroniser du catalogue.
  const facts = [
    { value: String(getProjects().length), label: "Films au catalogue" },
    { value: "3", label: "Métiers : réalisation, montage, étalonnage" },
    { value: "2023", label: "Sélection festival 1ère Marche" },
  ];

  return (
    <div className="bg-background text-foreground">
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Ouverture : un carton de titre, pas un portrait. */}
      <header className="pt-12 md:pt-20 pb-16 md:pb-28">
        <Slugline>Voix off — Avignon — Vaucluse</Slugline>
        <Cut className="px-4 md:px-10">
          {/* pt-[0.16em] : réserve la place de l'accent du « À » sans que
              l'interlignage serré ne le rogne. */}
          <h1 className="font-heading font-bold uppercase leading-[0.86] pt-[0.16em] tracking-tighter text-[18vw] md:text-[11vw]">
            <Words>À propos</Words>
          </h1>
        </Cut>
        <Cut className="px-4 md:px-10 mt-8 md:mt-12 md:ml-[50%] max-w-md">
          <p className="text-base md:text-lg leading-relaxed opacity-80">
            Réalisateur &amp; monteur vidéo indépendant à Avignon, Vaucluse.
          </p>
        </Cut>
      </header>

      {/* le parcours en sous-titres. */}
      <section className="pb-24 md:pb-40" aria-label="Parcours">
        <Slugline>Int. École de cinéma — Puis Avignon — Jour</Slugline>
        <div className="px-4 md:px-10 space-y-14 md:space-y-24">
          {lines.map((line, i) => (
            <Cut
              key={line.tc}
              className={i % 2 ? "ml-[8vw] md:ml-[42%]" : ""}
            >
              <span
                aria-hidden="true"
                className="block font-heading text-[0.7rem] md:text-xs tracking-[0.2em] opacity-50 mb-3 md:mb-4"
              >
                {line.tc}
              </span>
              <p className="text-[clamp(1.4rem,2.8vw,3rem)] leading-[1.1] tracking-[-0.015em] max-w-[24ch]">
                {line.content}
              </p>
            </Cut>
          ))}
        </div>
      </section>

      {/* les faits : chiffres en Antonio, libellés espacés, aucun
          cadre. Puis le parcours en lignes filet. */}
      <section className="pb-12 md:pb-16" aria-labelledby="facts-title">
        <Slugline>
          <span id="facts-title">Fiche technique</span>
        </Slugline>
        <Cut className="border-t border-foreground/20 px-4 md:px-10">
          <dl className="grid grid-cols-3">
            {facts.map((fact, i) => (
              <div
                key={fact.label}
                className={`flex flex-col-reverse justify-end py-6 md:py-10 ${i ? "pl-3 md:pl-8 border-l border-foreground/20" : "pr-3 md:pr-8"}`}
              >
                <dt className="font-heading uppercase tracking-[0.2em] text-[0.65rem] md:text-xs leading-snug opacity-70 mt-3 md:mt-4 max-w-[18ch]">
                  {fact.label}
                </dt>
                <dd className="font-heading font-bold leading-[0.86] tracking-tighter text-[14vw] md:text-[8vw]">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </Cut>

        <ol className="mt-16 md:mt-24">
          {path.map((item) => (
            <li key={item.title} className="group border-t border-foreground/20">
              <Cut className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] items-end gap-x-4 gap-y-3 px-4 md:px-10 py-6 md:py-8">
                <h2 className="font-heading font-bold uppercase leading-[0.86] pt-[0.16em] tracking-tighter text-[14vw] md:text-[8vw] transition-transform duration-700 ease-out md:group-hover:translate-x-6">
                  <Words>{item.title}</Words>
                </h2>
                <p className="text-base md:text-lg leading-relaxed opacity-80 md:pb-[0.4vw]">
                  {item.text}
                </p>
              </Cut>
            </li>
          ))}
        </ol>
      </section>

    </div>
  );
}
