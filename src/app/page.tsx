import Link from "next/link";
import { skills } from "@/lib/data/skills";
import { projects } from "@/lib/data/projects";
import { siteConfig } from "@/lib/data/site";
import { Badge } from "@/components/Badge";
import { ProjectCard } from "@/components/ProjectCard";
import { Container } from "@/components/Container";

export default function HomePage() {
  return (
    <div>
      <section className="section relative overflow-hidden">
        <div className="absolute inset-0 bg-[length:var(--grid-size)_var(--grid-size)] bg-grid dark:bg-grid-dark pointer-events-none" />
        <Container>
          <div className="relative">
            <p className="text-sm text-brand-600 dark:text-brand-400 mb-3">Open to opportunities</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 brand-text">
              {siteConfig.name}
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mb-6">
              {siteConfig.description}
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <Link href={siteConfig.resumeUrl} className="inline-flex items-center px-4 py-2 rounded-lg text-white brand-gradient hover:opacity-90 transition">
                Download Resume
              </Link>
              <Link href="/projects" className="inline-flex items-center px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">
                View Projects
              </Link>
              <Link href="/contact" className="inline-flex items-center px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">
                Contact
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <Badge key={s} label={s} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl font-semibold">Featured Projects</h2>
            <Link href="/projects" className="text-brand-600 dark:text-brand-400 hover:underline">See all</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 3).map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}

