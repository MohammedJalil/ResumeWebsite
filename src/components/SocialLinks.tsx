import { siteConfig } from "@/lib/data/site";

type Size = "sm" | "md" | "lg";

const sizeToClasses: Record<Size, string> = {
  sm: "h-9 w-9",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};

function IconGithub(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2C6.477 2 2 6.486 2 12.021c0 4.424 2.865 8.176 6.839 9.504.5.093.683-.219.683-.486 0-.24-.01-1.035-.015-1.88-2.782.605-3.369-1.188-3.369-1.188-.455-1.164-1.11-1.474-1.11-1.474-.908-.623.069-.61.069-.61 1.004.071 1.532 1.034 1.532 1.034.892 1.533 2.341 1.09 2.91.834.092-.65.35-1.09.636-1.342-2.22-.254-4.555-1.114-4.555-4.957 0-1.095.39-1.99 1.029-2.69-.103-.254-.446-1.276.098-2.66 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 7.07c.852.004 1.709.116 2.51.34 1.908-1.296 2.746-1.027 2.746-1.027.546 1.385.203 2.407.1 2.661.64.701 1.028 1.595 1.028 2.69 0 3.853-2.339 4.7-4.566 4.949.359.31.678.92.678 1.855 0 1.337-.012 2.416-.012 2.744 0 .27.18.584.69.485A9.526 9.526 0 0 0 22 12.02C22 6.485 17.522 2 12 2Z" />
    </svg>
  );
}

function IconLinkedIn(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M4.983 3.5C4.983 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.483 1.12 2.483 2.5ZM.3 22h4.4V7.9H.3V22ZM8.6 7.9V22h4.4v-7.7c0-2.04 1.72-2.15 1.72 0V22H19V12.6c0-5.36-5.8-5.17-6.98-2.53V7.9H8.6Z" />
    </svg>
  );
}

function IconMail(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M2 5.5A2.5 2.5 0 0 1 4.5 3h15A2.5 2.5 0 0 1 22 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 18.5v-13Zm2.5-.5a.5.5 0 0 0-.5.5v.243l8.5 5.312 8.5-5.312V5.5a.5.5 0 0 0-.5-.5h-16ZM21 8.4l-7.93 4.957a1.5 1.5 0 0 1-1.54 0L3 8.401V18.5a.5.5 0 0 0 .5.5h16a.5.5 0 0 0 .5-.5V8.4Z" />
    </svg>
  );
}

export function SocialLinks({ size = "md" as Size }: { size?: Size }) {
  const classes = sizeToClasses[size];
  const iconClasses = "h-5 w-5";

  return (
    <div className="flex items-center gap-3">
      {siteConfig.socials.github && (
        <a
          href={siteConfig.socials.github}
          target="_blank"
          rel="noreferrer"
          className={`brand-outline ${classes} rounded-lg flex items-center justify-center hover:shadow-md transition-shadow`}
          aria-label="GitHub"
        >
          <IconGithub className={iconClasses} />
        </a>
      )}
      {siteConfig.socials.linkedin && (
        <a
          href={siteConfig.socials.linkedin}
          target="_blank"
          rel="noreferrer"
          className={`brand-outline ${classes} rounded-lg flex items-center justify-center hover:shadow-md transition-shadow`}
          aria-label="LinkedIn"
        >
          <IconLinkedIn className={iconClasses} />
        </a>
      )}
      {siteConfig.email && (
        <a
          href={`mailto:${siteConfig.email}`}
          className={`brand-outline ${classes} rounded-lg flex items-center justify-center hover:shadow-md transition-shadow`}
          aria-label="Email"
        >
          <IconMail className={iconClasses} />
        </a>
      )}
    </div>
  );
}


