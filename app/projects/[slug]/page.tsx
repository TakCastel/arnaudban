import { getProjects } from "@/lib/getProjects";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const projects = getProjects();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="bg-background py-8 md:py-16">
      {/* Image de couverture */}
      <section className="w-[calc(100vw-32px)] md:w-[70vw] max-w-4xl h-auto mx-auto rounded-2xl overflow-hidden mb-8">
        <Image
          src={project.cover}
          alt={project.title}
          width={1600}
          height={900}
          className="w-full h-auto object-contain"
          priority
        />
      </section>

      {/* Contenu du projet */}
      <div className="w-[calc(100vw-32px)] md:w-[70vw] max-w-4xl mx-auto">
        {/* Titre et sous-titre */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-text mb-4">
            {project.title}
          </h1>
          <p className="text-lg md:text-2xl text-text/80">
            {project.subtitle}
          </p>
        </div>

        {/* Description */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-text/90 leading-relaxed text-base md:text-xl">
            {project.description}
          </p>
        </div>

        {/* Lien retour */}
        <div className="text-center">
          <Link
            href="/"
            className="text-lg text-text/70 hover:text-text transition-colors duration-300"
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
