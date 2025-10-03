"use client";

import { useState, useEffect } from 'react';

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>(''); // Default to empty (no active section)

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    
    const observer = new IntersectionObserver(
      (entries) => {
        // If at the very top of the page, no section should be active
        if (window.scrollY < 100) {
          setActiveSection('');
          return;
        }
        
        // Sort entries by intersection ratio to get the most visible section
        const visibleEntries = entries
          .filter(entry => entry.isIntersecting && entry.intersectionRatio > 0.3)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        
        if (visibleEntries.length > 0) {
          setActiveSection(visibleEntries[0].target.id);
        } else {
          // If no section is significantly visible, clear active section
          setActiveSection('');
        }
      },
      {
        threshold: [0.1, 0.3, 0.5, 0.7], // Multiple thresholds for better detection
        rootMargin: '-100px 0px -100px 0px' // Adjust for header height
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    // Set initial active section based on scroll position
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for header
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // If at the very top of the page, no section should be active
      if (window.scrollY < 100) {
        setActiveSection('');
        return;
      }
      
      // Find the section that occupies most of the viewport
      let maxVisibleArea = 0;
      let mostVisibleSection = '';
      
      sections.forEach((section) => {
        const element = section as HTMLElement;
        const rect = element.getBoundingClientRect();
        const { offsetTop, offsetHeight } = element;
        
        // Calculate visible area of this section
        const visibleTop = Math.max(0, -rect.top);
        const visibleBottom = Math.min(rect.height, viewportHeight - rect.top);
        const visibleArea = Math.max(0, visibleBottom - visibleTop);
        
        // Only consider sections that are significantly visible (at least 30% or 200px)
        const visibilityThreshold = Math.min(offsetHeight * 0.3, 200);
        
        if (visibleArea > visibilityThreshold && visibleArea > maxVisibleArea) {
          maxVisibleArea = visibleArea;
          mostVisibleSection = element.id;
        }
      });
      
      setActiveSection(mostVisibleSection);
    };

    // Initial check
    handleScroll();
    
    // Add scroll listener as backup
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return activeSection;
}
