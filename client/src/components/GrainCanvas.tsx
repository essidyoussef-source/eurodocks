/**
 * GrainCanvas — EDS Scroll-Driven Cinematic
 * Canvas 2D avec particules de grain flottantes pour l'acte 2
 */

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

export function GrainCanvas({ opacity = 1 }: { opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Init particles
    const colors = [
      "oklch(0.72 0.14 65)",
      "oklch(0.65 0.12 70)",
      "oklch(0.80 0.10 60)",
      "oklch(0.58 0.10 65)",
    ];

    particlesRef.current = Array.from({ length: 180 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: Math.random() * 0.3 + 0.1,
      opacity: Math.random() * 0.6 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = p.opacity * opacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        // Ellipse for grain shape
        ctx.ellipse(p.x, p.y, p.size, p.size * 1.8, Math.random() * Math.PI, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y > canvas.height + 10) {
          p.y = -10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [opacity]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity }}
    />
  );
}
