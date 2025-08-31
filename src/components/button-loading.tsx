"use client";

import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { cn } from '@/lib/utils';

interface ButtonLoadingProps {
  isLoading?: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

const ButtonLoading: React.FC<ButtonLoadingProps> = ({
  isLoading = false,
  children,
  className = "",
  disabled = false,
  onClick,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const loadingSize = {
    sm: 16,
    md: 20,
    lg: 24
  };

  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center rounded-lg font-medium transition-colors",
        "bg-primary text-primary-foreground hover:bg-primary/90",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        sizeClasses[size],
        className
      )}
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <DotLottieReact
            src="https://lottie.host/4db68bbd-31f6-4cd8-b6b5-2e92e5d62a5c/lsRBt60C0e.lottie"
            loop
            autoplay
            style={{ width: loadingSize[size], height: loadingSize[size] }}
          />
        </div>
      )}
      <span className={cn(isLoading && "opacity-0")}>
        {children}
      </span>
    </button>
  );
};

export default ButtonLoading;
