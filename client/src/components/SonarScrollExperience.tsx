/**
 * SonarScrollExperience — Homepage scroll-scrub SONAR
 * DA : "SONAR / Instrument de bord" — Ink abyssal + Signal vert-lime
 *
 * 4 scènes narratives pilotées par le scroll :
 *  Scène 1 — Cargo pleine mer (push-in caméra)
 *  Scène 2 — Cales ouvertes : grain + data HUD instrument
 *  Scène 3 — Escale portuaire (quai, grues, opérations)
 *  Scène 4 — Dézoom carte des flux (arcs animés, ports)
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowRight, Anchor, ChevronRight } from "lucide-react";
import { useScrollScrub, mapRange, easeOutCubic, easeInOutCubic, SCENE_COUNT, SCENE_HEIGHT_VH } from "@/hooks/useScrollScrub";

// ─── MEDIA ───────────────────────────────────────────────────
const VIDEO_S1 = "/manus-storage/eds_hero_topdown_66d185b6.mp4";

const IMGS = {
  s1_wide:  "/manus-storage/sonar_s1_wide_4e87cc79.jpg",
  s1_close: "/manus-storage/sonar_s1_close_8d69acfc.jpg",
  s2_hatch: "/manus-storage/sonar_s2_hatch_684a13c3.jpg",
  s2_grain: "/manus-storage/sonar_s2_grain_6e5d0efe.jpg",
  s3_quay:  "/manus-storage/sonar_s3_quay_1898dc53.jpg",
  s3_crane: "/manus-storage/sonar_s3_crane_89d5c612.jpg",
  s4_map:   "/manus-storage/sonar_s4_map_bg_0afa04dc.jpg",
  s4_ports: "/manus-storage/sonar_s4_ports_58ea5b25.jpg",
};

// ─── HELPERS ─────────────────────────────────────────────────
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

// ─── COMPOSANT : Scan Line HUD ───────────────────────────────
function ScanLine({ opacity = 1 }: { opacity?: number }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ opacity, zIndex: 20 }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(to right, transparent, oklch(0.82 0.18 145 / 0.6), transparent)",
          animation: "sonar-scan 3s linear infinite",
          top: 0,
        }}
      />
    </div>
  );
}

// ─── COMPOSANT : HUD Corner Frame ────────────────────────────
function HUDFrame({ children, className = "", style = {} }: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`sonar-hud-frame ${className}`}
      style={{ padding: "1rem 1.25rem", ...style }}
    >
      {children}
    </div>
  );
}

// ─── COMPOSANT : Progress Bar ────────────────────────────────
function SceneProgressBar({ scene, sceneProgress }: { scene: number; sceneProgress: number }) {
  const scenes = ["MER", "CALES", "ESCALE", "FLUX"];
  return (
    <div
      className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3"
      style={{ zIndex: 50 }}
    >
      {scenes.map((label, i) => (
        <div key={label} className="flex items-center gap-2">
          <span
            className="sonar-mono"
            style={{
              fontSize: "0.55rem",
              opacity: i === scene ? 1 : 0.3,
              transition: "opacity 0.4s ease",
            }}
          >
            {label}
          </span>
          <div
            style={{
              width: "2px",
              height: "32px",
              background: i < scene
                ? "oklch(0.82 0.18 145)"
                : i === scene
                  ? `linear-gradient(to bottom, oklch(0.82 0.18 145) ${sceneProgress * 100}%, oklch(0.82 0.18 145 / 0.15) ${sceneProgress * 100}%)`
                  : "oklch(0.82 0.18 145 / 0.15)",
              transition: "background 0.1s ease",
            }}
          />
          <span
            className="sonar-mono"
            style={{
              fontSize: "0.55rem",
              opacity: i === scene ? 1 : 0.3,
              transition: "opacity 0.4s ease",
            }}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── COMPOSANT : Carte SVG des flux maritimes ─────────────────
function FluxMap({ progress }: { progress: number }) {
  const ports = [
    { id: "dunkerque", x: 310, y: 145, label: "DUNKERQUE", main: true },
    { id: "boulogne",  x: 295, y: 158, label: "BOULOGNE" },
    { id: "calais",    x: 305, y: 150, label: "CALAIS" },
    { id: "rouen",     x: 290, y: 175, label: "ROUEN" },
    { id: "bayonne",   x: 268, y: 230, label: "BAYONNE" },
    { id: "rotterdam", x: 325, y: 135, label: "ROTTERDAM" },
    { id: "hamburg",   x: 348, y: 118, label: "HAMBURG" },
    { id: "gdansk",    x: 385, y: 108, label: "GDANSK" },
    { id: "constanta", x: 435, y: 165, label: "CONSTANTA" },
    { id: "istanbul",  x: 445, y: 185, label: "ISTANBUL" },
    { id: "barcelona", x: 305, y: 210, label: "BARCELONA" },
    { id: "genoa",     x: 330, y: 205, label: "GÊNES" },
  ];

  const routes = [
    { from: "dunkerque", to: "rotterdam", delay: 0 },
    { from: "dunkerque", to: "hamburg", delay: 0.08 },
    { from: "dunkerque", to: "gdansk", delay: 0.16 },
    { from: "dunkerque", to: "constanta", delay: 0.24 },
    { from: "dunkerque", to: "istanbul", delay: 0.32 },
    { from: "dunkerque", to: "barcelona", delay: 0.40 },
    { from: "dunkerque", to: "genoa", delay: 0.48 },
    { from: "rouen", to: "rotterdam", delay: 0.12 },
    { from: "rouen", to: "hamburg", delay: 0.20 },
    { from: "bayonne", to: "barcelona", delay: 0.28 },
  ];

  const portMap = Object.fromEntries(ports.map(p => [p.id, p]));

  // Calcul de la progression de chaque route
  const getRouteProgress = (delay: number) => {
    return Math.max(0, Math.min(1, (progress - delay) / 0.5));
  };

  // Calcul d'un arc de Bézier entre deux points
  const getArcPath = (x1: number, y1: number, x2: number, y2: number) => {
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2 - Math.abs(x2 - x1) * 0.3;
    return `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
  };

  return (
    <svg
      viewBox="200 80 320 200"
      className="w-full h-full"
      style={{ overflow: "visible" }}
    >
      {/* Grille bathymétrique */}
      <defs>
        <pattern id="bathygrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="oklch(0.82 0.18 145 / 0.06)" strokeWidth="0.5"/>
        </pattern>
        <radialGradient id="portGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="oklch(0.82 0.18 145)" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="oklch(0.82 0.18 145)" stopOpacity="0"/>
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <rect x="200" y="80" width="320" height="200" fill="url(#bathygrid)" />

      {/* Contours Europe simplifiés */}
      <path
        d="M 250 90 L 260 95 L 270 88 L 285 92 L 295 85 L 310 90 L 325 82 L 345 88 L 365 80 L 390 85 L 410 78 L 430 82 L 450 88 L 460 95 L 470 105 L 465 115 L 455 120 L 450 130 L 445 145 L 440 160 L 445 175 L 450 185 L 445 195 L 435 200 L 420 205 L 405 210 L 390 215 L 375 220 L 360 218 L 345 215 L 330 220 L 315 225 L 300 230 L 285 235 L 270 240 L 260 245 L 250 250 L 240 245 L 235 235 L 238 225 L 242 215 L 248 205 L 252 195 L 255 185 L 258 175 L 255 165 L 250 155 L 248 145 L 245 135 L 242 125 L 240 115 L 242 105 L 248 98 Z"
        fill="oklch(0.16 0.04 200 / 0.70)"
        stroke="oklch(0.82 0.18 145 / 0.15)"
        strokeWidth="0.8"
      />
      {/* Méditerranée */}
      <path
        d="M 270 205 L 280 210 L 295 208 L 310 212 L 325 208 L 340 210 L 355 208 L 370 212 L 385 210 L 400 215 L 415 212 L 430 215 L 445 210 L 455 205 L 460 195 L 455 185 L 445 180 L 435 185 L 425 188 L 415 185 L 405 188 L 395 185 L 385 188 L 375 185 L 365 188 L 355 185 L 345 188 L 335 185 L 325 188 L 315 185 L 305 188 L 295 185 L 285 188 L 275 185 L 268 195 Z"
        fill="oklch(0.10 0.03 200 / 0.50)"
        stroke="oklch(0.82 0.18 145 / 0.08)"
        strokeWidth="0.5"
      />

      {/* Routes maritimes */}
      {routes.map(({ from, to, delay }) => {
        const p1 = portMap[from];
        const p2 = portMap[to];
        if (!p1 || !p2) return null;
        const rp = getRouteProgress(delay);
        const path = getArcPath(p1.x, p1.y, p2.x, p2.y);
        return (
          <g key={`${from}-${to}`}>
            {/* Route de fond */}
            <path
              d={path}
              fill="none"
              stroke="oklch(0.82 0.18 145 / 0.12)"
              strokeWidth="0.8"
              strokeDasharray="3 4"
            />
            {/* Route animée */}
            {rp > 0 && (
              <path
                d={path}
                fill="none"
                stroke="oklch(0.82 0.18 145)"
                strokeWidth="1.2"
                filter="url(#glow)"
                strokeDasharray="200"
                strokeDashoffset={200 * (1 - rp)}
                style={{ transition: "stroke-dashoffset 0.05s linear" }}
              />
            )}
          </g>
        );
      })}

      {/* Ports */}
      {ports.map(({ id, x, y, label, main }) => {
        const portProgress = Math.max(0, Math.min(1, (progress - 0.3) * 3));
        return (
          <g key={id} style={{ opacity: portProgress }}>
            {/* Glow */}
            {main && (
              <circle cx={x} cy={y} r="8" fill="url(#portGlow)" />
            )}
            {/* Point */}
            <circle
              cx={x} cy={y}
              r={main ? 3 : 2}
              fill={main ? "oklch(0.82 0.18 145)" : "oklch(0.78 0.14 68)"}
              filter="url(#glow)"
            />
            {/* Ping */}
            {main && (
              <circle
                cx={x} cy={y} r="5"
                fill="none"
                stroke="oklch(0.82 0.18 145 / 0.4)"
                strokeWidth="1"
                style={{ animation: "sonar-ping 2s ease-in-out infinite" }}
              />
            )}
            {/* Label */}
            <text
              x={x + (x > 350 ? 5 : -5)}
              y={y - 5}
              fill={main ? "oklch(0.82 0.18 145)" : "oklch(0.65 0.03 200)"}
              fontSize="4"
              fontFamily="'IBM Plex Mono', monospace"
              textAnchor={x > 350 ? "start" : "end"}
              letterSpacing="0.5"
            >
              {label}
            </text>
          </g>
        );
      })}

      {/* Particules cargo sur les routes */}
      {progress > 0.6 && routes.slice(0, 4).map(({ from, to }, i) => {
        const p1 = portMap[from];
        const p2 = portMap[to];
        if (!p1 || !p2) return null;
        const t = ((Date.now() / 3000) + i * 0.25) % 1;
        const mx = (p1.x + p2.x) / 2;
        const my = (p1.y + p2.y) / 2 - Math.abs(p2.x - p1.x) * 0.3;
        // Interpolation quadratique de Bézier
        const bx = (1-t)*(1-t)*p1.x + 2*(1-t)*t*mx + t*t*p2.x;
        const by = (1-t)*(1-t)*p1.y + 2*(1-t)*t*my + t*t*p2.y;
        return (
          <circle
            key={`particle-${i}`}
            cx={bx} cy={by} r="1.5"
            fill="oklch(0.78 0.14 68)"
            filter="url(#glow)"
            style={{ opacity: 0.9 }}
          />
        );
      })}
    </svg>
  );
}

