import { siteConfig } from "@/lib/data/site";
import { Container } from "@/components/Container";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-neutral-200/60 dark:border-neutral-800/60 pt-0">
      <div className="bar-gradient w-full" />
      <div className="py-6 text-sm">
        <Container>
          <div className="flex items-center justify-between">
            <p className="text-neutral-600 dark:text-neutral-400">
              © {year} {siteConfig.name}. All rights reserved.
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}

