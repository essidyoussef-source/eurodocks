/**
 * useScrollScrub — Moteur scroll-scrub SONAR
 * Calcule la progression globale et par scène d'une section sticky
 */

import { useEffect, useRef, useState, useCallback } from "react";

export interface ScrubState {
  /** Progression globale 0→1 sur toute la section sticky */
  progress: number;
  /** Index de scène actif (0-3) */
  scene: number;
  /** Progression locale 0→1 dans la scène courante */
  sceneProgress: number;
  /** Progression de transition 0→1 (derniers 15% de chaque scène) */
  transitionProgress: number;
}

/** Nombre de scènes */
const SCENE_COUNT = 4;
/** Hauteur en vh par scène */
const SCENE_HEIGHT_VH = 150;

/** Easing cubic-bezier out */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/** Easing cubic-bezier in-out */
export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** Mappe une valeur de [inMin, inMax] vers [outMin, outMax], clampée */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  const clamped = Math.max(inMin, Math.min(inMax, value));
  return outMin + ((clamped - inMin) / (inMax - inMin)) * (outMax - outMin);
}

export function useScrollScrub() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<ScrubState>({
    progress: 0,
    scene: 0,
    sceneProgress: 0,
    transitionProgress: 0,
  });

  const onScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const totalScrollable = el.offsetHeight - window.innerHeight;
    if (totalScrollable <= 0) return;

    // Distance scrollée depuis le début du container
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));

    // Calcul de la scène
    const sceneSize = 1 / SCENE_COUNT;
    const rawScene = progress / sceneSize;
    const scene = Math.min(SCENE_COUNT - 1, Math.floor(rawScene));
    const sceneProgress = Math.max(0, Math.min(1, rawScene - scene));

    // Progression de transition (derniers 20% de la scène)
    const transitionStart = 0.80;
    const transitionProgress = mapRange(sceneProgress, transitionStart, 1, 0, 1);

    setState({ progress, scene, sceneProgress, transitionProgress });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return { containerRef, state };
}

export { SCENE_COUNT, SCENE_HEIGHT_VH };
