/**
 * À propos — Euro Docks Service
 * DA : Maritime Prestige — Ivoire chaud, navy profond, or ambre
 * Typographie : Cormorant Garamond (display) + Inter (corps)
 */

import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const IMG_HERO  = "/manus-storage/sonar_s1_wide_4e87cc79.jpg";
const IMG_PORT  = "/manus-storage/sonar_s3_quay_e4f5a6b7.jpg";
const IMG_SHIP  = "/manus-storage/sonar_s1_close_a1f7b2e8.jpg";
const IMG_GRAIN = "/manus-storage/sonar_s2_grain_6e5d0efe.jpg";
const IMG_CRANE = "/manus-storage/sonar_s3_crane_f6a7b8c9.jpg";

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

const TIMELINE = [
  { year: "1975", event: "Fondation d'Euro Docks Service à Boulogne-sur-Mer. Premiers contrats d'agence maritime dans le secteur du tramping." },
  { year: "1985", event: "Développement de l'activité de consignation de navires. Ouverture du bureau de Dunkerque. 50 navires traités par an." },
  { year: "1995", event: "Obtention de la certification GMP+ pour le transport de matières premières agro-alimentaires. Expansion vers Rouen." },
  { year: "2005", event: "Lancement du département Freight Forwarding multimodal. Partenariats avec les principaux négociants en céréales européens." },
  { year: "2015", event: "200 navires traités par an. Couverture assurance portée à 9,5 M€. Certification AEO (Opérateur Économique Agréé)." },
  { year: "2024", event: "800 escales gérées. 5 ports d'opération. Présence sur les marchés Baltique, Méditerranée, Mer Noire et Atlantique." },
];

const VALEURS = [
  { titre: "Expertise technique", desc: "50 ans de présence dans le tramping et le vrac sec. Une connaissance intime des marchés céréaliers, des conventions maritimes et des opérations portuaires." },
  { titre: "Réactivité opérationnelle", desc: "Disponibilité 24h/24, 7j/7. Les opérations maritimes ne s'arrêtent pas — nos équipes non plus. Réponse garantie en moins de 2 heures." },
  { titre: "Intégrité commerciale", desc: "Transparence totale sur les coûts, les délais et les risques. Nos clients armateurs et affréteurs nous font confiance depuis des décennies." },
  { titre: "Réseau mondial", desc: "Correspondants dans 40 ports. Partenariats avec les principaux P&I clubs, courtiers et négociants. Un réseau construit sur 50 ans de relations." },
];

