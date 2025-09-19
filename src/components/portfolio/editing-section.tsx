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

      {/* Coming Soon Section */}
      <div className="text-center py-16">
        <div className="relative inline-block">
          <Video className="w-24 h-24 mx-auto text-muted-foreground/20 mb-6" />
          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full font-medium animate-pulse">
            Coming Soon
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Video Editing Portfolio
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto mb-6">
          I'm currently working on some amazing video projects! Check back soon to see my latest motion graphics and video editing work.
        </p>
        <div className="flex justify-center gap-2">
          <Badge variant="secondary" className="text-xs">Motion Graphics</Badge>
          <Badge variant="secondary" className="text-xs">Video Editing</Badge>
          <Badge variant="secondary" className="text-xs">After Effects</Badge>
        </div>
      </div>


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
