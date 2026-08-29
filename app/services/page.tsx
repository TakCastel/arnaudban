import { Metadata } from "next";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import HomeButton from "@/components/HomeButton";
import FilmCard from "@/components/FilmCard";
import PageContainer from "@/components/PageContainer";
import StackedSections from "@/components/StackedSections";
import EdgeToEdgeSection from "@/components/EdgeToEdgeSection";
import SplitText from "@/components/SplitText";

export const metadata: Metadata = {
  title: "Services - Monteur vidéo & réalisateur à Avignon | Arnaud Ban",
  description:
    "Montage, étalonnage et réalisation vidéo à Avignon et dans le Vaucluse : courts métrages, clips musicaux, vidéos d'entreprise, événementiel et associatif.",
  keywords: [
    "monteur vidéo Avignon",
    "étalonnage vidéo Avignon",
    "réalisateur audiovisuel Avignon",
    "montage vidéo Vaucluse",
    "vidéaste Avignon",
    "Arnaud Ban",
  ],
  authors: [{ name: "Arnaud Ban" }],
  creator: "Arnaud Ban",
  openGraph: {
    title: "Services - Monteur vidéo & réalisateur à Avignon | Arnaud Ban",
    description:
      "Montage, étalonnage et réalisation vidéo à Avignon et dans le Vaucluse : courts métrages, clips musicaux, vidéos d'entreprise, événementiel et associatif.",
    url: "https://arnaudban.fr/services",
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
    title: "Services - Monteur vidéo & réalisateur à Avignon | Arnaud Ban",
    description:
      "Montage, étalonnage et réalisation vidéo à Avignon et dans le Vaucluse.",
    images: ["/assets/DOUG.webp"],
  },
  alternates: {
    canonical: "/services",
  },
};

const linkClass =
  "font-mono font-bold hover:text-foreground/80 transition-colors duration-300 text-foreground underline decoration-2 underline-offset-4 hover:decoration-4";

const skills = [
  {
    title: "Réalisation",
    text: "Écriture, repérages, direction d'acteurs et de tournage : je conçois des films de A à Z, du court métrage de fiction à la vidéo de commande, pour donner une vraie mise en scène à chaque projet.",
  },
  {
    title: "Montage",
    text: "Sur Premiere Pro, je construis le rythme et la structure narrative du film : courts métrages, clips musicaux, captations d'événements ou reportages institutionnels.",
  },
  {
    title: "Étalonnage",
    text: "Sur DaVinci Resolve, je travaille la colorimétrie et l'ambiance de l'image pour donner à chaque vidéo une identité visuelle cohérente, du plan au film entier.",
  },
];

const projectTypes = [
  {
    title: "Courts métrages",
    text: "Fictions et documentaires écrits, tournés et montés pour des festivals comme KINO-A, avec un vrai travail de réalisation et d'étalonnage.",
    links: [
      { slug: "doug-2020", label: "Doug" },
      { slug: "goutte-de-trop-2023", label: "Goutte de trop" },
    ],
  },
  {
    title: "Clips musicaux",
    text: "Réalisation et montage de clips pour des artistes, avec une esthétique construite en amont avec chaque musicien.",
    links: [{ slug: "on-dit-delle-2021", label: "On dit d'elle" }],
  },
  {
    title: "Vidéos d'entreprise",
    text: "Reportages corporate et vidéos institutionnelles : mise en valeur d'un métier, d'une équipe ou d'un événement d'entreprise.",
    links: [{ slug: "id-logistics", label: "ID Logistics" }],
  },
  {
    title: "Événementiel",
    text: "Captation de concerts, spectacles et soirées, montées en teaser ou en aftermovie dynamique.",
    links: [{ slug: "baladi-jazz-project", label: "Baladi jazz project" }],
  },
  {
    title: "Associatif",
    text: "Reportages pour des associations et missions locales du Vaucluse, pour raconter leurs actions et leurs publics.",
    links: [{ slug: "renovart", label: "Renov'Art" }],
  },
];

