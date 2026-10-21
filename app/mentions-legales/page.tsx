import Link from "next/link";
import { Metadata } from "next";
import Cut from "@/components/Cut";
import Words from "@/components/Words";
import Slugline from "@/components/Slugline";

export const metadata: Metadata = {
  title: "Mentions légales - Arnaud Ban | Réalisateur & Monteur Vidéo",
  description: "Mentions légales du site d'Arnaud Ban, réalisateur indépendant spécialisé en montage et étalonnage vidéo à Avignon.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Mentions légales - Arnaud Ban",
    description: "Mentions légales du site d'Arnaud Ban, réalisateur indépendant à Avignon.",
    url: "https://arnaudban.fr/mentions-legales",
    type: "website",
  },
  alternates: {
    canonical: "/mentions-legales",
  },
};

// Lien dans le corps du texte : trait fin, épaissi au survol.
const inlineLink =
  "underline decoration-1 underline-offset-[0.14em] hover:decoration-2";

// Une rubrique = une ligne filet numérotée, comme une séquence du montage.
const sections: { title: string; content: React.ReactNode }[] = [
  {
    title: "Éditeur du site",
    content: (
      <>
        <p>Ce site est édité par :</p>
        <p>
          <strong className="font-semibold">Arnaud Ban</strong> – Réalisateur indépendant
        </p>
        <p>
          Contact :{" "}
          <a href="mailto:ban.arnaud@outlook.fr" className={inlineLink}>
            ban.arnaud@outlook.fr
          </a>
        </p>
      </>
    ),
  },
  {
    title: "Hébergement",
    content: (
      <>
        <p>Le site est hébergé par :</p>
        <p>
          <strong className="font-semibold">OVH SAS</strong>
        </p>
        <p>2 rue Kellermann – 59100 Roubaix – France</p>
        <p>
          <a href="https://www.ovh.com" target="_blank" rel="noopener noreferrer" className={inlineLink}>
            www.ovh.com
          </a>
        </p>
      </>
    ),
  },
  {
    title: "Développement",
    content: (
      <>
        <p>Conception et développement web :</p>
        <p>
          <a href="https://github.com/TakCastel" target="_blank" rel="noopener noreferrer" className={inlineLink}>
            Tarik Talhaoui
          </a>{" "}
          – tariktalhaoui.fr
        </p>
      </>
    ),
  },
  {
    title: "Propriété intellectuelle",
    content: (
      <>
        <p>
          L&apos;ensemble du contenu présent sur ce site (textes, vidéos, images, graphismes, logo, etc.) est protégé par les législations françaises et internationales relatives à la propriété intellectuelle.
        </p>
        <p>
          Toute reproduction, représentation, modification, publication, transmission ou dénaturation, totale ou partielle, du site ou de son contenu, par quelque procédé que ce soit, est interdite sans autorisation préalable de l&apos;auteur.
        </p>
      </>
    ),
  },
  {
    title: "Responsabilité",
    content: (
      <>
        <p>
          L&apos;éditeur du site met tout en œuvre pour assurer l&apos;exactitude et la mise à jour des informations diffusées. Cependant, il ne peut garantir l&apos;absence d&apos;erreurs ou d&apos;omissions.
        </p>
        <p>
          Les liens hypertextes présents sur ce site et pointant vers d&apos;autres ressources externes ne sauraient engager la responsabilité d&apos;Arnaud Ban.
        </p>
      </>
    ),
  },
  {
    title: "Données personnelles",
    content: (
      <>
        <p>Ce site ne collecte pas de données personnelles à des fins commerciales.</p>
        <p>
          Pour toute demande concernant vos données, vous pouvez contacter l&apos;éditeur à l&apos;adresse indiquée ci-dessus.
        </p>
      </>
    ),
  },
];

export default function MentionsLegalesPage() {
  return (
    // Pas de <main> ici : le layout en fournit déjà un (un seul par page).
    <div className="bg-background text-foreground pt-12 md:pt-20 pb-24 md:pb-32">
      <Slugline>Générique — Mentions légales</Slugline>
      <Cut className="px-4 md:px-10 mb-16 md:mb-24">
        <h1 className="font-heading font-bold uppercase leading-[1] md:leading-[0.86] pt-[0.16em] tracking-tighter text-[16vw] md:text-[11vw]">
          <Words>Mentions légales</Words>
        </h1>
      </Cut>

      <ol>
        {sections.map((section) => (
          <li key={section.title} className="border-t border-foreground/20">
            <Cut as="section" className="grid md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] gap-x-4 gap-y-3 px-4 md:px-10 py-8 md:py-10">
              <h2 className="font-heading uppercase tracking-[0.2em] text-sm md:text-base md:pt-1">
                {section.title}
              </h2>
              <div className="space-y-2 text-base md:text-lg leading-relaxed opacity-80 max-w-2xl">
                {section.content}
              </div>
            </Cut>
          </li>
        ))}
      </ol>

      <div className="px-4 md:px-10 pt-8 border-t border-foreground/20">
        <Link
          href="/"
          className="group font-heading uppercase tracking-[0.2em] text-sm md:text-base inline-flex items-center gap-3"
        >
          <span aria-hidden="true" className="inline-block transition-transform group-hover:-translate-x-2">←</span>
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
