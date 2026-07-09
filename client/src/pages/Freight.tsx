/**
 * Freight Forwarding — Euro Docks Service v3 SONAR
 * DA : "SONAR / Instrument de bord" — Ink abyssal + Signal vert-lime
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronRight, Shield } from "lucide-react";

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, className = "", delay = 0, dir = "up" }: {
  children: React.ReactNode; className?: string; delay?: number; dir?: "up" | "left" | "right";
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const t = dir === "left" ? "translateX(-28px)" : dir === "right" ? "translateX(28px)" : "translateY(24px)";
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : t,
      transition: `opacity 0.65s cubic-bezier(0.23,1,0.32,1) ${delay}ms, transform 0.65s cubic-bezier(0.23,1,0.32,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

const IMGS = {
  hero:   "/manus-storage/sonar_s2_grain_6e5d0efe.jpg",
  fluvial: "/manus-storage/sonar_s3_quay_1898dc53.jpg",
  route:  "/manus-storage/sonar_s3_crane_89d5c612.jpg",
  rail:   "/manus-storage/sonar_s4_map_bg_0afa04dc.jpg",
};

const modes = [
  {
    img: IMGS.fluvial,
    tag: "Voie Navigable",
    title: "Fluvial",
    description: "Transport par voie navigable sur le Rhin, la Seine, la Moselle et le réseau Nord France.",
    routes: [
      { r: "Rhine (Rhin)", d: "Bâle → Rotterdam" },
      { r: "Seine", d: "Paris → Le Havre" },
      { r: "Moselle", d: "Metz → Coblence" },
      { r: "North France", d: "Dunkerque → Paris" },
    ],
    cargos: ["Céréales", "Engrais", "Granulats", "Produits chimiques"],
  },
  {
    img: IMGS.route,
    tag: "Transport Routier",
    title: "Route",
    description: "Réseau de transporteurs agréés pour la distribution nationale et internationale.",
    routes: [
      { r: "France nationale", d: "Tous départements" },
      { r: "Benelux", d: "Belgique · Pays-Bas · Luxembourg" },
      { r: "Allemagne", d: "Rhénanie · Bavière · Hambourg" },
      { r: "Péninsule ibérique", d: "Espagne · Portugal" },
    ],
    cargos: ["Vrac alimentaire", "Acier", "Produits industriels", "Breakbulk"],
  },
  {
    img: IMGS.rail,
    tag: "Transport Ferroviaire",
    title: "Rail",
    description: "Solutions ferroviaires pour les grands volumes. Connexion directe aux terminaux portuaires.",
    routes: [
      { r: "Rouen → Paris", d: "Terminal grain" },
      { r: "Dunkerque → Lyon", d: "Axe Nord-Sud" },
      { r: "Calais → Strasbourg", d: "Axe Est" },
      { r: "International", d: "Via Eurotunnel" },
    ],
    cargos: ["Céréales", "Charbon", "Minerais", "Produits chimiques"],
  },
];

const certifications = [
  { code: "GMP+", name: "Good Manufacturing Practice", detail: "Certification transport et stockage de matières premières pour l'alimentation animale" },
  { code: "OVAM", name: "Organisme Vlaamse Afvalstoffen", detail: "Enregistrement pour le transport de déchets en Belgique" },
  { code: "OWD", name: "Overheidsdienst Wegverkeer", detail: "Accord de transport de déchets — Pays-Bas" },
  { code: "NIWO", name: "Nationale en Internationale Wegvervoer", detail: "Licence de transport international routier Pays-Bas" },
  { code: "IBG", name: "Inland Barge Group", detail: "Certification voies navigables intérieures européennes" },
];

export default function Freight() {
  return (
    <div style={{ background: "var(--sonar-abyss)", minHeight: "100vh" }}>

      {/* ── Hero ── */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: "520px" }}>
        <img src={IMGS.hero} alt="" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center 50%",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, oklch(0.08 0.025 200 / 0.95) 0%, oklch(0.08 0.025 200 / 0.65) 55%, oklch(0.08 0.025 200 / 0.30) 100%)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, oklch(0.08 0.025 200) 0%, transparent 50%)",
        }} />
        <div className="sonar-bathymetric" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.4 }} />
        <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: "5rem", paddingBottom: "5rem" }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.62rem", letterSpacing: "0.15em",
            color: "oklch(0.82 0.18 145)", textTransform: "uppercase",
            display: "flex", alignItems: "center", gap: "0.75rem",
            marginBottom: "1.5rem",
          }}>
            <span style={{ width: "24px", height: "1px", background: "oklch(0.82 0.18 145)" }} />
            Transit multimodal
          </div>
          <h1 style={{
            fontFamily: "'Archivo', sans-serif",
            fontWeight: 900, fontSize: "clamp(3rem, 8vw, 7rem)",
            letterSpacing: "-0.03em", textTransform: "uppercase",
            color: "oklch(0.97 0.005 200)", lineHeight: 0.92,
            marginBottom: "1.5rem",
          }}>
            FREIGHT<br />
            <span style={{ color: "oklch(0.82 0.18 145)" }}>FORWARDING</span>
          </h1>
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.80rem", color: "oklch(0.62 0.025 200)",
            lineHeight: 1.7, maxWidth: "480px", marginBottom: "2.5rem",
          }}>
            Transport multimodal fluvial, routier et ferroviaire pour vrac sec, acier et produits industriels.
            Couverture assurance 9,5 M€ — certifié GMP+.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1px" }}>
            {[
              { v: "9,5 M€", l: "Couverture assurance" },
              { v: "GMP+", l: "Certification" },
              { v: "5", l: "Certifications EU" },
              { v: "3", l: "Modes de transport" },
            ].map(({ v, l }) => (
              <div key={l} style={{
                background: "oklch(0 0 0 / 0.50)",
                backdropFilter: "blur(12px)",
                border: "1px solid oklch(1 0 0 / 0.10)",
                borderTop: "1.5px solid oklch(0.82 0.18 145 / 0.60)",
                padding: "0.75rem 1.25rem",
                minWidth: "120px",
              }}>
                <div style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 900, fontSize: "1.6rem",
                  color: "oklch(0.78 0.14 68)",
                  letterSpacing: "-0.02em", lineHeight: 1,
                }}>{v}</div>
                <div style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.58rem", letterSpacing: "0.12em",
                  textTransform: "uppercase", color: "oklch(0.82 0.18 145)",
                  marginTop: "0.25rem",
                }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3 modes de transport ── */}
      <section style={{ background: "var(--sonar-deep)", padding: "5rem 0" }}>
        <div className="container">
          <Reveal className="mb-12">
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.62rem", letterSpacing: "0.15em",
              color: "oklch(0.82 0.18 145)", textTransform: "uppercase",
              display: "flex", alignItems: "center", gap: "0.75rem",
              marginBottom: "1rem",
            }}>
              <span style={{ width: "24px", height: "1px", background: "oklch(0.82 0.18 145)" }} />
              MODES DE TRANSPORT
            </div>
            <h2 style={{
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 900, fontSize: "clamp(2rem, 4vw, 3.5rem)",
              letterSpacing: "-0.025em", textTransform: "uppercase",
              color: "oklch(0.97 0.005 200)", lineHeight: 0.95,
            }}>
              SOLUTIONS MULTIMODALES<br />
              <span style={{ color: "oklch(0.82 0.18 145)" }}>FLUVIAL · ROUTE · RAIL</span>
            </h2>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px" }} className="grid-cols-1 md:grid-cols-3">
            {modes.map((mode, i) => (
              <Reveal key={mode.title} delay={i * 80}>
                <div style={{ position: "relative", overflow: "hidden", height: "520px" }}>
                  <img src={mode.img} alt={mode.title} style={{
                    width: "100%", height: "100%", objectFit: "cover",
                    transition: "transform 0.5s ease",
                  }} />
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, oklch(0.08 0.025 200 / 0.97) 0%, oklch(0.08 0.025 200 / 0.60) 50%, oklch(0.08 0.025 200 / 0.20) 100%)",
                  }} />
                  <div style={{
                    position: "absolute", inset: 0,
                    display: "flex", flexDirection: "column",
                    justifyContent: "flex-end", padding: "1.5rem",
                  }}>
                    <div style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "0.58rem", letterSpacing: "0.15em",
                      textTransform: "uppercase", color: "oklch(0.82 0.18 145)",
                      marginBottom: "0.5rem",
                    }}>{mode.tag}</div>
                    <h3 style={{
                      fontFamily: "'Archivo', sans-serif",
                      fontWeight: 900, fontSize: "2rem",
                      textTransform: "uppercase", letterSpacing: "-0.02em",
                      color: "oklch(0.97 0.005 200)", lineHeight: 1,
                      marginBottom: "0.75rem",
                    }}>{mode.title}</h3>
                    <p style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "0.65rem", color: "oklch(0.55 0.025 200)",
                      lineHeight: 1.6, marginBottom: "1rem",
                    }}>{mode.description}</p>
                    {/* Routes */}
                    <div style={{
                      borderTop: "1px solid oklch(1 0 0 / 0.12)",
                      paddingTop: "0.75rem", marginBottom: "0.75rem",
                    }}>
                      {mode.routes.map(({ r, d }) => (
                        <div key={r} style={{
                          display: "flex", justifyContent: "space-between",
                          padding: "0.25rem 0",
                          borderBottom: "1px solid oklch(1 0 0 / 0.06)",
                        }}>
                          <span style={{
                            fontFamily: "'IBM Plex Mono', monospace",
                            fontSize: "0.58rem", color: "oklch(0.65 0.025 200)",
                          }}>{r}</span>
                          <span style={{
                            fontFamily: "'IBM Plex Mono', monospace",
                            fontSize: "0.58rem", color: "oklch(0.82 0.18 145)",
                          }}>{d}</span>
                        </div>
                      ))}
                    </div>
                    {/* Cargos */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                      {mode.cargos.map(c => (
                        <span key={c} style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: "0.55rem", letterSpacing: "0.08em",
                          color: "oklch(0.70 0.01 200)",
                          background: "oklch(1 0 0 / 0.06)",
                          border: "1px solid oklch(1 0 0 / 0.10)",
                          padding: "0.15rem 0.4rem",
                        }}>{c}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications ── */}
      <section style={{ position: "relative", overflow: "hidden", padding: "5rem 0" }}>
        <img src={IMGS.hero} alt="" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center 30%",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "oklch(0.08 0.025 200 / 0.94)",
        }} />
        <div className="sonar-bathymetric" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.4 }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <Reveal className="mb-10">
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.62rem", letterSpacing: "0.15em",
              color: "oklch(0.82 0.18 145)", textTransform: "uppercase",
              display: "flex", alignItems: "center", gap: "0.75rem",
              marginBottom: "1rem",
            }}>
              <span style={{ width: "24px", height: "1px", background: "oklch(0.82 0.18 145)" }} />
              CONFORMITÉ & CERTIFICATIONS
            </div>
            <h2 style={{
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 900, fontSize: "clamp(2rem, 4vw, 3.5rem)",
              letterSpacing: "-0.025em", textTransform: "uppercase",
              color: "oklch(0.97 0.005 200)", lineHeight: 0.95,
            }}>
              5 CERTIFICATIONS<br />
              <span style={{ color: "oklch(0.82 0.18 145)" }}>EUROPÉENNES</span>
            </h2>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1px" }} className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
            {certifications.map((cert, i) => (
              <Reveal key={cert.code} delay={i * 60}>
                <div style={{
                  background: "oklch(0 0 0 / 0.55)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid oklch(1 0 0 / 0.08)",
                  borderTop: "1.5px solid oklch(0.82 0.18 145 / 0.50)",
                  padding: "1.5rem",
                  height: "100%",
                  display: "flex", flexDirection: "column", gap: "0.75rem",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Shield size={14} style={{ color: "oklch(0.82 0.18 145)", flexShrink: 0 }} />
                    <div style={{
                      fontFamily: "'Archivo', sans-serif",
                      fontWeight: 900, fontSize: "1.1rem",
                      textTransform: "uppercase", letterSpacing: "-0.01em",
                      color: "oklch(0.82 0.18 145)",
                    }}>{cert.code}</div>
                  </div>
                  <div style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.62rem", fontWeight: 500,
                    color: "oklch(0.75 0.01 200)",
                  }}>{cert.name}</div>
                  <div style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.60rem", color: "oklch(0.45 0.025 200)",
                    lineHeight: 1.6,
                  }}>{cert.detail}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Spécialités cargaison ── */}
      <section style={{ background: "var(--sonar-deep)", padding: "5rem 0" }}>
        <div className="container">
          <Reveal className="mb-10">
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.62rem", letterSpacing: "0.15em",
              color: "oklch(0.82 0.18 145)", textTransform: "uppercase",
              display: "flex", alignItems: "center", gap: "0.75rem",
              marginBottom: "1rem",
            }}>
              <span style={{ width: "24px", height: "1px", background: "oklch(0.82 0.18 145)" }} />
              SPÉCIALITÉS CARGAISON
            </div>
            <h2 style={{
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 900, fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: "-0.025em", textTransform: "uppercase",
              color: "oklch(0.97 0.005 200)", lineHeight: 0.95,
            }}>
              EXPERTISE SECTORIELLE<br />
              <span style={{ color: "oklch(0.82 0.18 145)" }}>RECONNUE</span>
            </h2>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px" }} className="grid-cols-2 lg:grid-cols-4">
            {[
              { title: "CÉRÉALES & GRAINS", detail: "Blé, maïs, colza, orge — transport GMP+ certifié", stat: "Spécialité principale" },
              { title: "ACIER & MÉTAUX", detail: "Bobines, tôles, profilés, acier en vrac", stat: "ArcelorMittal · Liberty Alu" },
              { title: "ENGRAIS", detail: "Urée, DAP, potasse — stockage sécurisé", stat: "Couverture 9,5 M€" },
              { title: "PRODUITS INDUSTRIELS", detail: "Breakbulk, project cargo, matériaux de construction", stat: "Lafarge · Eqiom · Lhoist" },
            ].map(({ title, detail, stat }, i) => (
              <Reveal key={title} delay={i * 60}>
                <div style={{
                  background: "oklch(1 0 0 / 0.03)",
                  border: "1px solid oklch(1 0 0 / 0.08)",
                  borderTop: "1.5px solid oklch(0.82 0.18 145 / 0.35)",
                  padding: "1.5rem",
                  transition: "border-top-color 0.2s ease",
                }}
                  onMouseEnter={e => (e.currentTarget.style.borderTopColor = "oklch(0.82 0.18 145)")}
                  onMouseLeave={e => (e.currentTarget.style.borderTopColor = "oklch(0.82 0.18 145 / 0.35)")}
                >
                  <h3 style={{
                    fontFamily: "'Archivo', sans-serif",
                    fontWeight: 800, fontSize: "0.88rem",
                    textTransform: "uppercase", letterSpacing: "0.02em",
                    color: "oklch(0.97 0.005 200)", marginBottom: "0.5rem",
                  }}>{title}</h3>
                  <p style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.62rem", color: "oklch(0.52 0.025 200)",
                    lineHeight: 1.6, marginBottom: "0.75rem",
                  }}>{detail}</p>
                  <div style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.58rem", color: "oklch(0.82 0.18 145)",
                    display: "flex", alignItems: "center", gap: "0.4rem",
                  }}>
                    <ChevronRight size={10} /> {stat}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: "300px" }}>
        <img src={IMGS.fluvial} alt="" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "oklch(0.08 0.025 200 / 0.92)",
        }} />
        <div className="sonar-bathymetric" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.4 }} />
        <div className="container" style={{ position: "relative", zIndex: 1, padding: "5rem 2rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "3rem", flexWrap: "wrap" }}>
            <div>
              <div style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.60rem", letterSpacing: "0.15em",
                color: "oklch(0.82 0.18 145)", textTransform: "uppercase",
                display: "flex", alignItems: "center", gap: "0.75rem",
                marginBottom: "1rem",
              }}>
                <span style={{ width: "20px", height: "1px", background: "oklch(0.82 0.18 145)" }} />
                Prise de contact
              </div>
              <h2 style={{
                fontFamily: "'Archivo', sans-serif",
                fontWeight: 900, fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                letterSpacing: "-0.025em", textTransform: "uppercase",
                color: "oklch(0.97 0.005 200)", lineHeight: 0.95,
              }}>
                UN PROJET DE TRANSIT ?<br />
                <span style={{ color: "oklch(0.82 0.18 145)" }}>OBTENEZ UN DEVIS.</span>
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <Link href="/contact" className="sonar-btn sonar-btn-signal">
                DEMANDER UN DEVIS <ArrowRight size={13} />
              </Link>
              <a href="mailto:commercial@eurodocks.com" className="sonar-btn sonar-btn-ghost">
                commercial@eurodocks.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
