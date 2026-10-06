import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE_URL, person, links } from "@/data/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
  // Only used for small labels — keep it off the critical path; Inter (the LCP
  // headline font) is the one worth preloading.
  preload: false,
});

const title = "Joshua Fabricante | Full-Stack Next.js & AI Automation Engineer";
const description =
  "Full-stack Next.js engineer shipping production web apps on AWS Serverless and Supabase, plus the n8n pipelines and AI automation that run the business.";

export const metadata: Metadata = {
  // Trailing slash so relative URLs resolve under /portfolio/.
  metadataBase: new URL(`${SITE_URL}/`),
  title: { default: title, template: "%s · Joshua Fabricante" },
  description,
  alternates: { canonical: "./" },
  openGraph: {
    title,
    description,
    url: "./",
    siteName: "Joshua Fabricante",
    type: "website",
    images: [{ url: "og.png", width: 1200, height: 630, alt: "Joshua Fabricante, Full-Stack Next.js & AI Automation Engineer" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["og.png"] },
};

export const viewport: Viewport = {
  themeColor: "#0a0b0f",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.fullName,
  alternateName: person.name,
  jobTitle: person.jobTitle,
  url: `${SITE_URL}/`,
  email: `mailto:${person.email}`,
  alumniOf: { "@type": "CollegeOrUniversity", name: person.alumniOf },
  address: { "@type": "PostalAddress", addressLocality: "Iligan City", addressCountry: "PH" },
  sameAs: [links.linkedin, links.onlinejobs, links.github],
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "AWS Lambda",
    "DynamoDB",
    "Supabase",
    "PostgreSQL",
    "GraphQL",
    "Prisma",
    "Sanity",
    "n8n",
    "AI automation",
    "LLM integration",
    "Voice AI",
    "GoHighLevel",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        {/* Lets CSS hide reveal-on-scroll content only when JS can reveal it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="flex min-h-screen flex-col bg-ink font-sans text-fg">
        <a
          href="#main"
          className="sr-only z-[100] rounded-md bg-accent px-4 py-2 font-medium text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          // Static, author-controlled JSON — no user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