// ─── COMPOSANT : Grain Canvas ────────────────────────────────
function GrainCanvas({ opacity = 1 }: { opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
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

    // Particules de grain
    const particles = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: Math.random() * 0.8 + 0.2,
      opacity: Math.random() * 0.7 + 0.3,
      hue: Math.random() * 20 + 55, // 55-75 : jaune-ambre
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y > canvas.height) { p.y = -5; p.x = Math.random() * canvas.width; }
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;

        ctx.beginPath();
        ctx.ellipse(p.x, p.y, p.r * 1.2, p.r * 0.8, Math.random() * Math.PI, 0, Math.PI * 2);
        ctx.fillStyle = `oklch(0.75 0.14 ${p.hue} / ${p.opacity})`;
        ctx.fill();
      });
      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity, zIndex: 5, mixBlendMode: "screen" }}
    />
  );
}

// ─── COMPOSANT PRINCIPAL ─────────────────────────────────────
export function SonarScrollExperience() {
  const { containerRef, state } = useScrollScrub();
  const { progress, scene, sceneProgress, transitionProgress } = state;

  // Compteur animé pour les stats
  const [statsActive, setStatsActive] = useState(false);
  useEffect(() => {
    if (scene >= 1) setStatsActive(true);
  }, [scene]);

  // Hauteur totale de la section sticky
  const totalHeight = `${SCENE_COUNT * SCENE_HEIGHT_VH}vh`;

  // ── Calculs scène 1 : zoom cargo ──
  const s1Progress = scene === 0 ? sceneProgress : scene > 0 ? 1 : 0;
  const s1Scale = lerp(1, 1.35, easeInOutCubic(s1Progress));
  const s1WideOpacity = lerp(1, 0, easeOutCubic(mapRange(s1Progress, 0.5, 0.9, 0, 1)));
  const s1CloseOpacity = lerp(0, 1, easeOutCubic(mapRange(s1Progress, 0.5, 0.9, 0, 1)));
  const s1TextY = lerp(0, -30, easeInOutCubic(s1Progress));
  const s1TextOpacity = lerp(1, 0, easeOutCubic(mapRange(s1Progress, 0.75, 1, 0, 1)));

  // ── Calculs scène 2 : cales grain ──
  const s2Progress = scene === 1 ? sceneProgress : scene > 1 ? 1 : 0;
  const s2Opacity = scene === 1 ? 1 : scene > 1 ? lerp(1, 0, easeOutCubic(transitionProgress)) : 0;
  const s2HatchScale = lerp(1.1, 1, easeOutCubic(s2Progress));
  const s2GrainOpacity = lerp(0, 1, easeOutCubic(mapRange(s2Progress, 0.2, 0.6, 0, 1)));
  const s2HUDOpacity = lerp(0, 1, easeOutCubic(mapRange(s2Progress, 0.3, 0.7, 0, 1)));

  // ── Calculs scène 3 : escale ──
  const s3Progress = scene === 2 ? sceneProgress : scene > 2 ? 1 : 0;
  const s3Opacity = scene === 2 ? 1 : scene > 2 ? lerp(1, 0, easeOutCubic(transitionProgress)) : 0;
  const s3Scale = lerp(1.08, 1, easeOutCubic(s3Progress));
  const s3TextOpacity = lerp(0, 1, easeOutCubic(mapRange(s3Progress, 0.1, 0.5, 0, 1)));

  // ── Calculs scène 4 : carte des flux ──
  const s4Progress = scene === 3 ? sceneProgress : 0;
  const s4Opacity = scene === 3 ? 1 : 0;
  const s4MapProgress = mapRange(s4Progress, 0, 0.8, 0, 1);
  const s4Scale = lerp(1.15, 1, easeOutCubic(s4Progress));

  // Opacité globale de chaque scène
  const getSceneOpacity = (s: number) => {
    if (scene === s) return 1;
    if (scene === s + 1) return lerp(1, 0, easeOutCubic(mapRange(sceneProgress, 0, 0.3, 0, 1)));
    if (scene === s - 1) return lerp(0, 1, easeOutCubic(mapRange(sceneProgress, 0.7, 1, 0, 1)));
    return 0;
  };

  return (
    <div
      ref={containerRef}
      style={{ height: totalHeight, position: "relative" }}
    >
      {/* Stage sticky */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: "var(--sonar-abyss)",
        }}
      >
        {/* ═══════════════════════════════════════════════════
            SCÈNE 1 — CARGO PLEINE MER
        ═══════════════════════════════════════════════════ */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: getSceneOpacity(0),
            transition: "opacity 0.4s ease",
          }}
        >
          {/* Vidéo cinématique top-down — cargo pleine mer */}
          <video
            src={VIDEO_S1}
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover",
              transform: `scale(${s1Scale})`,
              opacity: s1WideOpacity,
              transition: "transform 0.05s linear",
              willChange: "transform",
            }}
          />
          {/* Fallback image si la vidéo ne charge pas */}
          <img
            src={IMGS.s1_wide}
            alt="Cargo Panamax pleine mer"
            aria-hidden="true"
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover",
              opacity: 0,
              pointerEvents: "none",
            }}
          />
          {/* Image close — flanc du navire */}
          <img
            src={IMGS.s1_close}
            alt="Proue du cargo"
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover",
              opacity: s1CloseOpacity,
              willChange: "opacity",
            }}
          />

          {/* Overlays */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, var(--sonar-abyss) 0%, oklch(0.08 0.025 200 / 0.4) 40%, transparent 70%)",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, oklch(0.08 0.025 200 / 0.75) 0%, transparent 60%)",
          }} />

          {/* Scan line */}
          <ScanLine opacity={0.6} />

          {/* Contenu hero */}
          <div
            style={{
              position: "absolute", inset: 0,
              display: "flex", flexDirection: "column",
              justifyContent: "flex-end",
              padding: "0 3rem 4rem",
              transform: `translateY(${s1TextY}px)`,
              opacity: s1TextOpacity,
              willChange: "transform, opacity",
            }}
          >
            <div style={{ maxWidth: "800px" }}>
              <div className="sonar-label" style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{ display: "inline-block", width: "32px", height: "1px", background: "var(--sonar-signal)" }} />
                AGENCE MARITIME & TRAMPING — DEPUIS 1975
              </div>
              <h1 className="sonar-h1" style={{ marginBottom: "1.5rem" }}>
                L'INTELLIGENCE<br />
                <span style={{ color: "var(--sonar-signal)" }}>OPÉRATIONNELLE</span><br />
                AU SERVICE<br />
                DE VOTRE CARGO.
              </h1>
              <p style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.82rem",
                color: "var(--sonar-light)",
                lineHeight: 1.7,
                maxWidth: "520px",
                marginBottom: "2rem",
              }}>
                Spécialiste du tramping, de l'affrètement dry bulk et des terminaux portuaires.
                Dunkerque · Boulogne-sur-Mer · Rouen · Bayonne.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <a href="/contact" className="sonar-btn sonar-btn-signal">
                  Demander un devis <ArrowRight size={14} />
                </a>
                <a href="/services" className="sonar-btn sonar-btn-outline">
                  Nos expertises
                </a>
              </div>
            </div>
          </div>

          {/* Stats HUD bas droite */}
          <div style={{
            position: "absolute",
            bottom: "3rem", right: "3rem",
            display: "flex", gap: "1px",
            opacity: s1TextOpacity,
          }}>
            {[
              { v: "800+", l: "ESCALES / AN" },
              { v: "200+", l: "NAVIRES" },
              { v: "4.5 MT", l: "VRAC / AN" },
              { v: "1975", l: "FONDATION" },
            ].map(({ v, l }) => (
              <div key={l} style={{
                background: "oklch(0 0 0 / 0.55)",
                backdropFilter: "blur(12px)",
                borderTop: "1.5px solid var(--sonar-signal)",
                border: "1px solid oklch(1 0 0 / 0.10)",
                padding: "0.75rem 1.25rem",
                minWidth: "90px",
              }}>
                <div style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 900,
                  fontSize: "1.6rem",
                  color: "var(--sonar-amber)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}>{v}</div>
                <div className="sonar-label" style={{ marginTop: "0.3rem" }}>{l}</div>
              </div>
            ))}
          </div>

          {/* Indicateur SCROLL */}
          <div style={{
            position: "absolute",
            bottom: "1.5rem", left: "50%",
            transform: "translateX(-50%)",
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: "0.5rem",
            opacity: mapRange(s1Progress, 0, 0.2, 1, 0),
          }}>
            <span className="sonar-label">SCROLL</span>
            <div style={{
              width: "1px", height: "40px",
              background: "linear-gradient(to bottom, var(--sonar-signal), transparent)",
              animation: "sonar-scan 1.5s ease-in-out infinite",
            }} />
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════
            SCÈNE 2 — CALES OUVERTES : GRAIN + DATA HUD
        ═══════════════════════════════════════════════════ */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: getSceneOpacity(1),
            transition: "opacity 0.4s ease",
          }}
        >
          {/* Image vue du dessus — cales ouvertes */}
          <img
            src={IMGS.s2_hatch}
            alt="Cales ouvertes — vue aérienne"
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover",
              transform: `scale(${s2HatchScale})`,
              willChange: "transform",
            }}
          />
          {/* Image grain — texture intérieure */}
          <img
            src={IMGS.s2_grain}
            alt="Grain dans la cale"
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover",
              opacity: s2GrainOpacity,
              willChange: "opacity",
            }}
          />

          {/* Overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, oklch(0.08 0.025 200 / 0.55) 0%, oklch(0.08 0.025 200 / 0.30) 50%, oklch(0.08 0.025 200 / 0.65) 100%)",
          }} />

          {/* Particules de grain */}
          <GrainCanvas opacity={s2GrainOpacity * 0.7} />

          {/* Scan line */}
          <ScanLine opacity={0.5} />

          {/* HUD instrument — données de cargaison */}
          <div
            style={{
              position: "absolute", inset: 0,
              display: "flex", flexDirection: "column",
              justifyContent: "center",
              padding: "0 3rem",
              opacity: s2HUDOpacity,
              willChange: "opacity",
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", maxWidth: "900px" }}>
              {/* Bloc gauche — titre */}
              <div>
                <div className="sonar-label" style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span style={{ display: "inline-block", width: "24px", height: "1px", background: "var(--sonar-signal)" }} />
                  CARGAISON — INSPECTION DE CALE
                </div>
                <h2 className="sonar-h2" style={{ marginBottom: "1.5rem" }}>
                  45 000 T<br />
                  <span style={{ color: "var(--sonar-signal)" }}>DE BLÉ TENDRE</span><br />
                  EN ATTENTE.
                </h2>
                <p style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.75rem",
                  color: "var(--sonar-light)",
                  lineHeight: 1.7,
                  maxWidth: "380px",
                }}>
                  Certification GMP+ · Humidité 13.2% · Protéines 11.8%<br />
                  Origine : Beauce · Destination : Constanta, Mer Noire
                </p>
              </div>

              {/* Bloc droite — données instrument */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <HUDFrame style={{ background: "oklch(0 0 0 / 0.60)", backdropFilter: "blur(16px)" }}>
                  <div className="sonar-label" style={{ marginBottom: "0.75rem" }}>
                    DONNÉES NAVIRE
                  </div>
                  {[
                    { k: "NAVIRE", v: "MV ATLANTIC GRAIN" },
                    { k: "TYPE", v: "SUPRAMAX 58 000 DWT" },
                    { k: "PAVILLON", v: "MARSHALL ISLANDS" },
                    { k: "TIRANT D'EAU", v: "11.4 M" },
                    { k: "VITESSE", v: "12.5 KN" },
                    { k: "ETA CONSTANTA", v: "J+8" },
                  ].map(({ k, v }) => (
                    <div key={k} className="sonar-data-row">
                      <span className="sonar-data-key">{k}</span>
                      <span className="sonar-data-value">{v}</span>
                    </div>
                  ))}
                </HUDFrame>

                <HUDFrame style={{ background: "oklch(0 0 0 / 0.60)", backdropFilter: "blur(16px)" }}>
                  <div className="sonar-label" style={{ marginBottom: "0.75rem" }}>
                    CERTIFICATIONS ACTIVES
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {["GMP+", "OVAM", "NIWO", "ISO 9001", "P&I CLUB"].map(c => (
                      <span key={c} className="sonar-badge">{c}</span>
                    ))}
                  </div>
                </HUDFrame>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════
            SCÈNE 3 — ESCALE PORTUAIRE
        ═══════════════════════════════════════════════════ */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: getSceneOpacity(2),
            transition: "opacity 0.4s ease",
          }}
        >
          {/* Image quai */}
          <img
            src={IMGS.s3_quay}
            alt="Terminal portuaire"
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover",
              transform: `scale(${s3Scale})`,
              willChange: "transform",
            }}
          />
          {/* Image grue */}
          <img
            src={IMGS.s3_crane}
            alt="Grue portuaire"
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover",
              opacity: mapRange(s3Progress, 0.4, 0.8, 0, 0.6),
              willChange: "opacity",
            }}
          />

          {/* Overlays */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, var(--sonar-abyss) 0%, oklch(0.08 0.025 200 / 0.50) 50%, transparent 100%)",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, oklch(0.08 0.025 200 / 0.80) 0%, transparent 55%)",
          }} />

          {/* Scan line */}
          <ScanLine opacity={0.4} />

          {/* Contenu */}
          <div
            style={{
              position: "absolute", inset: 0,
              display: "flex", flexDirection: "column",
              justifyContent: "center",
              padding: "0 3rem",
              opacity: s3TextOpacity,
            }}
          >
            <div style={{ maxWidth: "600px" }}>
              <div className="sonar-label" style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{ display: "inline-block", width: "24px", height: "1px", background: "var(--sonar-signal)" }} />
                PORT TERMINAL — BOULOGNE-SUR-MER
              </div>
              <h2 className="sonar-h2" style={{ marginBottom: "1.5rem" }}>
                800 M DE QUAI.<br />
                <span style={{ color: "var(--sonar-signal)" }}>4 POSTES.</span><br />
                OPÉRATIONNEL 24/7.
              </h2>

              {/* Grille capacités */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1px", marginBottom: "2rem" }}>
                {[
                  { v: "800 m", l: "Linéaire de quai" },
                  { v: "20 000 m²", l: "Entrepôts GMP+" },
                  { v: "57 500 m²", l: "Stockage extérieur" },
                  { v: "4,5 Mt", l: "Capacité annuelle" },
                ].map(({ v, l }) => (
                  <div key={l} style={{
                    background: "oklch(0 0 0 / 0.55)",
                    backdropFilter: "blur(12px)",
                    borderTop: "1.5px solid var(--sonar-signal)",
                    border: "1px solid oklch(1 0 0 / 0.10)",
                    padding: "0.75rem 1rem",
                  }}>
                    <div style={{
                      fontFamily: "'Archivo', sans-serif",
                      fontWeight: 900,
                      fontSize: "1.5rem",
                      color: "var(--sonar-amber)",
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                    }}>{v}</div>
                    <div className="sonar-label" style={{ marginTop: "0.25rem", fontSize: "0.55rem" }}>{l}</div>
                  </div>
                ))}
              </div>

              <a href="/terminal" className="sonar-btn sonar-btn-signal">
                Voir le terminal <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════
            SCÈNE 4 — CARTE DES FLUX MARITIMES
        ═══════════════════════════════════════════════════ */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: getSceneOpacity(3),
            transition: "opacity 0.4s ease",
          }}
        >
          {/* Image fond — vue satellite */}
          <img
            src={IMGS.s4_map}
            alt="Vue satellite Europe maritime"
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover",
              transform: `scale(${s4Scale})`,
              willChange: "transform",
            }}
          />
          <img
            src={IMGS.s4_ports}
            alt="Ports français"
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover",
              opacity: mapRange(s4Progress, 0.3, 0.7, 0, 0.5),
            }}
          />

          {/* Overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: "oklch(0.08 0.025 200 / 0.70)",
          }} />

          {/* Scan line */}
          <ScanLine opacity={0.35} />

          {/* Carte SVG */}
          <div
            style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center",
              justifyContent: "center",
              padding: "4rem",
            }}
          >
            <div style={{ width: "100%", maxWidth: "900px", height: "100%", maxHeight: "500px" }}>
              <FluxMap progress={s4MapProgress} />
            </div>
          </div>

          {/* Titre overlay */}
          <div
            style={{
              position: "absolute",
              top: "3rem", left: "3rem",
              opacity: mapRange(s4Progress, 0.1, 0.5, 0, 1),
            }}
          >
            <div className="sonar-label" style={{ marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ display: "inline-block", width: "24px", height: "1px", background: "var(--sonar-signal)" }} />
              ZONES D'OPÉRATION — PLOTTING MARITIME
            </div>
            <h2 className="sonar-h2">
              5 PORTS.<br />
              <span style={{ color: "var(--sonar-signal)" }}>4 MARCHÉS.</span><br />
              1 RÉSEAU.
            </h2>
          </div>

          {/* Légende */}
          <div
            style={{
              position: "absolute",
              bottom: "3rem", right: "3rem",
              opacity: mapRange(s4Progress, 0.5, 0.9, 0, 1),
            }}
          >
            <HUDFrame style={{ background: "oklch(0 0 0 / 0.70)", backdropFilter: "blur(16px)" }}>
              <div className="sonar-label" style={{ marginBottom: "0.75rem" }}>MARCHÉS COUVERTS</div>
              {[
                { zone: "BALTIQUE", ports: "Gdansk · Riga · Helsinki" },
                { zone: "CONTINENT", ports: "Rotterdam · Hamburg · Anvers" },
                { zone: "MÉDITERRANÉE", ports: "Barcelone · Gênes · Constanta" },
                { zone: "MER NOIRE", ports: "Istanbul · Odessa · Novorossiysk" },
              ].map(({ zone, ports }) => (
                <div key={zone} className="sonar-data-row">
                  <span className="sonar-data-key">{zone}</span>
                  <span style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.6rem",
                    color: "var(--sonar-ghost)",
                    maxWidth: "180px",
                    textAlign: "right",
                  }}>{ports}</span>
                </div>
              ))}
            </HUDFrame>
          </div>
        </div>

        {/* ── Barre de progression scènes (droite) ── */}
        <SceneProgressBar scene={scene} sceneProgress={sceneProgress} />

        {/* ── HUD global — coin supérieur gauche ── */}
        <div
          style={{
            position: "absolute",
            top: "5rem", left: "1.5rem",
            zIndex: 50,
          }}
        >
          <div className="sonar-mono" style={{ fontSize: "0.55rem", opacity: 0.5 }}>
            EDS // MARITIME OPERATIONS CENTER
          </div>
          <div className="sonar-mono" style={{ fontSize: "0.55rem", opacity: 0.35 }}>
            SCENE {String(scene + 1).padStart(2, "0")}/{SCENE_COUNT} · PROG {Math.round(progress * 100)}%
          </div>
        </div>

        {/* ── Motif bathymétrique overlay ── */}
        <div
          className="sonar-bathymetric"
          style={{
            position: "absolute", inset: 0,
            pointerEvents: "none",
            zIndex: 1,
            opacity: 0.4,
          }}
        />
      </div>
    </div>
  );
}
