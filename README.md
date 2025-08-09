# Resume / Portfolio Website

A modern, responsive resume and portfolio built with Next.js (App Router), TypeScript, and Tailwind CSS. Includes dark mode, projects, experience, and a contact page.

## Quickstart

1. Install Node.js LTS (>=18). On Windows (PowerShell or CMD):
   ```sh
   winget install --id OpenJS.NodeJS.LTS -e --source winget --silent --accept-package-agreements
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run locally:
   ```sh
   npm run dev
   ```
4. Build for production:
   ```sh
   npm run build && npm start
   ```

## Customize
- Update `src/lib/data/site.ts` with your name, email, and links
- Add your skills in `src/lib/data/skills.ts`
- Add or edit projects in `src/lib/data/projects.ts`
- Edit experience in `src/lib/data/experience.ts`
- Replace `resumeUrl` in `site.ts` and drop your PDF into `public/resume.pdf`

## Tech
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS (dark mode)
- next-themes for theme switching

