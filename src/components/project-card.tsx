
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Project } from "@/data/projects";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/language-context";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { t } = useLanguage();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
  };

  return (
    <motion.div 
      className={`relative group overflow-hidden rounded-2xl bg-secondary/50 ${project.className}`}
      variants={cardVariants}
    >
      <Link href={project.link} target="_blank" className="block w-full h-full">
        <Image
          src={project.image}
          alt={project.title}
          width={800}
          height={600}
          data-ai-hint={project.aiHint}
          className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
          <p className="text-white/90 mb-4 text-base line-clamp-2">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs backdrop-blur-sm">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <div className="absolute top-4 right-4 p-2 bg-background/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ArrowUpRight className="w-5 h-5 text-foreground" />
        </div>
      </Link>
    </motion.div>
  );
}
