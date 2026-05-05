
'use client';

import { ReactNode, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

interface SmoothScrollProps {
  children: ReactNode;
}

const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Disable Lenis on mobile to prevent carousel swipe conflicts
    if (window.innerWidth < 768) return;

    // Initialize Lenis
    const lenis = new Lenis({
      lerp: 0.05, // Lower = smoother glide
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      smoothWheel: true,
      syncTouch: true,
    });

    lenisRef.current = lenis;

    // Handle clicks on anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (href && href.startsWith('/#')) {
        const id = href.split('#')[1];
        const element = document.getElementById(id);
        if (element) {
          e.preventDefault();
          lenis.scrollTo(element, { offset: -80 });
        }
      }
    };

    window.addEventListener('click', handleAnchorClick);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      window.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
