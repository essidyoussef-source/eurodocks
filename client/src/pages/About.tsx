/**
 * À propos — Euro Docks Service v3 SONAR
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
  hero:   "/manus-storage/sonar_s1_wide_4e87cc79.jpg",
  close:  "/manus-storage/sonar_s1_close_a1f7b2e8.jpg",
  hatch:  "/manus-storage/sonar_s2_hatch_684a13c3.jpg",
  quay:   "/manus-storage/sonar_s3_quay_1898dc53.jpg",
  grain:  "/manus-storage/sonar_s2_grain_6e5d0efe.jpg",
};

const timeline = [
  { year: "1975", title: "Fondation", desc: "Création d'Euro Docks Service à Dunkerque. Enregistrement comme courtier en douane maritime sur les ports du Nord." },
  { year: "1985", title: "Expansion", desc: "Ouverture des agences de Boulogne-sur-Mer et Calais. Développement de l'activité d'agence maritime sur la Manche." },
  { year: "1995", title: "Terminal dédié", desc: "Construction du terminal dédié à Boulogne-sur-Mer : 800m de quai, 20 000 m² d'entrepôts GMP+, 57 500 m² de stockage extérieur." },
  { year: "2005", title: "Tramping international", desc: "Développement de l'affrètement tramping sur les marchés Baltic, Continent, Méditerranée et Mer Noire." },
  { year: "2015", title: "Certification GMP+", desc: "Obtention de la certification GMP+ Feed Safety pour le transport et le stockage de matières premières agricoles." },
  { year: "2024", title: "Aujourd'hui", desc: "800+ escales par an, 200+ navires affrétés, 7 M€ de chiffre d'affaires. Leader sur le littoral français." },
];

const values = [
  { title: "EXPERTISE TECHNIQUE", desc: "50 ans d'expérience opérationnelle dans les ports français. Nos équipes maîtrisent chaque aspect de l'opération maritime, du mouillage au départ." },
  { title: "RÉACTIVITÉ 24H/24", desc: "Les opérations maritimes n'ont pas d'horaires. Notre équipe est disponible à toute heure pour les urgences portuaires et les demandes commerciales." },
  { title: "RÉSEAU INTERNATIONAL", desc: "Partenariats avec les principaux armateurs, affréteurs et chargeurs européens. Présence sur les marchés Baltic, Continent, Méditerranée et Mer Noire." },
  { title: "CONFORMITÉ TOTALE", desc: "5 certifications européennes (GMP+, OVAM, OWD, NIWO, IBG). Couverture assurance transit de 9,5 M€. Courtier en douane enregistré depuis 1975." },
];

export default function About() {
  return (
    <div style={{ background: "var(--sonar-abyss)", minHeight: "100vh" }}>

      {/* ── Hero ── */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: "560px" }}>
        <img src={IMGS.hero} alt="" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center 35%",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, oklch(0.08 0.025 200 / 0.55) 0%, oklch(0.08 0.025 200 / 0.95) 100%)",
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
            Notre histoire
          </div>
          <h1 style={{
            fontFamily: "'Archivo', sans-serif",
            fontWeight: 900, fontSize: "clamp(3rem, 8vw, 7rem)",
            letterSpacing: "-0.03em", textTransform: "uppercase",
            color: "oklch(0.97 0.005 200)", lineHeight: 0.92,
            marginBottom: "1.5rem",
          }}>
            50 ANS<br />
            <span style={{ color: "oklch(0.82 0.18 145)" }}>D'EXPERTISE.</span>
          </h1>
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.80rem", color: "oklch(0.62 0.025 200)",
            lineHeight: 1.7, maxWidth: "520px",
          }}>
            Fondée en 1975 à Dunkerque, Euro Docks Service est aujourd'hui l'un des opérateurs
            maritimes les plus expérimentés du littoral français, spécialisé dans le tramping,
            l'agence maritime et le transit multimodal.
          </p>
        </div>
      </section>

      {/* ── Chiffres clés ── */}
      <section style={{ background: "var(--sonar-deep)", padding: "4rem 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "1px" }} className="grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {[
              { v: "1975", l: "Fondation" },
              { v: "800+", l: "Escales / an" },
              { v: "200+", l: "Navires affrétés" },
              { v: "7 M€", l: "Chiffre d'affaires" },
              { v: "5", l: "Ports couverts" },
              { v: "9,5 M€", l: "Couverture assurance" },
            ].map(({ v, l }, i) => (
              <Reveal key={l} delay={i * 50}>
                <div style={{
                  background: "oklch(1 0 0 / 0.03)",
                  border: "1px solid oklch(1 0 0 / 0.08)",
                  borderTop: "1.5px solid oklch(0.82 0.18 145 / 0.40)",
                  padding: "1.5rem 1rem",
                  textAlign: "center",
                }}>
                  <div style={{
                    fontFamily: "'Archivo', sans-serif",
                    fontWeight: 900, fontSize: "1.8rem",
                    color: "oklch(0.78 0.14 68)",
                    letterSpacing: "-0.02em", lineHeight: 1,
                    marginBottom: "0.3rem",
                  }}>{v}</div>
                  <div style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.55rem", letterSpacing: "0.12em",
                    textTransform: "uppercase", color: "oklch(0.82 0.18 145)",
                  }}>{l}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission + Photo ── */}
      <section style={{ background: "var(--sonar-abyss)", padding: "5rem 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }} className="grid-cols-1 lg:grid-cols-2">
            <Reveal dir="left">
              <div>
                <div style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.60rem", letterSpacing: "0.15em",
                  color: "oklch(0.82 0.18 145)", textTransform: "uppercase",
                  display: "flex", alignItems: "center", gap: "0.75rem",
                  marginBottom: "1rem",
                }}>
                  <span style={{ width: "20px", height: "1px", background: "oklch(0.82 0.18 145)" }} />
                  Notre mission
                </div>
                <h2 style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 900, fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  letterSpacing: "-0.025em", textTransform: "uppercase",
                  color: "oklch(0.97 0.005 200)", lineHeight: 0.95,
                  marginBottom: "1.5rem",
                }}>
                  L'OPÉRATEUR<br />
                  <span style={{ color: "oklch(0.82 0.18 145)" }}>DE CONFIANCE.</span>
                </h2>
                <p style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.75rem", color: "oklch(0.58 0.025 200)",
                  lineHeight: 1.75, marginBottom: "1.25rem",
                }}>
                  Euro Docks Service a été fondée avec une conviction simple : les armateurs et les
                  affréteurs méritent un partenaire qui connaît les ports français aussi bien qu'eux
                  connaissent leurs navires.
                </p>
                <p style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.75rem", color: "oklch(0.58 0.025 200)",
                  lineHeight: 1.75, marginBottom: "1.5rem",
                }}>
                  Depuis 1975, nous avons construit notre réputation sur la réactivité, la précision
                  technique et la capacité à résoudre les problèmes opérationnels les plus complexes.
                  Nos clients reviennent parce que nous livrons ce que nous promettons.
                </p>
                {/* Citation */}
                <div style={{
                  borderLeft: "2px solid oklch(0.82 0.18 145)",
                  paddingLeft: "1.25rem",
                  marginBottom: "1.5rem",
                }}>
                  <p style={{
                    fontFamily: "'Archivo', sans-serif",
                    fontStyle: "italic", fontSize: "0.95rem",
                    fontWeight: 500, color: "oklch(0.80 0.01 200)",
                    lineHeight: 1.6, marginBottom: "0.5rem",
                  }}>
                    "Dans le tramping, la réactivité n'est pas un avantage concurrentiel.
                    C'est la condition de survie."
                  </p>
                  <div style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.58rem", letterSpacing: "0.10em",
                    textTransform: "uppercase", color: "oklch(0.82 0.18 145)",
                  }}>Direction Générale — Euro Docks Service</div>
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
                  Travailler avec nous <ArrowRight size={12} />
                </Link>
              </div>
            </Reveal>
            <Reveal dir="right" delay={100}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px" }}>
                <div style={{ position: "relative", height: "320px", overflow: "hidden" }}>
                  <img src={IMGS.close} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "oklch(0.08 0.025 200 / 0.20)" }} />
                </div>
                <div style={{ position: "relative", height: "320px", overflow: "hidden", marginTop: "2rem" }}>
                  <img src={IMGS.hatch} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "oklch(0.08 0.025 200 / 0.20)" }} />
                </div>
                <div style={{ position: "relative", height: "220px", overflow: "hidden", marginTop: "-2rem" }}>
                  <img src={IMGS.grain} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "oklch(0.08 0.025 200 / 0.20)" }} />
                </div>
                <div style={{ position: "relative", height: "220px", overflow: "hidden" }}>
                  <img src={IMGS.quay} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "oklch(0.08 0.025 200 / 0.20)" }} />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section style={{ position: "relative", overflow: "hidden", padding: "5rem 0" }}>
        <img src={IMGS.quay} alt="" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "oklch(0.08 0.025 200 / 0.94)",
        }} />
        <div className="sonar-bathymetric" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.4 }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <Reveal className="mb-12">
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.62rem", letterSpacing: "0.15em",
              color: "oklch(0.82 0.18 145)", textTransform: "uppercase",
              display: "flex", alignItems: "center", gap: "0.75rem",
              marginBottom: "1rem",
            }}>
              <span style={{ width: "24px", height: "1px", background: "oklch(0.82 0.18 145)" }} />
              CHRONOLOGIE
            </div>
            <h2 style={{
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 900, fontSize: "clamp(2rem, 4vw, 3.5rem)",
              letterSpacing: "-0.025em", textTransform: "uppercase",
              color: "oklch(0.97 0.005 200)", lineHeight: 0.95,
            }}>
              CINQ DÉCENNIES<br />
              <span style={{ color: "oklch(0.82 0.18 145)" }}>D'HISTOIRE MARITIME.</span>
            </h2>
          </Reveal>

          <div style={{ position: "relative" }}>
            {/* Ligne verticale */}
            <div style={{
              position: "absolute", left: "0", top: 0, bottom: 0,
              width: "1px", background: "oklch(0.82 0.18 145 / 0.20)",
            }} />
            {timeline.map((item, i) => (
              <Reveal key={item.year} delay={i * 60}>
                <div style={{
                  display: "grid", gridTemplateColumns: "120px 1fr",
                  gap: "2rem", paddingLeft: "2rem",
                  marginBottom: "2rem", position: "relative",
                }}>
                  {/* Point sur la ligne */}
                  <div style={{
                    position: "absolute", left: "-4px", top: "8px",
                    width: "8px", height: "8px",
                    background: "oklch(0.82 0.18 145)",
                    border: "2px solid oklch(0.08 0.025 200)",
                  }} />
                  <div style={{
                    fontFamily: "'Archivo', sans-serif",
                    fontWeight: 900, fontSize: "1.4rem",
                    color: "oklch(0.78 0.14 68)",
                    letterSpacing: "-0.02em", lineHeight: 1,
                  }}>{item.year}</div>
                  <div>
                    <div style={{
                      fontFamily: "'Archivo', sans-serif",
                      fontWeight: 700, fontSize: "0.88rem",
                      textTransform: "uppercase", letterSpacing: "0.02em",
                      color: "oklch(0.97 0.005 200)", marginBottom: "0.3rem",
                    }}>{item.title}</div>
                    <div style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "0.65rem", color: "oklch(0.52 0.025 200)",
                      lineHeight: 1.65,
                    }}>{item.desc}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Valeurs ── */}
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
              NOS VALEURS
            </div>
            <h2 style={{
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 900, fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: "-0.025em", textTransform: "uppercase",
              color: "oklch(0.97 0.005 200)", lineHeight: 0.95,
            }}>
              CE QUI NOUS<br />
              <span style={{ color: "oklch(0.82 0.18 145)" }}>DISTINGUE.</span>
            </h2>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1px" }} className="grid-cols-1 md:grid-cols-2">
            {values.map(({ title, desc }, i) => (
              <Reveal key={title} delay={i * 60}>
                <div style={{
                  background: "oklch(1 0 0 / 0.03)",
                  border: "1px solid oklch(1 0 0 / 0.08)",
                  borderTop: "1.5px solid oklch(0.82 0.18 145 / 0.35)",
                  padding: "2rem",
                  transition: "border-top-color 0.2s ease",
                }}
                  onMouseEnter={e => (e.currentTarget.style.borderTopColor = "oklch(0.82 0.18 145)")}
                  onMouseLeave={e => (e.currentTarget.style.borderTopColor = "oklch(0.82 0.18 145 / 0.35)")}
                >
                  <h3 style={{
                    fontFamily: "'Archivo', sans-serif",
                    fontWeight: 800, fontSize: "1rem",
                    textTransform: "uppercase", letterSpacing: "0.02em",
                    color: "oklch(0.97 0.005 200)", marginBottom: "0.75rem",
                  }}>{title}</h3>
                  <p style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.65rem", color: "oklch(0.52 0.025 200)",
                    lineHeight: 1.7,
                  }}>{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ports ── */}
      <section style={{ position: "relative", overflow: "hidden", padding: "5rem 0" }}>
        <img src={IMGS.hero} alt="" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center 50%",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "oklch(0.08 0.025 200 / 0.92)",
        }} />
        <div className="sonar-bathymetric" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.4 }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <Reveal className="mb-8">
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.62rem", letterSpacing: "0.15em",
              color: "oklch(0.82 0.18 145)", textTransform: "uppercase",
              display: "flex", alignItems: "center", gap: "0.75rem",
              marginBottom: "1rem",
            }}>
              <span style={{ width: "24px", height: "1px", background: "oklch(0.82 0.18 145)" }} />
              PRÉSENCE PORTUAIRE
            </div>
            <h2 style={{
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 900, fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: "-0.025em", textTransform: "uppercase",
              color: "oklch(0.97 0.005 200)", lineHeight: 0.95,
            }}>
              5 PORTS<br />
              <span style={{ color: "oklch(0.82 0.18 145)" }}>DU LITTORAL FRANÇAIS.</span>
            </h2>
          </Reveal>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1px" }}>
            {[
              { port: "Dunkerque", role: "Siège social — Agence maritime & Affrètement" },
              { port: "Boulogne-sur-Mer", role: "Terminal dédié — 800m quai · 77 500m² stockage" },
              { port: "Calais", role: "Agence maritime — Manche & Mer du Nord" },
              { port: "Rouen", role: "Terminal grain — 3,6 Mt/an · 1er port céréalier EU" },
              { port: "Bayonne", role: "Agence maritime — Atlantique & Golfe de Gascogne" },
            ].map(({ port, role }, i) => (
              <Reveal key={port} delay={i * 50}>
                <div style={{
                  background: "oklch(0 0 0 / 0.55)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid oklch(1 0 0 / 0.08)",
                  borderTop: "1.5px solid oklch(0.82 0.18 145 / 0.40)",
                  padding: "1.25rem 1.5rem",
                  minWidth: "220px",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.3rem" }}>
                    <MapPin size={10} style={{ color: "oklch(0.82 0.18 145)", flexShrink: 0 }} />
                    <div style={{
                      fontFamily: "'Archivo', sans-serif",
                      fontWeight: 800, fontSize: "0.88rem",
                      textTransform: "uppercase", color: "oklch(0.97 0.005 200)",
                    }}>{port}</div>
                  </div>
                  <div style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.60rem", color: "oklch(0.48 0.025 200)",
                    lineHeight: 1.5,
                  }}>{role}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
