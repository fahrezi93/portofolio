import { useEffect } from 'react';

export function useLenis() {
  useEffect(() => {
    // Dynamically import Lenis to avoid SSR issues
    import('lenis').then(({ default: Lenis }) => {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        wrapper: window, // Use window as wrapper to avoid position issues
        content: document.documentElement, // Use document as content
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      const rafId = requestAnimationFrame(raf);

      return () => {
        cancelAnimationFrame(rafId);
        lenis.destroy();
      };
    });
  }, []);
}
