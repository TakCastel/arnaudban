import { getProjects } from "@/lib/getProjects";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ProjectPageTransition from "@/components/ProjectPageTransition";
import ProjectImageWithSkeleton from "@/components/ProjectImageWithSkeleton";
import VimeoWithFallback from "@/components/VimeoWithFallback";
import { projects as allProjects, Project } from "@/data/projects";
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
  const project = projects.find((p) => p.slug === slug) as Project | undefined;

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

        {/* Média principal: vidéo Vimeo avec fallback automatique vers image */}
        {project.videoUrl ? (
          <VimeoWithFallback
            videoUrl={project.videoUrl}
            fallbackImage={project.cover}
            title={project.title}
            alt={`Image de couverture du projet ${project.title}`}
          />
        ) : (
          <ProjectImageWithSkeleton
            src={project.cover}
            alt={`Image de couverture du projet ${project.title}`}
            title={project.title}
          />
        )}

        {/* Section avec 2/3 + 1/3 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Colonne 1: Description */}
          <div className="prose prose-lg max-w-none lg:col-span-2">
            <h2 className="sr-only">
              Description
            </h2>
            <p className="text-foreground/90 leading-relaxed text-base md:text-lg lg:text-xl">
              {project.description}
            </p>
          </div>

          {/* Colonne 2: Date et Mots-clés */}
          <div className="prose prose-lg max-w-none lg:col-span-1 text-right">
            <h2 className="sr-only">
              Informations
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="sr-only">
                  Date
                </h3>
                <p className="text-foreground/90 text-base md:text-lg lg:text-xl">
                  <strong className="font-semibold">{project.date}</strong>
                </p>
              </div>
              <div>
                <h3 className="sr-only">
                  Mots-clés
                </h3>
                <p className="text-foreground/90 text-base md:text-lg lg:text-xl">
                  <strong className="font-semibold">{project.keywords}</strong>
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
