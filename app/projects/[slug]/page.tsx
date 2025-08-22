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
    <main className="min-h-screen bg-white">
      {/* Image de couverture */}
      <section className="w-[90vw] h-[60vh] mx-auto rounded-2xl overflow-hidden mb-12">
        <img
          src={project.cover}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </section>

      {/* Contenu du projet */}
      <div className="w-[90vw] mx-auto">
        {/* Titre et sous-titre */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {project.title}
          </h1>
          <p className="text-xl text-gray-600">
            {project.subtitle}
          </p>
        </div>

        {/* Description */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-gray-700 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Bouton retour */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
