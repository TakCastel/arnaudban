import HeroSection from "@/components/HeroSection";
import MosaicGrid from "@/components/MosaicGrid";
import SectionTitle from "@/components/SectionTitle";
import { getProjects } from "@/lib/getProjects";

export default function HomePage() {
  const items = getProjects();
  return (
    <main>
      <HeroSection id="top" />

             {/* SECTION WORK */}
       <section
         id="work"
         className="
           relative z-20
           w-[calc(100vw-32px)] md:w-[calc(100vw-128px)] mx-auto
           rounded-t-2xl
           bg-background
           px-4 md:px-8 py-12 md:py-24
         "
       >
        <SectionTitle title="Sélection" subtitle="Projects" />
        <MosaicGrid projects={items} />
      </section>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       {/* FOOTER */}
                                                                                     <footer className="w-full bg-background mt-0 py-12 md:py-24 relative z-30">
           <div className="w-[calc(100vw-32px)] md:w-[calc(100vw-128px)] mx-auto">
             <div className="bg-text text-background rounded-2xl overflow-hidden px-4 md:px-8 py-12 md:py-24">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-5xl font-bold mb-16 tracking-tight">À PROPOS</h2>
                
                <div className="space-y-8 text-xl leading-relaxed">
                  <p className="text-2xl">
                    Salut ! Je m&apos;appelle <span className="font-bold">Arnaud Ban</span> et je suis un réalisateur indépendant qui travaille sur Avignon.
                  </p>
                  
                  <p className="text-xl">
                    Mes spécialités sont le <span className="font-semibold">montage</span> et l&apos;<span className="font-semibold">étalonnage</span>.
                  </p>
                  
                  <p className="text-lg">
                    Pour toute demande professionnelle, merci de me contacter par mail :{' '}
                    <a 
                      href="mailto:ban.arnaud@outlook.fr" 
                      className="font-medium hover:underline transition-colors duration-300"
                    >
                      ban.arnaud@outlook.fr
                    </a>
                  </p>
                </div>
                
                {/* Mentions légales */}
                <div className="mt-16 pt-8 border-t border-background/20">
                  <p className="text-sm text-background/70 text-center">
                    <a 
                      href="/mentions-legales" 
                      className="hover:underline transition-colors duration-300"
                    >
                      Mentions légales
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
    </main>
  );
}
