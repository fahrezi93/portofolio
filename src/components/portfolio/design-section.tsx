"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/language-context";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ExternalLink, Eye, Palette, Figma, Layers, ChevronDown, Loader2 } from "lucide-react";
import { ProjectsService, ProjectData } from "@/lib/projects-service";
import { ImagePreviewModal } from "../ui/image-preview-modal";
import { OptimizedImage } from "@/components/ui/optimized-image";

// Interface for design projects from database
interface DesignProject {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  type: string;
  year: string;
  tools: string[];
  behanceUrl?: string;
  dribbbleUrl?: string;
  figmaUrl?: string;
  category: string;
  featured?: boolean;
  created_at?: string;
}

export function DesignSection() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [showAll, setShowAll] = useState<boolean>(false);
  const [designProjects, setDesignProjects] = useState<DesignProject[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch design projects from database
  useEffect(() => {
    const fetchDesignProjects = async () => {
      setIsLoading(true);
      try {
        const result = await ProjectsService.getProjectsByCategory('design');
        if (result.success && result.data) {
          // Transform ProjectData to DesignProject format
          const transformedProjects: DesignProject[] = result.data.map((project: ProjectData) => ({
            id: project.id || '',
            title: project.title,
            description: project.description,
            image: project.image_url,
            tags: project.technologies || [],
            type: project.type || 'Graphic Design',
            year: project.year,
            tools: project.technologies || [],
            category: project.category || 'Design',
            featured: project.featured,
            created_at: project.created_at
          }));
          setDesignProjects(transformedProjects);
        }
      } catch (error) {
        console.error('Error fetching design projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDesignProjects();
  }, []);

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

  // Get unique categories from design projects
  const categories = useMemo(() => {
    const cats = new Set<string>();
    designProjects.forEach((project: DesignProject) => {
      if (project.type) cats.add(project.type);
    });
    return ['All', ...Array.from(cats)];
  }, [designProjects]);

  const filteredProjects = useMemo(() => {
    const filtered = selectedCategory === "All"
      ? designProjects
      : designProjects.filter((project: DesignProject) => project.type === selectedCategory);
    // Sort filtered projects: featured first, then by created_at (newest first)
    return [...filtered].sort((a: DesignProject, b: DesignProject) => {
      // Featured projects first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      // If both have same featured status, sort by created_at (newest first)
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return dateB - dateA;
    });
  }, [selectedCategory, designProjects]);

  const displayedProjects = useMemo(() => {
    if (showAll) {
      return filteredProjects;
    }

    // When not showing all, prioritize featured projects
    const featuredProjects = filteredProjects.filter((p: DesignProject) => p.featured);
    const nonFeaturedProjects = filteredProjects.filter((p: DesignProject) => !p.featured);

    // Show all featured projects + fill remaining slots with non-featured
    const remainingSlots = Math.max(0, 4 - featuredProjects.length);
    const displayedNonFeatured = nonFeaturedProjects.slice(0, remainingSlots);

    return [...featuredProjects, ...displayedNonFeatured];
  }, [filteredProjects, showAll]);

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

      {/* Design Projects - Editorial Gallery */}
      {!isLoading && (
        <motion.div
          key={`design-grid-${showAll}-${selectedCategory}`}
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
              className={`group flex flex-col ${index % 2 === 0 ? 'md:pt-24' : ''}`}
            >
              {/* Image Frame - Gallery Style */}
              <div className="relative aspect-[16/11] w-full overflow-hidden border border-white/5 bg-white/[0.02] rounded-lg mb-8 shadow-2xl">
                <OptimizedImage
                  src={project.image}
                  alt={project.title}
                  fill
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                  sizes="(max-width: 768px) 100vw, 600px"
                  priority={index < 4}
                />
                
                {/* Visual Accent */}
                <div className="absolute inset-0 border-[20px] border-black/0 group-hover:border-black/20 transition-all duration-700 pointer-events-none" />
              </div>

              {/* Content - Editorial */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-medium tracking-[0.2em] text-blue-400 uppercase">{project.type}</span>
                  <span className="w-4 h-[1px] bg-white/10" />
                  <span className="text-[10px] font-medium tracking-[0.2em] text-white/20 uppercase">{project.year}</span>
                </div>

                <h3 className="text-3xl font-light tracking-tighter text-white group-hover:text-blue-400 transition-colors duration-500">
                  {project.title}
                </h3>

                <p className="text-sm text-white/40 leading-relaxed max-w-md">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  {project.tools.slice(0, 3).map((tool: string) => (
                    <span key={tool} className="text-[9px] font-bold tracking-widest text-white/20 uppercase group-hover:text-white/60 transition-colors duration-500">
                      {tool}
                    </span>
                  ))}
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
              {showAll ? "Show Less" : "View Entire Gallery"}
            </span>
            <ChevronDown className={`w-4 h-4 text-blue-400 transition-transform ${showAll ? 'rotate-180' : ''}`} />
          </button>
        </div>
      )}

      {/* CTA Section - Design Focused */}
      <div className="pt-24 text-center">
        <div className="max-w-2xl mx-auto p-12 border border-white/5 rounded-3xl bg-white/[0.01] backdrop-blur-sm">
          <p className="text-xl font-light text-white/60 mb-8 italic font-serif leading-relaxed">
            "Design is not just what it looks like and feels like. Design is how it works."
          </p>
          <Button
            className="h-14 px-10 bg-white text-black hover:bg-white/90 rounded-full font-bold tracking-widest uppercase text-[10px] transition-all"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start a design project
          </Button>
        </div>
      </div>
    </div>

  );
}
