"use client";

import React, { useEffect, useState } from 'react';
import Loading from './loading';

interface PageLoadingProps {
  children: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  minLoadingTime?: number;
}

const PageLoading: React.FC<PageLoadingProps> = ({ 
  children, 
  isLoading = false,
  loadingText = "Loading...",
  minLoadingTime = 1000
}) => {
  const [showLoading, setShowLoading] = useState(isLoading);
  const [hasMinTimePassed, setHasMinTimePassed] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShowLoading(true);
      setHasMinTimePassed(false);
      
      const timer = setTimeout(() => {
        setHasMinTimePassed(true);
      }, minLoadingTime);

      return () => clearTimeout(timer);
    } else if (hasMinTimePassed) {
      setShowLoading(false);
    }
  }, [isLoading, hasMinTimePassed, minLoadingTime]);

  if (showLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <Loading 
          size={120} 
          text={loadingText}
          className="bg-background/90 p-8 rounded-2xl shadow-2xl border"
        />
      </div>
    );
  }

  return <>{children}</>;
};

export default PageLoading;
