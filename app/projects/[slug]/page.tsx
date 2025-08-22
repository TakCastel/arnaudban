import { getProjects } from "@/lib/getProjects";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProjectPageProps {
  params: { slug: string };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const projects = getProjects();
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Image de couverture */}
      <section className="w-[90vw] h-auto max-h-[50vh] mx-auto rounded-2xl overflow-hidden mb-12">
        <img
          src={project.cover}
          alt={project.title}
          className="w-full h-auto object-contain"
        />
      </section>

      {/* Contenu du projet */}
      <div className="w-[90vw] mx-auto">
        {/* Titre et sous-titre */}
        <div className="mb-12">
          <h1 className="text-6xl font-bold text-text mb-4">
            {project.title}
          </h1>
          <p className="text-2xl text-text/80">
            {project.subtitle}
          </p>
        </div>

        {/* Description */}
        <div className="prose prose-xl max-w-none mb-16">
          <p className="text-text/90 leading-relaxed text-xl">
            {project.description}
          </p>
        </div>

        {/* Bouton retour */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-block px-6 py-3 text-xl font-semibold text-text bg-background border-2 border-text rounded-full hover:bg-text hover:text-background transition-all duration-300"
          >
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
