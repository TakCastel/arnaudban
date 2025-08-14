import Link from "next/link";
import { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <div className="rounded-3xl overflow-hidden relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.cover}
          alt={project.title}
          className="w-full h-64 object-cover transition group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <h3 className="text-xl font-semibold">{project.title}</h3>
        <span className="text-brand-blue text-sm">Voir</span>
      </div>
    </Link>
  );
}
