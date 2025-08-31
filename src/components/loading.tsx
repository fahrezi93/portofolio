"use client";

import React, { useState, useEffect } from 'react';

interface LoadingProps {
  size?: number;
  className?: string;
  text?: string;
  showCounter?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ 
  size = 100, 
  className = "",
  text = "",
  showCounter = false
}) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (showCounter) {
      const interval = setInterval(() => {
        setCounter(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, 20); // Count up over 2 seconds (100 * 20ms = 2000ms)

      return () => clearInterval(interval);
    }
  }, [showCounter]);

  return (
    <div className={`flex flex-col items-center justify-center space-y-6 ${className}`}>
      {showCounter && (
        <div className="text-center">
          <div className="text-4xl font-bold text-primary animate-bounce">
            {counter}%
          </div>
        </div>
      )}
      <div className="flex items-center justify-center">
        {/* Three bouncing dots - always show 3 dots */}
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
      {text && (
        <p className="text-sm text-muted-foreground animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export default Loading;
