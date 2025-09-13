import Link from "next/link";
import { Metadata } from "next";

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
    url: "https://arnaudban.com/mentions-legales",
    type: "website",
  },
  alternates: {
    canonical: "/mentions-legales",
  },
};

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-background py-8 md:py-16">
      <div className="w-[calc(100vw-32px)] md:w-[calc(100vw-128px)] mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground mb-12">Mentions légales</h1>
        
        <div className="space-y-8 text-foreground/80 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Éditeur du site</h2>
            <p className="text-lg mb-2">
              Ce site est édité par :
            </p>
            <p className="text-lg">
              <strong>Arnaud Ban</strong> – Réalisateur indépendant
            </p>
            <p className="text-lg">
              Contact : <a 
                href="mailto:ban.arnaud@outlook.fr" 
                className="text-foreground hover:text-foreground/80 transition-colors duration-300"
              >
                ban.arnaud@outlook.fr
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Hébergement</h2>
            <p className="text-lg mb-2">
              Le site est hébergé par :
            </p>
            <p className="text-lg">
              <strong>OVH SAS</strong>
            </p>
            <p className="text-lg">
              2 rue Kellermann – 59100 Roubaix – France
            </p>
            <p className="text-lg">
              <a 
                href="https://www.ovh.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground hover:text-foreground/80 transition-colors duration-300"
              >
                www.ovh.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Développement</h2>
            <p className="text-lg mb-2">
              Conception et développement web :
            </p>
            <p className="text-lg">
              <a 
                href="https://tariktalhaoui.fr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground hover:text-foreground/80 transition-colors duration-300"
              >
                Tarik Talhaoui
              </a> – tariktalhaoui.fr
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Propriété intellectuelle</h2>
            <p className="text-lg mb-4">
              L'ensemble du contenu présent sur ce site (textes, vidéos, images, graphismes, logo, etc.) est protégé par les législations françaises et internationales relatives à la propriété intellectuelle.
            </p>
            <p className="text-lg">
              Toute reproduction, représentation, modification, publication, transmission ou dénaturation, totale ou partielle, du site ou de son contenu, par quelque procédé que ce soit, est interdite sans autorisation préalable de l'auteur.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Responsabilité</h2>
            <p className="text-lg mb-4">
              L'éditeur du site met tout en œuvre pour assurer l'exactitude et la mise à jour des informations diffusées. Cependant, il ne peut garantir l'absence d'erreurs ou d'omissions.
            </p>
            <p className="text-lg">
              Les liens hypertextes présents sur ce site et pointant vers d'autres ressources externes ne sauraient engager la responsabilité d'Arnaud Ban.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Données personnelles</h2>
            <p className="text-lg mb-4">
              Ce site ne collecte pas de données personnelles à des fins commerciales.
            </p>
            <p className="text-lg">
              Pour toute demande concernant vos données, vous pouvez contacter l'éditeur à l'adresse indiquée ci-dessus.
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-foreground/20">
            <Link 
              href="/" 
              className="inline-flex items-center text-foreground/70 hover:text-foreground hover:scale-105 transition-all duration-300 group"
            >
              ← Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
