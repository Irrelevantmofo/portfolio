"use client";

import Image from "next/image";
import { Project } from "@/data/projects";
import { useState } from "react";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [activeTab, setActiveTab] = useState<"whatIsIt" | "contributions">("whatIsIt");
  const isExternal = project.link.startsWith("http");
  const imagePath = project.imageUrl.startsWith("http")
    ? project.imageUrl
    : `${process.env.NODE_ENV === "production" ? "/portfolio" : ""}${project.imageUrl}`;

  return (
    <div className="bg-gray-900 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col border border-gray-800">
      {/* Image Container */}
      <div className="relative h-48 w-full bg-gray-800 overflow-hidden group">
        <img
          src={imagePath}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
          {project.title}
        </h3>

        <p className="text-gray-400 text-sm mb-6">
          {project.description}
        </p>

        {/* Tabs */}
        <div className="mb-6 flex-1 flex flex-col">
          {/* Tab Buttons */}
          <div className="flex gap-2 border-b border-gray-700 mb-4">
            <button
              onClick={() => setActiveTab("whatIsIt")}
              className={`px-4 py-2 text-sm font-medium transition-all duration-300 relative ${
                activeTab === "whatIsIt"
                  ? "text-indigo-400"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              Site Description
              {activeTab === "whatIsIt" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-400 rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("contributions")}
              className={`px-4 py-2 text-sm font-medium transition-all duration-300 relative ${
                activeTab === "contributions"
                  ? "text-indigo-400"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              My Contributions
              {activeTab === "contributions" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-400 rounded-full" />
              )}
            </button>
          </div>

          {/* Tab Content */}
          <div className="min-h-24 overflow-hidden">
            {/* What is it? Content */}
            <div
              className={`transition-all duration-300 ease-in-out ${
                activeTab === "whatIsIt"
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-4 hidden"
              }`}
            >
              <p className="text-gray-400 text-sm leading-relaxed">
                {project.whatIsIt}
              </p>
            </div>

            {/* Contributions Content */}
            <div
              className={`transition-all duration-300 ease-in-out ${
                activeTab === "contributions"
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-4 hidden"
              }`}
            >
              <ul className="space-y-2">
                {project.contributions.map((contribution, idx) => (
                  <li key={idx} className="text-gray-400 text-sm flex items-start gap-2">
                    <span className="text-indigo-400 mt-1 flex-shrink-0">•</span>
                    <span>{contribution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        {isExternal ? (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition duration-200 shadow-md hover:shadow-lg"
          >
            Visit Site
          </a>
        ) : (
          <a
            href={project.link}
            className="w-full text-center px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition duration-200 shadow-md hover:shadow-lg"
          >
            View Project
          </a>
        )}
      </div>
    </div>
  );
}
