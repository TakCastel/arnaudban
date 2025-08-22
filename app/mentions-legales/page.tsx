export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-background py-8 md:py-16">
      <div className="w-[calc(100vw-32px)] md:w-[calc(100vw-128px)] mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-text mb-12">Mentions légales</h1>
        
        <div className="space-y-8 text-text/80 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-text mb-4">Éditeur du site</h2>
            <p className="text-lg">
              Ce site web appartient à <strong>Arnaud Ban</strong>, réalisateur indépendant.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text mb-4">Hébergement</h2>
            <p className="text-lg">
              Ce site est hébergé sur un VPS OVH.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text mb-4">Développement</h2>
            <p className="text-lg">
              Ce site web a été développé par{' '}
              <a 
                href="https://tariktalhaoui.fr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline transition-colors duration-300"
              >
                Tarik Talhaoui
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text mb-4">Contact</h2>
            <p className="text-lg">
              Pour toute question concernant ce site, vous pouvez me contacter à l'adresse :{' '}
              <a 
                href="mailto:ban.arnaud@outlook.fr" 
                className="text-text hover:underline transition-colors duration-300"
              >
                ban.arnaud@outlook.fr
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text mb-4">Propriété intellectuelle</h2>
            <p className="text-lg">
              L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. 
              Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text mb-4">Liens hypertextes</h2>
            <p className="text-lg">
              Les liens hypertextes mis en place dans le cadre du présent site web en direction d'autres ressources présentes sur le réseau Internet ne sauraient engager la responsabilité d'Arnaud Ban.
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-text/20">
            <a 
              href="/" 
              className="text-text/70 hover:text-text transition-colors duration-300"
            >
              ← Retour à l'accueil
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
