import Link from "next/link";
import { getProjects, getRelatedProjects } from "@/lib/getProjects";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ProjectPageTransition from "@/components/ProjectPageTransition";
import ProjectImageWithSkeleton from "@/components/ProjectImageWithSkeleton";
import VimeoWithFallback from "@/components/VimeoWithFallback";
import ProjectReel from "@/components/ProjectReel";
import Cut from "@/components/Cut";
import Words from "@/components/Words";
import Slugline from "@/components/Slugline";
import { Project } from "@/data/projects";

// Petit intertitre de bloc (synopsis, à voir aussi…) : même grammaire que la
// Slugline, sans le trait qui court jusqu'au bord.
const labelClass = "font-heading uppercase tracking-[0.2em] text-xs md:text-sm";

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
      url: `https://arnaudban.fr/projects/${project.slug}`,
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
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];

  if (!project) {
    notFound();
  }

  const relatedProjects = getRelatedProjects(slug);
  // Plan suivant : le projet d'après dans l'ordre de la bobine (accueil,
  // /projets), en bouclant sur le premier après le dernier.
  const nextProject = projects[(index + 1) % projects.length];
  const roles = project.keywords
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);

  const videoJsonLd = project.videoUrl
    ? {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: `${project.title} - ${project.subtitle}`,
        description: project.description,
        thumbnailUrl: `https://arnaudban.fr${project.cover}`,
        uploadDate: `${project.date}-01-01`,
        embedUrl: project.videoUrl,
        creator: {
          "@type": "Person",
          name: "Arnaud Ban",
        },
      }
    : null;

  return (
    <ProjectPageTransition>
      {videoJsonLd && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
        />
      )}

      {/* CARTON-TITRE — la ligne de séquence, puis le titre plein cadre. */}
      <header className="pt-12 md:pt-20 pb-10 md:pb-16">
        <Slugline>
          {project.subtitle} — {project.date}
        </Slugline>
        <Cut className="px-4 md:px-10">
          <h1 className="font-heading font-bold uppercase leading-[0.86] pt-[0.16em] tracking-tighter text-[18vw] md:text-[11vw] break-words hyphens-auto">
            <Words>{project.title}</Words>
          </h1>
        </Cut>
      </header>

      {/* PROJECTION — la salle : un aplat noir et des bandes généreuses.
          Vidéo : le lecteur garde son 16:9 et sa largeur est bornée pour
          tenir dans l'écran sous le header. Sans vidéo : la couverture,
          cadrée en 2.39:1 sur toute la largeur. */}
      <section aria-label="Projection" className="bg-black text-[var(--beige)] px-4 md:px-10 py-8 md:py-14">
        <div
          className={`mx-auto w-full ${
            project.videoUrl ? "max-w-[calc((100svh-12rem)*16/9)]" : ""
          }`}
        >
          <div className={`${labelClass} flex justify-between gap-4 mb-3 md:mb-4 opacity-70`}>
            <span>{project.videoUrl ? "Projection" : "Photogramme"}</span>
            <span aria-hidden="true">{project.videoUrl ? "16:9" : "2.39:1"}</span>
          </div>
          {/* Le cadre s'ouvre en volet à l'entrée dans l'écran. */}
          <Cut>
          <div className="wipe">
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
          </div>
          </Cut>
        </div>
      </section>

      {/* SYNOPSIS — le texte posé à droite, comme sur une fiche de film ;
          à gauche, la fiche technique en lignes fines. */}
      <section aria-labelledby="synopsis-title" className="px-4 md:px-10 pt-16 md:pt-28 pb-20 md:pb-32">
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-12">
          <Cut className="md:order-2">
            <h2 id="synopsis-title" className={`${labelClass} opacity-70 mb-5 md:mb-8`}>
              Synopsis
            </h2>
            <p className="text-[clamp(1.25rem,2.1vw,2rem)] leading-[1.3] tracking-[-0.01em] max-w-[34ch]">
              {project.description}
            </p>
          </Cut>

          <Cut className="md:order-1 md:pr-[8vw]">
            <h2 className="sr-only">Informations</h2>
            <dl className="border-b border-foreground/20">
              <div className="grid grid-cols-[6.5rem_1fr] md:grid-cols-[8rem_1fr] gap-4 border-t border-foreground/20 py-3 md:py-4">
                <dt className={`${labelClass} opacity-70 pt-[0.15em]`}>Format</dt>
                <dd>{project.subtitle}</dd>
              </div>
              <div className="grid grid-cols-[6.5rem_1fr] md:grid-cols-[8rem_1fr] gap-4 border-t border-foreground/20 py-3 md:py-4">
                <dt className={`${labelClass} opacity-70 pt-[0.15em]`}>Année</dt>
                <dd className="tabular-nums">{project.date}</dd>
              </div>
              <div className="grid grid-cols-[6.5rem_1fr] md:grid-cols-[8rem_1fr] gap-4 border-t border-foreground/20 py-3 md:py-4">
                <dt className={`${labelClass} opacity-70 pt-[0.15em]`}>Postes</dt>
                <dd>
                  <ul className="flex flex-wrap gap-x-5 gap-y-2">
                    {roles.map((role) => (
                      <li key={role} className={labelClass}>
                        {role}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </Cut>
        </div>
      </section>

      {/* À VOIR AUSSI — maillage interne, en bobine typographique. */}
      {relatedProjects.length > 0 && (
        <section aria-labelledby="related-title" className="pb-16 md:pb-24">
          <p className={`${labelClass} flex items-baseline gap-4 px-4 md:px-10 mb-6 md:mb-10`}>
            <span id="related-title">À voir aussi</span>
            <span aria-hidden="true" className="flex-1 h-px bg-current opacity-30 translate-y-[-0.3em]" />
          </p>
          <ProjectReel projects={relatedProjects} />
        </section>
      )}

      {/* PLAN SUIVANT — un raccord vers le film d'après, sur fond encre
          pour marquer la fin de la séquence. */}
      <nav aria-label="Projet suivant" className="bg-[var(--ink)] text-[var(--beige)] border-t border-foreground/20">
        <Link
          href={`/projects/${nextProject.slug}`}
          className="group block px-4 md:px-10 pt-12 md:pt-20 pb-14 md:pb-24 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-6px] focus-visible:outline-[var(--beige)]"
        >
          <span className={`${labelClass} flex items-center gap-3`}>
            Plan suivant
            <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-2">
              →
            </span>
          </span>
          <span className="mt-4 md:mt-6 block font-heading font-bold uppercase leading-[0.86] pt-[0.16em] tracking-tighter text-[16vw] md:text-[10vw] break-words transition-transform duration-500 ease-out group-hover:translate-x-4">
            <Words>{nextProject.title}</Words>
          </span>
          <span className="mt-5 md:mt-7 block text-sm md:text-base opacity-70">
            {nextProject.subtitle}
            <span className="mx-2" aria-hidden="true">·</span>
            {nextProject.date}
          </span>
        </Link>
        <div className="px-4 md:px-10 py-6 border-t border-[color-mix(in_srgb,var(--beige)_20%,transparent)] flex justify-end">
          <Link
            href="/projets"
            className={`group ${labelClass} inline-flex items-center gap-3`}
          >
            Tous les projets ({projects.length})
            <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-2">
              →
            </span>
          </Link>
        </div>
      </nav>
    </ProjectPageTransition>
  );
}
