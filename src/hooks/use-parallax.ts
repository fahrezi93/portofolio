"use client";

import { useEffect, useState } from 'react';

export function useParallax(speed: number = 0.5) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let frameId = 0;
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      frameId = window.requestAnimationFrame(() => {
        setOffset(window.pageYOffset * speed);
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.cancelAnimationFrame(frameId);
    };
  }, [speed]);

  return offset;
}

export function useMouseParallax(strength: number = 0.1) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let frameId = 0;
    let nextX = 0;
    let nextY = 0;
    let ticking = false;

    const handleMouseMove = (e: MouseEvent) => {
      nextX = (e.clientX - window.innerWidth / 2) * strength;
      nextY = (e.clientY - window.innerHeight / 2) * strength;

      if (ticking) return;
      ticking = true;

      frameId = window.requestAnimationFrame(() => {
        setMousePosition({ x: nextX, y: nextY });
        ticking = false;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.cancelAnimationFrame(frameId);
    };
  }, [strength]);

  return mousePosition;
}
