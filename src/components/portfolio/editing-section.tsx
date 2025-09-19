"use client";

import { useState, useMemo } from "react";
import { useLanguage } from "@/context/language-context";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Play, ExternalLink, Video, Film, Camera, Youtube, ChevronDown, Eye } from "lucide-react";
import { videoProjects, VideoProject } from "@/data/video-projects";
import { ImagePreviewModal } from "../ui/image-preview-modal";

export function EditingSection() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [showAll, setShowAll] = useState<boolean>(false);

  // Get categories for video projects
  const categories = useMemo(() => {
    const cats = new Set<string>();
    videoProjects.forEach(project => {
      cats.add(project.type);
    });
    return ['All', ...Array.from(cats)];
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return videoProjects;
    return videoProjects.filter(project => project.type === selectedCategory);
  }, [selectedCategory]);

  const displayedProjects = useMemo(() => {
    if (showAll) return filteredProjects;
    return filteredProjects.slice(0, 4);
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

      {/* Video Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {displayedProjects.map((project, index) => (
          <div
            key={`${project.title}-${index}`}
            className="group relative bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
          >
            {/* Project Image */}
            <div className="relative aspect-video bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 overflow-hidden">
              <img 
                src={project.thumbnail} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center hidden">
                <Video className="w-16 h-16 text-muted-foreground/30" />
              </div>
              
              {/* Duration Badge */}
              <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {project.duration}
              </div>
            </div>

            {/* Project Info */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-xl mb-1">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">{project.type} • {project.year}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  Video
                </Badge>
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

              {/* Action Buttons */}
              <div className="flex gap-2 mb-4">
                <Button 
                  size="sm" 
                  variant="secondary" 
                  className="bg-white/90 text-black hover:bg-white"
                  onClick={() => project.youtubeUrl && window.open(project.youtubeUrl, '_blank')}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Play
                </Button>
                {project.youtubeUrl && (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => window.open(project.youtubeUrl, '_blank')}
                  >
                    <Youtube className="w-4 h-4 mr-2" />
                    YouTube
                  </Button>
                )}
              </div>

              {/* Software Used */}
              <div className="border-t pt-4">
                <p className="text-xs text-muted-foreground mb-2">Software Used:</p>
                <div className="flex flex-wrap gap-2">
                  {project.software.map((soft) => (
                    <span key={soft} className="text-xs bg-muted px-2 py-1 rounded">
                      {soft}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      {filteredProjects.length > 4 && (
        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={() => setShowAll(!showAll)}
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
          <Film className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
          <h3 className="text-lg font-semibold mb-2">No videos found</h3>
          <p className="text-muted-foreground">
            No video projects found for the selected category.
          </p>
        </div>
      )}

      {/* Call to Action */}
      <div className="text-center pt-8">
        <p className="text-muted-foreground mb-4">
          {t.portfolio_video_cta_text}
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
          <Camera className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
          {t.portfolio_video_cta_button}
        </Button>
      </div>
    </div>
  );
}
