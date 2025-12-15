"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
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

  // Animation variants
  const menuVariants = {
    initial: {
      clipPath: "inset(0 0 100% 0)",
    },
    animate: {
      clipPath: "inset(0 0 0% 0)",
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1], // Smooth ease-in-out
      },
    },
    exit: {
      clipPath: "inset(0 0 100% 0)",
      transition: {
        delay: 0.1,
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1], // Smooth ease-in-out
      },
    },
  };

  const containerVars = {
    initial: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.05,
        staggerDirection: 1,
      },
    },
  };

  const mobileLinkVars = {
    initial: {
      y: "30vh",
      transition: {
        duration: 0.4,
        ease: [0.37, 0, 0.63, 1],
      },
    },
    open: {
      y: 0,
      transition: {
        ease: [0, 0.55, 0.45, 1],
        duration: 0.5,
      },
    },
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
      <div className="container mx-auto flex h-16 max-w-5xl items-center justify-between rounded-full border border-border/30 bg-background/20 px-6 backdrop-blur-lg relative z-40">
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
          {/* Desktop Nav Links replaced by Floating Dock */}
          {/* {navLinks.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId && activeSection !== '';
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={(event) => handleNavClick(event, link)}
                className={`relative text-base font-medium transition-colors group ${isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-primary'
                  }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 h-0.5 bg-primary transition-all duration-300 ease-out ${isActive
                  ? 'w-full left-0'
                  : 'w-0 left-1/2 -translate-x-1/2 group-hover:w-full group-hover:left-0 group-hover:translate-x-0'
                  }`}></span>
              </Link>
            );
          })} */}
          <LanguageSwitcher />
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMenuOpen(true)}
            className="text-foreground"
          >
            <Menu className="h-7 w-7" />
            <span className="sr-only">Open menu</span>
          </Button>
        </div>
      </div>

      {/* Full Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-50 origin-top bg-background md:hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-4 container mx-auto">
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

            <motion.div
              variants={containerVars}
              initial="initial"
              animate="open"
              exit="initial"
              className="flex flex-col items-center justify-center h-full gap-8 container mx-auto pb-20"
            >
              {navLinks.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId && activeSection !== '';
                return (
                  <div key={link.href} className="overflow-hidden">
                    <motion.div variants={mobileLinkVars}>
                      <Link
                        href={link.href}
                        onClick={(event) => {
                          handleNavClick(event, link);
                          handleLinkClick();
                        }}
                        className={`text-5xl font-headline font-bold tracking-tight transition-colors ${isActive ? 'text-primary' : 'text-foreground hover:text-primary'
                          }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  </div>
                );
              })}

              <div className="overflow-hidden mt-8">
                <motion.div variants={mobileLinkVars}>
                  <LanguageSwitcher />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}