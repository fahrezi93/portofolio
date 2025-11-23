"use client";

import React, { useState, useEffect } from 'react';
import Loading from './loading';
import { motion, AnimatePresence } from 'framer-motion';

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

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loading-screen"
            initial={{ y: 0 }}
            exit={{
              y: "-100%",
              transition: {
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1] // Custom bezier for smooth "premium" feel
              }
            }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          >
            <Loading
              size={80}
              text=""
              showCounter={true}
              className="text-center"
            />
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  );
};

export default AppLoading;
