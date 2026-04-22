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
    const filtered = selectedCategory === "All" ? videoProjects : videoProjects.filter(project => project.type === selectedCategory);
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
    <div className="space-y-24 bg-transparent">
      {/* Cinematic Placeholder */}
      <div className="max-w-4xl mx-auto text-center py-24 border border-white/5 rounded-[40px] bg-white/[0.01] backdrop-blur-md relative overflow-hidden group">
        {/* Animated Background Element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] group-hover:bg-blue-500/10 transition-colors duration-500" />
        
        <div className="relative z-10 space-y-8">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-white uppercase">In Production</span>
          </div>

          <h3 className="text-4xl md:text-6xl font-light tracking-tighter text-white">
            Cinematic <br />
            <span className="italic font-serif text-white/90">narratives</span> coming soon.
          </h3>

          <p className="text-sm text-white/40 max-w-md mx-auto leading-relaxed">
            I'm currently curating my best work in motion graphics and video storytelling. The archive will be live shortly.
          </p>

          <div className="flex flex-wrap justify-center gap-6 pt-8">
            {['Motion Design', 'Video Editing', 'Post Production'].map((tag) => (
              <span key={tag} className="text-[10px] font-bold tracking-[0.2em] text-white/20 uppercase group-hover:text-white/40 transition-colors duration-500">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section - Video Focused */}
      <div className="pt-12 text-center">
        <div className="max-w-2xl mx-auto p-12 border border-white/5 rounded-3xl bg-white/[0.01] backdrop-blur-sm">
          <p className="text-xl font-light text-white/60 mb-8 italic font-serif">
            "Every frame tells a story, and every cut is a choice."
          </p>
          <Button
            className="h-14 px-10 bg-white text-black hover:bg-white/90 rounded-full font-bold tracking-widest uppercase text-[10px] transition-all"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Inquire for video work
          </Button>
        </div>
      </div>
    </div>

  );
}
