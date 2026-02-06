"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import Link from 'next/link';
import Image from 'next/image';
import { GsapLogo } from "./ui/gsap-logo";
import { LanguageSwitcher } from "./language-switcher";
import { Button } from "./ui/button";
import { useActiveSection } from '@/hooks/use-active-section';

type NavLink = {
  href: string;
  label: string;
  scrollTarget?: string;
};

// ... existing imports

export function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const activeSection = useActiveSection();
  const headerRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const navContainerRef = React.useRef<HTMLDivElement>(null);

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
    gsap.registerPlugin(ScrollTrigger);
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

  // GSAP Animation for Header Expansion
  useEffect(() => {
    if (!mounted || !headerRef.current) return;

    const navElement = navContainerRef.current; // Store ref in variable for cleanup safety
    const header = headerRef.current;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768; // Simple check for mobile

      // Kill any existing ScrollTriggers for this element
      ScrollTrigger.getAll().forEach(st => st.kill());

      // Set initial state explicitly (pill state)
      gsap.set(header, {
        width: isMobile ? "92%" : "95%",
        maxWidth: isMobile ? "100%" : "46rem", // Reduced to make it more compact
        borderRadius: "9999px",
        marginTop: "16px",
        top: "0px",
        borderWidth: "1px",
        backgroundColor: "rgba(3, 7, 18, 0.2)",
        backdropFilter: "blur(12px)",
        paddingLeft: isMobile ? "16px" : "24px",
        paddingRight: isMobile ? "16px" : "24px",
        height: "64px",
      });

      if (navElement) {
        gsap.set(navElement, {
          columnGap: "8px",
        });
      }

      // Create ScrollTrigger animation with proper from/to values
      const headerTween = gsap.to(header, {
        width: "100%",
        maxWidth: "100%",
        borderRadius: "0px",
        marginTop: "0px",
        top: "0px",
        borderTopWidth: "0px",
        borderLeftWidth: "0px",
        borderRightWidth: "0px",
        borderBottomWidth: "1px",
        backgroundColor: "rgba(3, 7, 18, 0.8)",
        backdropFilter: "blur(12px)",
        paddingLeft: "24px",
        paddingRight: "24px",
        height: "64px",
        ease: "none",
        paused: true, // Important: start paused
      });

      // Create ScrollTrigger that controls the tween
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "+=150",
        scrub: isMobile ? 0.1 : 0.5,
        animation: headerTween,
      });

      // Animate nav gap
      if (navElement) {
        const navTween = gsap.to(navElement, {
          columnGap: "32px",
          ease: "none",
          paused: true,
        });

        ScrollTrigger.create({
          trigger: document.body,
          start: "top top",
          end: "+=150",
          scrub: isMobile ? 0.1 : 0.5,
          animation: navTween,
        });
      }

    }, containerRef);

    // Handle resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, [mounted]);

  // Don't render until mounted until hydration matches
  if (!mounted) {
    return (
      <header className="fixed top-0 z-30 w-full flex justify-center pt-4"> {/* Adjusted initial loading state */}
        <div className="container h-16 max-w-[46rem] rounded-full border border-border/30 bg-background/20 backdrop-blur-lg" />
      </header>
    );
  }

  return (
    <header ref={containerRef} className="fixed top-0 z-30 w-full flex justify-center pointer-events-none">
      <div
        ref={headerRef}
        className="pointer-events-auto flex items-center justify-between border border-border/30 relative z-40"
        style={{
          // Initial styles - GSAP will animate these
          marginTop: '16px',
          width: 'min(92%, 46rem)',
          height: '64px',
          borderRadius: '9999px',
          backgroundColor: 'rgba(3, 7, 18, 0.2)',
          backdropFilter: 'blur(12px)',
          paddingLeft: '16px',
          paddingRight: '16px',
        }}
      >
        <div className="flex-1 flex justify-start">
          <GsapLogo />
        </div>

        <nav className="hidden items-center md:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
          <div ref={navContainerRef} className="flex items-center gap-2">
            {navLinks.map((link, i) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId && activeSection !== '';
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(event) => handleNavClick(event, link)}
                  className={`relative px-4 py-2 text-base font-medium transition-all duration-300 rounded-full group overflow-hidden ${isActive
                    ? 'text-white'
                    : 'text-muted-foreground hover:text-white hover:bg-white/5'
                    }`}
                >
                  <div className="relative z-10 flex items-center gap-2">
                    <span>{link.label}</span>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary/10 rounded-full border border-primary/20"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="flex-1 flex justify-end hidden md:flex">
          <LanguageSwitcher />
        </div>

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
            className="fixed inset-0 z-[100] origin-top bg-background md:hidden flex flex-col pointer-events-auto"
            style={{ touchAction: 'auto' }}
          >
            <div className="flex items-center justify-between p-4 container mx-auto relative z-10">
              <GsapLogo onClick={handleLinkClick} />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMenuOpen(false)}
                className="relative z-10"
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
              className="flex flex-col items-center justify-center h-full gap-8 container mx-auto pb-20 relative z-10"
            >
              {navLinks.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId && activeSection !== '';
                return (
                  <div key={link.href} className="overflow-hidden">
                    <motion.div variants={mobileLinkVars}>
                      <a
                        href={link.href}
                        onClick={(event) => {
                          event.preventDefault();
                          const targetId = link.scrollTarget || link.href.replace('#', '');
                          const targetElement = document.getElementById(targetId);

                          // Close menu first
                          setMenuOpen(false);

                          // Then scroll after a short delay to allow menu to close
                          setTimeout(() => {
                            if (targetElement) {
                              targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                              window.history.replaceState(null, '', link.href);
                            } else {
                              window.location.hash = link.href;
                            }
                          }, 300);
                        }}
                        className={`block text-5xl font-headline font-bold tracking-tight transition-colors cursor-pointer select-none ${isActive ? 'text-primary' : 'text-foreground hover:text-primary active:text-primary'
                          }`}
                        style={{ touchAction: 'manipulation' }}
                      >
                        {link.label}
                      </a>
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