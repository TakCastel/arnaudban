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
    </main>
  );
}
