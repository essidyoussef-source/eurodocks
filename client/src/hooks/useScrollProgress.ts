/**
 * useScrollProgress — EDS Scroll-Driven Cinematic
 * Maps scroll position within a container to a [0, 1] progress value
 */

import { useEffect, useRef, useState } from "react";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const p = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      setProgress(p);
      setScrollY(scrollTop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { progress, scrollY };
}

/** Map a value from [inMin, inMax] to [outMin, outMax], clamped */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  const clamped = Math.min(inMax, Math.max(inMin, value));
  const t = (clamped - inMin) / (inMax - inMin);
  return outMin + t * (outMax - outMin);
}

/** Ease in-out cubic */
export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** Ease out cubic */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}
