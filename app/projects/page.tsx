import { projects, projectsByCategory } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

export const metadata = {
  title: "Projects | Joshua Fabricante Portfolio",
  description: "Projects I've been involved with as a developer and freelancer - featuring React, Laravel, and WordPress applications",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-4">
              Projects I've Been Involved With
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              A selection of projects I've developed with clients and agencies, spanning modern web applications to content-driven websites
            </p>
          </div>

          {/* Nextjs Applications */}
          {projectsByCategory.Nextjs && projectsByCategory.Nextjs.length > 0 && (
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-white mb-2">
                Next.js Applications
              </h2>
              <p className="text-gray-400 mb-8">Modern, performant web applications</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectsByCategory.Nextjs.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          )}

          {/* WordPress Websites */}
          {projectsByCategory.WordPress && projectsByCategory.WordPress.length > 0 && (
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-white mb-2">
                WordPress Websites
              </h2>
              <p className="text-gray-400 mb-8">Content-driven websites and online presence</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectsByCategory.WordPress.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          )}

          {/* Laravel Applications */}
          {projectsByCategory.Laravel && projectsByCategory.Laravel.length > 0 && (
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-white mb-2">
                Laravel Applications
              </h2>
              <p className="text-gray-400 mb-8">Robust backend systems and web applications</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectsByCategory.Laravel.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
