import { Metadata } from "next";
import Link from "next/link";
import Cut from "@/components/Cut";
import Words from "@/components/Words";
import Slugline from "@/components/Slugline";
import { withBasePath } from "@/lib/basePath";

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

// Petit libellé de travail (numéros, intitulés de colonnes, liens) : le même
// gabarit typographique que les sluglines et le générique de fin.
const labelClass = "font-heading uppercase tracking-[0.2em] text-xs md:text-sm";

// Le métier, en trois mots-plans. Mêmes couvertures que sur l'accueil pour que
// le survol "remplisse" chaque mot d'un plan reconnaissable d'une page à l'autre.
const skills = [
  {
    title: "Réalisation",
    still: "/assets/ARABESQUE.webp",
    text: "Écriture, repérages, direction d'acteurs et de tournage : je conçois des films de A à Z, du court métrage de fiction à la vidéo de commande.",
  },
  {
    title: "Montage",
    still: "/assets/BELITRE.webp",
    text: "Le rythme et la structure narrative du film : courts métrages, clips musicaux, captations d'événements ou reportages institutionnels.",
  },
  {
    title: "Étalonnage",
    still: "/assets/TEL_ESPRIT.webp",
    text: "La colorimétrie et l'ambiance de l'image, pour une identité visuelle cohérente du plan au film entier.",
  },
];

// Les types de films. Chaque ligne se remplit au survol de la couverture du
// projet cité en exemple : l'exemple montré est celui vers lequel on renvoie.
const projectTypes = [
  {
    title: "Courts métrages",
    still: "/assets/DOUG.webp",
    text: "Fictions et documentaires écrits, tournés et montés pour des festivals comme KINO-A, avec un vrai travail de réalisation et d'étalonnage.",
    links: [
      { slug: "doug-2020", label: "Doug" },
      { slug: "goutte-de-trop-2023", label: "Goutte de trop" },
    ],
  },
  {
    title: "Clips musicaux",
    still: "/assets/ON DIT DELLE.webp",
    text: "Réalisation et montage de clips, avec une esthétique construite en amont avec chaque musicien.",
    links: [{ slug: "on-dit-delle-2021", label: "On dit d'elle" }],
  },
  {
    title: "Vidéos d'entreprise",
    still: "/assets/ID_LOGISTICS.webp",
    text: "Reportages corporate et vidéos institutionnelles : un métier, une équipe ou un événement d'entreprise.",
    links: [{ slug: "id-logistics", label: "ID Logistics" }],
  },
  {
    title: "Événementiel",
    still: "/assets/BALADI.webp",
    text: "Captation de concerts, spectacles et soirées, montées en teaser ou en aftermovie.",
    links: [{ slug: "baladi-jazz-project", label: "Baladi jazz project" }],
  },
  {
    title: "Associatif",
    still: "/assets/RENOVART.webp",
    text: "Reportages pour des associations et missions locales du Vaucluse, pour raconter leurs actions et leurs publics.",
    links: [{ slug: "renovart", label: "Renov'Art" }],
  },
];

