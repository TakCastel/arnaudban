import { Metadata } from "next";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import HomeButton from "@/components/HomeButton";
import FilmCard from "@/components/FilmCard";
import PageContainer from "@/components/PageContainer";

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

// TODO(placeholder) : lorem ipsum le temps de valider la mise en page,
// à remplacer par le vrai copywriting avant mise en ligne (titres, liens de
// projets et questions FAQ restent réels).
const skills = [
  {
    n: "01",
    title: "Réalisation",
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    n: "02",
    title: "Montage",
    text: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi.",
  },
  {
    n: "03",
    title: "Étalonnage",
    text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.",
  },
];

const projectTypes = [
  {
    title: "Courts métrages",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    links: [
      { slug: "doug-2020", label: "Doug" },
      { slug: "goutte-de-trop-2023", label: "Goutte de trop" },
    ],
  },
  {
    title: "Clips musicaux",
    text: "Sed do eiusmod tempor incididunt ut labore et dolore magna.",
    links: [{ slug: "on-dit-delle-2021", label: "On dit d'elle" }],
  },
  {
    title: "Vidéos d'entreprise",
    text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    links: [{ slug: "id-logistics", label: "ID Logistics" }],
  },
  {
    title: "Événementiel",
    text: "Duis aute irure dolor in reprehenderit in voluptate velit.",
    links: [{ slug: "baladi-jazz-project", label: "Baladi jazz project" }],
  },
  {
    title: "Associatif",
    text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa.",
    links: [{ slug: "renovart", label: "Renov'Art" }],
  },
];

const faq = [
  {
    q: "Dans quelles zones intervenez-vous ?",
    a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    q: "Proposez-vous le montage seul, sans le tournage ?",
    a: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    q: "Combien de temps prend un projet ?",
    a: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    q: "Comment se déroule une prestation ?",
    a: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
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
          <h1 className="text-5xl md:text-7xl text-foreground mb-5 tracking-tight">
            Services
          </h1>
          <p className="text-2xl md:text-3xl leading-relaxed text-foreground/90">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua, ut
            enim ad minim veniam quis nostrud exercitation.
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
              <FilmCard key={skill.n}>
                <span className="font-mono text-xs text-foreground/40">
                  {skill.n}
                </span>
                <h3 className="text-2xl text-foreground mt-2 mb-3">
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {projectTypes.map((type) => (
              <FilmCard key={type.title} className="flex">
                <div className="flex flex-col w-full">
                  <h3 className="text-xl text-foreground mb-2">
                    {type.title}
                  </h3>
                  <p className="text-base text-foreground/70 leading-relaxed mb-4 flex-1">
                    {type.text}
                  </p>
                  <p className="text-base">
                    {type.links.map((link, i) => (
                      <span key={link.slug}>
                        <Link href={`/projects/${link.slug}`} className={linkClass}>
                          {link.label}
                        </Link>
                        {i < type.links.length - 1 && ", "}
                      </span>
                    ))}
                  </p>
                </div>
              </FilmCard>
            ))}
          </div>
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
              Par mail :{" "}
              <a
                href="mailto:ban.arnaud@outlook.fr"
                className={linkClass}
                aria-label="Envoyer un email à ban.arnaud@outlook.fr"
              >
                ban.arnaud@outlook.fr
              </a>
            </p>
          </div>
          <a
            href="mailto:ban.arnaud@outlook.fr"
            className="shrink-0 inline-flex items-center justify-center px-6 py-3 text-lg font-semibold text-foreground bg-background border border-foreground hover:bg-foreground hover:text-background transition-all duration-300"
          >
            Écrire un mail
          </a>
        </div>

        <div className="pt-10">
          <HomeButton centered={false} />
        </div>
      </PageContainer>
    </PageTransition>
  );
}
