import { useState, useEffect, useCallback } from 'react';

interface PerformanceState {
  isMobile: boolean;
  isLowEndDevice: boolean;
  reducedMotion: boolean;
  connectionSpeed: 'slow' | 'fast' | 'unknown';
}

export function usePerformanceOptimization() {
  const [perfState, setPerfState] = useState<PerformanceState>({
    isMobile: false,
    isLowEndDevice: false,
    reducedMotion: false,
    connectionSpeed: 'unknown'
  });

  useEffect(() => {
    const checkPerformanceMetrics = () => {
      // Check if mobile
      const isMobile = window.innerWidth < 768;
      
      // Check if low-end device (simplified heuristic)
      const isLowEndDevice = navigator.hardwareConcurrency <= 2 || 
                            (navigator as any).deviceMemory <= 2;
      
      // Check reduced motion preference
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Check connection speed
      let connectionSpeed: 'slow' | 'fast' | 'unknown' = 'unknown';
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        if (connection) {
          const effectiveType = connection.effectiveType;
          connectionSpeed = effectiveType === 'slow-2g' || effectiveType === '2g' ? 'slow' : 'fast';
        }
      }

      setPerfState({
        isMobile,
        isLowEndDevice,
        reducedMotion,
        connectionSpeed
      });
    };

    checkPerformanceMetrics();
    
    // Listen for resize events
    window.addEventListener('resize', checkPerformanceMetrics);
    
    return () => {
      window.removeEventListener('resize', checkPerformanceMetrics);
    };
  }, []);

  // Determine if animations should be disabled
  const shouldReduceAnimations = useCallback(() => {
    return perfState.isMobile || 
           perfState.isLowEndDevice || 
           perfState.reducedMotion || 
           perfState.connectionSpeed === 'slow';
  }, [perfState]);

  // Determine if complex effects should be disabled
  const shouldReduceEffects = useCallback(() => {
    return perfState.isMobile || perfState.isLowEndDevice;
  }, [perfState]);

  // Get optimized animation duration
  const getAnimationDuration = useCallback((defaultDuration: number) => {
    if (shouldReduceAnimations()) {
      return 0;
    }
    if (perfState.isMobile) {
      return defaultDuration * 0.7; // 30% faster on mobile
    }
    return defaultDuration;
  }, [perfState, shouldReduceAnimations]);

  // Get optimized particle count
  const getOptimizedParticleCount = useCallback((defaultCount: number) => {
    if (perfState.isLowEndDevice) {
      return Math.floor(defaultCount * 0.3);
    }
    if (perfState.isMobile) {
      return Math.floor(defaultCount * 0.5);
    }
    return defaultCount;
  }, [perfState]);

  return {
    ...perfState,
    shouldReduceAnimations: shouldReduceAnimations(),
    shouldReduceEffects: shouldReduceEffects(),
    getAnimationDuration,
    getOptimizedParticleCount
  };
}
