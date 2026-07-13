/**
 * Services — Euro Docks Service
 * DA : Maritime Prestige — Ivoire chaud, navy profond, or ambre
 */

import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, Anchor, Ship, FileText, Scale, Search, Package } from "lucide-react";

const IMG_HERO    = "/manus-storage/sonar_s1_wide_4e87cc79.jpg";
const IMG_AGENCY  = "/manus-storage/sonar_s3_quay_e4f5a6b7.jpg";
const IMG_CHARTER = "/manus-storage/sonar_s1_close_a1f7b2e8.jpg";
const IMG_SURVEY  = "/manus-storage/sonar_s2_hatch_684a13c3.jpg";
const IMG_CUSTOMS = "/manus-storage/sonar_s2_grain_6e5d0efe.jpg";
const IMG_GRAIN   = "/manus-storage/eds2_tramping_sea_a2b3c4d5.jpg";
const IMG_PORT    = "/manus-storage/sonar_s3_crane_f6a7b8c9.jpg";

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
  return (
    <div ref={ref} className="eds-reveal" style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

const SERVICES = [
  {
    icon: Anchor,
    title: "Agence Maritime",
    subtitle: "Ship Agency",
    desc: "Représentation complète du navire et de l'armateur en escale. Coordination avec les autorités portuaires, pilotes, terminaux et services douaniers. Disponibles 24h/24, 7j/7.",
    details: [
      "Coordination portuaire 24h/24",
      "Formalités d'escale",
      "Ravitaillement soutes & vivres",
      "Assistance à l'équipage",
      "Documents de bord",
      "Suivi opérations cargo",
    ],
    img: IMG_AGENCY,
    stat: { value: "800+", label: "Escales / an" },
  },
  {
    icon: Ship,
    title: "Affrètement Tramping",
    subtitle: "Chartering & Tramping",
    desc: "Courtage et négociation de chartes-parties pour le tramping dry bulk. Spécialistes des routes Baltique, Atlantique Nord, Méditerranée et Mer Noire. Expertise céréales, engrais, acier.",
    details: [
      "Négociation chartes-parties",
      "Voyage & time charter",
      "Tramping dry bulk",
      "Céréales, engrais, acier",
      "Routes Baltique / Atlantique / Med",
      "Suivi marchés BDI",
    ],
    img: IMG_CHARTER,
    stat: { value: "200+", label: "Navires affrétés / an" },
  },
  {
    icon: Search,
    title: "Expertise Maritime",
    subtitle: "Marine Survey",
    desc: "Expertise et inspection des navires et cargaisons. Sondages de jauge, constats de dommages, inspections de cale et expertises contradictoires. Rapports P&I certifiés.",
    details: [
      "Draught survey",
      "Inspection cales & écoutilles",
      "Constat dommages cargo",
      "Expertise contradictoire",
      "Certificats phytosanitaires",
      "Rapports P&I certifiés",
    ],
    img: IMG_SURVEY,
    stat: { value: "1 200+", label: "Expertises / an" },
  },
  {
    icon: Scale,
    title: "Courtage en Douane",
    subtitle: "Customs Brokerage",
    desc: "Commissionnaire agréé en douane depuis 1975. Dédouanement import/export, régimes douaniers spéciaux, licences d'importation et certificats d'origine.",
    details: [
      "Dédouanement import/export",
      "Régimes douaniers spéciaux",
      "Licences d'importation",
      "Certificats d'origine",
      "Déclarations EDI",
      "Conseil réglementaire",
    ],
    img: IMG_CUSTOMS,
    stat: { value: "5 000+", label: "Déclarations / an" },
  },
  {
    icon: Package,
    title: "Manutention Portuaire",
    subtitle: "Stevedoring",
    desc: "Opérations de chargement et déchargement en vrac sur les terminaux de Boulogne-sur-Mer et Rouen. Équipement adapté au vrac sec, pesage et échantillonnage.",
    details: [
      "Chargement / déchargement vrac",
      "Grabs et convoyeurs",
      "Pesage et échantillonnage",
      "Stockage entrepôt",
      "Contrôle qualité",
      "Rapport de manutention",
    ],
    img: IMG_GRAIN,
    stat: { value: "4,5 Mt", label: "Vrac traité / an" },
  },
  {
    icon: FileText,
    title: "Freight Forwarding",
    subtitle: "Commissionnaire de Transport",
    desc: "Organisation du transport multimodal de bout en bout. Mer, route, rail et air. Gestion des documents de transport, assurance cargo et suivi en temps réel.",
    details: [
      "Transport multimodal",
      "Connaissements & LTA",
      "Assurance cargo",
      "Groupage maritime",
      "Suivi expéditions",
      "Conseil logistique",
    ],
    img: IMG_PORT,
    stat: { value: "3 500+", label: "Expéditions / an" },
  },
];

export default function Services() {
  return (
    <div style={{ background: "var(--eds-ivory)" }}>

      {/* ── HERO ── */}
      <section style={{
        position: "relative", height: "65vh", minHeight: "480px",
        overflow: "hidden", display: "flex", alignItems: "flex-end",
        paddingBottom: "5rem", paddingTop: "94px",
      }}>
        <img src={IMG_HERO} alt="Nos services maritimes" style={{
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
            <span className="eds-label" style={{ color: "var(--eds-gold)" }}>Expertises</span>
          </div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 700, fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
            letterSpacing: "-0.03em", lineHeight: 1.0,
            color: "var(--eds-white)", marginBottom: "1rem",
          }}>
            Nos services<br />
            <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--eds-gold)" }}>
              maritimes & portuaires.
            </span>
          </h1>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1rem", lineHeight: 1.7,
            color: "oklch(1 0 0 / 0.65)", maxWidth: "480px",
          }}>
            Une offre intégrée couvrant l'ensemble de la chaîne logistique maritime, de l'affrètement à la livraison finale.
          </p>
        </div>
      </section>

      {/* ── INTRO STATS ── */}
      <section style={{ padding: "5rem 0", background: "var(--eds-cream)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2.5rem" }}>
          <RevealBlock>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }} className="grid-cols-1 lg:grid-cols-2">
              <div>
                <div className="eds-gold-rule"><span className="eds-label">Notre approche</span></div>
                <h2 className="eds-h2" style={{ marginBottom: "1.25rem" }}>
                  Une expertise<br />
                  <span style={{ fontStyle: "italic", fontWeight: 300 }}>de bout en bout.</span>
                </h2>
                <p className="eds-body">
                  Depuis 1975, Euro Docks Service accompagne armateurs, affréteurs et chargeurs dans toutes leurs opérations maritimes. Notre force : une équipe opérationnelle disponible 24h/24, une connaissance intime des ports français et un réseau international de partenaires certifiés.
                </p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }}>
                {[
                  { v: "800+", l: "Escales / an" },
                  { v: "50 ans", l: "D'expertise" },
                  { v: "5", l: "Ports français" },
                  { v: "24h/24", l: "Disponibilité" },
                ].map(({ v, l }, i) => (
                  <div key={i} style={{
                    padding: "2rem",
                    borderRight: i % 2 === 0 ? "1px solid var(--border)" : "none",
                    borderBottom: i < 2 ? "1px solid var(--border)" : "none",
                  }}>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontWeight: 700, fontSize: "2.5rem",
                      color: "var(--eds-navy)", lineHeight: 1, letterSpacing: "-0.03em",
                    }}>{v}</div>
                    <div style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.72rem", letterSpacing: "0.08em",
                      textTransform: "uppercase", color: "var(--eds-steel)", marginTop: "0.4rem",
                    }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── SERVICES DÉTAILLÉS — alternance image/texte ── */}
      {SERVICES.map((s, i) => {
        const Icon = s.icon;
        const isEven = i % 2 === 0;
        return (
          <section key={i} style={{
            background: isEven ? "var(--eds-ivory)" : "var(--eds-cream)",
            overflow: "hidden",
          }}>
            <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
              <RevealBlock>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  minHeight: "520px",
                }} className="grid-cols-1 lg:grid-cols-2">

                  {/* Image */}
                  <div style={{
                    order: isEven ? 1 : 2,
                    position: "relative", minHeight: "400px",
                  }}>
                    <img src={s.img} alt={s.title} style={{
                      position: "absolute", inset: 0,
                      width: "100%", height: "100%", objectFit: "cover",
                    }} />
                    {/* Badge stat */}
                    <div style={{
                      position: "absolute",
                      bottom: "2rem",
                      [isEven ? "right" : "left"]: "2rem",
                      background: "var(--eds-navy)",
                      padding: "1.25rem 1.75rem",
                      borderLeft: "3px solid var(--eds-gold)",
                    }}>
                      <div style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontWeight: 700, fontSize: "2rem",
                        color: "var(--eds-white)", lineHeight: 1,
                      }}>{s.stat.value}</div>
                      <div style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.65rem", letterSpacing: "0.1em",
                        textTransform: "uppercase", color: "var(--eds-gold)", marginTop: "0.25rem",
                      }}>{s.stat.label}</div>
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
                    <div style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.65rem", letterSpacing: "0.18em",
                      textTransform: "uppercase", color: "var(--eds-gold)", marginBottom: "0.5rem",
                    }}>{s.subtitle}</div>
                    <h2 style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontWeight: 600, fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                      letterSpacing: "-0.02em", lineHeight: 1.1,
                      color: "var(--eds-navy)", marginBottom: "1.25rem",
                    }}>{s.title}</h2>
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.95rem", lineHeight: 1.75,
                      color: "var(--eds-steel)", marginBottom: "2rem",
                    }}>{s.desc}</p>
                    <div style={{
                      display: "grid", gridTemplateColumns: "1fr 1fr",
                      gap: "0.5rem 1.5rem", marginBottom: "2.5rem",
                    }}>
                      {s.details.map((d, j) => (
                        <div key={j} style={{
                          display: "flex", alignItems: "center", gap: "0.5rem",
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.82rem", color: "var(--eds-steel)",
                        }}>
                          <span style={{ width: "16px", height: "1px", background: "var(--eds-gold)", flexShrink: 0 }} />
                          {d}
                        </div>
                      ))}
                    </div>
                    <Link href="/contact" className="eds-btn eds-btn-outline-navy" style={{ alignSelf: "flex-start" }}>
                      Demander un devis <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </RevealBlock>
            </div>
          </section>
        );
      })}

      {/* ── CTA FINAL ── */}
      <section style={{
        position: "relative", overflow: "hidden",
        minHeight: "400px", display: "flex", alignItems: "center",
      }}>
        <img src={IMG_HERO} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, oklch(0.10 0.03 240 / 0.95) 0%, oklch(0.10 0.03 240 / 0.65) 60%, transparent 100%)",
        }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1400px", margin: "0 auto", padding: "5rem 2.5rem" }}>
          <RevealBlock>
            <div className="eds-gold-rule"><span className="eds-label">Contact</span></div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3.5rem)",
              letterSpacing: "-0.03em", lineHeight: 1.05,
              color: "var(--eds-white)", maxWidth: "500px", marginBottom: "2rem",
            }}>
              Besoin d'un devis ?<br />
              <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--eds-gold)" }}>Réponse sous 24h.</span>
            </h2>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/contact" className="eds-btn eds-btn-gold">
                Nous contacter <ArrowRight size={15} />
              </Link>
              <Link href="/terminal" className="eds-btn eds-btn-outline">
                Terminaux portuaires
              </Link>
            </div>
          </RevealBlock>
        </div>
      </section>
    </div>
  );
}
