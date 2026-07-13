/**
 * Freight Forwarding — Euro Docks Service
 * DA : Maritime Prestige — Ivoire chaud, navy profond, or ambre
 * Typographie : Cormorant Garamond (display) + Inter (corps)
 */

import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, Truck, Ship, Train, CheckCircle } from "lucide-react";

const IMG_HERO   = "/manus-storage/sonar_s3_quay_e4f5a6b7.jpg";
const IMG_GRAIN  = "/manus-storage/sonar_s2_grain_6e5d0efe.jpg";
const IMG_PORT   = "/manus-storage/sonar_s3_crane_f6a7b8c9.jpg";
const IMG_SHIP   = "/manus-storage/sonar_s1_close_a1f7b2e8.jpg";

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

const MODES = [
  {
    icon: Ship,
    title: "Maritime",
    sub: "FCL / LCL / Vrac",
    desc: "Affrètement de navires entiers ou groupage maritime. Spécialité dry bulk : céréales, engrais, acier, project cargo. Couverture mondiale avec partenaires certifiés.",
    img: IMG_SHIP,
    items: ["Full Container Load (FCL)", "Less Container Load (LCL)", "Vrac sec (dry bulk)", "Breakbulk & project cargo", "Tramping & voyage charter", "Connaissements (B/L)"],
  },
  {
    icon: Truck,
    title: "Routier",
    sub: "FTL / LTL / Multimodal",
    desc: "Transport routier national et international. Camions complets ou groupage. Connexion directe avec les terminaux portuaires de Boulogne, Dunkerque et Rouen.",
    img: IMG_PORT,
    items: ["Full Truck Load (FTL)", "Less Truck Load (LTL)", "Groupage national & international", "Connexion terminaux portuaires", "Température dirigée", "Matières dangereuses ADR"],
  },
  {
    icon: Train,
    title: "Ferroviaire",
    sub: "Rail & Multimodal",
    desc: "Solutions ferroviaires pour les grands volumes. Connexion directe aux terminaux portuaires de Rouen, Dunkerque et Calais via Eurotunnel.",
    img: IMG_GRAIN,
    items: ["Wagons complets", "Trains entiers", "Connexion terminaux portuaires", "Axe Nord-Sud France", "Eurotunnel international", "Céréales & minerais"],
  },
];

const CERTIFICATIONS = [
  { code: "GMP+", name: "Good Manufacturing Practice", desc: "Transport et stockage de matières premières pour l'alimentation animale" },
  { code: "OVAM", name: "Certification Environnementale", desc: "Gestion des déchets et matières recyclables en Belgique" },
  { code: "NIWO", name: "Transport International Routier", desc: "Licence de transport routier international — Pays-Bas" },
  { code: "AEO", name: "Opérateur Économique Agréé", desc: "Statut douanier européen de confiance" },
  { code: "IBG", name: "Inland Barge Group", desc: "Certification voies navigables intérieures européennes" },
];

const SPECIALITES = [
  { v: "Céréales", detail: "Blé, maïs, orge, colza — spécialité grains depuis 1975" },
  { v: "Engrais", detail: "Urée, DAP, MAP, potasse — manutention certifiée GMP+" },
  { v: "Acier", detail: "Bobines, barres, profilés — breakbulk & project cargo" },
  { v: "Agrobulk", detail: "Tourteaux, pulpes, mélasses — vrac alimentaire certifié" },
];

