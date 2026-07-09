/**
 * Home — Euro Docks Service v3 SONAR
 * DA : "SONAR / Instrument de bord" — Ink abyssal + Signal vert-lime
 * Structure : SonarScrollExperience (scroll-scrub 4 scènes) + sections post-sticky
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronRight, MapPin, Anchor, Ship, Truck, Warehouse, BarChart3, Shield } from "lucide-react";
import { SonarScrollExperience } from "@/components/SonarScrollExperience";

// ─── Hook Reveal ─────────────────────────────────────────────
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.10 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, className = "", delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateY(24px)",
      transition: `opacity 0.65s cubic-bezier(0.23,1,0.32,1) ${delay}ms, transform 0.65s cubic-bezier(0.23,1,0.32,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

// ─── Hook CountUp ────────────────────────────────────────────
function useCountUp(target: number, duration = 1800, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(ease * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return count;
}

// ─── Composant ServiceCard SONAR ─────────────────────────────
function ServiceCard({ img, tag, title, details, href, tall = false }: {
  img: string; tag: string; title: string; details: string[];
  href: string; tall?: boolean;
}) {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <div style={{
        position: "relative", overflow: "hidden",
        height: tall ? "460px" : "340px",
        cursor: "pointer",
        border: "1px solid oklch(1 0 0 / 0.08)",
        borderTop: "1.5px solid oklch(0.82 0.18 145 / 0.40)",
        transition: "border-top-color 0.2s ease, box-shadow 0.2s ease",
      }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.borderTopColor = "oklch(0.82 0.18 145)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 0 32px oklch(0.82 0.18 145 / 0.10)";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.borderTopColor = "oklch(0.82 0.18 145 / 0.40)";
          (e.currentTarget as HTMLElement).style.boxShadow = "none";
        }}
      >
        <img src={img} alt={title} style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover",
          transition: "transform 0.5s ease",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, oklch(0.08 0.025 200 / 0.95) 0%, oklch(0.08 0.025 200 / 0.55) 50%, oklch(0.08 0.025 200 / 0.20) 100%)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          justifyContent: "flex-end",
          padding: "1.25rem",
        }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.55rem", letterSpacing: "0.15em",
            textTransform: "uppercase", color: "oklch(0.82 0.18 145)",
            marginBottom: "0.5rem",
          }}>{tag}</div>
          <h3 style={{
            fontFamily: "'Archivo', sans-serif",
            fontWeight: 800, fontSize: "1.1rem",
            letterSpacing: "-0.01em", textTransform: "uppercase",
            color: "oklch(0.97 0.005 200)", marginBottom: "0.75rem",
          }}>{title}</h3>
          <div style={{ borderTop: "1px solid oklch(1 0 0 / 0.15)", paddingTop: "0.75rem" }}>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {details.map(d => (
                <li key={d} style={{
                  display: "flex", alignItems: "flex-start", gap: "0.5rem",
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.62rem", color: "oklch(0.60 0.025 200)",
                }}>
                  <ChevronRight size={10} style={{ marginTop: "1px", flexShrink: 0, color: "oklch(0.82 0.18 145)" }} />
                  {d}
                </li>
              ))}
            </ul>
            <div style={{
              marginTop: "0.75rem", display: "flex", alignItems: "center", gap: "0.4rem",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.60rem", fontWeight: 600, letterSpacing: "0.10em",
              textTransform: "uppercase", color: "oklch(0.82 0.18 145)",
            }}>
              EN SAVOIR PLUS <ArrowRight size={10} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Images ──────────────────────────────────────────────────
const IMGS = {
  s1_wide:  "/manus-storage/sonar_s1_wide_4e87cc79.jpg",
  s2_hatch: "/manus-storage/sonar_s2_hatch_684a13c3.jpg",
  s2_grain: "/manus-storage/sonar_s2_grain_6e5d0efe.jpg",
  s3_quay:  "/manus-storage/sonar_s3_quay_1898dc53.jpg",
  s3_crane: "/manus-storage/sonar_s3_crane_89d5c612.jpg",
  s4_map:   "/manus-storage/sonar_s4_map_bg_0afa04dc.jpg",
  s4_ports: "/manus-storage/sonar_s4_ports_58ea5b25.jpg",
};

// ─── PAGE ────────────────────────────────────────────────────
export default function Home() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsActive, setStatsActive] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStatsActive(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const c800 = useCountUp(800, 1600, statsActive);
  const c200 = useCountUp(200, 1400, statsActive);
  const c4500 = useCountUp(4500, 2000, statsActive);
  const c50 = useCountUp(50, 1200, statsActive);

  return (
    <div style={{ background: "var(--sonar-abyss)", minHeight: "100vh" }}>

      {/* ══════════════════════════════════════════════════════
          SCROLL CINEMATIC — 4 scènes scroll-scrub
      ══════════════════════════════════════════════════════ */}
      <SonarScrollExperience />

      {/* ══════════════════════════════════════════════════════
          POST-STICKY : SECTION SERVICES
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "var(--sonar-deep)", padding: "6rem 0" }}>
        <div className="container">
          <Reveal className="mb-12">
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.62rem", letterSpacing: "0.15em",
              color: "oklch(0.82 0.18 145)", textTransform: "uppercase",
              display: "flex", alignItems: "center", gap: "0.75rem",
              marginBottom: "1rem",
            }}>
              <span style={{ display: "inline-block", width: "24px", height: "1px", background: "oklch(0.82 0.18 145)" }} />
              NOS EXPERTISES
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <h2 style={{
                fontFamily: "'Archivo', sans-serif",
                fontWeight: 900, fontSize: "clamp(2rem, 4vw, 3.5rem)",
                letterSpacing: "-0.025em", textTransform: "uppercase",
                color: "oklch(0.97 0.005 200)", lineHeight: 0.95,
              }}>
                UNE GAMME COMPLÈTE<br />
                <span style={{ color: "oklch(0.82 0.18 145)" }}>DE SERVICES MARITIMES</span>
              </h2>
            </div>
          </Reveal>

          {/* Grille services */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px" }} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <Reveal delay={0}>
              <ServiceCard
                img={IMGS.s1_wide}
                tag="Shipping Agency"
                title="Agence Maritime"
                details={["Husbandry & Protective", "Dry/liquid bulk · Liner · Breakbulk", "Heavy lift & Project cargo", "5 ports français"]}
                href="/services" tall
              />
            </Reveal>
            <Reveal delay={60}>
              <ServiceCard
                img={IMGS.s3_quay}
                tag="Chartering & Tramping"
                title="Affrètement Tramping"
                details={["Coaster à Panamax", "Dry bulk · Breakbulk · Heavy lift", "Baltic · Continent · Med · Black Sea", "200 navires / an"]}
                href="/services" tall
              />
            </Reveal>
            <Reveal delay={120}>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <ServiceCard
                  img={IMGS.s2_grain}
                  tag="Maritime Survey"
                  title="Expertise Maritime"
                  details={["Draught surveying", "Ultrasonic leak test", "On/Off-hire survey", "P&I reports"]}
                  href="/services"
                />
                <ServiceCard
                  img={IMGS.s4_ports}
                  tag="Customs Brokerage"
                  title="Courtage en Douane"
                  details={["Registered broker depuis 1975", "Deposit & Garantee", "Dunkirk · Boulogne · Calais · Rouen"]}
                  href="/services"
                />
              </div>
            </Reveal>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px", marginTop: "2px" }} className="grid-cols-1 md:grid-cols-2">
            <Reveal delay={0}>
              <ServiceCard
                img={IMGS.s2_hatch}
                tag="Freight Forwarding"
                title="Transit Multimodal"
                details={["Rhine · North France · Mosel · Seine", "Bulk · steel · break products", "GMP+ certified", "Couverture 9,5 M€"]}
                href="/freight"
              />
            </Reveal>
            <Reveal delay={60}>
              <ServiceCard
                img={IMGS.s3_crane}
                tag="Port Terminal"
                title="Terminal Portuaire"
                details={["800m de quai — Boulogne-sur-Mer", "Entrepôts 20 000 m² GMP+", "Stockage extérieur 57 500 m²", "3,6 Mt/an — Rouen"]}
                href="/terminal"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CHIFFRES CLÉS — fond photo + count-up
      ══════════════════════════════════════════════════════ */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: "400px" }}>
        <img src={IMGS.s4_map} alt="" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "oklch(0.08 0.025 200 / 0.88)",
        }} />
        {/* Grille bathymétrique */}
        <div className="sonar-bathymetric" style={{
          position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.5,
        }} />
        <div className="container" style={{ position: "relative", zIndex: 1, padding: "5rem 2rem" }}>
          <div ref={statsRef} style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1px",
          }} className="grid-cols-2 lg:grid-cols-4">
            {[
              { value: c800, suffix: "+", label: "ESCALES / AN", desc: "Opérations portuaires" },
              { value: c200, suffix: "+", label: "NAVIRES AFFRÉTÉS", desc: "Par an, tous types" },
              { value: c4500, suffix: " KT", label: "VRAC TRAITÉ", desc: "Capacité annuelle" },
              { value: c50, suffix: " ANS", label: "D'EXPERTISE", desc: "Fondé en 1975" },
            ].map(({ value, suffix, label, desc }) => (
              <div key={label} style={{
                background: "oklch(0 0 0 / 0.45)",
                backdropFilter: "blur(12px)",
                borderTop: "1.5px solid oklch(0.82 0.18 145 / 0.60)",
                border: "1px solid oklch(1 0 0 / 0.08)",
                padding: "2rem 1.5rem",
                textAlign: "center",
              }}>
                <div style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  color: "oklch(0.78 0.14 68)",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                }}>
                  {value.toLocaleString("fr-FR")}{suffix}
                </div>
                <div style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.60rem", letterSpacing: "0.15em",
                  textTransform: "uppercase", color: "oklch(0.82 0.18 145)",
                  marginTop: "0.5rem",
                }}>{label}</div>
                <div style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.58rem", color: "oklch(0.45 0.025 200)",
                  marginTop: "0.25rem",
                }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CLIENTS DE RÉFÉRENCE
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "oklch(0.10 0.03 200)", padding: "5rem 0" }}>
        <div className="container">
          <Reveal className="mb-10">
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.62rem", letterSpacing: "0.15em",
              color: "oklch(0.82 0.18 145)", textTransform: "uppercase",
              display: "flex", alignItems: "center", gap: "0.75rem",
              marginBottom: "1rem",
            }}>
              <span style={{ display: "inline-block", width: "24px", height: "1px", background: "oklch(0.82 0.18 145)" }} />
              CLIENTS DE RÉFÉRENCE
            </div>
            <h2 style={{
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 900, fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
              letterSpacing: "-0.025em", textTransform: "uppercase",
              color: "oklch(0.97 0.005 200)", lineHeight: 0.95,
            }}>
              LES LEADERS MONDIAUX<br />
              <span style={{ color: "oklch(0.82 0.18 145)" }}>DE L'AGRO-INDUSTRIE</span>
            </h2>
          </Reveal>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "1px",
          }} className="grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {[
              { name: "GLENCORE", sector: "Négoce matières premières" },
              { name: "BUNGE", sector: "Agro-industrie mondiale" },
              { name: "SOUFFLET", sector: "Céréales & Malt" },
              { name: "LOUIS DREYFUS", sector: "Commerce de grains" },
              { name: "CARGILL", sector: "Agro-industrie" },
              { name: "ARCELORMITTAL", sector: "Sidérurgie mondiale" },
              { name: "LAFARGE", sector: "Matériaux de construction" },
              { name: "ROQUETTE", sector: "Chimie végétale" },
              { name: "TEREOS", sector: "Sucre & Amidon" },
              { name: "EQIOM", sector: "Ciment & Granulats" },
              { name: "TRANSGRAINS", sector: "Négoce céréales" },
              { name: "LECUREUR", sector: "Meunerie" },
              { name: "LHOIST", sector: "Chaux & Minéraux" },
              { name: "LIBERTY ALU", sector: "Aluminium primaire" },
              { name: "DESIALIS", sector: "Coopérative céréalière" },
            ].map(({ name, sector }, i) => (
              <Reveal key={name} delay={i * 20}>
                <div style={{
                  background: "oklch(1 0 0 / 0.03)",
                  border: "1px solid oklch(1 0 0 / 0.06)",
                  padding: "1rem",
                  transition: "background 0.2s ease, border-color 0.2s ease",
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = "oklch(0.82 0.18 145 / 0.05)";
                    (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.82 0.18 145 / 0.20)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = "oklch(1 0 0 / 0.03)";
                    (e.currentTarget as HTMLElement).style.borderColor = "oklch(1 0 0 / 0.06)";
                  }}
                >
                  <div style={{
                    fontFamily: "'Archivo', sans-serif",
                    fontWeight: 800, fontSize: "0.82rem",
                    textTransform: "uppercase", letterSpacing: "0.02em",
                    color: "oklch(0.88 0.01 200)", marginBottom: "0.2rem",
                  }}>{name}</div>
                  <div style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.58rem", color: "oklch(0.42 0.02 200)",
                  }}>{sector}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CTA FINAL — fond photo + formulaire rapide
      ══════════════════════════════════════════════════════ */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: "480px" }}>
        <img src={IMGS.s3_quay} alt="" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, oklch(0.08 0.025 200 / 0.95) 0%, oklch(0.08 0.025 200 / 0.80) 100%)",
        }} />
        <div className="sonar-bathymetric" style={{
          position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.4,
        }} />
        <div className="container" style={{ position: "relative", zIndex: 1, padding: "5rem 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }} className="grid-cols-1 lg:grid-cols-2">
            <Reveal>
              <div style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.62rem", letterSpacing: "0.15em",
                color: "oklch(0.82 0.18 145)", textTransform: "uppercase",
                display: "flex", alignItems: "center", gap: "0.75rem",
                marginBottom: "1.5rem",
              }}>
                <span style={{ display: "inline-block", width: "24px", height: "1px", background: "oklch(0.82 0.18 145)" }} />
                PRISE DE CONTACT
              </div>
              <h2 style={{
                fontFamily: "'Archivo', sans-serif",
                fontWeight: 900, fontSize: "clamp(2rem, 4vw, 3.5rem)",
                letterSpacing: "-0.025em", textTransform: "uppercase",
                color: "oklch(0.97 0.005 200)", lineHeight: 0.95,
                marginBottom: "1.5rem",
              }}>
                UNE OPÉRATION<br />
                À PLANIFIER ?<br />
                <span style={{ color: "oklch(0.82 0.18 145)" }}>PARLONS-EN.</span>
              </h2>
              <p style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.78rem", color: "oklch(0.60 0.025 200)",
                lineHeight: 1.7, maxWidth: "420px", marginBottom: "2rem",
              }}>
                Notre équipe répond sous 24 heures pour tout projet d'affrètement,
                d'agence maritime ou de transit multimodal.
              </p>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <Link href="/contact" className="sonar-btn sonar-btn-signal">
                  DEMANDER UN DEVIS <ArrowRight size={14} />
                </Link>
                <a href="mailto:commercial@eurodocks.com" className="sonar-btn sonar-btn-ghost">
                  commercial@eurodocks.com
                </a>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div style={{
                borderLeft: "1.5px solid oklch(0.82 0.18 145 / 0.25)",
                paddingLeft: "2rem",
              }}>
                {[
                  { stat: "24H", label: "Délai de réponse garanti" },
                  { stat: "50 ANS", label: "D'expertise maritime" },
                  { stat: "9,5 M€", label: "Couverture assurance transit" },
                  { stat: "5 PORTS", label: "Présence sur le littoral français" },
                ].map(({ stat, label }) => (
                  <div key={stat} style={{
                    display: "flex", alignItems: "center", gap: "1.5rem",
                    marginBottom: "1.5rem",
                  }}>
                    <div style={{
                      fontFamily: "'Archivo', sans-serif",
                      fontWeight: 900,
                      fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                      color: "oklch(0.78 0.14 68)",
                      lineHeight: 1, letterSpacing: "-0.02em",
                      minWidth: "7rem",
                    }}>{stat}</div>
                    <div style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "0.65rem", color: "oklch(0.55 0.025 200)",
                      lineHeight: 1.4,
                    }}>{label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
