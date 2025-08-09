import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/lib/data/site";

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: "https://example.com",
    siteName: siteConfig.name,
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className="min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Subtle radial gradient background */}
          <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] rounded-full brand-gradient opacity-20 blur-3xl" />
            <div className="absolute inset-0 bg-[length:var(--grid-size)_var(--grid-size)] bg-grid dark:bg-grid-dark grid-fade" />
          </div>

          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
