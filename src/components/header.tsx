
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "@/context/language-context";
import { LanguageSwitcher } from "./language-switcher";

export function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
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
  const navLinks = [
    { href: "#projects", label: t?.nav_work || "Work" },
    { href: "#about", label: t?.nav_about || "About" },
    { href: "#contact", label: t?.nav_contact || "Contact" },
  ];

  const handleLinkClick = () => {
    setMenuOpen(false);
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
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
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
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={handleLinkClick}
                    className="text-2xl font-medium text-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
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
