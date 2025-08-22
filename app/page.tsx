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
          bg-blue-50
          px-4 md:px-8 py-24
        "
      >
        <SectionTitle title="Sélection" subtitle="Projects" />
        <MosaicGrid projects={items} />
      </section>
    </main>
  );
}