export default function Freight() {
  return (
    <div style={{ background: "var(--eds-ivory)" }}>

      {/* ── HERO ── */}
      <section style={{
        position: "relative", height: "65vh", minHeight: "480px",
        overflow: "hidden", display: "flex", alignItems: "flex-end",
        paddingBottom: "5rem", paddingTop: "94px",
      }}>
        <img src={IMG_HERO} alt="Freight Forwarding" style={{
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
            <span className="eds-label" style={{ color: "var(--eds-gold)" }}>Logistique</span>
          </div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 700, fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
            letterSpacing: "-0.03em", lineHeight: 1.0,
            color: "var(--eds-white)", marginBottom: "1rem",
          }}>
            Freight Forwarding<br />
            <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--eds-gold)" }}>
              & Transit douanier.
            </span>
          </h1>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1rem", lineHeight: 1.7,
            color: "oklch(1 0 0 / 0.65)", maxWidth: "480px",
          }}>
            Organisation du transport multimodal de bout en bout. Mer, route, rail. Commissionnaire agréé en douane depuis 1975.
          </p>
        </div>
      </section>

      {/* ── SPÉCIALITÉS CARGAISON ── */}
      <section style={{ padding: "5rem 0", background: "var(--eds-navy)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2.5rem" }}>
          <RevealBlock>
            <div className="eds-gold-rule">
              <span className="eds-label" style={{ color: "var(--eds-gold)" }}>Cargaisons</span>
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 600, fontSize: "clamp(2rem, 4vw, 3.5rem)",
              letterSpacing: "-0.03em", lineHeight: 1.05,
              color: "var(--eds-white)", marginBottom: "3rem",
            }}>
              Nos spécialités<br />
              <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--eds-gold)" }}>cargaison.</span>
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0" }} className="grid-cols-2 lg:grid-cols-4">
              {SPECIALITES.map(({ v, detail }, i) => (
                <div key={i} style={{
                  padding: "2.5rem 2rem",
                  borderRight: i < 3 ? "1px solid oklch(1 0 0 / 0.08)" : "none",
                  borderLeft: i === 0 ? "3px solid var(--eds-gold)" : "none",
                }}>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontWeight: 700, fontSize: "1.8rem",
                    color: "var(--eds-gold)", marginBottom: "0.75rem",
                  }}>{v}</div>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.82rem", lineHeight: 1.6,
                    color: "oklch(1 0 0 / 0.5)",
                  }}>{detail}</p>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── MODES DE TRANSPORT ── */}
      {MODES.map((m, i) => {
        const Icon = m.icon;
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
                  minHeight: "480px",
                }} className="grid-cols-1 lg:grid-cols-2">

                  {/* Image */}
                  <div style={{ order: isEven ? 1 : 2, position: "relative", minHeight: "380px" }}>
                    <img src={m.img} alt={m.title} style={{
                      position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
                    }} />
                    <div style={{
                      position: "absolute",
                      bottom: "2rem", [isEven ? "right" : "left"]: "2rem",
                      background: "var(--eds-navy)", padding: "1rem 1.5rem",
                      borderLeft: "3px solid var(--eds-gold)",
                    }}>
                      <div style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.6rem", letterSpacing: "0.15em",
                        textTransform: "uppercase", color: "var(--eds-gold)",
                      }}>{m.sub}</div>
                    </div>
                  </div>

                  {/* Contenu */}
                  <div style={{
                    order: isEven ? 2 : 1,
                    padding: "4rem 3.5rem",
                    display: "flex", flexDirection: "column", justifyContent: "center",
                  }}>
                    <div style={{
                      width: "44px", height: "44px",
                      background: "var(--eds-gold)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      marginBottom: "1.5rem",
                    }}>
                      <Icon size={20} color="var(--eds-navy)" />
                    </div>
                    <h2 style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontWeight: 600, fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                      letterSpacing: "-0.02em", lineHeight: 1.1,
                      color: "var(--eds-navy)", marginBottom: "1.25rem",
                    }}>Transport {m.title}</h2>
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.95rem", lineHeight: 1.75,
                      color: "var(--eds-steel)", marginBottom: "2rem",
                    }}>{m.desc}</p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem 1.5rem" }}>
                      {m.items.map((item, j) => (
                        <div key={j} style={{
                          display: "flex", alignItems: "center", gap: "0.5rem",
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.82rem", color: "var(--eds-steel)",
                        }}>
                          <CheckCircle size={13} color="var(--eds-gold)" style={{ flexShrink: 0 }} />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </RevealBlock>
            </div>
          </section>
        );
      })}

      {/* ── CERTIFICATIONS ── */}
      <section style={{ padding: "6rem 0", background: "var(--eds-cream)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2.5rem" }}>
          <RevealBlock>
            <div className="eds-gold-rule"><span className="eds-label">Qualité</span></div>
            <h2 className="eds-h2" style={{ marginBottom: "3rem" }}>
              Certifications<br />
              <span style={{ fontStyle: "italic", fontWeight: 300 }}>& accréditations.</span>
            </h2>
          </RevealBlock>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "0" }} className="grid-cols-2 lg:grid-cols-5">
            {CERTIFICATIONS.map(({ code, name, desc }, i) => (
              <RevealBlock key={i} delay={i * 80}>
                <div style={{
                  padding: "2rem 1.5rem",
                  borderRight: i < 4 ? "1px solid var(--border)" : "none",
                  height: "100%",
                }}>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontWeight: 700, fontSize: "1.6rem",
                    color: "var(--eds-navy)", marginBottom: "0.5rem",
                    letterSpacing: "-0.02em",
                  }}>{code}</div>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.72rem", fontWeight: 600,
                    color: "var(--eds-navy)", marginBottom: "0.5rem",
                    textTransform: "uppercase", letterSpacing: "0.05em",
                  }}>{name}</div>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.78rem", lineHeight: 1.6,
                    color: "var(--eds-steel)",
                  }}>{desc}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        position: "relative", overflow: "hidden",
        minHeight: "360px", display: "flex", alignItems: "center",
      }}>
        <img src={IMG_HERO} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
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
              Un projet de transport ?<br />
              <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--eds-gold)" }}>Parlons-en.</span>
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
