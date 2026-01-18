"use client";

import { useParallax, useMouseParallax } from '@/hooks/use-parallax';

interface ParallaxBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export function ParallaxBackground({ children, className = "" }: ParallaxBackgroundProps) {
  const scrollOffset = useParallax(0.3);
  const mouseOffset = useMouseParallax(0.05);

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ position: 'relative' }} suppressHydrationWarning>
      {/* Animated background elements */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          transform: `translateY(${scrollOffset}px) translateX(${mouseOffset.x}px)`,
          willChange: 'transform',
        }}
        suppressHydrationWarning
      >
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-red-400/20 rounded-full blur-lg animate-pulse delay-1000" />
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-2xl animate-pulse delay-2000" />
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-md animate-pulse delay-500" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          transform: `translateY(${scrollOffset * 0.5}px)`,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
