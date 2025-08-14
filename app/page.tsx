import HeroSection from "@/components/HeroSection";
import MosaicGrid from "@/components/MosaicGrid";
import SectionTitle from "@/components/SectionTitle";
import { getProjects } from "@/lib/getProjects";

export default function HomePage() {
  const items = getProjects();
  return (
    <main>
      <HeroSection id="top" />

      <section id="work" className="container py-24">
        <SectionTitle title="Sélection" subtitle="Projects" />
        <MosaicGrid projects={items} />
      </section>

      <section id="about" className="container py-24 max-w-3xl">
        <SectionTitle title="À propos" />
        <p className="text-lg leading-relaxed">
          Réalisateur — esthétique épurée, noir & blanc, bleu sur blanc par
          touches…
        </p>
      </section>

      <section id="contact" className="container py-24">
        <a
          className="text-2xl font-semibold rounded-full px-6 py-3 border hover:opacity-80 transition"
          href="mailto:contact@arnaudban.com"
        >
          F24 — Discutons
        </a>
      </section>
    </main>
  );
}
