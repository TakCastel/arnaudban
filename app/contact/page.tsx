import { Metadata } from "next";
import PageTransition from "@/components/PageTransition";
import HomeButton from "@/components/HomeButton";
import PageContainer from "@/components/PageContainer";
import ContactForm from "@/components/ContactForm";
import SplitText from "@/components/SplitText";
import StaggerItem from "@/components/StaggerItem";
import ScrollReveal from "@/components/ScrollReveal";

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

const linkClass =
  "font-mono font-bold hover:text-foreground/80 transition-colors duration-300 text-foreground underline decoration-2 underline-offset-4 hover:decoration-4";

export default function ContactPage() {
  return (
    <PageTransition>
      <PageContainer className="py-8 md:py-16">
        <SplitText as="h1" className="text-5xl md:text-7xl text-foreground mb-3 tracking-tight">
          Contact
        </SplitText>
        <StaggerItem className="mb-10 md:mb-14 max-w-2xl">
          <p className="text-2xl md:text-3xl font-serif italic text-foreground/70">
            Un projet vidéo en tête ? Racontez-le-moi.
          </p>
        </StaggerItem>

        {/* Apparition au scroll (voir ScrollReveal), pas sur le même
            minuteur que le titre/texte au-dessus. */}
        <ScrollReveal className="grid md:grid-cols-[1fr_1.3fr] gap-10 md:gap-16">
          <div className="text-lg leading-relaxed text-foreground/80 space-y-4">
            <p>
              Que ce soit pour un court métrage, un clip, une vidéo
              d&apos;entreprise ou une captation d&apos;événement, décrivez-moi
              votre projet et je vous réponds rapidement.
            </p>
            <p>
              Vous pouvez aussi m&apos;écrire directement par mail :{" "}
              <a
                href="mailto:ban.arnaud@outlook.fr"
                className={linkClass}
                aria-label="Envoyer un email à ban.arnaud@outlook.fr"
              >
                ban.arnaud@outlook.fr
              </a>
            </p>
            <p className="text-foreground/60">Avignon, Vaucluse</p>
          </div>

          <ContactForm />
        </ScrollReveal>

        <ScrollReveal className="pt-14 md:pt-20">
          <HomeButton centered={false} />
        </ScrollReveal>
      </PageContainer>
    </PageTransition>
  );
}
