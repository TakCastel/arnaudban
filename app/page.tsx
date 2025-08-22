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
          relative
          sticky top-20
          w-[90vw] mx-auto
          rounded-2xl
          bg-background
          px-4 md:px-8 py-24
        "
      >
        <SectionTitle title="Sélection" subtitle="Projects" />
        <MosaicGrid projects={items} />
      </section>

      {/* SECTION DE TEST DES COULEURS - À SUPPRIMER APRÈS */}
      <section className="w-[90vw] mx-auto mt-8 p-8 bg-background rounded-2xl">
        <h2 className="text-4xl font-bold text-text mb-6">Test des couleurs personnalisées</h2>
        <div className="space-y-6">
          <div className="p-6 bg-background border border-text/20 rounded">
            <p className="text-text text-xl">Texte principal avec text-text</p>
            <p className="text-text/80 text-lg">Texte secondaire avec text-text/80</p>
            <p className="text-text/60 text-lg">Texte tertiaire avec text-text/60</p>
          </div>
          <div className="p-6 bg-text text-background rounded">
            <p className="text-xl">Fond avec bg-text et texte avec text-background</p>
          </div>
        </div>
      </section>
    </main>
  );
}
