
"use client";

import { useState, useMemo } from "react";
import { ProjectCard } from "./project-card";
import { projects } from "@/data/projects";
import { useLanguage } from "@/context/language-context";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "./ui/badge";

export function ProjectsSection() {
  const { t } = useLanguage();
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  // Ambil semua tag unik dari data proyek
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach(p => p.tags.forEach(tag => tags.add(tag)));
    return ["All", ...Array.from(tags)];
  }, []);

  // Filter proyek berdasarkan tag yang aktif
  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return showAllProjects ? projects : projects.slice(0, 5);
    }
    // Jika ada filter aktif, tampilkan semua project yang sesuai filter
    return projects.filter(p => p.tags.includes(activeFilter));
  }, [activeFilter, showAllProjects]);

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

        {/* Tombol Filter */}
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {allTags.map(tag => (
            <Badge
              key={tag}
              variant={activeFilter === tag ? "default" : "secondary"}
              onClick={() => setActiveFilter(tag)}
              className="cursor-pointer text-sm py-1 px-3"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <div className="container mx-auto max-w-7xl px-4 md:px-6 mt-12">
        <div className="flex flex-wrap justify-center gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
        
        {hasMoreProjects && activeFilter === "All" && (
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
