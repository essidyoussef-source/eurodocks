import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Anchor, Ship, FileText, Scale, Search, Package, Check } from "lucide-react";

const HERO_IMG    = "https://eurodocks-qgd8wezm.manus.space/manus-storage/eds2_hero_bulker_ca1f9bf5.jpg";
const AGENCY_IMG  = "https://eurodocks-qgd8wezm.manus.space/manus-storage/eds2_boulogne_terminal_16129bed.jpg";
const CHARTER_IMG = "https://eurodocks-qgd8wezm.manus.space/manus-storage/eds2_chartering_bridge_95efca46.jpg";
const SURVEY_IMG  = "https://eurodocks-qgd8wezm.manus.space/manus-storage/eds2_survey_draught_ed5fb877.jpg";
const CUSTOMS_IMG = "https://eurodocks-qgd8wezm.manus.space/manus-storage/eds2_hatch_inspection_7b9b3cf3.jpg";
const STEV_IMG    = "https://eurodocks-qgd8wezm.manus.space/manus-storage/eds2_stevedoring_night_b390bed9.jpg";
const FREIGHT_IMG = "https://eurodocks-qgd8wezm.manus.space/manus-storage/eds2_grain_loading_eac3a0ec.jpg";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.23,1,0.32,1) ${delay}ms` }}>
      {children}
    </div>
  );
}

const SERVICES = [
  {
    icon: Anchor, subtitle: "Ship Agency", title: "Agence Maritime",
    img: AGENCY_IMG, stat: "+1 750", statLabel: "escales / an",
    desc: "Representation complete du navire et de l'armateur en escale. Coordination avec les autorites portuaires, pilotes, terminaux et services douaniers. Disponibles 24h/24, 7j/7.",
    details: ["Coordination portuaire 24h/24", "Formalites d'escale", "Ravitaillement soutes & vivres", "Assistance a l'equipage", "Documents de bord", "Suivi operations cargo"],
  },
  {
    icon: Ship, subtitle: "Chartering & Tramping", title: "Affretement Tramping",
    img: CHARTER_IMG, stat: "200+", statLabel: "navires / an",
    desc: "Courtage et negociation de chartes-parties pour le tramping dry bulk. Specialistes des routes Baltique, Atlantique Nord, Mediterranee et Mer Noire. Expertise cereales, engrais, acier.",
    details: ["Negociation chartes-parties", "Voyage & time charter", "Tramping dry bulk", "Cereales, engrais, acier", "Routes Baltique / Atlantique / Med", "Suivi marches BDI"],
  },
  {
    icon: Search, subtitle: "Marine Survey", title: "Expertise Maritime",
    img: SURVEY_IMG, stat: "1 200+", statLabel: "expertises / an",
    desc: "Expertise et inspection des navires et cargaisons. Sondages de jauge, constats de dommages, inspections de cale et expertises contradictoires. Rapports P&I certifies.",
    details: ["Draught survey", "Inspection cales & ecoutilles", "Constat dommages cargo", "Expertise contradictoire", "Certificats phytosanitaires", "Rapports P&I certifies"],
  },
  {
    icon: Scale, subtitle: "Customs Brokerage", title: "Courtage en Douane",
    img: CUSTOMS_IMG, stat: "5 000+", statLabel: "declarations / an",
    desc: "Commissionnaire agree en douane depuis 1975. Dedouanement import/export, regimes douaniers speciaux, licences d'importation et certificats d'origine.",
    details: ["Dedouanement import/export", "Regimes douaniers speciaux", "Licences d'importation", "Certificats d'origine", "Declarations EDI", "Conseil reglementaire"],
  },
  {
    icon: Package, subtitle: "Stevedoring", title: "Manutention Portuaire",
    img: STEV_IMG, stat: "4,5 Mt", statLabel: "vrac traite / an",
    desc: "Operations de chargement et dechargement en vrac sur les terminaux de Boulogne-sur-Mer et Rouen. Equipement adapte au vrac sec, pesage et echantillonnage.",
    details: ["Chargement / dechargement vrac", "Grabs et convoyeurs", "Pesage et echantillonnage", "Stockage entrepot", "Controle qualite", "Rapport de manutention"],
  },
  {
    icon: FileText, subtitle: "Commissionnaire de Transport", title: "Freight Forwarding",
    img: FREIGHT_IMG, stat: "3 500+", statLabel: "expeditions / an",
    desc: "Organisation du transport multimodal de bout en bout. Mer, route, rail et air. Gestion des documents de transport, assurance cargo et suivi en temps reel.",
    details: ["Transport multimodal", "Connaissements & LTA", "Assurance cargo", "Groupage maritime", "Suivi expeditions", "Conseil logistique"],
  },
];

export default function Services() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>

      {/* HERO */}
      <section style={{ position: "relative", height: "65vh", minHeight: "460px", overflow: "hidden" }}>
        <img src={HERO_IMG} alt="Services maritimes" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(11,31,58,0.88) 0%, rgba(11,31,58,0.5) 60%, rgba(11,31,58,0.25) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", padding: "0 0 5rem 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem", width: "100%" }}>
            <Reveal>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", color: "var(--eds-gold)", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 600, marginBottom: "0.75rem" }}>Expertise</div>
              <h1 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#fff", lineHeight: 1.05, margin: "0 0 1rem 0" }}>
                Nos services<br />
                <em style={{ fontStyle: "italic", color: "var(--eds-gold)" }}>maritimes & portuaires.</em>
              </h1>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.72)", maxWidth: "480px", lineHeight: 1.7, margin: 0 }}>
                Une offre integree couvrant l'ensemble de la chaine logistique maritime, de l'affretement a la livraison finale.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section style={{ background: "var(--eds-navy)", padding: "2.5rem 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderLeft: "1px solid rgba(255,255,255,0.1)" }}>
            {[
              { v: "+1 750", l: "Escales / an" },
              { v: "200+", l: "Navires affretés" },
              { v: "4,5 Mt", l: "Vrac traite / an" },
              { v: "24h/24", l: "Disponibilite" },
            ].map((s) => (
              <div key={s.l} style={{ padding: "1.25rem 2rem", borderRight: "1px solid rgba(255,255,255,0.1)", textAlign: "center" }}>
                <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "1.75rem", color: "var(--eds-gold)", lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.68rem", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "0.35rem" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section style={{ background: "#f8f6f2", padding: "5rem 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
            <Reveal>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", color: "var(--eds-gold)", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 600, marginBottom: "0.75rem" }}>Notre approche</div>
              <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "var(--eds-navy)", lineHeight: 1.1, margin: "0 0 0.4rem 0", textTransform: "uppercase" }}>
                UNE EXPERTISE
              </h2>
              <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "var(--eds-gold)", fontStyle: "italic", lineHeight: 1.1, margin: "0 0 1.5rem 0" }}>
                DE BOUT EN BOUT.
              </h2>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.92rem", color: "var(--eds-slate)", lineHeight: 1.8, marginBottom: "1rem" }}>
                Depuis 1975, Euro Docks Service accompagne armateurs, affreteurs et chargeurs dans toutes leurs operations maritimes. Notre force : une equipe operationnelle disponible 24h/24, une connaissance intime des ports francais et un reseau international de partenaires certifies.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "#e8e4dc" }}>
                {[
                  { v: "800+", l: "Escales / an", s: "Boulogne-sur-Mer" },
                  { v: "50 ans", l: "D'expertise", s: "Depuis 1975" },
                  { v: "5", l: "Ports francais", s: "Nord & Normandie" },
                  { v: "24h/24", l: "Disponibilite", s: "Urgences operationnelles" },
                ].map((s) => (
                  <div key={s.l} style={{ background: "#fff", padding: "1.75rem", borderTop: "3px solid transparent", transition: "border-color 0.2s ease" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderTopColor = "var(--eds-gold)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderTopColor = "transparent"; }}
                  >
                    <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "1.75rem", color: "var(--eds-navy)", lineHeight: 1 }}>{s.v}</div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", fontWeight: 600, color: "var(--eds-navy)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "0.4rem" }}>{s.l}</div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.7rem", color: "#999", marginTop: "0.2rem" }}>{s.s}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SERVICES DETAIL */}
      {SERVICES.map((service, i) => {
        const isEven = i % 2 === 0;
        const Icon = service.icon;
        return (
          <section key={service.title} style={{ background: isEven ? "#fff" : "#f8f6f2", padding: "5rem 0", borderTop: "1px solid #e8e4dc" }}>
            <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>

                {/* IMAGE */}
                <Reveal delay={isEven ? 0 : 80}>
                  <div style={{ order: isEven ? 1 : 2, position: "relative", borderRadius: "1rem", overflow: "hidden", aspectRatio: "4/3" }}>
                    <img src={service.img} alt={service.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
                    />
                    <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem", background: "var(--eds-gold)", borderRadius: "0.75rem", padding: "0.75rem 1.25rem" }}>
                      <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "#fff", lineHeight: 1 }}>{service.stat}</div>
                      <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.62rem", color: "rgba(255,255,255,0.85)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "2px" }}>{service.statLabel}</div>
                    </div>
                  </div>
                </Reveal>

                {/* CONTENT */}
                <div style={{ order: isEven ? 2 : 1 }}>
                  <Reveal delay={isEven ? 80 : 0}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                      <div style={{ width: "40px", height: "40px", background: "var(--eds-navy)", borderRadius: "0.6rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon size={18} color="var(--eds-gold)" />
                      </div>
                      <div>
                        <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.62rem", color: "var(--eds-gold)", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 600 }}>{service.subtitle}</div>
                      </div>
                    </div>
                    <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", color: "var(--eds-navy)", lineHeight: 1.15, margin: "0 0 1rem 0" }}>
                      {service.title}
                    </h2>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem", color: "var(--eds-slate)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                      {service.desc}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem", marginBottom: "1.75rem" }}>
                      {service.details.map((d) => (
                        <div key={d} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                          <div style={{ width: "18px", height: "18px", background: "rgba(201,150,58,0.12)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <Check size={10} color="var(--eds-gold)" />
                          </div>
                          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", color: "var(--eds-slate)" }}>{d}</span>
                        </div>
                      ))}
                    </div>
                    <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "var(--eds-navy)", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: "2px solid var(--eds-gold)", paddingBottom: "0.2rem", transition: "gap 0.2s ease" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.gap = "0.85rem"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.gap = "0.5rem"; }}
                    >
                      Demander un devis <ArrowRight size={14} />
                    </Link>
                  </Reveal>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA FINAL */}
      <section style={{ position: "relative", padding: "7rem 0", overflow: "hidden" }}>
        <img src={AGENCY_IMG} alt="Port" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(11,31,58,0.88)" }} />
        <div style={{ position: "relative", maxWidth: "1280px", margin: "0 auto", padding: "0 2rem", textAlign: "center" }}>
          <Reveal>
            <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff", margin: "0 0 0.5rem 0" }}>
              Besoin d'un devis ?
            </h2>
            <p style={{ fontFamily: "Outfit, sans-serif", fontStyle: "italic", fontSize: "clamp(1.4rem, 3vw, 2rem)", color: "var(--eds-gold)", margin: "0 0 2rem 0" }}>
              Reponse sous 24h.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" className="eds-btn-primary">
                Demander un devis <ArrowRight size={16} />
              </Link>
              <Link href="/terminal" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.85rem 2rem", fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "0.82rem", color: "#fff", textDecoration: "none", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "0.5rem", letterSpacing: "0.06em", textTransform: "uppercase", transition: "background 0.2s ease" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                Terminaux Portuaires
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