// Le déroulé d'une prestation (repris de la FAQ), posé sur une timeline de
// montage. Les timecodes sont des repères de lecture, pas des durées réelles :
// ils donnent l'ordre et la proportion, le délai se cale au cas par cas.
const steps = [
  {
    tc: "00:00:00:00",
    title: "Échange",
    text: "Votre besoin, vos objectifs, puis un cadrage et un devis.",
  },
  {
    tc: "00:12:00:00",
    title: "Tournage",
    text: "Ou réception de vos rushs, si les images existent déjà.",
  },
  {
    tc: "00:31:00:00",
    title: "Montage",
    text: "Le rythme et la structure du film.",
  },
  {
    tc: "00:47:00:00",
    title: "Étalonnage",
    text: "La couleur et l'ambiance de l'image.",
  },
  {
    tc: "01:00:00:00",
    title: "Livraison",
    text: "Un ou deux allers-retours de validation, puis les fichiers finaux.",
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

const still = (src: string) =>
  ({ "--still": `url("${withBasePath(src)}")` }) as React.CSSProperties;

export default function ServicesPage() {
  return (
    <div className="bg-background text-foreground">
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* OUVERTURE — le titre du découpage, puis l'intention décalée à droite
          comme une note de production en marge. */}
      <header className="pt-12 md:pt-20 pb-20 md:pb-32">
        <Slugline>Découpage technique</Slugline>
        <Cut className="px-4 md:px-10">
          <h1 className="font-heading font-bold uppercase leading-[0.86] pt-[0.16em] tracking-tighter text-[18vw] md:text-[11vw]">
            <Words>Services</Words>
          </h1>
        </Cut>
        <Cut className="px-4 md:px-10 mt-8 md:mt-12 md:ml-[50%] max-w-xl">
          <p className="text-lg md:text-xl leading-relaxed opacity-80">
            Réalisation, montage et étalonnage vidéo à Avignon et dans le
            Vaucluse : courts métrages, clips musicaux, vidéos d&apos;entreprise
            et captations d&apos;événements, pensés et fabriqués de bout en bout
            ou repris à partir de vos rushs.
          </p>
        </Cut>
      </header>

      {/* le métier : mots-plans pleine largeur, comme sur l'accueil,
          mais avec le texte complet (c'est ici que vit le détail). */}
      <section className="pb-24 md:pb-40" aria-labelledby="competences-title">
        <Slugline>
          <span id="competences-title">Compétences</span>
        </Slugline>
        <ul>
          {skills.map((skill) => (
            <li key={skill.title} className="skill-row group/skill border-t border-foreground/20">
              <Cut className="grid md:grid-cols-[1fr_minmax(0,22rem)] items-end gap-x-4 gap-y-3 px-4 md:px-10 py-6 md:py-8">
                <h2
                  className="skill-word font-heading font-bold uppercase leading-[0.86] pt-[0.16em] tracking-tighter text-[16vw] md:text-[11vw] transition-transform duration-700 ease-out md:group-hover/skill:translate-x-6"
                  style={still(skill.still)}
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

      {/* les types de films, plus petits que les compétences pour
          garder une hiérarchie, chacun avec ses projets en "plans de référence". */}
      <section className="pb-24 md:pb-40" aria-labelledby="projets-title">
        <Slugline>
          <span id="projets-title">Types de projets</span>
        </Slugline>
        <ul>
          {projectTypes.map((type) => (
            <li key={type.title} className="skill-row group/skill border-t border-foreground/20">
              <Cut className="grid md:grid-cols-[1fr_minmax(0,22rem)] items-end gap-x-4 gap-y-3 px-4 md:px-10 py-5 md:py-6">
                <h3
                  className="skill-word font-heading font-bold uppercase leading-[0.86] pt-[0.16em] tracking-tighter text-[12vw] md:text-[7vw] transition-transform duration-700 ease-out md:group-hover/skill:translate-x-6"
                  style={still(type.still)}
                >
                  <Words>{type.title}</Words>
                </h3>
                <div className="md:pb-[0.6vw]">
                  <p className="text-base leading-relaxed opacity-80">{type.text}</p>
                  <p className={`${labelClass} mt-3 flex flex-wrap gap-x-5 gap-y-1`}>
                    <span className="opacity-50">Voir</span>
                    {type.links.map((link) => (
                      <Link key={link.slug} href={`/projects/${link.slug}`} className="end-link">
                        {link.label} →
                      </Link>
                    ))}
                  </p>
                </div>
              </Cut>
            </li>
          ))}
        </ul>
      </section>

      {/* le déroulé sur une timeline de montage : horizontale sur
          desktop (on lit de gauche à droite comme une piste), verticale sur
          mobile où cinq colonnes seraient illisibles. */}
      <section className="pb-24 md:pb-40" aria-labelledby="process-title">
        <Slugline>
          <span id="process-title">Déroulé d&apos;une prestation</span>
        </Slugline>
        <Cut className="px-4 md:px-10">
          <ol className="relative grid md:grid-cols-5 border-l md:border-l-0 md:border-t border-foreground/40 ml-1 md:ml-0">
            {steps.map((step) => (
              <li key={step.title} className="relative pl-6 md:pl-0 md:pr-6 pb-10 md:pb-0 md:pt-6 last:pb-0">
                {/* Repère de coupe sur la piste : un trait vertical sur desktop,
                    une encoche horizontale sur mobile. */}
                <span
                  aria-hidden="true"
                  className="absolute bg-foreground left-0 top-[0.55em] w-3 h-px md:top-[-0.75rem] md:w-px md:h-6"
                />
                <p className={`${labelClass} tabular-nums opacity-60`}>{step.tc}</p>
                <h3 className="mt-2 md:mt-4 font-heading font-bold uppercase leading-[0.9] pt-[0.16em] tracking-tighter text-[12vw] md:text-[3.6vw]">
                  <Words>{step.title}</Words>
                </h3>
                <p className="mt-2 md:mt-3 text-base leading-relaxed opacity-80 max-w-xs">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </Cut>
      </section>

      {/* questions fréquentes : des lignes à filet plutôt qu'un
          accordéon encadré ; la réponse s'ouvre dans la moitié droite. */}
      <section className="pb-24 md:pb-40" aria-labelledby="faq-title">
        <Slugline>
          <span id="faq-title">Questions fréquentes</span>
        </Slugline>
        <div className="border-b border-foreground/20">
          {faq.map((item) => (
            <Cut key={item.q} className="border-t border-foreground/20">
              <details className="group px-4 md:px-10 py-5 md:py-7">
                <summary className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <span className="font-heading uppercase leading-[1.05] tracking-tight text-xl md:text-3xl transition-transform duration-300 ease-out group-hover:translate-x-2">
                    {item.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-heading text-2xl md:text-4xl opacity-50 transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 md:mt-6 md:ml-[50%] max-w-xl text-base md:text-lg leading-relaxed opacity-80">
                  {item.a}
                </p>
              </details>
            </Cut>
          ))}
        </div>
      </section>

      {/* FIN — carton de fin, qui sert d'appel à l'action. Le filet du haut
          ne se voit qu'en thème sombre, où le fond de page est déjà noir et
          le carton se fondrait sinon dans la séquence précédente. */}
      <section className="border-t border-foreground/20 bg-[var(--ink)] text-[var(--beige)] py-24 md:py-40" aria-labelledby="end-title">
        <Cut className="px-4 md:px-10 text-center">
          <p
            id="end-title"
            className="font-heading font-bold uppercase leading-[0.85] pt-[0.16em] tracking-tighter text-[18vw] md:text-[11vw]"
          >
            <Words>On en parle&nbsp;?</Words>
          </p>
          <div className="mt-10 md:mt-14 flex flex-wrap justify-center gap-x-10 gap-y-4 font-heading uppercase tracking-[0.2em] text-sm md:text-base">
            <Link href="/contact" className="end-link">
              Écrire un mail →
            </Link>
            <Link href="/projets" className="end-link opacity-70 hover:opacity-100">
              Voir les projets →
            </Link>
          </div>
        </Cut>
      </section>
    </div>
  );
}