const faq = [
  {
    q: "Dans quelles zones intervenez-vous ?",
    a: "J'interviens principalement à Avignon et dans tout le Vaucluse, pour du tournage comme pour de la captation. Le montage et l'étalonnage, eux, peuvent se faire à distance à partir de vos rushs, où que vous soyez.",
  },
  {
    q: "Proposez-vous le montage seul, sans le tournage ?",
    a: "Oui. Plusieurs de mes projets sont des montages réalisés à partir d'images tournées par d'autres (production, cadreur, client) : vous pouvez me confier uniquement le montage et/ou l'étalonnage de vos rushs.",
  },
  {
    q: "Combien de temps prend un projet ?",
    a: "Cela dépend surtout de la quantité de rushs et du niveau de finition attendu : un aftermovie se monte plus vite qu'un court métrage avec étalonnage complet. On définit ensemble un délai réaliste dès l'échange initial.",
  },
  {
    q: "Comment se déroule une prestation ?",
    a: "On échange d'abord sur votre besoin et vos objectifs, puis je vous propose un cadrage (et un devis). Vient ensuite le tournage ou la réception de vos rushs, le montage, l'étalonnage, puis un ou deux allers-retours de validation avant la livraison des fichiers finaux.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export default function ServicesPage() {
  return (
    <PageTransition>
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PageContainer className="py-8 md:py-16">
        <header className="max-w-3xl mb-14 md:mb-20">
          <SplitText as="h1" className="text-5xl md:text-7xl text-foreground mb-5 tracking-tight">
            Services
          </SplitText>
          <p className="text-2xl md:text-3xl leading-relaxed text-foreground/90">
            Réalisation, montage et étalonnage vidéo à Avignon et dans le
            Vaucluse : courts métrages, clips musicaux, vidéos d&apos;entreprise
            et captations d&apos;événements, pensés et fabriqués de bout en
            bout ou repris à partir de vos rushs.
          </p>
        </header>

        {/* Compétences */}
        <section aria-labelledby="competences-title" className="mb-16 md:mb-24">
          <h2
            id="competences-title"
            className="text-xs font-semibold uppercase tracking-widest text-foreground/50 mb-6"
          >
            Compétences
          </h2>
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {skills.map((skill) => (
              <FilmCard key={skill.title}>
                <h3 className="text-2xl text-foreground mb-3">
                  {skill.title}
                </h3>
                <p className="text-base md:text-lg text-foreground/70 leading-relaxed">
                  {skill.text}
                </p>
              </FilmCard>
            ))}
          </div>
        </section>

        {/* Types de projets */}
        <section aria-labelledby="projets-title" className="mb-16 md:mb-24">
          <h2
            id="projets-title"
            className="text-xs font-semibold uppercase tracking-widest text-foreground/50 mb-6"
          >
            Types de projets
          </h2>
          {/* Empilées et alternées gauche/droite, comme la section
              Compétences de l'accueil (voir StackedSections /
              EdgeToEdgeSection) plutôt qu'une grille uniforme. */}
          <StackedSections>
            {projectTypes.map((type, i) => (
              <EdgeToEdgeSection
                key={type.title}
                className={`max-w-2xl ${i % 2 === 1 ? "ml-auto" : ""}`}
              >
                <h3 className="text-2xl text-foreground mb-3">
                  {type.title}
                </h3>
                <p className="text-base md:text-lg text-foreground/70 leading-relaxed mb-4">
                  {type.text}
                </p>
                <p className="text-base">
                  {type.links.map((link, j) => (
                    <span key={link.slug}>
                      <Link href={`/projects/${link.slug}`} className={linkClass}>
                        {link.label}
                      </Link>
                      {j < type.links.length - 1 && ", "}
                    </span>
                  ))}
                </p>
              </EdgeToEdgeSection>
            ))}
          </StackedSections>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq-title" className="mb-16 md:mb-24">
          <h2
            id="faq-title"
            className="text-xs font-semibold uppercase tracking-widest text-foreground/50 mb-6"
          >
            Questions fréquentes
          </h2>
          <div className="divide-y divide-foreground/10 border-t border-b border-foreground/10">
            {faq.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none text-lg md:text-xl font-semibold text-foreground">
                  {item.q}
                  <span
                    className="shrink-0 text-foreground/40 transition-transform duration-200 group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-foreground/70 leading-relaxed max-w-3xl">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className=" border border-foreground p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="font-heading text-3xl md:text-4xl text-foreground mb-1">
              Discutons de votre projet
            </p>
            <p className="text-foreground/70">
              <Link href="/contact" className={linkClass} aria-label="Aller à la page contact">
                Contactez-moi
              </Link>
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 inline-flex items-center justify-center px-6 py-3 text-lg font-semibold text-foreground bg-background border border-foreground hover:bg-foreground hover:text-background transition-all duration-300"
          >
            Écrire un mail
          </Link>
        </div>

        <div className="pt-10">
          <HomeButton centered={false} />
        </div>
      </PageContainer>
    </PageTransition>
  );
}
