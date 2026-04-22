"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/language-context";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ExternalLink, Github, Code, Globe, Smartphone, Server, ChevronDown, Eye } from "lucide-react";
import { developmentProjects, DevelopmentProject } from "@/data/development-projects";
import { ProjectsService } from "@/lib/projects-service";
import { ImagePreviewModal } from "../ui/image-preview-modal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { OptimizedImage } from "@/components/ui/optimized-image";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  type: string;
  year: string;
  githubUrl?: string;
  liveUrl?: string;
  status: string;
  category: string;
  createdAt: string;
  featured: boolean;
}

export function DevelopmentSection() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [showAll, setShowAll] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [useDatabase, setUseDatabase] = useState(false);

  // Load projects from database or fallback to static data
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setIsLoading(true);

    try {
      const result = await ProjectsService.getAllProjects();

      if (result.success && result.data) {
        // Convert database projects to component format
        const dbProjects: Project[] = result.data
          .filter(project => project.category === 'development')
          .map(project => ({
            id: project.id!,
            title: project.title,
            description: project.description,
            image: project.image_url,
            technologies: project.technologies,
            type: project.type || 'Web App',
            year: project.year,
            githubUrl: project.github_url,
            liveUrl: project.demo_url,
            status: project.status || 'In Progress',
            category: 'development',
            createdAt: project.created_at || new Date().toISOString(),
            featured: project.featured
          }))
          .sort((a, b) => {
            // Sort by featured first, then by creation date
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            // If both have same featured status, sort by creation date: newest first
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          });

        setProjects(dbProjects);
        setUseDatabase(true);
        console.log('✅ Loaded development projects from database:', dbProjects.length);
      } else {
        // Fallback to static data
        console.warn('Database not available, using static data');
        const staticProjects: Project[] = developmentProjects.map(project => ({
          id: project.id,
          title: project.title,
          description: project.description,
          image: project.image,
          technologies: project.technologies,
          type: project.type,
          year: project.year,
          githubUrl: project.githubUrl,
          liveUrl: project.liveUrl,
          status: project.status,
          category: project.category,
          createdAt: `${project.year}-01-01T00:00:00Z`, // Use year as approximate creation date
          featured: project.status === 'Completed' // Assume completed projects are featured
        }));
        setProjects(staticProjects);
        setUseDatabase(false);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
      // Fallback to static data on error
      const staticProjects: Project[] = developmentProjects.map(project => ({
        id: project.id,
        title: project.title,
        description: project.description,
        image: project.image,
        technologies: project.technologies,
        type: project.type,
        year: project.year,
        githubUrl: project.githubUrl,
        liveUrl: project.liveUrl,
        status: project.status,
        category: project.category,
        createdAt: `${project.year}-01-01T00:00:00Z`, // Use year as approximate creation date
        featured: project.status === 'Completed' // Assume completed projects are featured
      }));
      setProjects(staticProjects);
      setUseDatabase(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle view more with scroll position management
  const handleViewMore = () => {
    if (!showAll) {
      // Expanding: scroll to maintain position at button
      const currentScrollY = window.scrollY;
      setShowAll(true);

      // Small delay to let DOM update, then adjust scroll
      setTimeout(() => {
        window.scrollTo({
          top: currentScrollY,
          behavior: 'smooth'
        });
      }, 100);
    } else {
      // Collapsing: scroll to top of section
      setShowAll(false);
      const portfolioSection = document.getElementById('portfolio');
      if (portfolioSection) {
        portfolioSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  // Animation variants - simple fade in
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  // Get unique categories from projects
  const categories = useMemo(() => {
    const cats = new Set<string>();
    projects.forEach(project => {
      cats.add(project.type);
    });
    return ['All', ...Array.from(cats)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    const filtered = selectedCategory === "All" ? projects : projects.filter(project => project.type === selectedCategory);
    // Sort filtered projects to ensure featured are always first
    return filtered.sort((a, b) => {
      // Featured projects first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      // If both have same featured status, sort by creation date: newest first
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [selectedCategory, projects]);

  const displayedProjects = useMemo(() => {
    if (showAll) {
      return filteredProjects;
    }

    // When not showing all, prioritize featured projects
    const featuredProjects = filteredProjects.filter(p => p.featured);
    const nonFeaturedProjects = filteredProjects.filter(p => !p.featured);

    // Show all featured projects + fill remaining slots with non-featured
    const remainingSlots = Math.max(0, 4 - featuredProjects.length);
    const displayedNonFeatured = nonFeaturedProjects.slice(0, remainingSlots);

    return [...featuredProjects, ...displayedNonFeatured];
  }, [filteredProjects, showAll]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "In Progress": return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "Planned": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Web App": return <Globe className="w-4 h-4" />;
      case "Mobile App": return <Smartphone className="w-4 h-4" />;
      case "API": return <Server className="w-4 h-4" />;
      case "Full Stack": return <Code className="w-4 h-4" />;
      default: return <Code className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-24 bg-transparent">
      {/* Category Filter - Minimalist */}
      <div className="flex flex-wrap items-center gap-6 border-b border-white/5 pb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`text-xs font-medium tracking-widest uppercase transition-all ${
              selectedCategory === category 
                ? "text-blue-400" 
                : "text-white/20 hover:text-white/40"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Development Projects - Editorial List */}
      {!isLoading && (
        <motion.div
          key={`dev-grid-${showAll}-${selectedCategory}`}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className={`group flex flex-col ${index % 2 === 1 ? 'md:pt-24' : ''}`}
            >
              {/* Image Frame - Architectural */}
              <div className="relative aspect-[16/10] w-full overflow-hidden border border-white/5 bg-white/[0.02] rounded-lg mb-8">
                <OptimizedImage
                  src={project.image}
                  alt={project.title}
                  fill
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                  sizes="(max-width: 768px) 100vw, 600px"
                  priority={index < 4}
                />
                
                {/* Meta Overlay */}
                <div className="absolute top-4 left-4">
                  <div className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-[8px] font-bold tracking-[0.2em] text-white uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                    {project.year}
                  </div>
                </div>
              </div>

              {/* Content - Deconstructed */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-medium tracking-[0.2em] text-blue-400 uppercase">{project.type}</span>
                  <span className="w-4 h-[1px] bg-white/10" />
                  <span className="text-[10px] font-medium tracking-[0.2em] text-white/20 uppercase">{project.status}</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-light tracking-tighter text-white group-hover:text-blue-400 transition-colors duration-500">
                  {project.title}
                </h3>

                <p className="text-sm text-white/40 leading-relaxed max-w-md">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  {project.technologies.slice(0, 3).map((tech: string) => (
                    <span key={tech} className="text-[9px] font-bold tracking-widest text-white/20 uppercase group-hover:text-white/60 transition-colors duration-500">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions - Subtle */}
                <div className="flex items-center gap-6 pt-8 border-t border-white/5 mt-4">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-white/40 hover:text-white uppercase transition-colors">
                      <Github className="w-3 h-3" />
                      Repository
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-blue-400 hover:text-blue-300 uppercase transition-colors ml-auto">
                      Visit Site
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* View More Button - Minimalist */}
      {filteredProjects.length > 4 && (
        <div className="text-center pt-12">
          <button
            onClick={handleViewMore}
            className="group relative inline-flex items-center gap-4 py-4 px-12 border border-white/10 rounded-full hover:bg-white/5 transition-all overflow-hidden"
          >
            <span className="relative z-10 text-xs font-bold tracking-[0.3em] text-white uppercase">
              {showAll ? "Show Less" : "Explore More Archive"}
            </span>
            <ChevronDown className={`w-4 h-4 text-blue-400 transition-transform ${showAll ? 'rotate-180' : ''}`} />
          </button>
        </div>
      )}

      {/* CTA Section - Minimalist */}
      <div className="pt-24 text-center">
        <div className="max-w-2xl mx-auto p-12 border border-white/5 rounded-3xl bg-white/[0.01] backdrop-blur-sm">
          <p className="text-xl font-light text-white/60 mb-8 italic font-serif">
            "Every project is a journey into solving complex problems with simple, elegant code."
          </p>
          <Button
            className="h-14 px-10 bg-white text-black hover:bg-white/90 rounded-full font-bold tracking-widest uppercase text-[10px] transition-all"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start a project with me
          </Button>
        </div>
      </div>
    </div>

  );
}
