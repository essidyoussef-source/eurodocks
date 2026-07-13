/**
 * Port Terminal — Euro Docks Service
 * DA : Maritime Prestige — Ivoire chaud, navy profond, or ambre
 * Typographie : Cormorant Garamond (display) + Inter (corps)
 */

import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, MapPin, Anchor } from "lucide-react";

const IMG_HERO     = "/manus-storage/sonar_s3_crane_f6a7b8c9.jpg";
const IMG_BOULOGNE = "/manus-storage/sonar_s3_quay_e4f5a6b7.jpg";
const IMG_ROUEN    = "/manus-storage/sonar_s2_grain_6e5d0efe.jpg";
const IMG_SHIP     = "/manus-storage/sonar_s1_wide_4e87cc79.jpg";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function RevealBlock({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useReveal();
  return <div ref={ref} className="eds-reveal" style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

const PORTS = [
  {
    name: "Boulogne-sur-Mer",
    subtitle: "Terminal Vrac Principal",
    img: IMG_BOULOGNE,
    stats: [
      { v: "800 m", l: "Longueur de quai" },
      { v: "77 500 m²", l: "Superficie stockage" },
      { v: "12 m", l: "Tirant d'eau max" },
      { v: "24h/24", l: "Opérations" },
    ],
    desc: "Le terminal de Boulogne-sur-Mer est notre infrastructure principale. Avec 800 mètres de quai et 77 500 m² de surface de stockage, il est spécialisé dans la réception et l'expédition de vrac sec : céréales, engrais, acier et produits agro-industriels.",
    services: [
      "Réception et expédition vrac sec",
      "Stockage en silos et entrepôts",
      "Pesage et échantillonnage",
      "Chargement de navires",
      "Connexion ferroviaire directe",
      "Contrôle phytosanitaire",
    ],
    cargos: ["Céréales", "Engrais", "Acier", "Agrobulk"],
  },
  {
    name: "Rouen",
    subtitle: "Terminal Céréales & Agrobulk",
    img: IMG_ROUEN,
    stats: [
      { v: "3,6 Mt", l: "Capacité annuelle" },
      { v: "11,5 m", l: "Tirant d'eau max" },
      { v: "1er", l: "Port céréalier France" },
      { v: "GMP+", l: "Certification" },
    ],
    desc: "Le port de Rouen est le premier port céréalier de France. Notre présence sur ce terminal stratégique nous permet d'assurer le chargement de navires Panamax et Supramax pour les exportations de céréales françaises vers les marchés Baltique, Méditerranée et Mer Noire.",
    services: [
      "Chargement navires Panamax",
      "Exportation céréales françaises",
      "Coordination avec silos portuaires",
      "Gestion des files d'attente",
      "Expertise draught survey",
      "Coordination douanière",
    ],
    cargos: ["Blé tendre", "Orge", "Maïs", "Colza"],
  },
];

const ALL_PORTS = [
  { name: "Dunkerque", role: "Port principal", detail: "Tirant d'eau : 17,5 m — Panamax & Capesize" },
  { name: "Boulogne-sur-Mer", role: "Terminal vrac", detail: "800 m quai — 77 500 m² stockage" },
  { name: "Rouen", role: "Céréales & agrobulk", detail: "3,6 Mt/an — 1er port céréalier France" },
  { name: "Bayonne", role: "Engrais & chimie", detail: "Spécialité liquides & engrais" },
  { name: "Calais", role: "Transit multimodal", detail: "Ro-Ro, conteneurs & breakbulk" },
];

export default function Terminal() {
  return (
    <div style={{ background: "var(--eds-ivory)" }}>

      {/* ── HERO ── */}
      <section style={{
        position: "relative", height: "65vh", minHeight: "480px",
        overflow: "hidden", display: "flex", alignItems: "flex-end",
        paddingBottom: "5rem", paddingTop: "94px",
      }}>
        <img src={IMG_HERO} alt="Port Terminal" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, oklch(0.10 0.03 240 / 0.92) 0%, oklch(0.10 0.03 240 / 0.5) 55%, oklch(0.10 0.03 240 / 0.2) 100%)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, oklch(0.10 0.03 240 / 0.7) 0%, transparent 60%)",
        }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: "1400px", margin: "0 auto", padding: "0 2.5rem", width: "100%" }}>
          <div className="eds-gold-rule">
            <span className="eds-label" style={{ color: "var(--eds-gold)" }}>Infrastructure</span>
          </div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 700, fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
            letterSpacing: "-0.03em", lineHeight: 1.0,
            color: "var(--eds-white)", marginBottom: "1rem",
          }}>
            Terminaux<br />
            <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--eds-gold)" }}>
              portuaires.
            </span>
          </h1>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1rem", lineHeight: 1.7,
            color: "oklch(1 0 0 / 0.65)", maxWidth: "480px",
          }}>
            Présence opérationnelle sur 5 ports français. Infrastructures dédiées au vrac sec, aux céréales et aux produits agro-industriels.
          </p>
        </div>
      </section>

      {/* ── RÉSEAU DES PORTS ── */}
      <section style={{ padding: "5rem 0", background: "var(--eds-cream)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2.5rem" }}>
          <RevealBlock>
            <div className="eds-gold-rule"><span className="eds-label">Réseau portuaire</span></div>
            <h2 className="eds-h2" style={{ marginBottom: "3rem" }}>
              5 ports<br />
              <span style={{ fontStyle: "italic", fontWeight: 300 }}>de présence.</span>
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "0" }} className="grid-cols-2 lg:grid-cols-5">
              {ALL_PORTS.map(({ name, role, detail }, i) => (
                <div key={i} style={{
                  padding: "2rem 1.5rem",
                  borderRight: i < 4 ? "1px solid var(--border)" : "none",
                  borderLeft: i === 0 ? "3px solid var(--eds-gold)" : "none",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.75rem" }}>
                    <MapPin size={14} color="var(--eds-gold)" />
                    <span style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontWeight: 700, fontSize: "1.05rem",
                      color: "var(--eds-navy)",
                    }}>{name}</span>
                  </div>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.7rem", fontWeight: 600,
                    textTransform: "uppercase", letterSpacing: "0.08em",
                    color: "var(--eds-gold)", marginBottom: "0.5rem",
                  }}>{role}</div>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.78rem", lineHeight: 1.6,
                    color: "var(--eds-steel)",
                  }}>{detail}</p>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── TERMINAUX DÉTAILLÉS ── */}
      {PORTS.map((port, i) => {
        const isEven = i % 2 === 0;
        return (
          <section key={i} style={{
            background: isEven ? "var(--eds-ivory)" : "var(--eds-cream)",
            overflow: "hidden",
          }}>
            <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
              <RevealBlock>
                <div style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr",
                  minHeight: "560px",
                }} className="grid-cols-1 lg:grid-cols-2">

                  {/* Image */}
                  <div style={{ order: isEven ? 1 : 2, position: "relative", minHeight: "400px" }}>
                    <img src={port.img} alt={port.name} style={{
                      position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
                    }} />
                    {/* Stats overlay */}
                    <div style={{
                      position: "absolute", bottom: 0, left: 0, right: 0,
                      background: "linear-gradient(to top, oklch(0.10 0.03 240 / 0.95) 0%, transparent 100%)",
                      padding: "2rem",
                    }}>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0" }}>
                        {port.stats.map(({ v, l }, j) => (
                          <div key={j} style={{
                            padding: "0.75rem 0.5rem",
                            borderRight: j < 3 ? "1px solid oklch(1 0 0 / 0.15)" : "none",
                            textAlign: "center",
                          }}>
                            <div style={{
                              fontFamily: "'Cormorant Garamond', Georgia, serif",
                              fontWeight: 700, fontSize: "1.3rem",
                              color: "var(--eds-gold)", lineHeight: 1,
                            }}>{v}</div>
                            <div style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: "0.55rem", letterSpacing: "0.08em",
                              textTransform: "uppercase", color: "oklch(1 0 0 / 0.5)",
                              marginTop: "0.25rem",
                            }}>{l}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Contenu */}
                  <div style={{
                    order: isEven ? 2 : 1,
                    padding: "4rem 3.5rem",
                    display: "flex", flexDirection: "column", justifyContent: "center",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                      <Anchor size={16} color="var(--eds-gold)" />
                      <span style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.65rem", letterSpacing: "0.18em",
                        textTransform: "uppercase", color: "var(--eds-gold)",
                      }}>{port.subtitle}</span>
                    </div>
                    <h2 style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontWeight: 600, fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                      letterSpacing: "-0.02em", lineHeight: 1.1,
                      color: "var(--eds-navy)", marginBottom: "1.25rem",
                    }}>{port.name}</h2>
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.95rem", lineHeight: 1.75,
                      color: "var(--eds-steel)", marginBottom: "2rem",
                    }}>{port.desc}</p>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem 1.5rem", marginBottom: "2rem" }}>
                      {port.services.map((s, j) => (
                        <div key={j} style={{
                          display: "flex", alignItems: "center", gap: "0.5rem",
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.82rem", color: "var(--eds-steel)",
                        }}>
                          <span style={{ width: "16px", height: "1px", background: "var(--eds-gold)", flexShrink: 0 }} />
                          {s}
                        </div>
                      ))}
                    </div>

                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                      {port.cargos.map((c, j) => (
                        <span key={j} style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.7rem", letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "var(--eds-navy)",
                          border: "1px solid var(--eds-navy)",
                          padding: "0.3rem 0.75rem",
                        }}>{c}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </RevealBlock>
            </div>
          </section>
        );
      })}

      {/* ── CHIFFRES CLÉS ── */}
      <section style={{ padding: "6rem 0", background: "var(--eds-navy)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2.5rem" }}>
          <RevealBlock>
            <div className="eds-gold-rule">
              <span className="eds-label" style={{ color: "var(--eds-gold)" }}>Performance</span>
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 600, fontSize: "clamp(2rem, 4vw, 3.5rem)",
              letterSpacing: "-0.03em", lineHeight: 1.05,
              color: "var(--eds-white)", marginBottom: "3rem",
            }}>
              Nos terminaux<br />
              <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--eds-gold)" }}>en chiffres.</span>
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0" }} className="grid-cols-2 lg:grid-cols-4">
              {[
                { v: "5,6 Mt", l: "Vrac traité / an", sub: "Boulogne + Rouen" },
                { v: "800 m", l: "Linéaire de quai", sub: "Terminal Boulogne" },
                { v: "77 500", l: "m² de stockage", sub: "Entrepôts couverts" },
                { v: "17,5 m", l: "Tirant d'eau max", sub: "Port de Dunkerque" },
              ].map(({ v, l, sub }, i) => (
                <div key={i} style={{
                  padding: "2.5rem 2rem",
                  borderRight: i < 3 ? "1px solid oklch(1 0 0 / 0.08)" : "none",
                  borderLeft: i === 0 ? "3px solid var(--eds-gold)" : "none",
                }}>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontWeight: 700, fontSize: "2.5rem",
                    color: "var(--eds-gold)", lineHeight: 1, letterSpacing: "-0.03em",
                  }}>{v}</div>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.72rem", fontWeight: 600,
                    letterSpacing: "0.08em", textTransform: "uppercase",
                    color: "var(--eds-white)", marginTop: "0.5rem",
                  }}>{l}</div>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.72rem", color: "oklch(1 0 0 / 0.4)",
                    marginTop: "0.2rem",
                  }}>{sub}</div>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        position: "relative", overflow: "hidden",
        minHeight: "360px", display: "flex", alignItems: "center",
      }}>
        <img src={IMG_SHIP} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, oklch(0.10 0.03 240 / 0.95) 0%, oklch(0.10 0.03 240 / 0.65) 60%, transparent 100%)",
        }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1400px", margin: "0 auto", padding: "5rem 2.5rem" }}>
          <RevealBlock>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3.5rem)",
              letterSpacing: "-0.03em", lineHeight: 1.05,
              color: "var(--eds-white)", maxWidth: "500px", marginBottom: "2rem",
            }}>
              Besoin d'un terminal ?<br />
              <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--eds-gold)" }}>Contactez-nous.</span>
            </h2>
            <Link href="/contact" className="eds-btn eds-btn-gold">
              Demander un devis <ArrowRight size={15} />
            </Link>
          </RevealBlock>
        </div>
      </section>
    </div>
  );
}
