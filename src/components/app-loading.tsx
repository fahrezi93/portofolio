"use client";

import React, { useLayoutEffect, useState, useEffect, useRef } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

import { useLoading } from '@/context/loading-context';

interface AppLoadingProps {
  children: React.ReactNode;
}

const INTRO_SESSION_KEY = 'portfolio_intro_seen_v1';

const AppLoading: React.FC<AppLoadingProps> = ({ children }) => {
  const { isLoading, setIsLoading, setLoadingScreenPlayed } = useLoading();
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [shouldShowIntro, setShouldShowIntro] = useState(false);
  const pathname = usePathname();

  const isMinimalist = pathname?.startsWith('/minimalist');

  useLayoutEffect(() => {
    if (isMinimalist) {
      setShouldShowIntro(false);
      setIsLoading(false);
      if (counterRef.current) counterRef.current.textContent = '100';
      if (progressRef.current) progressRef.current.style.transform = `scaleX(1)`;
      setLoadingScreenPlayed(false);
      return;
    }

    const introSeen = window.sessionStorage.getItem(INTRO_SESSION_KEY) === '1';
    if (introSeen) {
      setShouldShowIntro(false);
      setIsLoading(false);
      if (counterRef.current) counterRef.current.textContent = '100';
      if (progressRef.current) progressRef.current.style.transform = `scaleX(1)`;
      setLoadingScreenPlayed(false);
      return;
    }

    setShouldShowIntro(true);
    setIsLoading(true);
    if (counterRef.current) counterRef.current.textContent = '00';
    if (progressRef.current) progressRef.current.style.transform = `scaleX(0)`;
    setLoadingScreenPlayed(true);
  }, [isMinimalist, setIsLoading, setLoadingScreenPlayed]);

  useEffect(() => {
    if (!shouldShowIntro || !isLoading) return;

    const durationMs = 1400;
    const settleDelayMs = 120;
    const hardTimeoutMs = 3500;
    let frameId = 0;
    let settleTimeout: ReturnType<typeof setTimeout> | null = null;
    let hardTimeout: ReturnType<typeof setTimeout> | null = null;
    const startedAt = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / durationMs, 1);
      const val = Math.floor(progress * 100);
      if (counterRef.current) counterRef.current.textContent = val.toString().padStart(2, '0');
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
        return;
      }

      window.sessionStorage.setItem(INTRO_SESSION_KEY, '1');
      settleTimeout = setTimeout(() => {
        if (counterRef.current) counterRef.current.textContent = '100';
        if (progressRef.current) progressRef.current.style.transform = `scaleX(1)`;
        setIsLoading(false);
      }, settleDelayMs);
    };

    frameId = requestAnimationFrame(tick);
    hardTimeout = setTimeout(() => {
      window.sessionStorage.setItem(INTRO_SESSION_KEY, '1');
      if (counterRef.current) counterRef.current.textContent = '100';
      if (progressRef.current) progressRef.current.style.transform = `scaleX(1)`;
      setIsLoading(false);
    }, hardTimeoutMs);

    return () => {
      cancelAnimationFrame(frameId);
      if (settleTimeout) {
        clearTimeout(settleTimeout);
      }
      if (hardTimeout) {
        clearTimeout(hardTimeout);
      }
    };
  }, [isLoading, setIsLoading, shouldShowIntro]);

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
                <span ref={counterRef} className="font-bricolage text-[120px] md:text-[180px] font-extrabold text-white leading-none tracking-tighter">
                  00
                </span>
                <span className="font-space text-2xl text-white/30 font-light mb-8">%</span>
              </motion.div>

              {/* Progress Line - Minimalist */}
              <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
                <div
                  ref={progressRef}
                  className="absolute inset-0 bg-blue-500 origin-left"
                  style={{ transform: "scaleX(0)" }}
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
