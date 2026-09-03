export type ProjectCategory = "Nextjs" | "WordPress" | "Laravel";

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  category: ProjectCategory;
  whatIsIt: string;
  contributions: string[];
}

export const projects: Project[] = [
  // Nextjs Applications
  {
    id: "credit-score-simulator",
    title: "Credit Report Analyzer & Credit Score Simulator",
    description: "This app is built with Next.js + Supabase + OpenRouter + GoHighLevel",
    imageUrl: "/images/Credit-score-simulator.png",
    link: "https://creditcrb.com/identityIQ-credit-simulator/",
    category: "Nextjs",
    whatIsIt: "An AI-powered platform that parses credit report PDFs, extracts key metrics, powers an interactive credit score simulator, and generates personalized roadmaps to reach a 700+ credit score.",
    contributions: [
      "Full-stack development with Next.js and Supabase (auth, database, storage)",
      "Credit report PDF ingestion, parsing, and AI metric extraction via OpenRouter",
      "Interactive score simulator with personalized roadmap recommendations",
      "GoHighLevel (GHL) CRM integration for lead capture and automation",
    ],
  },
  {
    id: "business-loan-analyzer",
    title: "Business Loan Analyzer Tool",
    description: "This app is built with Next.js + Supabase + OpenRouter + GoHighLevel",
    imageUrl: "/images/business-loan-analyzer.png",
    link: "https://creditcrb.com/business-loan-analyzer/",
    category: "Nextjs",
    whatIsIt: "An AI-powered tool that accepts business inputs and evaluates qualification criteria to automatically match users with eligible business loan offers.",
    contributions: [
      "Full-stack development with Next.js and Supabase (auth, database, storage)",
      "AI-driven qualification and loan-matching logic via OpenRouter",
      "GoHighLevel (GHL) CRM integration for lead capture and automation",
    ],
  },
  {
    id: "nessy-application",
    title: "Nessy Cloud Application",
    description: "This website is built with Nextjs + graphQL + prisma",
    imageUrl: "/images/nessy.png",
    link: "https://portal.nessycloud.de",
    category: "Nextjs",
    whatIsIt: "Cloud-based SaaS application built with Next.js",
    contributions: [
      "Full-stack feature development and system architecture design",
      "RESTful API integration and third-party service connectivity",
      "Headless CMS features and content management system implementation",
    ],
  },
  {
    id: "sobriety-hub",
    title: "Sobriety Hub Application",
    description: "This website is built with Nextjs",
    imageUrl: "/images/sobriety-hub.webp",
    link: "https://www.sobrietyhub.com",
    category: "Nextjs",
    whatIsIt: "A recovery support platform built with Next.js",
    contributions: [
      "Frontend development with Next.js",
      "Component architecture and design system implementation",
      "Performance optimization",
    ],
  },
  {
    id: "danaher-website",
    title: "Danaher Website",
    description: "This website is built with Nextjs + Sanity",
    imageUrl: "/images/danaher.png",
    link: "https://danahercn.com",
    category: "Nextjs",
    whatIsIt: "Corporate website built with Next.js and Sanity headless CMS",
    contributions: [
      "Responsive frontend development and component architecture design",
      "Content information architecture and CMS schema optimization",
      "Multi-language localization and internationalization (i18n) framework implementation",
    ],
  },
  {
    id: "dfkgruppe-website",
    title: "DFK Group Website",
    description: "This website is built with Nextjs + Sanity",
    imageUrl: "/images/dfkgruppe.png",
    link: "https://dfkgroup.de",
    category: "Nextjs",
    whatIsIt: "Professional services company website using Next.js and Sanity CMS",
    contributions: [
      "Responsive frontend development and component architecture design",
      "Content information architecture and CMS schema optimization",
      "Multi-language localization and internationalization (i18n) framework implementation",
    ],
  },
  {
    id: "vitacore-website",
    title: "Vita Core Website",
    description: "This website is built with Nextjs + Sanity",
    imageUrl: "/images/vitacore.png",
    link: "https://vita-core.de",
    category: "Nextjs",
    whatIsIt: "A specialized recruitment agency and consulting firm website using Next.js and Sanity CMS",
    contributions: [
      "Responsive frontend development and component architecture design",
      "Content information architecture and CMS schema optimization",
      "Multi-language localization and internationalization (i18n) framework implementation",
    ],
  },
  {
    id: "fap-web-website",
    title: "First Automotive Parts Website",
    description: "This website is built with Nextjs + Sanity",
    imageUrl: "/images/fap-web.png",
    link: "https://fap-web-theta.vercel.app",
    category: "Nextjs",
    whatIsIt: "A automotive parts company website using Next.js and Sanity CMS",
    contributions: [
      "Responsive frontend development and component architecture design",
      "Content information architecture and CMS schema optimization",
      "Multi-language localization and internationalization (i18n) framework implementation",
    ],
  },
  {
    id: "tourismus-damp-website",
    title: "Tourismus Damp Website",
    description: "This website is built with Nextjs + Sanity",
    imageUrl: "/images/tourismus-damp.png",
    link: "https://tourismus-damp.de",
    category: "Nextjs",
    whatIsIt: "A tourism website for the Baltic Sea resort town of Damp and surrounding region using Next.js and Sanity CMS",
    contributions: [
      "Responsive frontend development and component architecture design",
      "Content information architecture and CMS schema optimization",
      "Multi-language localization and internationalization (i18n) framework implementation",
    ],
  },
  {
    id: "iligan-car-rentals",
    title: "Iligan Car Rentals",
    description: "Work-in-progress hobby app built with Next.js + MUI + Supabase",
    imageUrl: "/images/car-rental-app.png",
    link: "https://car-rental-app-rose-two.vercel.app",
    category: "Nextjs",
    whatIsIt: "A car rental platform for Iligan City — a personal hobby project exploring Next.js with Material UI and Supabase as the backend and database.",
    contributions: [
      "Full-stack development with Next.js and Supabase (auth, database, storage)",
      "UI implementation using Material UI (MUI) component library",
      "Car listing, booking flow, and availability management",
    ],
  },
  {
    id: "lender-marketplace-landing",
    title: "Lender Marketplace Landing Page",
    description: "This landing page is built with Next.js + GoHighLevel",
    imageUrl: "/images/35-lenders-marketplace.png",
    link: "https://lender-marketplace-landing-page.vercel.app",
    category: "Nextjs",
    whatIsIt: "A marketing landing page for a lender marketplace, built with Next.js and integrated with GoHighLevel.",
    contributions: [
      "Responsive landing page development with Next.js",
      "GoHighLevel (GHL) integration for lead capture and automation",
    ],
  },


  // Laravel Applications
  {
    id: "caimandata-application",
    title: "Caimandata Application",
    description: "This website is built with Laravel Framework",
    imageUrl: "/images/CaimanMainLogo-white.png",
    link: "https://caimandata.com",
    category: "Laravel",
    whatIsIt: "Data analytics platform built with Laravel backend",
    contributions: [
      "Full-stack feature development and UI/UX implementation",
      "Data integration and automated ETL pipeline development",
      "Advanced data processing and analytics algorithm implementation",
    ],
  },

  // WordPress Websites
  {
    id: "veronica-robles",
    title: "Veronica Robles",
    description: "This website is built with Wordpress",
    imageUrl: "/images/veronica.png",
    link: "https://veronicarobles.com",
    category: "WordPress",
    whatIsIt: "Professional portfolio and services website",
    contributions: [
      "WordPress theme customization",
      "Plugin integration and configuration",
    ],
  },
];

export const projectsByCategory = projects.reduce((acc, project) => {
  if (!acc[project.category]) {
    acc[project.category] = [];
  }
  acc[project.category].push(project);
  return acc;
}, {} as Record<ProjectCategory, Project[]>);
