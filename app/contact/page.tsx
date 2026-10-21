import { Metadata } from "next";
import Cut from "@/components/Cut";
import Words from "@/components/Words";
import Slugline from "@/components/Slugline";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact - Arnaud Ban | Réalisateur & Monteur Vidéo à Avignon",
  description:
    "Contactez Arnaud Ban, réalisateur indépendant à Avignon, pour votre projet vidéo : montage, étalonnage, réalisation.",
  authors: [{ name: "Arnaud Ban" }],
  creator: "Arnaud Ban",
  openGraph: {
    title: "Contact - Arnaud Ban | Réalisateur & Monteur Vidéo à Avignon",
    description:
      "Contactez Arnaud Ban, réalisateur indépendant à Avignon, pour votre projet vidéo : montage, étalonnage, réalisation.",
    url: "https://arnaudban.fr/contact",
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
    title: "Contact - Arnaud Ban | Réalisateur & Monteur Vidéo à Avignon",
    description:
      "Contactez Arnaud Ban, réalisateur indépendant à Avignon, pour votre projet vidéo.",
    images: ["/assets/DOUG.webp"],
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="bg-background text-foreground">
      {/* le titre en carton plein cadre, puis l'adresse en gros :
          c'est le moyen le plus direct, il passe avant le formulaire. */}
      <section className="pt-12 md:pt-20 pb-20 md:pb-32" aria-labelledby="contact-title">
        <Slugline>Int. Bureau de production — Avignon — Jour</Slugline>
        <Cut className="px-4 md:px-10">
          <h1
            id="contact-title"
            className="font-heading font-bold uppercase leading-[0.86] pt-[0.16em] tracking-tighter text-[18vw] md:text-[11vw]"
          >
            <Words>Contact</Words>
          </h1>
        </Cut>
        <Cut className="px-4 md:px-10 mt-10 md:mt-20 grid md:grid-cols-2 gap-x-10 gap-y-6 items-end">
          <p className="text-[clamp(1.4rem,2.8vw,3rem)] leading-[1.1] tracking-[-0.015em] max-w-[20ch]">
            Un projet vidéo en tête&nbsp;? <em className="italic whitespace-nowrap">Racontez-le-moi.</em>
          </p>
          <p className="text-base md:text-lg leading-relaxed opacity-80 max-w-md">
            Court métrage, clip, vidéo d&apos;entreprise ou captation
            d&apos;événement : décrivez-moi votre projet, je vous réponds
            rapidement.
          </p>
        </Cut>
      </section>

      <section className="pb-20 md:pb-32" aria-labelledby="mail-title">
        <Slugline>
          <span id="mail-title">Par mail — Avignon, Vaucluse</span>
        </Slugline>
        <Cut className="px-4 md:px-10 border-t border-b border-foreground/20 py-8 md:py-12">
          {/* break-all en dernier recours : l'adresse ne doit jamais faire
              déborder la page sur un petit écran. */}
          <a
            href="mailto:ban.arnaud@outlook.fr"
            aria-label="Envoyer un email à ban.arnaud@outlook.fr"
            className="group inline-flex items-baseline gap-4 text-[clamp(1.5rem,4.2vw,4.5rem)] leading-[1.05] tracking-[-0.03em] [overflow-wrap:anywhere]"
          >
            <span className="underline decoration-1 underline-offset-[0.14em] group-hover:decoration-[0.06em]">
              ban.arnaud@outlook.fr
            </span>
            <span aria-hidden="true" className="inline-block text-[0.6em] transition-transform group-hover:translate-x-2">
              →
            </span>
          </a>
        </Cut>
      </section>

      {/* le formulaire, présenté comme un clap. */}
      <section className="pb-24 md:pb-40" aria-labelledby="form-title">
        <Slugline>
          <span id="form-title">Ou par le formulaire</span>
        </Slugline>
        <Cut className="px-4 md:px-10">
          <ContactForm />
        </Cut>
      </section>
    </div>
  );
}
