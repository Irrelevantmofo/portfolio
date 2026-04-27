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
    id: "nessy-application",
    title: "Nessy Cloud Application",
    description: "This website is built with Nextjs + Sanity",
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
