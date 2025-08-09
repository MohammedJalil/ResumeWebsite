import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/lib/data/projects";
import { Badge } from "@/components/Badge";
import { Container } from "@/components/Container";
import Link from "next/link";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return { title: "Project" };
  return { title: project.title, description: project.description };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return notFound();

  return (
    <section className="section">
      <Container>
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">{project.title}</h1>
          <p className="text-neutral-600 dark:text-neutral-300 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((t) => (
              <Badge key={t} label={t} />
            ))}
          </div>
          <div className="flex gap-4">
            {project.link && (
              <Link className="text-brand-600 dark:text-brand-400 hover:underline" href={project.link}>
                Live
              </Link>
            )}
            {project.repo && (
              <Link className="text-brand-600 dark:text-brand-400 hover:underline" href={project.repo}>
                Code
              </Link>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

