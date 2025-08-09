"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const active = theme === "system" ? resolvedTheme : theme;

  if (!mounted) return (
    <button className="h-9 w-9 rounded-lg border border-neutral-300 dark:border-neutral-700" aria-label="Toggle theme" />
  );

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(active === "dark" ? "light" : "dark")}
      className="h-9 w-9 rounded-lg border border-neutral-300 dark:border-neutral-700 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
    >
      {active === "dark" ? (
        <span>🌙</span>
      ) : (
        <span>☀️</span>
      )}
    </button>
  );
}

