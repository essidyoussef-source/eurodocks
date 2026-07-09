/**
 * ScrollCinematic — EDS Homepage
 * 3-act scroll-driven cinematic experience
 *
 * ACT 1 (0→0.33): Zoom-in on cargo ship
 * ACT 2 (0.33→0.66): Inside the hold — grain cargo with HUD data
 * ACT 3 (0.66→1.0): Zoom-out to world map with shipping routes
 */

import { useEffect, useRef, useState } from "react";
import { GrainCanvas } from "./GrainCanvas";
import { WorldMap } from "./WorldMap";
import { mapRange, easeInOutCubic, easeOutCubic } from "@/hooks/useScrollProgress";

// ─── Images ──────────────────────────────────────────────────
const IMGS = {
  wide:    "/manus-storage/eds_scroll_wide_af720eb2.jpg",
  close:   "/manus-storage/eds_scroll_close_6d467547.jpg",
  hatch:   "/manus-storage/eds_hatch_open_fb8bf6fc.jpg",
  grain:   "/manus-storage/eds_grain_texture_c7797acb.jpg",
  // Fallback existing images
  port:    "/manus-storage/eds2_port_dunkerque_9fea8573.jpg",
  bridge:  "/manus-storage/eds2_chartering_bridge_e11c603a.jpg",
  tramping:"/manus-storage/eds2_tramping_sea_fd8a56f5.jpg",
};

// ─── Scroll indicator ─────────────────────────────────────────
function ScrollIndicator({ visible }: { visible: boolean }) {
  return (
    <div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.6s ease-out",
        zIndex: 20,
      }}
    >
      <div
        className="text-xs font-bold uppercase tracking-[0.25em]"
        style={{ color: "oklch(0.72 0.14 65)" }}
      >
        Scroll
      </div>
      <div
        className="w-px h-12 relative overflow-hidden"
        style={{ background: "oklch(1 0 0 / 0.15)" }}
      >
        <div
          className="absolute top-0 left-0 w-full"
          style={{
            height: "40%",
            background: "oklch(0.72 0.14 65)",
            animation: "scrollLine 1.8s cubic-bezier(0.23,1,0.32,1) infinite",
          }}
        />
      </div>
    </div>
  );
}

// ─── HUD Data Card ────────────────────────────────────────────
function HUDCard({
  label, value, unit, visible, delay = 0,
}: {
  label: string; value: string; unit?: string; visible: boolean; delay?: number;
}) {
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: `opacity 0.5s cubic-bezier(0.23,1,0.32,1) ${delay}ms, transform 0.5s cubic-bezier(0.23,1,0.32,1) ${delay}ms`,
      }}
    >
      <div
        className="px-4 py-3"
        style={{
          background: "oklch(0 0 0 / 0.65)",
          backdropFilter: "blur(16px)",
          border: "1px solid oklch(0.72 0.14 65 / 0.30)",
          borderTop: "1.5px solid oklch(0.72 0.14 65)",
          minWidth: "140px",
        }}
      >
        <div
          className="text-xs font-bold uppercase tracking-widest mb-1"
          style={{ color: "oklch(0.72 0.14 65)", fontSize: "0.58rem" }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: "1.4rem",
            color: "oklch(0.96 0.005 80)",
            lineHeight: 1,
          }}
        >
          {value}
          {unit && (
            <span
              className="ml-1"
              style={{ fontSize: "0.75rem", color: "oklch(0.62 0.015 240)" }}
            >
              {unit}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Scan line effect ─────────────────────────────────────────
function ScanLines({ visible }: { visible: boolean }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity: visible ? 0.15 : 0,
        transition: "opacity 0.8s ease-out",
        background:
          "repeating-linear-gradient(0deg, transparent, transparent 2px, oklch(0 0 0 / 0.3) 2px, oklch(0 0 0 / 0.3) 4px)",
        zIndex: 5,
      }}
    />
  );
}

