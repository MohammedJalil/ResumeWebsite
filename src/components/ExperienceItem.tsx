import type { Experience } from "@/lib/data/experience";

export function ExperienceItem({ item }: { item: Experience }) {
  return (
    <div className="card brand-outline p-5">
      <div className="bar-gradient mb-3 rounded" />
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-lg font-semibold leading-tight brand-text">
          {item.role} · {item.company}
        </h3>
        <p className="text-sm text-neutral-500">
          {item.start} – {item.end}
        </p>
      </div>
      {item.location && (
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{item.location}</p>
      )}
      <ul className="list-disc pl-5 mt-3 space-y-1 text-sm text-neutral-700 dark:text-neutral-200">
        {item.highlights.map((h, i) => (
          <li key={i}>{h}</li>
        ))}
      </ul>
    </div>
  );
}

