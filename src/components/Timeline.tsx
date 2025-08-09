import type { Experience } from "@/lib/data/experience";

export function Timeline({ items }: { items: Experience[] }) {
  return (
    <ol className="relative border-s border-neutral-200 dark:border-neutral-800 ml-3">
      {items.map((it) => (
        <li key={`${it.company}-${it.start}`} className="mb-8 ms-6">
          <span className="absolute -start-2.5 flex h-5 w-5 items-center justify-center rounded-full brand-gradient" />
          <h3 className="text-base font-semibold brand-text">
            {it.role} · {it.company}
          </h3>
          <p className="text-xs text-neutral-500">{it.start} – {it.end}</p>
          {it.location && (
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">{it.location}</p>
          )}
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-neutral-700 dark:text-neutral-200">
            {it.highlights.slice(0, 3).map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}


