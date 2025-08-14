import { projects } from "@/data/projects";
export const getProjects = () => projects;
export const getProjectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);
