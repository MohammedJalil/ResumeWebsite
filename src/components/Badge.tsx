export function Badge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full brand-outline px-2.5 py-1 text-xs text-neutral-800 dark:text-neutral-100 bg-white/60 dark:bg-neutral-900/60">
      {label}
    </span>
  );
}

