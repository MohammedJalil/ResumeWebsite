import { projects } from "@/lib/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { Container } from "@/components/Container";

export default function ProjectsPage() {
  return (
    <section className="section">
      <Container>
        <h1 className="text-3xl sm:text-4xl font-bold mb-6">Projects</h1>
        <p className="text-neutral-600 dark:text-neutral-300 mb-8 max-w-2xl">
          A selection of work demonstrating product thinking, engineering depth, and polished UX.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Container>
    </section>
  );
}

