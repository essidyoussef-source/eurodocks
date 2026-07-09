/**
 * WorldMap — EDS Scroll-Driven Cinematic
 * SVG animé avec routes maritimes et ports pour l'acte 3
 */

import { useEffect, useRef } from "react";

interface Port {
  id: string;
  name: string;
  x: number; // % of SVG width
  y: number; // % of SVG height
  type: "home" | "partner";
  delay: number;
}

interface Route {
  from: string;
  to: string;
  controlX: number;
  controlY: number;
  delay: number;
  color: string;
}

const PORTS: Port[] = [
  // Ports EDS France
  { id: "dunkerque",  name: "Dunkerque",       x: 48.2, y: 26.5, type: "home",    delay: 0 },
  { id: "boulogne",   name: "Boulogne",         x: 47.5, y: 27.2, type: "home",    delay: 100 },
  { id: "rouen",      name: "Rouen",            x: 48.0, y: 28.0, type: "home",    delay: 200 },
  { id: "calais",     name: "Calais",           x: 48.0, y: 26.2, type: "home",    delay: 300 },
  { id: "bayonne",    name: "Bayonne",          x: 46.5, y: 31.5, type: "home",    delay: 400 },
  // Ports partenaires
  { id: "rotterdam",  name: "Rotterdam",        x: 49.0, y: 25.8, type: "partner", delay: 500 },
  { id: "hambourg",   name: "Hambourg",         x: 50.5, y: 24.5, type: "partner", delay: 600 },
  { id: "anvers",     name: "Anvers",           x: 48.8, y: 26.0, type: "partner", delay: 700 },
  { id: "casablanca", name: "Casablanca",       x: 44.5, y: 37.5, type: "partner", delay: 800 },
  { id: "dakar",      name: "Dakar",            x: 38.5, y: 43.0, type: "partner", delay: 900 },
  { id: "istanbul",   name: "Istanbul",         x: 56.5, y: 31.5, type: "partner", delay: 1000 },
  { id: "constanta",  name: "Constanta",        x: 57.5, y: 29.5, type: "partner", delay: 1100 },
];

const ROUTES: Route[] = [
  { from: "dunkerque",  to: "rotterdam",  controlX: 48.6, controlY: 25.0, delay: 200,  color: "oklch(0.72 0.14 65)" },
  { from: "dunkerque",  to: "hambourg",   controlX: 49.5, controlY: 23.5, delay: 400,  color: "oklch(0.72 0.14 65)" },
  { from: "rouen",      to: "casablanca", controlX: 44.0, controlY: 32.0, delay: 600,  color: "oklch(0.65 0.12 65)" },
  { from: "casablanca", to: "dakar",      controlX: 40.0, controlY: 40.0, delay: 800,  color: "oklch(0.65 0.12 65)" },
  { from: "boulogne",   to: "anvers",     controlX: 48.3, controlY: 25.5, delay: 300,  color: "oklch(0.72 0.14 65)" },
  { from: "dunkerque",  to: "istanbul",   controlX: 52.0, controlY: 27.0, delay: 1000, color: "oklch(0.58 0.10 65)" },
  { from: "rouen",      to: "constanta",  controlX: 54.0, controlY: 28.5, delay: 1200, color: "oklch(0.58 0.10 65)" },
];

function portCoords(port: Port, svgW: number, svgH: number) {
  return { cx: (port.x / 100) * svgW, cy: (port.y / 100) * svgH };
}

