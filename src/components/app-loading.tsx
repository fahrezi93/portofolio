"use client";

import React, { useState, useEffect } from 'react';
import Loading from './loading';

interface AppLoadingProps {
  children: React.ReactNode;
}

const AppLoading: React.FC<AppLoadingProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate app initialization time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show loading for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
        <Loading 
          size={80} 
          text=""
          showCounter={true}
          className="text-center"
        />
      </div>
    );
  }

  return <>{children}</>;
};

export default AppLoading;
