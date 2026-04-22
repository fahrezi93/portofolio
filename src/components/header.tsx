"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import Link from 'next/link';
import Image from 'next/image';
import { GsapLogo } from "./ui/gsap-logo";
import { LanguageSwitcher } from "./language-switcher";
import { useActiveSection } from '@/hooks/use-active-section';

type NavLink = {
  href: string;
  label: string;
  scrollTarget?: string;
};

export function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const activeSection = useActiveSection();
  
  const headerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  let t;
  try {
    const languageContext = useLanguage();
    t = languageContext?.t;
  } catch (error) {
    t = null;
  }

  const navLinks: NavLink[] = [
    { href: "#portfolio", label: t?.nav_work || "Work", scrollTarget: "portfolio-title" },
    { href: "#about", label: t?.nav_about || "About" },
    { href: "#experience", label: t?.nav_experience || "Experience" },
    { href: "#contact", label: t?.nav_contact || "Contact" },
  ];

  useEffect(() => {
    setMounted(true);
    gsap.registerPlugin(ScrollToPlugin);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Animation Logic for Expanding and Shrinking
  useEffect(() => {
    if (!mounted || !headerRef.current) return;

    const header = headerRef.current;
    const logoIcon = header.querySelector('.logo-icon');
    const logoText = header.querySelector('.logo-text');

    // Create a smooth, unified transition
    gsap.to(header, {
      width: isScrolled ? "100%" : "85%",
      maxWidth: isScrolled ? "100%" : "850px",
      borderRadius: isScrolled ? "0px" : "100px",
      marginTop: isScrolled ? "0px" : "24px",
      height: isScrolled ? "64px" : "56px",
      paddingLeft: isScrolled ? "2rem" : "1.5rem",
      paddingRight: isScrolled ? "2rem" : "1.5rem",
      backgroundColor: isScrolled ? "rgba(3, 7, 18, 1)" : "rgba(3, 7, 18, 0.3)",
      backdropFilter: isScrolled ? "blur(0px)" : "blur(24px) saturate(180%)",
      borderTop: isScrolled ? "0px solid rgba(255,255,255,0)" : "1px solid rgba(255, 255, 255, 0.45)",
      borderBottom: isScrolled ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(255, 255, 255, 0.08)",
      boxShadow: isScrolled 
        ? "0 4px 30px rgba(0, 0, 0, 0.4)" 
        : "0 10px 40px -10px rgba(0, 0, 0, 0.7)",
      duration: 0.8,
      ease: "power4.inOut",
      overwrite: "auto"
    });

    // Animate logos in sync
    if (logoIcon && logoText) {
      gsap.to(logoIcon, {
        opacity: isScrolled ? 1 : 0,
        scale: isScrolled ? 1 : 0.8,
        x: isScrolled ? 0 : -10,
        duration: 0.6,
        ease: "power3.inOut"
      });
      gsap.to(logoText, {
        opacity: isScrolled ? 0 : 1,
        scale: isScrolled ? 1.1 : 1,
        x: isScrolled ? 10 : 0,
        duration: 0.6,
        ease: "power3.inOut"
      });
    }
  }, [isScrolled, mounted]);

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, link: NavLink) => {
    if (!link.href.startsWith('#')) return;
    event.preventDefault();
    const targetId = link.scrollTarget || link.href.replace('#', '');
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: targetElement, offsetY: 80 },
        ease: "power4.inOut"
      });
      window.history.replaceState(null, '', `${window.location.pathname}${link.href}`);
    }
  };

  const menuVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
  };

  if (!mounted) return null;

  return (
    <header className="fixed top-0 z-50 w-full flex justify-center pointer-events-none">
      <div
        ref={headerRef}
        className="pointer-events-auto flex items-center justify-between relative overflow-hidden"
        style={{
          width: "85%",
          maxWidth: "850px",
          marginTop: "24px",
          height: "56px",
          borderRadius: "100px",
          backgroundColor: "rgba(3, 7, 18, 0.3)",
          backdropFilter: "blur(24px) saturate(180%)",
          borderTop: "1px solid rgba(255, 255, 255, 0.45)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        {/* Logo Section */}
        <div className="flex-1 flex justify-start relative z-10">
          <Link href="/" className="group flex items-center relative h-8 w-32">
            <div className="logo-icon absolute left-0 opacity-0 scale-75 flex items-center">
              <Image
                src="/images/fahrezi_white_logo.webp"
                alt="Fahrezi Logo"
                width={26}
                height={26}
                className="object-contain"
                priority
              />
            </div>
            <div className="logo-text absolute left-0 opacity-100 flex items-center">
              <GsapLogo className="scale-75 origin-left" />
            </div>
          </Link>
        </div>

        {/* Navigation Section */}
        <nav className="hidden md:flex justify-center items-center relative z-10">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId && activeSection !== '';
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(event) => handleNavClick(event, link)}
                  className={`relative py-2 text-[10px] font-body font-bold tracking-[0.25em] uppercase transition-all duration-500 ${
                    isActive ? "text-white" : "text-white/40 hover:text-white"
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Right Section */}
        <div className="flex-1 justify-end hidden md:flex relative z-10">
          <LanguageSwitcher />
        </div>

        {/* Mobile Menu Trigger */}
        <div className="md:hidden relative z-10">
          <button
            onClick={() => setMenuOpen(true)}
            className="flex items-center gap-3 py-2 px-4 border border-white/10 bg-white/5 rounded-full"
          >
            <span className="text-[10px] font-body font-bold tracking-[0.2em] text-white uppercase">Menu</span>
            <div className="flex flex-col gap-1">
              <div className="w-4 h-[1px] bg-white" />
              <div className="w-4 h-[1px] bg-white/40" />
            </div>
          </button>
        </div>
      </div>

      {/* Editorial Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-[100] bg-[#030712] md:hidden flex flex-col pointer-events-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent pointer-events-none" />

            <div className="flex items-center justify-between p-8 relative z-10">
              <span className="text-[11px] font-body font-bold tracking-[0.3em] uppercase text-white/40">Navigation</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-all duration-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col items-start justify-center flex-1 px-10 gap-8 relative z-10">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  onClick={(e) => {
                    e.preventDefault();
                    setMenuOpen(false);
                    setTimeout(() => {
                      const targetId = link.scrollTarget || link.href.replace('#', '');
                      const target = document.getElementById(targetId);
                      if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 500);
                  }}
                  className="group relative"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-[11px] font-body font-bold tracking-[0.3em] text-blue-500/50">0{i + 1}</span>
                    <span className="text-4xl font-body font-light tracking-tighter text-white/30 group-hover:text-white transition-all duration-700">
                      {link.label}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="p-10 border-t border-white/5 flex flex-col gap-6 relative z-10">
              <div className="flex justify-between items-center w-full">
                <LanguageSwitcher />
                <span className="text-[10px] font-body font-bold tracking-[0.3em] text-white/10 uppercase">© 2026 Fahrezi</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
