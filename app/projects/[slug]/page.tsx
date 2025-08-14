import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/getProject";
import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import VideoPlayer from "@/components/VideoPlayer";

type Props = { params: { slug: string } };

export default function ProjectPage({ params }: Props) {
  const project = getProjectBySlug(params.slug);
  if (!project) return notFound();

  return (
    <main>
      <Container className="py-16">
        <SectionTitle title={project.title} subtitle={project.subtitle} />
      </Container>

      {/* hero wide video or cover */}
      {project.vimeoId && (
        <div className="container pb-12">
          <VideoPlayer
            vimeoId={project.vimeoId}
            className="rounded-3xl overflow-hidden"
          />
        </div>
      )}

      {/* content blocks */}
      <Container className="grid gap-10 pb-24">
        {project.blocks?.map((b, i) => {
          if (b.type === "video")
            return (
              <VideoPlayer
                key={i}
                vimeoId={b.vimeoId}
                className="rounded-3xl overflow-hidden"
              />
            );
          if (b.type === "image")
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={b.src}
                alt={b.alt ?? ""}
                className="rounded-3xl w-full object-cover"
              />
            );
          return (
            <div
              key={i}
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: b.html }}
            />
          );
        })}
      </Container>
    </main>
  );
}