export function WorldMap({ progress = 0 }: { progress?: number }) {
  const svgRef = useRef<SVGSVGElement>(null);

  // Animate route paths via stroke-dashoffset
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const paths = svg.querySelectorAll<SVGPathElement>("[data-route]");
    paths.forEach((path) => {
      const delay = parseFloat(path.dataset.delay || "0");
      const len = path.getTotalLength();
      const routeProgress = Math.max(0, Math.min(1, (progress - 0.05 - delay / 8000) * 4));
      path.style.strokeDasharray = `${len}`;
      path.style.strokeDashoffset = `${len * (1 - routeProgress)}`;
    });

    // Animate port circles
    const circles = svg.querySelectorAll<SVGCircleElement>("[data-port]");
    circles.forEach((circle) => {
      const delay = parseFloat(circle.dataset.delay || "0");
      const portProgress = Math.max(0, Math.min(1, (progress - 0.02 - delay / 8000) * 5));
      circle.style.opacity = `${portProgress}`;
      circle.style.transform = `scale(${portProgress})`;
    });
  }, [progress]);

  const W = 1000;
  const H = 600;

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-full"
      style={{ overflow: "visible" }}
    >
      {/* Fond de carte — continents simplifiés */}
      {/* Europe */}
      <path
        d="M 440 180 L 460 170 L 490 165 L 520 168 L 545 175 L 560 185 L 570 200 L 565 215 L 550 225 L 530 230 L 510 235 L 490 240 L 470 245 L 455 255 L 445 265 L 440 275 L 435 260 L 430 245 L 432 230 L 438 215 L 440 200 Z"
        fill="oklch(0.22 0.03 240)"
        stroke="oklch(0.35 0.04 240)"
        strokeWidth="0.8"
      />
      {/* Scandinavie */}
      <path
        d="M 480 155 L 495 145 L 510 140 L 520 148 L 515 160 L 505 168 L 490 165 Z"
        fill="oklch(0.22 0.03 240)"
        stroke="oklch(0.35 0.04 240)"
        strokeWidth="0.8"
      />
      {/* Afrique du Nord */}
      <path
        d="M 380 320 L 420 315 L 460 318 L 490 325 L 510 335 L 520 350 L 515 370 L 500 385 L 480 395 L 460 400 L 440 405 L 420 400 L 400 390 L 385 375 L 375 355 L 372 335 Z"
        fill="oklch(0.20 0.03 240)"
        stroke="oklch(0.32 0.04 240)"
        strokeWidth="0.8"
      />
      {/* Afrique de l'Ouest */}
      <path
        d="M 370 380 L 385 375 L 390 395 L 395 415 L 390 435 L 380 450 L 365 460 L 350 455 L 340 440 L 338 420 L 345 400 L 358 385 Z"
        fill="oklch(0.20 0.03 240)"
        stroke="oklch(0.32 0.04 240)"
        strokeWidth="0.8"
      />
      {/* Mer Méditerranée (zone bleue) */}
      <ellipse cx="510" cy="295" rx="55" ry="18" fill="oklch(0.14 0.04 240 / 0.6)" />
      {/* Mer Noire */}
      <ellipse cx="565" cy="275" rx="22" ry="10" fill="oklch(0.14 0.04 240 / 0.6)" />
      {/* Mer du Nord */}
      <ellipse cx="490" cy="235" rx="20" ry="14" fill="oklch(0.14 0.04 240 / 0.4)" />

      {/* Grille de coordonnées */}
      {[0.2, 0.4, 0.6, 0.8].map((t) => (
        <line
          key={`h${t}`}
          x1="0" y1={H * t} x2={W} y2={H * t}
          stroke="oklch(1 0 0 / 0.04)" strokeWidth="0.5"
        />
      ))}
      {[0.2, 0.4, 0.6, 0.8].map((t) => (
        <line
          key={`v${t}`}
          x1={W * t} y1="0" x2={W * t} y2={H}
          stroke="oklch(1 0 0 / 0.04)" strokeWidth="0.5"
        />
      ))}

      {/* Routes maritimes */}
      {ROUTES.map((route) => {
        const fromPort = PORTS.find((p) => p.id === route.from)!;
        const toPort = PORTS.find((p) => p.id === route.to)!;
        const { cx: x1, cy: y1 } = portCoords(fromPort, W, H);
        const { cx: x2, cy: y2 } = portCoords(toPort, W, H);
        const cx = (route.controlX / 100) * W;
        const cy = (route.controlY / 100) * H;

        return (
          <g key={`${route.from}-${route.to}`}>
            {/* Glow */}
            <path
              d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
              fill="none"
              stroke={route.color}
              strokeWidth="4"
              strokeOpacity="0.15"
              data-route="glow"
              data-delay={route.delay}
              style={{ strokeDasharray: "1000", strokeDashoffset: "1000", transition: "stroke-dashoffset 0.8s cubic-bezier(0.23,1,0.32,1)" }}
            />
            {/* Route principale */}
            <path
              d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
              fill="none"
              stroke={route.color}
              strokeWidth="1.5"
              strokeOpacity="0.8"
              data-route="main"
              data-delay={route.delay}
              style={{ strokeDasharray: "1000", strokeDashoffset: "1000", transition: "stroke-dashoffset 0.8s cubic-bezier(0.23,1,0.32,1)" }}
            />
          </g>
        );
      })}

      {/* Ports */}
      {PORTS.map((port) => {
        const { cx, cy } = portCoords(port, W, H);
        const isHome = port.type === "home";

        return (
          <g
            key={port.id}
            data-port={port.id}
            data-delay={port.delay}
            style={{ opacity: 0, transformOrigin: `${cx}px ${cy}px`, transition: `opacity 0.4s ease-out ${port.delay}ms` }}
          >
            {/* Pulse ring */}
            <circle
              cx={cx} cy={cy}
              r={isHome ? 12 : 8}
              fill="none"
              stroke={isHome ? "oklch(0.72 0.14 65)" : "oklch(0.55 0.08 240)"}
              strokeWidth="0.8"
              strokeOpacity="0.4"
            >
              <animate
                attributeName="r"
                values={`${isHome ? 6 : 4};${isHome ? 16 : 12};${isHome ? 6 : 4}`}
                dur={`${2 + port.delay / 500}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-opacity"
                values="0.6;0;0.6"
                dur={`${2 + port.delay / 500}s`}
                repeatCount="indefinite"
              />
            </circle>
            {/* Dot */}
            <circle
              cx={cx} cy={cy}
              r={isHome ? 4 : 2.5}
              fill={isHome ? "oklch(0.72 0.14 65)" : "oklch(0.55 0.08 240)"}
            />
            {/* Label */}
            <text
              x={cx + (isHome ? 7 : 5)}
              y={cy - (isHome ? 6 : 4)}
              fontSize={isHome ? "9" : "7"}
              fontFamily="'Barlow', sans-serif"
              fontWeight={isHome ? "700" : "400"}
              fill={isHome ? "oklch(0.88 0.01 240)" : "oklch(0.62 0.015 240)"}
              letterSpacing="0.05em"
            >
              {port.name.toUpperCase()}
            </text>
          </g>
        );
      })}

      {/* Particule animée sur route Dunkerque → Casablanca */}
      <circle r="3" fill="oklch(0.88 0.12 65)" opacity="0.9">
        <animateMotion
          dur="4s"
          repeatCount="indefinite"
          path={`M ${(48.2 / 100) * W} ${(26.5 / 100) * H} Q ${(44.0 / 100) * W} ${(32.0 / 100) * H} ${(44.5 / 100) * W} ${(37.5 / 100) * H}`}
        />
      </circle>
      <circle r="2" fill="oklch(0.80 0.10 65)" opacity="0.7">
        <animateMotion
          dur="3s"
          repeatCount="indefinite"
          begin="1.5s"
          path={`M ${(48.2 / 100) * W} ${(26.5 / 100) * H} Q ${(49.5 / 100) * W} ${(23.5 / 100) * H} ${(50.5 / 100) * W} ${(24.5 / 100) * H}`}
        />
      </circle>
    </svg>
  );
}
