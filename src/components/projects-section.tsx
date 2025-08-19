
"use client";

import { useState, useEffect } from "react";
import { ProjectCard } from "./project-card";
import { projects } from "@/data/projects";
import { useLanguage } from "@/context/language-context";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
// Loading component sudah dihapus

// Pastikan data proyek tersedia
console.log('Projects data imported:', projects);

export function ProjectsSection() {
  const { t } = useLanguage();
  const [showAllProjects, setShowAllProjects] = useState(false);
  const displayedProjects = showAllProjects ? projects : projects.slice(0, 6);
  const hasMoreProjects = projects.length > 6;

  console.log('Projects data:', projects); // Debugging
  console.log('Displayed projects:', displayedProjects); // Debugging
  
  return (
    <section id="projects" className="w-full py-16 md:py-24 lg:py-32 bg-background z-10">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
          {t.projects_title || 'Featured Work'}
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          {t.projects_subtitle || 'Check out some of my recent projects'}
        </p>
      </div>
      <div className="container mx-auto max-w-7xl px-4 md:px-6 mt-12">
        <div className="flex flex-wrap justify-center gap-8">
              {displayedProjects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
            
            {hasMoreProjects && (
              <div className="mt-12 text-center">
                <Button
                  onClick={() => setShowAllProjects(!showAllProjects)}
                  variant="outline"
                  size="lg"
                  className="group transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  {showAllProjects ? (
                    <>
                      <ChevronUp className="mr-2 h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
                      {t.projects_view_more === "View More" ? "Show Less" : "Tampilkan Sedikit"}
                    </>
                  ) : (
                    <>
                      {t.projects_view_more}
                      <ChevronDown className="ml-2 h-5 w-5 transition-transform group-hover:translate-y-0.5" />
                    </>
                  )}
                </Button>
              </div>
            )}
      </div>
    </section>
  );
}
