
import { ProjectCard } from "./project-card";
import { projects } from "@/data/projects";
import { useLanguage } from "@/context/language-context";

export function ProjectsSection() {
  const { t } = useLanguage();
  return (
    <section id="projects" className="w-full py-16 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
          {t.projects_title}
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          {t.projects_subtitle}
        </p>
      </div>
      <div className="container mx-auto max-w-7xl px-4 md:px-6 mt-12">
         <div className="flex flex-wrap justify-center gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
        </div>
      </div>
    </section>
  );
}
