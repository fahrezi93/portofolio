"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/language-context";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ExternalLink, Eye, Palette, Figma, Layers, ChevronDown } from "lucide-react";
import { designProjects, DesignProject } from "@/data/design-projects";
import { ImagePreviewModal } from "../ui/image-preview-modal";

export function DesignSection() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [showAll, setShowAll] = useState<boolean>(false);

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
    designProjects.forEach(project => {
      cats.add(project.type);
    });
    return ['All', ...Array.from(cats)];
  }, []);

  const filteredProjects = useMemo(() => {
    const filtered = selectedCategory === "All" ? designProjects : designProjects.filter(project => project.type === selectedCategory);
    // Sort filtered projects to ensure featured are always first
    return filtered.sort((a, b) => {
      // Featured projects first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      // If both have same featured status, sort by year: newest first
      return parseInt(b.year) - parseInt(a.year);
    });
  }, [selectedCategory]);

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

      {/* Design Projects Grid */}
      <motion.div
        key={`grid-${showAll}-${selectedCategory}`} // Force re-render when showAll changes
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 items-start"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
      >
        {displayedProjects.map((project, index) => (
          <motion.div
            key={`${project.id}-${showAll}-${index}`} // More unique key
            className="group relative bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.01] h-full flex flex-col"
            variants={cardVariants}
            style={{ minHeight: '450px' }}
          >
            {/* Project Image */}
            <div className="relative aspect-[4/3] bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="absolute inset-0 hidden">
                <Palette className="w-16 h-16 text-muted-foreground/30" />
              </div>
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
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Tools Used */}
              <div className="border-t pt-4">
                <p className="text-xs text-muted-foreground mb-2">Tools Used:</p>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span key={tool} className="text-xs bg-muted px-2 py-1 rounded">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

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
