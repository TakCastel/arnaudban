import { getProjects } from "@/lib/getProjects";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ProjectPageTransition from "@/components/ProjectPageTransition";
import ProjectImageWithLoader from "@/components/ProjectImageWithLoader";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

// Fonction requise pour l'export statique
export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const projects = getProjects();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Projet non trouvé",
      description: "Le projet demandé n'a pas été trouvé.",
    };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} | Arnaud Ban`,
      description: project.description,
      images: [
        {
          url: project.cover,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Arnaud Ban`,
      description: project.description,
      images: [project.cover],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const projects = getProjects();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <ProjectPageTransition>
      {/* Image de couverture */}
      <section className="w-[calc(100vw-32px)] md:w-[70vw] max-w-4xl h-auto mx-auto rounded-2xl overflow-hidden mb-8">
        <img
          src={project.cover}
          alt={`Image de couverture du projet ${project.title}`}
          className="w-full h-auto object-cover rounded-2xl"
          width={1200}
          height={800}
        />
      </section>

      {/* Contenu du projet */}
      <div className="w-[calc(100vw-32px)] md:w-[70vw] max-w-4xl mx-auto">
        {/* Titre et sous-titre */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-text mb-4">
            {project.title}
          </h1>
          <p className="text-lg md:text-2xl text-text/80">
            {project.subtitle}
          </p>
        </header>

        {/* Description */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-text/90 leading-relaxed text-lg md:text-2xl">
            {project.description}
          </p>
        </div>

        {/* Lien retour */}
        <div className="text-center">
          <Link
            href="/"
            className="text-lg text-text/70 hover:text-text transition-colors duration-300"
            aria-label="Retourner à la page d'accueil"
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </ProjectPageTransition>
  );
}
