import { projects } from "@/data/projects";
export const getProjects = () => projects;
export const getProjectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);

// Maillage interne : projets "à voir aussi" par recoupement de mots-clés et de catégorie.
export const getRelatedProjects = (slug: string, count = 3) => {
  const current = projects.find((p) => p.slug === slug);
  if (!current) return [];

  const currentKeywords = current.keywords
    .toLowerCase()
    .split(",")
    .map((k) => k.trim());

  return projects
    .filter((p) => p.slug !== slug)
    .map((project) => {
      const keywords = project.keywords
        .toLowerCase()
        .split(",")
        .map((k) => k.trim());
      const overlap = keywords.filter((k) => currentKeywords.includes(k)).length;
      const sameCategory = project.subtitle === current.subtitle ? 1 : 0;
      return { project, score: overlap * 2 + sameCategory };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((r) => r.project);
};
