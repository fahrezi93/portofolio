// src/components/StarBorder.tsx

import React from "react";
import "./StarBorder.css";

type StarBorderProps<T extends React.ElementType> =
  React.ComponentPropsWithoutRef<T> & {
    as?: T;
    className?: string;
    children?: React.ReactNode;
    color?: string;
    speed?: React.CSSProperties['animationDuration'];
    thickness?: number;
  }

const StarBorder = <T extends React.ElementType = "button">({
  as,
  className = "",
  color = "hsl(var(--primary))", // Menggunakan warna primary dari tema
  speed = "6s",
  thickness = 1,
  children,
  ...rest
}: StarBorderProps<T>) => {
  const Component = as || "button";

  return (
    <Component 
      className={`star-border-container ${className}`} 
      {...(rest as any)}
      style={{
        // Perbaikan: padding diterapkan ke semua sisi agar tidak terpotong
        padding: `${thickness}px`, 
        ...(rest as any).style,
      }}
    >
      <div
        className="border-gradient-bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      <div
        className="border-gradient-top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      <div className="inner-content">{children}</div>
    </Component>
  );
};

export default StarBorder;