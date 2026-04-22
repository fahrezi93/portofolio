import { useEffect } from 'react';

export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let rafId = 0;
    let isDisposed = false;
    let initTimeout: ReturnType<typeof setTimeout> | null = null;
    let lenis: { raf: (time: number) => void; destroy: () => void } | null = null;

    const initLenis = async () => {
      try {
        const { default: Lenis } = await import('lenis');
        if (isDisposed) return;

        lenis = new Lenis({
          duration: 1.1,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          wrapper: window,
          content: document.documentElement,
        });

        const raf = (time: number) => {
          if (isDisposed || !lenis) return;
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        };

        rafId = requestAnimationFrame(raf);
      } catch {
        // Keep native scroll if Lenis fails to load.
      }
    };

    // Delay initialization slightly to avoid adding work on first paint.
    initTimeout = setTimeout(initLenis, 140);

    return () => {
      isDisposed = true;
      if (initTimeout) {
        clearTimeout(initTimeout);
      }
      cancelAnimationFrame(rafId);
      lenis?.destroy();
      lenis = null;
    };
  }, []);
}
