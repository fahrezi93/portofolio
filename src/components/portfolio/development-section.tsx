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

  // Animation variants - langsung muncul dari bawah ke atas
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1 }
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

      {/* Development Projects Grid */}
      {!isLoading && (
        <motion.div 
          key={`dev-grid-${showAll}-${selectedCategory}`} // Force re-render when showAll changes
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
            style={{ minHeight: '500px' }}
          >
            {/* Project Image */}
            <div className="relative aspect-[4/3] bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 overflow-hidden">
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
                <Code className="w-16 h-16 text-muted-foreground/30" />
              </div>
              
              {/* Status & Featured Badges */}
              <div className="absolute top-3 left-3 flex gap-2">
                <div className={`text-xs px-2 py-1 rounded-full ${getStatusColor(project.status)}`}>
                  {project.status}
                </div>
                {project.featured && (
                  <div className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 font-medium">
                    ⭐ Featured
                  </div>
                )}
              </div>
            </div>

            {/* Project Info */}
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-xl mb-1">{project.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {getTypeIcon(project.type)}
                    <span>{project.type} • {project.year}</span>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  Development
                </Badge>
              </div>

              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech: string) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mb-4 mt-auto">
                {project.githubUrl && (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => window.open(project.githubUrl, '_blank')}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>
                )}
                {project.liveUrl && (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => window.open(project.liveUrl, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </Button>
                )}
              </div>

              {/* Technologies Used */}
              <div className="border-t pt-4 mt-auto">
                <p className="text-sm text-muted-foreground">{project.type} • {project.year}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="text-xs bg-muted px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
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
          <Code className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
          <h3 className="text-lg font-semibold mb-2">No projects found</h3>
          <p className="text-muted-foreground">
            No development projects found for the selected category.
          </p>
        </div>
      )}

      {/* Call to Action */}
      <div className="text-center pt-8">
        <p className="text-muted-foreground mb-4">
          {t.portfolio_dev_cta_text}
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
          <Code className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
          {t.portfolio_dev_cta_button}
        </Button>
      </div>
    </div>
  );
}
