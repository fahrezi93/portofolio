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
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "secondary"}
            onClick={() => setSelectedCategory(category)}
            className="cursor-pointer text-sm py-2 px-4 hover:scale-105 transition-transform"
          >
            {category}
          </Badge>
        ))}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Design Projects Grid */}
      {!isLoading && (
        <motion.div
          key={`grid-${showAll}-${selectedCategory}`} // Force re-render when showAll changes
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          {displayedProjects.map((project: DesignProject, index: number) => (
            <motion.div
              key={`${project.id}-${showAll}-${index}`} // More unique key
              className="group relative bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.01] h-full flex flex-col"
              variants={cardVariants}
              style={{ minHeight: '450px' }}
            >
              {/* Project Image */}
              <div className="relative aspect-[4/3] bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 overflow-hidden">
                <OptimizedImage
                  src={project.image}
                  alt={`Mohammad Fahrezi Portfolio - ${project.title}`}
                  fill
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  priority={index < 4}
                />
              </div>

              {/* Project Info */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-xl mb-1">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.type} • {project.year}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Badge variant="outline" className="text-xs">
                      Design
                    </Badge>
                    {project.featured && (
                      <Badge variant="default" className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                        ⭐ Featured
                      </Badge>
                    )}
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag: string) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>


              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* View More Button */}
      {filteredProjects.length > 4 && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={handleViewMore}
            className="group"
          >
            {showAll ? t.projects_show_less : `${t.projects_view_more} (${filteredProjects.length - 4} more)`}
            <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showAll ? 'rotate-180' : ''}`} />
          </Button>
        </div>
      )}

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <Layers className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
          <h3 className="text-lg font-semibold mb-2">No designs found</h3>
          <p className="text-muted-foreground">
            No design projects found for the selected category.
          </p>
        </div>
      )}

      {/* Call to Action */}
      <div className="text-center pt-8">
        <p className="text-muted-foreground mb-4">
          {t.portfolio_design_cta_text}
        </p>
        <Button
          className="group"
          onClick={() => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          <Figma className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
          {t.portfolio_design_cta_button}
        </Button>
      </div>
    </div>
  );
}
