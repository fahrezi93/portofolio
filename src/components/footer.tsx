"use client";

import { useLanguage } from "@/context/language-context";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-8 px-4 md:px-6">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 md:flex-row max-w-5xl">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Fahrezi. {t.footer_text}
        </p>
        <div className="flex items-center gap-4">
          <a href="https://www.instagram.com/moh.fahrezi/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Instagram className="h-6 w-6" />
            <span className="sr-only">Instagram</span>
          </a>
          <a href="https://github.com/fahrezi93" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Github className="h-6 w-6" />
            <span className="sr-only">GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/mohammad-fahrezi" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin className="h-6 w-6" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a href="mailto:mohfarezi93@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
            <Mail className="h-6 w-6" />
            <span className="sr-only">Email</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
