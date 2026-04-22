"use client";

import React, { useState, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

import { useLoading } from '@/context/loading-context';

interface AppLoadingProps {
  children: React.ReactNode;
}

const AppLoading: React.FC<AppLoadingProps> = ({ children }) => {
  const { isLoading, setIsLoading } = useLoading();
  const [counter, setCounter] = useState(0);
  const pathname = usePathname();

  const isMinimalist = pathname?.startsWith('/minimalist');

  useEffect(() => {
    // Percentage counter animation
    const duration = 2000; // Match the timeout
    const interval = 20; // Update every 20ms
    const steps = duration / interval;
    const increment = 100 / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= 100) {
        setCounter(100);
        clearInterval(timer);
        setTimeout(() => setIsLoading(false), 200);
      } else {
        setCounter(Math.floor(current));
      }
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [setIsLoading]);

  if (isMinimalist) {
    return <>{children}</>;
  }

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
                duration: 1.2,
                ease: [0.76, 0, 0.24, 1],
              }
            }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505]"
          >
            <motion.div
              className="relative flex flex-col items-center"
              exit={{
                y: -100,
                opacity: 0,
                transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
              }}
            >
              {/* Counter - Large & Elegant */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-baseline gap-2"
              >
                <span className="font-bricolage text-[120px] md:text-[180px] font-extrabold text-white leading-none tracking-tighter">
                  {counter.toString().padStart(2, '0')}
                </span>
                <span className="font-space text-2xl text-white/30 font-light mb-8">%</span>
              </motion.div>

              {/* Progress Line - Minimalist */}
              <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-blue-500 origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: counter / 100 }}
                  transition={{ ease: "linear" }}
                />
              </div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-8 font-space text-[10px] tracking-[0.4em] uppercase text-white/40"
              >
                Initializing Portfolio
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  );
};

export default AppLoading;
