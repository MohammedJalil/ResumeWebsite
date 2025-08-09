import Link from "next/link";
import { siteConfig } from "@/lib/data/site";
import { Container } from "@/components/Container";

export default function ContactPage() {
  return (
    <section className="section">
      <Container>
        <h1 className="text-3xl sm:text-4xl font-bold mb-6">Get in touch</h1>
        <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mb-6">
          I’m open to full-time roles, contracts, or collaborations. Email me or reach out on social.
        </p>
        <div className="space-y-3">
          <a className="text-brand-600 dark:text-brand-400 hover:underline" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <div className="flex gap-4">
            <Link className="hover:underline" href={siteConfig.socials.github}>GitHub</Link>
            <Link className="hover:underline" href={siteConfig.socials.linkedin}>LinkedIn</Link>
            {siteConfig.socials.twitter && (
              <Link className="hover:underline" href={siteConfig.socials.twitter}>X/Twitter</Link>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