// ─── Main component ───────────────────────────────────────────
export function ScrollCinematic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.min(1, Math.max(0, scrolled / totalScrollable));
      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Act boundaries ──────────────────────────────────────────
  const act1End = 0.33;
  const act2Start = 0.30;
  const act2End = 0.66;
  const act3Start = 0.63;

  // ── ACT 1 values ────────────────────────────────────────────
  const act1Progress = mapRange(progress, 0, act1End, 0, 1);
  const act1Eased = easeInOutCubic(act1Progress);

  // Zoom: 1 → 2.8 (on the wide image)
  const imgScale = 1 + act1Eased * 1.8;
  // Cross-fade wide → close
  const closeOpacity = mapRange(progress, 0.15, 0.30, 0, 1);
  // Hero text fade out
  const heroTextOpacity = mapRange(progress, 0, 0.12, 1, 0);
  // Act1 stats fade in then out
  const act1StatsOpacity = Math.min(
    mapRange(progress, 0.18, 0.25, 0, 1),
    mapRange(progress, 0.28, 0.33, 1, 0)
  );
  // Vignette intensifies
  const vignetteIntensity = 0.3 + act1Eased * 0.5;

  // ── ACT 2 values ────────────────────────────────────────────
  const act2Progress = mapRange(progress, act2Start, act2End, 0, 1);
  const act2Eased = easeOutCubic(Math.min(1, act2Progress));
  const act2Opacity = Math.min(
    mapRange(progress, act2Start, act2Start + 0.05, 0, 1),
    mapRange(progress, act2End - 0.04, act2End, 1, 0)
  );
  // Zoom-in entry: scale 2 → 1
  const hatchScale = 2 - act2Eased;
  // HUD cards visible
  const hudVisible = progress > act2Start + 0.04 && progress < act2End - 0.03;

  // ── ACT 3 values ────────────────────────────────────────────
  const act3Progress = mapRange(progress, act3Start, 1, 0, 1);
  const act3Eased = easeOutCubic(act3Progress);
  const act3Opacity = mapRange(progress, act3Start, act3Start + 0.06, 0, 1);
  // Map zoom: starts zoomed in on France, then zooms out
  const mapScale = 3 - act3Eased * 2; // 3 → 1
  const mapTranslateX = act3Eased * 0; // centered
  const mapTranslateY = (1 - act3Eased) * 8; // slight upward drift

  // ── Scroll indicator ────────────────────────────────────────
  const showScrollIndicator = progress < 0.05;

  return (
    <>
      {/* ── CSS Animations ── */}
      <style>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(250%); opacity: 0; }
        }
        @keyframes hudPulse {
          0%, 100% { border-color: oklch(0.72 0.14 65 / 0.30); }
          50% { border-color: oklch(0.72 0.14 65 / 0.70); }
        }
        @keyframes scanMove {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes portPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.3); }
        }
      `}</style>

      {/* ── Sticky container: 600vh ── */}
      <div ref={containerRef} style={{ height: "600vh", position: "relative" }}>
        <div
          className="sticky top-0 w-full overflow-hidden"
          style={{ height: "100vh" }}
        >

          {/* ══════════════════════════════════════════════════
              ACT 1 — ZOOM-IN CARGO
          ══════════════════════════════════════════════════ */}
          <div
            className="absolute inset-0"
            style={{
              opacity: progress < act2Start + 0.04 ? 1 : mapRange(progress, act2Start, act2Start + 0.04, 1, 0),
              transition: "opacity 0.3s ease-out",
              zIndex: 1,
            }}
          >
            {/* Wide shot — zooms in */}
            <img
              src={IMGS.wide}
              alt="Cargo ship at sea"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                transform: `scale(${imgScale})`,
                transformOrigin: "center 45%",
                transition: "transform 0.05s linear",
                willChange: "transform",
              }}
            />

            {/* Close shot — fades in as we zoom */}
            <img
              src={IMGS.close}
              alt="Ship hull close"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                opacity: closeOpacity,
                transform: `scale(${1 + (1 - closeOpacity) * 0.3})`,
                transformOrigin: "center 55%",
                transition: "opacity 0.05s linear, transform 0.05s linear",
                willChange: "transform, opacity",
              }}
            />

            {/* Vignette */}
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at center, transparent 30%, oklch(0.06 0.02 240 / ${vignetteIntensity}) 100%)`,
                zIndex: 2,
              }}
            />

            {/* Bottom gradient */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to top, oklch(0.06 0.02 240 / 0.7) 0%, transparent 40%)",
                zIndex: 2,
              }}
            />

            {/* ── Hero text ── */}
            <div
              className="absolute inset-0 flex flex-col justify-end pb-20"
              style={{ zIndex: 10, opacity: heroTextOpacity, transition: "opacity 0.1s linear" }}
            >
              <div className="max-w-[1440px] mx-auto px-5 lg:px-8 w-full">
                <div className="eds-tag mb-4">
                  Agence Maritime & Tramping — Depuis 1975
                </div>
                <h1
                  className="eds-h1 mb-5"
                  style={{ maxWidth: "800px", fontSize: "clamp(3rem, 8vw, 7.5rem)" }}
                >
                  L'intelligence<br />
                  opérationnelle<br />
                  <span className="eds-accent">au service</span><br />
                  de votre cargo.
                </h1>
                <div className="flex flex-wrap gap-3 mb-8">
                  {[
                    { v: "800+", l: "Escales / an" },
                    { v: "200+", l: "Navires affrétés" },
                    { v: "7 M€", l: "Chiffre d'affaires" },
                    { v: "1975", l: "Année de fondation" },
                  ].map(({ v, l }) => (
                    <div key={l} className="eds-stat-pill">
                      <span className="eds-stat-pill-value">{v}</span>
                      <span className="eds-stat-pill-label">{l}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <a href="/contact" className="eds-btn eds-btn-amber">
                    Demander un devis
                  </a>
                  <a href="/services" className="eds-btn eds-btn-ghost">
                    Nos expertises
                  </a>
                </div>
              </div>
            </div>

            {/* ── Act 1 stats overlay (mid-scroll) ── */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ zIndex: 10, opacity: act1StatsOpacity, transition: "opacity 0.15s linear" }}
            >
              <div className="max-w-[1440px] mx-auto px-5 lg:px-8 w-full">
                <div className="flex flex-col gap-2 max-w-xs">
                  <div className="eds-tag mb-2" style={{ fontSize: "0.6rem" }}>
                    Opération en cours
                  </div>
                  {[
                    { l: "Navire", v: "MV Baltic Grain", u: "" },
                    { l: "Type", v: "Panamax", u: "75 000 DWT" },
                    { l: "Cargaison", v: "Blé tendre", u: "45 000 t" },
                    { l: "Route", v: "Rouen → Casablanca", u: "" },
                  ].map(({ l, v, u }, i) => (
                    <HUDCard
                      key={l}
                      label={l}
                      value={v}
                      unit={u}
                      visible={act1StatsOpacity > 0.3}
                      delay={i * 60}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Scroll indicator */}
            <ScrollIndicator visible={showScrollIndicator} />
          </div>

          {/* ══════════════════════════════════════════════════
              ACT 2 — INSIDE THE HOLD
          ══════════════════════════════════════════════════ */}
          <div
            className="absolute inset-0"
            style={{
              opacity: act2Opacity,
              zIndex: 2,
              pointerEvents: act2Opacity > 0.1 ? "auto" : "none",
            }}
          >
            {/* Hatch image — zoom-in entry */}
            <img
              src={IMGS.hatch}
              alt="Cargo hold with grain"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                transform: `scale(${hatchScale})`,
                transformOrigin: "center center",
                transition: "transform 0.05s linear",
                willChange: "transform",
              }}
            />

            {/* Grain texture overlay */}
            <img
              src={IMGS.grain}
              alt="Grain texture"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                opacity: mapRange(act2Progress, 0.3, 0.7, 0, 0.35),
                mixBlendMode: "overlay",
              }}
            />

            {/* Dark overlay */}
            <div
              className="absolute inset-0"
              style={{ background: "oklch(0.06 0.02 240 / 0.55)", zIndex: 1 }}
            />

            {/* Scan lines */}
            <ScanLines visible={hudVisible} />

            {/* Grain particles canvas */}
            <GrainCanvas opacity={act2Opacity * 0.7} />

            {/* ── HUD horizontal scan line ── */}
            {hudVisible && (
              <div
                className="absolute left-0 right-0 h-px"
                style={{
                  background: "linear-gradient(to right, transparent, oklch(0.72 0.14 65 / 0.6), transparent)",
                  animation: "scanMove 3s linear infinite",
                  zIndex: 6,
                }}
              />
            )}

            {/* ── HUD Data overlay ── */}
            <div
              className="absolute inset-0 flex items-center"
              style={{ zIndex: 10 }}
            >
              <div className="max-w-[1440px] mx-auto px-5 lg:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  {/* Left: Title */}
                  <div>
                    <div
                      className="eds-tag mb-4"
                      style={{ opacity: hudVisible ? 1 : 0, transition: "opacity 0.4s ease-out" }}
                    >
                      Cargaison — Dry Bulk
                    </div>
                    <h2
                      className="eds-h2 mb-3"
                      style={{
                        opacity: hudVisible ? 1 : 0,
                        transform: hudVisible ? "none" : "translateY(20px)",
                        transition: "opacity 0.5s ease-out 80ms, transform 0.5s ease-out 80ms",
                        fontSize: "clamp(2rem, 5vw, 4.5rem)",
                      }}
                    >
                      45 000 tonnes<br />
                      <span className="eds-accent">de blé tendre.</span><br />
                      Zéro surprise.
                    </h2>
                    <p
                      className="text-sm max-w-sm"
                      style={{
                        color: "oklch(0.62 0.015 240)",
                        lineHeight: 1.7,
                        opacity: hudVisible ? 1 : 0,
                        transition: "opacity 0.5s ease-out 160ms",
                      }}
                    >
                      Chaque opération est tracée, certifiée GMP+ et documentée en temps réel. De l'ouverture des écoutilles au dernier rapport P&I.
                    </p>
                  </div>

                  {/* Right: HUD cards grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { l: "Navire", v: "MV Baltic Grain", delay: 0 },
                      { l: "Type", v: "Panamax 75 000 DWT", delay: 60 },
                      { l: "Cargaison", v: "Blé tendre", delay: 120 },
                      { l: "Volume", v: "45 000 t", delay: 180 },
                      { l: "Certification", v: "GMP+ Feed Safety", delay: 240 },
                      { l: "Température", v: "18°C / HR 12%", delay: 300 },
                      { l: "Port départ", v: "Rouen (FR)", delay: 360 },
                      { l: "Port arrivée", v: "Casablanca (MA)", delay: 420 },
                    ].map(({ l, v, delay }) => (
                      <HUDCard
                        key={l}
                        label={l}
                        value={v}
                        visible={hudVisible}
                        delay={delay}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Corner HUD decorations */}
            {hudVisible && (
              <>
                <div
                  className="absolute top-6 left-6"
                  style={{ zIndex: 10, opacity: 0.6 }}
                >
                  <div
                    className="w-6 h-6 border-t-2 border-l-2"
                    style={{ borderColor: "oklch(0.72 0.14 65)" }}
                  />
                </div>
                <div
                  className="absolute top-6 right-6"
                  style={{ zIndex: 10, opacity: 0.6 }}
                >
                  <div
                    className="w-6 h-6 border-t-2 border-r-2"
                    style={{ borderColor: "oklch(0.72 0.14 65)" }}
                  />
                </div>
                <div
                  className="absolute bottom-6 left-6"
                  style={{ zIndex: 10, opacity: 0.6 }}
                >
                  <div
                    className="w-6 h-6 border-b-2 border-l-2"
                    style={{ borderColor: "oklch(0.72 0.14 65)" }}
                  />
                </div>
                <div
                  className="absolute bottom-6 right-6"
                  style={{ zIndex: 10, opacity: 0.6 }}
                >
                  <div
                    className="w-6 h-6 border-b-2 border-r-2"
                    style={{ borderColor: "oklch(0.72 0.14 65)" }}
                  />
                </div>
              </>
            )}
          </div>

          {/* ══════════════════════════════════════════════════
              ACT 3 — WORLD MAP
          ══════════════════════════════════════════════════ */}
          <div
            className="absolute inset-0"
            style={{
              opacity: act3Opacity,
              zIndex: 3,
              background: "oklch(0.07 0.025 240)",
              pointerEvents: act3Opacity > 0.1 ? "auto" : "none",
            }}
          >
            {/* Subtle ocean texture */}
            <div
              className="absolute inset-0"
              style={{
                background: "radial-gradient(ellipse at 48% 30%, oklch(0.14 0.04 240 / 0.8) 0%, oklch(0.07 0.025 240) 70%)",
              }}
            />

            {/* Map container with zoom */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ zIndex: 5 }}
            >
              <div
                style={{
                  width: "100%",
                  maxWidth: "1200px",
                  padding: "0 2rem",
                  transform: `scale(${mapScale}) translateY(${mapTranslateY}%)`,
                  transformOrigin: "48% 28%",
                  transition: "transform 0.05s linear",
                  willChange: "transform",
                }}
              >
                <WorldMap progress={act3Progress} />
              </div>
            </div>

            {/* Act 3 title */}
            <div
              className="absolute bottom-16 left-0 right-0"
              style={{ zIndex: 10 }}
            >
              <div className="max-w-[1440px] mx-auto px-5 lg:px-8">
                <div
                  className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6"
                  style={{
                    opacity: act3Eased > 0.5 ? 1 : 0,
                    transform: act3Eased > 0.5 ? "none" : "translateY(20px)",
                    transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
                  }}
                >
                  <div>
                    <div className="eds-tag mb-3">Réseau d'opération</div>
                    <h2
                      className="eds-h2"
                      style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)" }}
                    >
                      5 ports français.<br />
                      <span className="eds-accent">Une présence totale</span><br />
                      sur le littoral.
                    </h2>
                  </div>
                  <div className="flex flex-col gap-2">
                    {[
                      { port: "Dunkerque", role: "Siège social" },
                      { port: "Boulogne-sur-Mer", role: "Terminal dédié" },
                      { port: "Rouen", role: "Terminaux grain" },
                      { port: "Bayonne", role: "Agence maritime" },
                      { port: "Calais", role: "Agence maritime" },
                    ].map(({ port, role }) => (
                      <div key={port} className="flex items-center gap-3">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ background: "oklch(0.72 0.14 65)" }}
                        />
                        <span
                          className="text-xs font-bold"
                          style={{ color: "oklch(0.88 0.01 240)" }}
                        >
                          {port}
                        </span>
                        <span
                          className="text-xs"
                          style={{ color: "oklch(0.50 0.015 240)" }}
                        >
                          {role}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Progress bar at bottom */}
            <div
              className="absolute bottom-0 left-0 right-0 h-0.5"
              style={{ background: "oklch(1 0 0 / 0.06)", zIndex: 20 }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progress * 100}%`,
                  background: "oklch(0.72 0.14 65)",
                  transition: "width 0.05s linear",
                }}
              />
            </div>
          </div>

          {/* ── Act progress indicator (right side) ── */}
          <div
            className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3"
            style={{ zIndex: 30 }}
          >
            {[
              { label: "01", active: progress < act2Start },
              { label: "02", active: progress >= act2Start && progress < act3Start },
              { label: "03", active: progress >= act3Start },
            ].map(({ label, active }) => (
              <div key={label} className="flex items-center gap-2">
                <div
                  style={{
                    width: active ? "20px" : "8px",
                    height: "1.5px",
                    background: active ? "oklch(0.72 0.14 65)" : "oklch(1 0 0 / 0.25)",
                    transition: "width 0.3s ease-out, background 0.3s ease-out",
                  }}
                />
                <div
                  style={{
                    fontSize: "0.55rem",
                    fontFamily: "'Barlow', sans-serif",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    color: active ? "oklch(0.72 0.14 65)" : "oklch(1 0 0 / 0.25)",
                    transition: "color 0.3s ease-out",
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
