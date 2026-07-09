/**
 * Port Terminal — Euro Docks Service v3 SONAR
 * DA : "SONAR / Instrument de bord" — Ink abyssal + Signal vert-lime
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, MapPin } from "lucide-react";

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
  hero:     "/manus-storage/sonar_s3_quay_1898dc53.jpg",
  boulogne: "/manus-storage/sonar_s3_crane_89d5c612.jpg",
  rouen:    "/manus-storage/sonar_s4_map_bg_0afa04dc.jpg",
  grain:    "/manus-storage/sonar_s2_grain_6e5d0efe.jpg",
};

const terminals = [
  {
    id: "boulogne",
    img: IMGS.boulogne,
    city: "Boulogne-sur-Mer",
    role: "Terminal Dédié",
    description: "Terminal polyvalent sur le port de Boulogne-sur-Mer, spécialisé dans le vrac sec, le breakbulk et les cargaisons spéciales. Capacité de stockage de 77 500 m² sous hangar et en plein air.",
    stats: [
      { v: "800 m", l: "Longueur de quai" },
      { v: "77 500 m²", l: "Surface de stockage" },
      { v: "12 m", l: "Tirant d'eau max" },
      { v: "24h/24", l: "Opérations" },
    ],
    services: [
      "Manutention vrac sec (céréales, engrais, granulats)",
      "Breakbulk & Project cargo",
      "Stockage sous hangar et plein air",
      "Pesage et échantillonnage",
      "Draught survey certifié",
      "Coordination douanière intégrée",
    ],
    cargos: ["Céréales", "Engrais", "Acier", "Granulats", "Project Cargo"],
  },
  {
    id: "rouen",
    img: IMGS.rouen,
    city: "Rouen",
    role: "Terminal Grain",
    description: "Terminal céréalier sur le Grand Port Maritime de Rouen, premier port européen d'exportation de céréales. Capacité de traitement de 3,6 millions de tonnes par an avec silos de stockage intégrés.",
    stats: [
      { v: "3,6 Mt", l: "Capacité annuelle" },
      { v: "1er", l: "Port céréalier EU" },
      { v: "11 m", l: "Tirant d'eau max" },
      { v: "GMP+", l: "Certification" },
    ],
    services: [
      "Chargement/déchargement céréales",
      "Stockage en silos (blé, maïs, colza, orge)",
      "Analyse qualité et échantillonnage",
      "Coordination avec les négociants",
      "Transit douanier export",
      "Connexion fluviale Seine",
    ],
    cargos: ["Blé", "Maïs", "Colza", "Orge", "Tournesol"],
  },
];

export default function Terminal() {
  return (
    <div style={{ background: "var(--sonar-abyss)", minHeight: "100vh" }}>

      {/* ── Hero ── */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: "520px" }}>
        <img src={IMGS.hero} alt="" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center 40%",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, oklch(0.08 0.025 200 / 0.60) 0%, oklch(0.08 0.025 200 / 0.95) 100%)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, oklch(0.08 0.025 200 / 0.80) 0%, transparent 60%)",
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
            Infrastructure portuaire
          </div>
          <h1 style={{
            fontFamily: "'Archivo', sans-serif",
            fontWeight: 900, fontSize: "clamp(3rem, 8vw, 7rem)",
            letterSpacing: "-0.03em", textTransform: "uppercase",
            color: "oklch(0.97 0.005 200)", lineHeight: 0.92,
            marginBottom: "1.5rem",
          }}>
            PORT<br />
            <span style={{ color: "oklch(0.82 0.18 145)" }}>TERMINAL</span>
          </h1>
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.80rem", color: "oklch(0.62 0.025 200)",
            lineHeight: 1.7, maxWidth: "480px", marginBottom: "2.5rem",
          }}>
            Deux terminaux dédiés à Boulogne-sur-Mer et Rouen — manutention vrac sec,
            breakbulk, céréales et project cargo avec certification GMP+.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1px" }}>
            {[
              { v: "2", l: "Terminaux dédiés" },
              { v: "3,6 Mt", l: "Capacité Rouen" },
              { v: "77 500 m²", l: "Stockage Boulogne" },
              { v: "GMP+", l: "Certification" },
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
                  fontWeight: 900, fontSize: "1.4rem",
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

      {/* ── Terminaux ── */}
      {terminals.map((term, i) => (
        <section key={term.id} style={{
          background: i % 2 === 0 ? "var(--sonar-deep)" : "var(--sonar-abyss)",
          padding: "5rem 0",
        }}>
          <div className="container">
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr",
              gap: "4rem", alignItems: "start",
            }} className="grid-cols-1 lg:grid-cols-2">

              {/* Image */}
              <Reveal dir={i % 2 === 0 ? "left" : "right"} className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div style={{ position: "relative", height: "560px", overflow: "hidden" }}>
                  <img src={term.img} alt={term.city} style={{
                    width: "100%", height: "100%", objectFit: "cover",
                  }} />
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, oklch(0.08 0.025 200 / 0.75) 0%, transparent 50%)",
                  }} />
                  {/* Stats overlay */}
                  <div style={{
                    position: "absolute", bottom: "1.25rem", left: "1.25rem", right: "1.25rem",
                    display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px",
                  }}>
                    {term.stats.map(({ v, l }) => (
                      <div key={l} style={{
                        background: "oklch(0 0 0 / 0.70)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid oklch(1 0 0 / 0.10)",
                        borderTop: "1.5px solid oklch(0.82 0.18 145 / 0.50)",
                        padding: "0.6rem 0.75rem",
                      }}>
                        <div style={{
                          fontFamily: "'Archivo', sans-serif",
                          fontWeight: 900, fontSize: "1.1rem",
                          color: "oklch(0.78 0.14 68)",
                          letterSpacing: "-0.01em", lineHeight: 1,
                        }}>{v}</div>
                        <div style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: "0.52rem", letterSpacing: "0.10em",
                          textTransform: "uppercase", color: "oklch(0.82 0.18 145)",
                          marginTop: "0.15rem",
                        }}>{l}</div>
                      </div>
                    ))}
                  </div>
                  {/* Port badge */}
                  <div style={{
                    position: "absolute", top: "1.25rem", left: "1.25rem",
                    display: "flex", alignItems: "center", gap: "0.4rem",
                    background: "oklch(0 0 0 / 0.70)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid oklch(1 0 0 / 0.10)",
                    padding: "0.4rem 0.75rem",
                  }}>
                    <MapPin size={10} style={{ color: "oklch(0.82 0.18 145)" }} />
                    <span style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "0.58rem", letterSpacing: "0.10em",
                      textTransform: "uppercase", color: "oklch(0.75 0.01 200)",
                    }}>{term.city}</span>
                  </div>
                </div>
              </Reveal>

              {/* Contenu */}
              <Reveal dir={i % 2 === 0 ? "right" : "left"} delay={80} className={i % 2 === 1 ? "lg:order-1" : ""}>
                <div>
                  <div style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.60rem", letterSpacing: "0.15em",
                    textTransform: "uppercase", color: "oklch(0.82 0.18 145)",
                    display: "flex", alignItems: "center", gap: "0.75rem",
                    marginBottom: "1rem",
                  }}>
                    <span style={{ width: "20px", height: "1px", background: "oklch(0.82 0.18 145)" }} />
                    {term.role}
                  </div>
                  <h2 style={{
                    fontFamily: "'Archivo', sans-serif",
                    fontWeight: 900, fontSize: "clamp(2rem, 3.5vw, 3rem)",
                    letterSpacing: "-0.025em", textTransform: "uppercase",
                    color: "oklch(0.97 0.005 200)", lineHeight: 0.95,
                    marginBottom: "1.25rem",
                  }}>{term.city.toUpperCase()}</h2>
                  <p style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.75rem", color: "oklch(0.58 0.025 200)",
                    lineHeight: 1.75, marginBottom: "1.75rem",
                  }}>{term.description}</p>

                  {/* Services */}
                  <div style={{
                    border: "1px solid oklch(1 0 0 / 0.08)",
                    borderTop: "1.5px solid oklch(0.82 0.18 145 / 0.40)",
                    padding: "1rem",
                    marginBottom: "1.5rem",
                    background: "oklch(1 0 0 / 0.02)",
                  }}>
                    <div style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "0.58rem", letterSpacing: "0.12em",
                      textTransform: "uppercase", color: "oklch(0.45 0.025 200)",
                      marginBottom: "0.75rem",
                    }}>Services inclus</div>
                    {term.services.map(s => (
                      <div key={s} style={{
                        display: "flex", alignItems: "flex-start", gap: "0.5rem",
                        padding: "0.3rem 0",
                        borderBottom: "1px solid oklch(1 0 0 / 0.05)",
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: "0.62rem", color: "oklch(0.60 0.025 200)",
                      }}>
                        <span style={{
                          width: "10px", height: "1px",
                          background: "oklch(0.82 0.18 145 / 0.50)",
                          flexShrink: 0, marginTop: "7px",
                        }} />
                        {s}
                      </div>
                    ))}
                  </div>

                  {/* Cargaisons */}
                  <div style={{ marginBottom: "1.75rem" }}>
                    <div style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "0.58rem", letterSpacing: "0.12em",
                      textTransform: "uppercase", color: "oklch(0.45 0.025 200)",
                      marginBottom: "0.5rem",
                    }}>Cargaisons traitées</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                      {term.cargos.map(c => (
                        <span key={c} style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: "0.58rem", letterSpacing: "0.08em",
                          color: "oklch(0.82 0.18 145)",
                          background: "oklch(0.82 0.18 145 / 0.08)",
                          border: "1px solid oklch(0.82 0.18 145 / 0.20)",
                          padding: "0.2rem 0.5rem",
                        }}>{c}</span>
                      ))}
                    </div>
                  </div>

                  <Link href="/contact" style={{
                    display: "inline-flex", alignItems: "center", gap: "0.5rem",
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.12em",
                    textTransform: "uppercase", color: "oklch(0.82 0.18 145)",
                    textDecoration: "none", transition: "gap 0.2s ease",
                  }}
                    onMouseEnter={e => (e.currentTarget.style.gap = "0.75rem")}
                    onMouseLeave={e => (e.currentTarget.style.gap = "0.5rem")}
                  >
                    Contacter ce terminal <ArrowRight size={12} />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      {/* ── Stevedoring ── */}
      <section style={{ position: "relative", overflow: "hidden", padding: "5rem 0" }}>
        <img src={IMGS.grain} alt="" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center 40%",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "oklch(0.08 0.025 200 / 0.93)",
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
              STEVEDORING & MANUTENTION
            </div>
            <h2 style={{
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 900, fontSize: "clamp(2rem, 4vw, 3.5rem)",
              letterSpacing: "-0.025em", textTransform: "uppercase",
              color: "oklch(0.97 0.005 200)", lineHeight: 0.95,
            }}>
              EXPERTISE<br />
              <span style={{ color: "oklch(0.82 0.18 145)" }}>MANUTENTION PORTUAIRE</span>
            </h2>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px" }} className="grid-cols-2 lg:grid-cols-4">
            {[
              { title: "VRAC SEC", detail: "Céréales, engrais, granulats, charbon — manutention mécanisée et pneumatique", stat: "Jusqu'à 2 500 T/h" },
              { title: "BREAKBULK", detail: "Acier, bois, papier, produits industriels en colis ou palettes", stat: "Grue 100T disponible" },
              { title: "PROJECT CARGO", detail: "Pièces hors-gabarit, équipements industriels, éoliennes, transformateurs", stat: "Étude sur mesure" },
              { title: "LIQUIDES VRAC", detail: "Huiles végétales, produits chimiques — connexion pipeline quai", stat: "Certifié MARPOL" },
            ].map(({ title, detail, stat }, i) => (
              <Reveal key={title} delay={i * 60}>
                <div style={{
                  background: "oklch(0 0 0 / 0.55)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid oklch(1 0 0 / 0.08)",
                  borderTop: "1.5px solid oklch(0.82 0.18 145 / 0.40)",
                  padding: "1.5rem",
                  height: "100%",
                  transition: "border-top-color 0.2s ease",
                }}
                  onMouseEnter={e => (e.currentTarget.style.borderTopColor = "oklch(0.82 0.18 145)")}
                  onMouseLeave={e => (e.currentTarget.style.borderTopColor = "oklch(0.82 0.18 145 / 0.40)")}
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
                    fontSize: "0.60rem", color: "oklch(0.82 0.18 145)",
                    borderTop: "1px solid oklch(0.82 0.18 145 / 0.20)",
                    paddingTop: "0.5rem",
                  }}>{stat}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: "300px" }}>
        <img src={IMGS.hero} alt="" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center 60%",
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
                UNE ESCALE À PLANIFIER ?<br />
                <span style={{ color: "oklch(0.82 0.18 145)" }}>CONTACTEZ NOS TERMINAUX.</span>
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <Link href="/contact" className="sonar-btn sonar-btn-signal">
                NOUS CONTACTER <ArrowRight size={13} />
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
