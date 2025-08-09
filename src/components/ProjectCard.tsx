import Link from "next/link";
import { Badge } from "@/components/Badge";
import type { Project } from "@/lib/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="card brand-outline p-5 flex flex-col gap-4">
      <div>
        <h3 className="text-lg font-semibold leading-tight brand-text">{project.title}</h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">
          {project.description}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <Badge key={t} label={t} />
        ))}
      </div>
      <div className="mt-auto flex gap-3">
        {project.link && (
          <Link href={project.link} className="text-brand-600 dark:text-brand-400 hover:underline text-sm">
            Live
          </Link>
        )}
        {project.repo && (
          <Link href={project.repo} className="text-brand-600 dark:text-brand-400 hover:underline text-sm">
            Code
          </Link>
        )}
      </div>
    </div>
  );
}

