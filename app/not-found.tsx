import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-background flex items-center justify-center py-8 md:py-16 min-h-[calc(100vh-64px)]">
      <div className="w-[calc(100vw-32px)] md:w-[calc(100vw-128px)] mx-auto max-w-4xl text-center">
        {/* Numéro 404 stylisé */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-extrabold text-text/20 tracking-tight">
            404
          </h1>
        </div>

        {/* Message d'erreur */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
            Page introuvable
          </h2>
          <p className="text-lg md:text-xl text-text/70 leading-relaxed max-w-2xl mx-auto">
            Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <div>
            <Link
              href="/"
              className="inline-block px-6 py-3 text-lg font-semibold text-text bg-background border-2 border-text rounded-full hover:bg-text hover:text-background transition-all duration-300"
            >
              Retour à l&apos;accueil
            </Link>
          </div>
          
          <div>
            <Link
              href="/#work"
              className="text-lg text-text/70 hover:text-text transition-colors duration-300"
            >
              Voir tous les projets
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
