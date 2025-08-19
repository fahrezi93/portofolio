"use client";
import React from "react";

type StarButtonProps<T extends React.ElementType> =
  React.ComponentPropsWithoutRef<T> & {
    as?: T;
    className?: string;
    children?: React.ReactNode;
    color?: string;
    speed?: React.CSSProperties['animationDuration'];
    thickness?: number;
  }

export const StarButton = <T extends React.ElementType = "button">({
  as,
  className = "",
  color = "hsl(var(--primary))",
  speed = "6s",
  thickness = 2,
  children,
  ...rest
}: StarButtonProps<T>) => {
  const Component = as || "button";

  return (
    <Component 
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full text-lg font-medium ${className}`} 
      {...(rest as any)}
      style={{
        padding: `${thickness}px`,
        ...(rest as any).style,
      }}
    >
      {/* Bottom star animation */}
      <div
        className="pointer-events-none absolute w-[300%] h-[50%] opacity-0 group-hover:opacity-70 transition-opacity duration-300 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      
      {/* Top star animation */}
      <div
        className="pointer-events-none absolute w-[300%] h-[50%] opacity-0 group-hover:opacity-70 transition-opacity duration-300 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      
      {/* Button content */}
      <div className="relative z-10 bg-gray-800 text-primary-foreground h-14 px-10 rounded-full flex items-center justify-center w-full flex-shrink-0 transition-all duration-200 hover:bg-gray-700">
        {children}
      </div>
    </Component>
  );
};
