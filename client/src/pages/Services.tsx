/**
 * Services — Euro Docks Service v3 SONAR
 * DA : "SONAR / Instrument de bord" — Ink abyssal + Signal vert-lime
 * Structure : Hero photo + 4 services alternés + CTA
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronRight, MapPin } from "lucide-react";

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
  hero:    "/manus-storage/sonar_s1_wide_4e87cc79.jpg",
  agency:  "/manus-storage/eds_hero_ship_5b197371.jpg",
  charter: "/manus-storage/sonar_s1_close_a1f7b2e8.jpg",
  survey:  "/manus-storage/sonar_s2_hatch_684a13c3.jpg",
  customs: "/manus-storage/sonar_s2_grain_6e5d0efe.jpg",
};

const services = [
  {
    id: "agency",
    img: IMGS.agency,
    tag: "Shipping Agency",
    title: "Agence Maritime",
    stat: "800+",
    statLabel: "Escales / an",
    description: "Représentation et assistance complète pour les navires en escale dans les ports français. Notre équipe assure la coordination entre le navire, les autorités portuaires, les chargeurs et les prestataires locaux 24h/24.",
    ports: ["Dunkerque", "Boulogne-sur-Mer", "Calais", "Rouen", "Bayonne"],
    prestations: [
      "Husbandry & Protective services",
      "Dry and liquid bulk",
      "Liner & Container ship",
      "Breakbulk & Heavy lift",
      "Project cargo",
      "Coordination douanière",
    ],
    data: [
      { k: "Escales traitées / an", v: "800+" },
      { k: "Ports couverts", v: "5 ports français" },
      { k: "Types de navires", v: "Bulk · Liner · Breakbulk · Tanker" },
      { k: "Disponibilité", v: "24h/24 — 7j/7" },
    ],
  },
  {
    id: "charter",
    img: IMGS.charter,
    tag: "Chartering & Tramping",
    title: "Affrètement Tramping",
    stat: "200+",
    statLabel: "Navires / an",
    description: "Affrètement de navires sur les marchés Baltique, Continent, Méditerranée et Mer Noire. Du coaster au Panamax, nous négocions et gérons chaque opération avec la précision d'un partenaire de confiance.",
    ports: ["Baltic", "Continent", "Méditerranée", "Mer Noire"],
    prestations: [
      "Coaster à Panamax vessels",
      "Dry bulk, Breakbulk",
      "Heavy lift & Project cargo",
      "Négociation charter-parties",
      "Suivi opérationnel complet",
      "Propositions créatives d'affrètement",
    ],
    data: [
      { k: "Navires affrétés / an", v: "200+" },
      { k: "Marchés couverts", v: "Baltic · Continent · Med · Black Sea" },
      { k: "Types de navires", v: "Coaster · Handysize · Supramax · Panamax" },
      { k: "Cargaisons", v: "Dry Bulk · Breakbulk · Heavy Lift" },
    ],
  },
  {
    id: "customs",
    img: IMGS.customs,
    tag: "Customs Ship Brokerage",
    title: "Courtage en Douane",
    stat: "1975",
    statLabel: "Année d'enregistrement",
    description: "Courtage en douane maritime, enregistré dans les principaux ports français depuis 1975. Notre staff expérimenté gère l'ensemble des formalités douanières avec dépôt et garantie.",
    ports: ["Dunkerque", "Boulogne-sur-Mer", "Calais", "Rouen", "Le Havre"],
    prestations: [
      "Registered customs broker",
      "Deposit & Garantee",
      "Formalités d'entrée/sortie",
      "Régimes douaniers spéciaux",
      "Staff expérimenté depuis 1975",
      "Assistance en cas de litige",
    ],
    data: [
      { k: "Enregistrement", v: "Depuis 1975" },
      { k: "Ports couverts", v: "Dunkerque · Boulogne · Calais · Rouen · Le Havre" },
      { k: "Régimes", v: "Import · Export · Transit · Entrepôt" },
      { k: "Garantie", v: "Deposit & Garantee inclus" },
    ],
  },
  {
    id: "survey",
    img: IMGS.survey,
    tag: "Maritime Survey",
    title: "Expertise Maritime",
    stat: "P&I",
    statLabel: "Rapports certifiés",
    description: "Expertise maritime complète couvrant le tirant d'eau, les tests d'étanchéité, les expertises de chargement/déchargement et les rapports d'assurance P&I pour armateurs et affréteurs.",
    ports: ["Dunkerque", "Boulogne-sur-Mer", "Calais", "Rouen"],
    prestations: [
      "Draught surveying",
      "Ultrasonic leak test (Hose test)",
      "Loading / unloading follow-up",
      "Consulting breakbulk",
      "On / Off-hire survey",
      "Bunkers & condition survey",
      "Holds cleaning",
      "Insurance / P&I report",
    ],
    data: [
      { k: "Spécialité", v: "Draught · Hose test · On/Off-hire" },
      { k: "Ports couverts", v: "Dunkerque · Boulogne · Calais · Rouen" },
      { k: "Assurance", v: "P&I reports certifiés" },
      { k: "Délai rapport", v: "Sous 48 heures" },
    ],
  },
];

export default function Services() {
  return (
    <div style={{ background: "var(--sonar-abyss)", minHeight: "100vh" }}>

      {/* ── Hero plein fond ── */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: "520px" }}>
        <img src={IMGS.hero} alt="" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center 30%",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, oklch(0.08 0.025 200 / 0.65) 0%, oklch(0.08 0.025 200 / 0.95) 100%)",
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
            <span style={{ display: "inline-block", width: "24px", height: "1px", background: "oklch(0.82 0.18 145)" }} />
            Nos expertises
          </div>
          <h1 style={{
            fontFamily: "'Archivo', sans-serif",
            fontWeight: 900, fontSize: "clamp(3rem, 8vw, 7rem)",
            letterSpacing: "-0.03em", textTransform: "uppercase",
            color: "oklch(0.97 0.005 200)", lineHeight: 0.92,
            marginBottom: "1.5rem",
          }}>
            SHIPPING<br />
            <span style={{ color: "oklch(0.82 0.18 145)" }}>SERVICES</span>
          </h1>
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.80rem", color: "oklch(0.62 0.025 200)",
            lineHeight: 1.7, maxWidth: "520px", marginBottom: "2.5rem",
          }}>
            Agence maritime, affrètement tramping, courtage en douane et expertise maritime —
            une gamme complète de services opérés par des experts reconnus dans les ports français.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1px" }}>
            {[
              { v: "800+", l: "Escales / an" },
              { v: "200+", l: "Navires affrétés" },
              { v: "7 M€", l: "Chiffre d'affaires" },
              { v: "1975", l: "Année de création" },
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

      {/* ── Services : alternance image/contenu ── */}
      {services.map((svc, i) => (
        <section key={svc.id} style={{
          background: i % 2 === 0 ? "var(--sonar-deep)" : "var(--sonar-abyss)",
          padding: "0",
          position: "relative",
          overflow: "hidden",
        }}>
          <div className="container" style={{ padding: "5rem 2rem" }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4rem",
              alignItems: "center",
            }} className="grid-cols-1 lg:grid-cols-2">

              {/* Image */}
              <Reveal dir={i % 2 === 0 ? "left" : "right"} className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div style={{ position: "relative", height: "520px", overflow: "hidden" }}>
                  <img src={svc.img} alt={svc.title} style={{
                    width: "100%", height: "100%", objectFit: "cover",
                    objectPosition: "center 40%",
                  }} />
                  {/* Overlay gradient */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, oklch(0.08 0.025 200 / 0.70) 0%, transparent 50%)",
                  }} />
                  {/* Badge stat */}
                  <div style={{
                    position: "absolute", top: "1.25rem", right: "1.25rem",
                    background: "oklch(0 0 0 / 0.75)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid oklch(1 0 0 / 0.12)",
                    borderTop: "1.5px solid oklch(0.82 0.18 145)",
                    padding: "0.75rem 1rem",
                    textAlign: "center",
                  }}>
                    <div style={{
                      fontFamily: "'Archivo', sans-serif",
                      fontWeight: 900, fontSize: "1.8rem",
                      color: "oklch(0.78 0.14 68)",
                      letterSpacing: "-0.02em", lineHeight: 1,
                    }}>{svc.stat}</div>
                    <div style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "0.55rem", letterSpacing: "0.12em",
                      textTransform: "uppercase", color: "oklch(0.82 0.18 145)",
                      marginTop: "0.2rem",
                    }}>{svc.statLabel}</div>
                  </div>
                  {/* Ports */}
                  <div style={{
                    position: "absolute", bottom: "1.25rem", left: "1.25rem",
                    display: "flex", flexWrap: "wrap", gap: "0.4rem",
                  }}>
                    {svc.ports.map(p => (
                      <span key={p} style={{
                        display: "flex", alignItems: "center", gap: "0.3rem",
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: "0.55rem", letterSpacing: "0.08em",
                        color: "oklch(0.80 0.01 200)",
                        background: "oklch(0 0 0 / 0.60)",
                        backdropFilter: "blur(8px)",
                        padding: "0.2rem 0.5rem",
                        border: "1px solid oklch(1 0 0 / 0.10)",
                      }}>
                        <MapPin size={8} style={{ color: "oklch(0.82 0.18 145)" }} />
                        {p}
                      </span>
                    ))}
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
                    {svc.tag}
                  </div>
                  <h2 style={{
                    fontFamily: "'Archivo', sans-serif",
                    fontWeight: 900, fontSize: "clamp(2rem, 3.5vw, 3rem)",
                    letterSpacing: "-0.025em", textTransform: "uppercase",
                    color: "oklch(0.97 0.005 200)", lineHeight: 0.95,
                    marginBottom: "1.25rem",
                  }}>{svc.title}</h2>
                  <p style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.75rem", color: "oklch(0.58 0.025 200)",
                    lineHeight: 1.75, marginBottom: "1.75rem",
                  }}>{svc.description}</p>

                  {/* Data HUD */}
                  <div style={{
                    border: "1px solid oklch(1 0 0 / 0.08)",
                    borderTop: "1.5px solid oklch(0.82 0.18 145 / 0.40)",
                    padding: "1rem",
                    marginBottom: "1.5rem",
                    background: "oklch(1 0 0 / 0.02)",
                  }}>
                    {svc.data.map(({ k, v }) => (
                      <div key={k} style={{
                        display: "flex", justifyContent: "space-between",
                        alignItems: "center", padding: "0.45rem 0",
                        borderBottom: "1px solid oklch(1 0 0 / 0.05)",
                      }}>
                        <span style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: "0.60rem", letterSpacing: "0.08em",
                          textTransform: "uppercase", color: "oklch(0.42 0.025 200)",
                        }}>{k}</span>
                        <span style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: "0.65rem", fontWeight: 500,
                          color: "oklch(0.82 0.18 145)",
                        }}>{v}</span>
                      </div>
                    ))}
                  </div>

                  {/* Prestations */}
                  <div style={{ marginBottom: "1.75rem" }}>
                    <div style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "0.58rem", letterSpacing: "0.12em",
                      textTransform: "uppercase", color: "oklch(0.45 0.025 200)",
                      marginBottom: "0.75rem",
                    }}>Prestations incluses</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem" }}>
                      {svc.prestations.map(p => (
                        <div key={p} style={{
                          display: "flex", alignItems: "flex-start", gap: "0.4rem",
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: "0.62rem", color: "oklch(0.60 0.025 200)",
                        }}>
                          <ChevronRight size={10} style={{ marginTop: "1px", flexShrink: 0, color: "oklch(0.82 0.18 145)" }} />
                          {p}
                        </div>
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
                    Demander un devis <ArrowRight size={12} />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      {/* ── CTA Final ── */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: "320px" }}>
        <img src={IMGS.hero} alt="" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center 60%",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, oklch(0.08 0.025 200 / 0.96) 0%, oklch(0.08 0.025 200 / 0.85) 100%)",
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
                UN PROJET D'AFFRÈTEMENT<br />
                <span style={{ color: "oklch(0.82 0.18 145)" }}>OU D'AGENCE MARITIME ?</span>
              </h2>
              <p style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.72rem", color: "oklch(0.55 0.025 200)",
                lineHeight: 1.7, marginTop: "1rem", maxWidth: "420px",
              }}>
                Contactez notre équipe commerciale pour un devis personnalisé sous 24 heures.
              </p>
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
