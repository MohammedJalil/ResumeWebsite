import Link from "next/link";
import { skills } from "@/lib/data/skills";
import { projects } from "@/lib/data/projects";
import { experiences } from "@/lib/data/experience";
import { siteConfig } from "@/lib/data/site";
import { Badge } from "@/components/Badge";
import { ProjectCard } from "@/components/ProjectCard";
import { Container } from "@/components/Container";
import { SocialLinks } from "@/components/SocialLinks";

export default function HomePage() {
  return (
    <div>
      <section className="section relative overflow-hidden">
        <div className="absolute inset-0 bg-[length:var(--grid-size)_var(--grid-size)] bg-grid dark:bg-grid-dark pointer-events-none" />
        {/* Decorative blobs */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="blob absolute -top-10 -left-10 w-64 h-64 rounded-full" style={{ background: "radial-gradient(circle at 30% 30%, var(--acc-start), transparent 60%)" }} />
          <div className="blob absolute bottom-0 right-10 w-72 h-72 rounded-full" style={{ background: "radial-gradient(circle at 70% 70%, var(--acc-end), transparent 60%)" }} />
        </div>
        <Container>
          <div className="relative">
            <p className="text-sm text-brand-600 dark:text-brand-400 mb-3">Open to opportunities</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 brand-text">
              {siteConfig.name}
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mb-6">
              {siteConfig.description}
            </p>
            <div className="flex items-center gap-4 mb-6">
              <SocialLinks size="lg" />
            </div>
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

      <section className="section">
        <Container>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Experience Snapshot</h2>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <p className="text-neutral-600 dark:text-neutral-300 mb-4">A quick overview of recent roles and impact.</p>
              <Link href="/experience" className="inline-flex items-center px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">View full experience</Link>
            </div>
            <div className="card brand-outline p-5">
              <div className="bar-gradient mb-3 rounded" />
              {/* Inline compact timeline to echo developerFolio style */}
              <ul className="space-y-3">
                {experiences.slice(0, 3).map((e) => (
                  <li key={`${e.company}-${e.start}`}>
                    <p className="text-sm font-medium brand-text">{e.role} · {e.company}</p>
                    <p className="text-xs text-neutral-500">{e.start} – {e.end}</p>
                    {e.highlights[0] && (
                      <p className="text-sm text-neutral-700 dark:text-neutral-200 mt-1">{e.highlights[0]}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

