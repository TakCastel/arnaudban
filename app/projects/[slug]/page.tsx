import { getProjects } from "@/lib/getProjects";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ProjectPageTransition from "@/components/ProjectPageTransition";
import ProjectImageWithSkeleton from "@/components/ProjectImageWithSkeleton";
import HomeButton from "@/components/HomeButton";

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
      title: "Projet non trouvé - Arnaud Ban",
      description: "Le projet demandé n'a pas été trouvé.",
    };
  }

  // Générer des mots-clés basés sur le projet
  const keywords = [
    "Arnaud Ban",
    "réalisateur Avignon",
    "montage vidéo",
    "étalonnage",
    project.title.toLowerCase(),
    ...project.subtitle.toLowerCase().split(' ').filter(word => word.length > 3)
  ];

  return {
    title: `${project.title} - ${project.subtitle} | Arnaud Ban`,
    description: `${project.description} Découvrez ce projet réalisé par Arnaud Ban, réalisateur et monteur vidéo à Avignon.`,
    keywords,
    authors: [{ name: "Arnaud Ban" }],
    creator: "Arnaud Ban",
    openGraph: {
      title: `${project.title} - ${project.subtitle} | Arnaud Ban`,
      description: `${project.description} Projet réalisé par Arnaud Ban, réalisateur et monteur vidéo à Avignon.`,
      url: `https://arnaudban.com/projects/${project.slug}`,
      type: "article",
      images: [
        {
          url: project.cover,
          width: 1200,
          height: 630,
          alt: `${project.title} - Projet réalisé par Arnaud Ban`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} - ${project.subtitle} | Arnaud Ban`,
      description: `${project.description} Projet réalisé par Arnaud Ban.`,
      images: [project.cover],
    },
    alternates: {
      canonical: `/projects/${project.slug}`,
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
      {/* Contenu du projet */}
      <div className="w-[calc(100vw-32px)] md:w-[70vw] max-w-4xl mx-auto">
        {/* Titre et sous-titre */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-foreground mb-4">
            {project.title}
          </h1>
          <p className="text-xl md:text-3xl lg:text-4xl text-foreground/80">
            {project.subtitle}
          </p>
        </header>

        {/* Image de couverture avec skeleton */}
        <ProjectImageWithSkeleton
          src={project.cover}
          alt={`Image de couverture du projet ${project.title}`}
          title={project.title}
        />

        {/* Section avec 2 colonnes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Colonne 1: Description */}
          <div className="prose prose-lg max-w-none">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Description
            </h2>
            <p className="text-foreground/90 leading-relaxed text-base md:text-lg lg:text-xl">
              {project.description}
            </p>
          </div>

          {/* Colonne 2: Date et Mots-clés */}
          <div className="prose prose-lg max-w-none">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Informations
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground mb-2">
                  Date
                </h3>
                <p className="text-foreground/90 text-base md:text-lg lg:text-xl">
                  {project.date}
                </p>
              </div>
              <div>
                <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground mb-2">
                  Mots-clés
                </h3>
                <p className="text-foreground/90 text-base md:text-lg lg:text-xl">
                  {project.keywords}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bouton retour */}
        <div className="pt-8">
          <HomeButton />
        </div>
      </div>
    </ProjectPageTransition>
  );
}
