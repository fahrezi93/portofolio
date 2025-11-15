"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Globe, Shield } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import Link from 'next/link';
import { LanguageSwitcher } from "./language-switcher";
import { Button } from "./ui/button";
import { useActiveSection } from '@/hooks/use-active-section';

type NavLink = {
  href: string;
  label: string;
  scrollTarget?: string;
};

export function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const activeSection = useActiveSection();
  
  // Use try-catch to prevent context errors
  let t;
  try {
    const languageContext = useLanguage();
    t = languageContext?.t;
  } catch (error) {
    console.warn("Language context not available, using fallback values");
    t = null;
  }

  // Ensure component is mounted before rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fallback values if translations are not available
  const navLinks: NavLink[] = [
    { href: "#portfolio", label: t?.nav_work || "Work", scrollTarget: "portfolio-title" },
    { href: "#about", label: t?.nav_about || "About" },
    { href: "#experience", label: t?.nav_experience || "Experience" },
    { href: "#contact", label: t?.nav_contact || "Contact" },
  ];

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, link: NavLink) => {
    if (!link.href.startsWith('#')) {
      return;
    }

    event.preventDefault();
    const targetId = link.scrollTarget || link.href.replace('#', '');
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const newUrl = `${window.location.pathname}${link.href}`;
      window.history.replaceState(null, '', newUrl);
    } else {
      window.location.hash = link.href;
    }
  };

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <header className="fixed top-0 z-30 w-full p-4">
        <div className="container mx-auto flex h-16 max-w-5xl items-center justify-between rounded-full border border-border/30 bg-background/20 px-6 backdrop-blur-lg">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-6 w-24 bg-gray-300 rounded animate-pulse"></div>
          </div>
          <div className="h-8 w-8 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 z-30 w-full p-4">
      <div className="container mx-auto flex h-16 max-w-5xl items-center justify-between rounded-full border border-border/30 bg-background/20 px-6 backdrop-blur-lg">
        <Link href="/" className="flex items-center gap-3">
          <img 
            src="/images/fahrezi_white_logo.png" 
            alt="Fahrezi Logo" 
            className="h-8 w-8"
          />
          <span className="font-headline text-xl font-bold text-foreground">
            Fahrezi
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId && activeSection !== '';
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={(event) => handleNavClick(event, link)}
                className={`relative text-base font-medium transition-colors group ${
                  isActive 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 h-0.5 bg-primary transition-all duration-300 ease-out ${
                  isActive 
                    ? 'w-full left-0' 
                    : 'w-0 left-1/2 -translate-x-1/2 group-hover:w-full group-hover:left-0 group-hover:translate-x-0'
                }`}></span>
              </Link>
            );
          })}
          <LanguageSwitcher />
        </nav>

        {/* Simple mobile menu without Sheet component */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-7 w-7" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile menu overlay with smooth animations */}
      <div className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ease-in-out ${
        isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Backdrop with fade animation */}
        <div 
          className={`fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMenuOpen(false)}
        />
        
        {/* Menu content with slide animation */}
        <div className={`fixed right-0 top-0 h-full w-[280px] bg-background border-l border-border/30 shadow-xl transition-transform duration-300 ease-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-border/30 p-6">
              <Link href="/" className="flex items-center gap-3" onClick={handleLinkClick}>
                 <img 
                   src="/images/fahrezi_white_logo.png" 
                   alt="Fahrezi Logo" 
                   className="h-8 w-8"
                 />
                 <span className="font-headline text-xl font-bold text-foreground">
                   Fahrezi
                 </span>
              </Link>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setMenuOpen(false)}
              >
                 <X className="h-7 w-7" />
                 <span className="sr-only">Close menu</span>
              </Button>
            </div>
            
            <nav className="flex-1 p-6">
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => {
                  const sectionId = link.href.replace('#', '');
                  const isActive = activeSection === sectionId && activeSection !== '';
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={(event) => {
                        handleNavClick(event, link);
                        handleLinkClick();
                      }}
                      className={`text-2xl font-medium transition-colors relative ${
                        isActive 
                          ? 'text-primary' 
                          : 'text-foreground hover:text-primary'
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <span className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-primary rounded-full"></span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </nav>
            
            <div className="p-6 border-t border-border/30">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}