"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Container } from "@/components/Container";
import clsx from "clsx";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

const accents = [
  { key: "indigo", label: "Indigo" },
  { key: "violet", label: "Violet" },
  { key: "sunset", label: "Sunset" },
  { key: "emerald", label: "Emerald" },
];

function AccentPicker() {
  const [accent, setAccent] = useState<string>("indigo");
  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("accent") : null;
    const initial = saved || accent;
    document.documentElement.setAttribute("data-accent", initial);
    setAccent(initial);
  }, []);
  const update = (key: string) => {
    setAccent(key);
    document.documentElement.setAttribute("data-accent", key);
    localStorage.setItem("accent", key);
  };
  return (
    <div className="hidden sm:flex items-center gap-1 rounded-lg border border-neutral-300 dark:border-neutral-700 p-1 bg-white/60 dark:bg-neutral-900/60">
      {accents.map(a => (
        <button
          key={a.key}
          onClick={() => update(a.key)}
          className={clsx(
            "h-7 px-2 rounded-md text-xs",
            accent === a.key ? "text-white brand-gradient" : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
          )}
        >
          {a.label}
        </button>
      ))}
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-neutral-950/60 border-b border-neutral-200/60 dark:border-neutral-800/60">
      <Container>
        <nav className="h-14 flex items-center justify-between gap-3">
          <div className="flex items-center gap-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={clsx(
                  "text-sm font-medium hover:text-brand-600 dark:hover:text-brand-400 transition",
                  pathname === l.href
                    ? "text-brand-700 dark:text-brand-300"
                    : "text-neutral-700 dark:text-neutral-200"
                )}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <AccentPicker />
            <ThemeToggle />
          </div>
        </nav>
      </Container>
    </header>
  );
}

