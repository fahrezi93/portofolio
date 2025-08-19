
"use client";

import { useState } from "react";
import { ProjectCard } from "./project-card";
import { projects } from "@/data/projects";
import { useLanguage } from "@/context/language-context";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

export function ProjectsSection() {
  const { t } = useLanguage();
  const [showAllProjects, setShowAllProjects] = useState(false);
  
  // Featured Work hanya menampilkan 5 proyek pertama
  const featuredProjects = projects.slice(0, 5);
  // Proyek lainnya untuk ditampilkan di "View More"
  const additionalProjects = projects.slice(5);
  
  // Menentukan proyek yang akan ditampilkan
  const displayedProjects = showAllProjects ? projects : featuredProjects;
  const hasMoreProjects = projects.length > 5;
  
  const handleToggleProjects = () => {
    setShowAllProjects(!showAllProjects);
  };

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
              onClick={handleToggleProjects}
              variant="outline"
              size="lg"
              className="group transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              {showAllProjects ? (
                <>
                  <ChevronUp className="mr-2 h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
                  {t.projects_show_less}
                </>
              ) : (
                <>
                  {t.projects_view_more}
                  <ChevronDown className="ml-2 h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
