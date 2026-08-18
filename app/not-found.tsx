import Link from "next/link";
import HomeButton from "@/components/HomeButton";
import PageContainer from "@/components/PageContainer";

export default function NotFound() {
  return (
    <main className="bg-background flex items-center justify-center py-8 md:py-16 min-h-[calc(100vh-80px)]">
      <PageContainer className="text-center">
        {/* Numéro 404 stylisé */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl text-foreground/20 tracking-tight">
            404
          </h1>
        </div>

        {/* Message d'erreur */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl text-foreground mb-4">
            Page introuvable
          </h2>
          <p className="text-xl md:text-2xl text-foreground/70 leading-relaxed max-w-2xl mx-auto">
            Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <div>
            <HomeButton size="lg" centered={false} />
          </div>
          
          <div>
            <Link
              href="/projets"
              className="text-xl text-foreground/70 hover:text-foreground transition-colors duration-300"
            >
              Voir tous les projets
            </Link>
          </div>
        </div>
      </PageContainer>
    </main>
  );
}