export default function About() {
  return (
    <div style={{ background: "var(--eds-ivory)" }}>

      {/* ── HERO ── */}
      <section style={{
        position: "relative", height: "70vh", minHeight: "520px",
        overflow: "hidden", display: "flex", alignItems: "flex-end",
        paddingBottom: "5rem", paddingTop: "94px",
      }}>
        <img src={IMG_HERO} alt="Euro Docks Service" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, oklch(0.10 0.03 240 / 0.95) 0%, oklch(0.10 0.03 240 / 0.5) 55%, oklch(0.10 0.03 240 / 0.15) 100%)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, oklch(0.10 0.03 240 / 0.75) 0%, transparent 55%)",
        }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: "1400px", margin: "0 auto", padding: "0 2.5rem", width: "100%" }}>
          <div className="eds-gold-rule">
            <span className="eds-label" style={{ color: "var(--eds-gold)" }}>Notre histoire</span>
          </div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 700, fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
            letterSpacing: "-0.03em", lineHeight: 1.0,
            color: "var(--eds-white)", marginBottom: "1rem",
          }}>
            50 ans au service<br />
            <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--eds-gold)" }}>
              des mers du monde.
            </span>
          </h1>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1rem", lineHeight: 1.7,
            color: "oklch(1 0 0 / 0.65)", maxWidth: "480px",
          }}>
            Fondée en 1975 à Boulogne-sur-Mer, Euro Docks Service est l'une des agences maritimes indépendantes les plus expérimentées du littoral français.
          </p>
        </div>
      </section>

      {/* ── CHIFFRES CLÉS ── */}
      <section style={{ padding: "0", background: "var(--eds-navy)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0" }} className="grid-cols-2 lg:grid-cols-4">
            {[
              { v: "1975", l: "Année de fondation" },
              { v: "800+", l: "Escales / an" },
              { v: "50 ans", l: "D'expertise maritime" },
              { v: "5", l: "Ports d'opération" },
            ].map(({ v, l }, i) => (
              <div key={i} style={{
                padding: "3rem 2rem",
                borderRight: i < 3 ? "1px solid oklch(1 0 0 / 0.08)" : "none",
                borderLeft: i === 0 ? "3px solid var(--eds-gold)" : "none",
              }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontWeight: 700, fontSize: "3rem",
                  color: "var(--eds-gold)", lineHeight: 1, letterSpacing: "-0.03em",
                }}>{v}</div>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.72rem", fontWeight: 500,
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  color: "oklch(1 0 0 / 0.5)", marginTop: "0.5rem",
                }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION + PHOTOS ── */}
      <section style={{ overflow: "hidden", background: "var(--eds-cream)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <RevealBlock>
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr",
              minHeight: "560px",
            }} className="grid-cols-1 lg:grid-cols-2">
              {/* Texte */}
              <div style={{ padding: "5rem 3.5rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div className="eds-gold-rule"><span className="eds-label">Notre mission</span></div>
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontWeight: 600, fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                  letterSpacing: "-0.02em", lineHeight: 1.1,
                  color: "var(--eds-navy)", marginBottom: "1.5rem",
                }}>
                  L'opérateur de confiance<br />
                  <span style={{ fontStyle: "italic", fontWeight: 300 }}>des ports français.</span>
                </h2>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.95rem", lineHeight: 1.8,
                  color: "var(--eds-steel)", marginBottom: "1.5rem",
                }}>
                  Euro Docks Service a été fondée avec une conviction simple : les armateurs et les affréteurs méritent un partenaire qui connaît les ports français aussi bien qu'eux connaissent leurs navires.
                </p>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.95rem", lineHeight: 1.8,
                  color: "var(--eds-steel)", marginBottom: "2rem",
                }}>
                  Depuis 1975, nous avons construit notre réputation sur la réactivité, la précision technique et la capacité à résoudre les problèmes opérationnels les plus complexes.
                </p>
                <blockquote style={{
                  borderLeft: "3px solid var(--eds-gold)",
                  paddingLeft: "1.5rem",
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontStyle: "italic", fontSize: "1.15rem",
                  color: "var(--eds-navy)", lineHeight: 1.6,
                }}>
                  "Dans le tramping, la réactivité n'est pas un avantage concurrentiel. C'est la condition de survie."
                </blockquote>
              </div>
              {/* Grille photos */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr" }}>
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <img src={IMG_SHIP} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                <div style={{ position: "relative", overflow: "hidden", marginTop: "2rem" }}>
                  <img src={IMG_CRANE} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <img src={IMG_GRAIN} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                <div style={{ position: "relative", overflow: "hidden", marginTop: "-2rem" }}>
                  <img src={IMG_PORT} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── CITATION DIRECTEUR ── */}
      <section style={{ position: "relative", overflow: "hidden", padding: "6rem 0" }}>
        <img src={IMG_PORT} alt="" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
        }} />
        <div style={{ position: "absolute", inset: 0, background: "oklch(0.10 0.03 240 / 0.88)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1400px", margin: "0 auto", padding: "0 2.5rem" }}>
          <RevealBlock>
            <div style={{ maxWidth: "780px" }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "5rem", lineHeight: 0.7,
                color: "var(--eds-gold)", marginBottom: "1.5rem", fontWeight: 300,
              }}>"</div>
              <blockquote style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 400, fontStyle: "italic",
                fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)",
                lineHeight: 1.45, letterSpacing: "-0.01em",
                color: "var(--eds-white)", marginBottom: "2rem",
              }}>
                Dans le tramping, il n'y a pas de place pour l'approximation. Chaque escale est une opération unique, chaque cargaison a ses contraintes propres. Notre métier, c'est de transformer cette complexité en certitude pour nos clients.
              </blockquote>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.8rem", letterSpacing: "0.12em",
                textTransform: "uppercase", color: "var(--eds-gold)",
              }}>Direction Générale — Euro Docks Service</div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section style={{ padding: "6rem 0", background: "var(--eds-cream)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2.5rem" }}>
          <RevealBlock>
            <div className="eds-gold-rule"><span className="eds-label">Chronologie</span></div>
            <h2 className="eds-h2" style={{ marginBottom: "4rem" }}>
              50 ans<br />
              <span style={{ fontStyle: "italic", fontWeight: 300 }}>d'histoire maritime.</span>
            </h2>
          </RevealBlock>
          <div style={{ position: "relative" }}>
            <div style={{
              position: "absolute", left: "120px", top: 0, bottom: 0,
              width: "1px", background: "var(--border)",
            }} />
            {TIMELINE.map(({ year, event }, i) => (
              <RevealBlock key={i} delay={i * 80}>
                <div style={{
                  display: "grid", gridTemplateColumns: "120px 1fr",
                  gap: "3rem", paddingBottom: "2.5rem", alignItems: "start",
                }}>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontWeight: 700, fontSize: "1.5rem",
                    color: "var(--eds-gold)", textAlign: "right",
                    paddingRight: "2rem", paddingTop: "0.1rem",
                    position: "relative",
                  }}>
                    {year}
                    <div style={{
                      position: "absolute", right: "-5px", top: "8px",
                      width: "9px", height: "9px",
                      background: "var(--eds-gold)", borderRadius: "50%",
                    }} />
                  </div>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.92rem", lineHeight: 1.75,
                    color: "var(--eds-steel)", paddingLeft: "1.5rem",
                  }}>{event}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALEURS ── */}
      <section style={{ padding: "6rem 0", background: "var(--eds-ivory)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2.5rem" }}>
          <RevealBlock>
            <div className="eds-gold-rule"><span className="eds-label">Valeurs</span></div>
            <h2 className="eds-h2" style={{ marginBottom: "3rem" }}>
              Ce qui nous<br />
              <span style={{ fontStyle: "italic", fontWeight: 300 }}>distingue.</span>
            </h2>
          </RevealBlock>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0" }} className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {VALEURS.map(({ titre, desc }, i) => (
              <RevealBlock key={i} delay={i * 80}>
                <div style={{
                  padding: "2.5rem 2rem",
                  borderRight: i < 3 ? "1px solid var(--border)" : "none",
                  borderLeft: i === 0 ? "3px solid var(--eds-gold)" : "none",
                  height: "100%",
                }}>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontWeight: 600, fontSize: "1.25rem",
                    color: "var(--eds-navy)", marginBottom: "1rem",
                    letterSpacing: "-0.01em",
                  }}>{titre}</div>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.85rem", lineHeight: 1.75,
                    color: "var(--eds-steel)",
                  }}>{desc}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── IMAGE PLEIN FOND ── */}
      <section style={{ position: "relative", height: "50vh", minHeight: "360px", overflow: "hidden" }}>
        <img src={IMG_GRAIN} alt="" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
        }} />
        <div style={{ position: "absolute", inset: 0, background: "oklch(0.10 0.03 240 / 0.5)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <RevealBlock>
            <div style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 300, fontStyle: "italic",
                fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                color: "var(--eds-white)", letterSpacing: "-0.02em",
              }}>
                "L'excellence dans chaque escale,<br />la précision dans chaque cargaison."
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "6rem 0", background: "var(--eds-navy)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2.5rem" }}>
          <RevealBlock>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "4rem", alignItems: "center" }} className="grid-cols-1 lg:grid-cols-2">
              <div>
                <div className="eds-gold-rule">
                  <span className="eds-label" style={{ color: "var(--eds-gold)" }}>Contact</span>
                </div>
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  letterSpacing: "-0.03em", lineHeight: 1.05,
                  color: "var(--eds-white)",
                }}>
                  Travaillons<br />
                  <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--eds-gold)" }}>ensemble.</span>
                </h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <Link href="/contact" className="eds-btn eds-btn-gold">
                  Nous contacter <ArrowRight size={15} />
                </Link>
                <Link href="/services" className="eds-btn eds-btn-outline" style={{ color: "var(--eds-white)", borderColor: "oklch(1 0 0 / 0.3)" }}>
                  Nos services <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>
    </div>
  );
}
