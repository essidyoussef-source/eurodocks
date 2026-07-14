import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Anchor, MapPin, Check } from "lucide-react";

const HERO_IMG    = "/manus-storage/eds2_boulogne_terminal_16129bed.jpg";
const BOULOGNE_IMG = "/manus-storage/eds2_stevedoring_night_b390bed9.jpg";
const ROUEN_IMG   = "/manus-storage/eds2_rouen_grain_7edf01b4.jpg";
const PORT_IMG    = "/manus-storage/eds2_port_dunkerque_d6951241.jpg";

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

const TERMINALS = [
  {
    name: "Boulogne-sur-Mer",
    subtitle: "Terminal Principal",
    img: BOULOGNE_IMG,
    stats: [
      { v: "800 m", l: "Longueur de quai" },
      { v: "77 500 m²", l: "Surface de stockage" },
      { v: "11,5 m", l: "Tirant d'eau max" },
      { v: "70 000 t", l: "Capacite silos" },
    ],
    desc: "Notre terminal principal, siege social d'Euro Docks Service depuis 1975. Specialise dans la manutention de vrac sec (cereales, engrais, acier) avec des installations modernes et une equipe de 45 dockers permanents.",
    services: ["Manutention vrac sec", "Silos a cereales 70 000 t", "Stockage couvert & decouverts", "Pesage certifie", "Echantillonnage & analyse", "Transit douanier"],
  },
  {
    name: "Rouen",
    subtitle: "Terminal Cerealier",
    img: ROUEN_IMG,
    stats: [
      { v: "3,6 Mt", l: "Capacite annuelle" },
      { v: "450 m", l: "Longueur de quai" },
      { v: "9,5 m", l: "Tirant d'eau max" },
      { v: "120 000 t", l: "Stockage cereales" },
    ],
    desc: "Premier port cerealier de France. Notre terminal de Rouen est specialise dans l'exportation de cereales vers les marches de la Mediterranee, du Moyen-Orient et de l'Afrique du Nord. Connexion directe avec le bassin parisien.",
    services: ["Export cereales & oleagineux", "Silos portuaires 120 000 t", "Chargement navires Panamax", "Controle qualite IRTAC", "Fumigation & traitement", "Connexion ferroviaire"],
  },
];

const PORTS_RESEAU = [
  { name: "Dunkerque", type: "Vrac & Conteneurs", flag: "🇫🇷", tirant: "17 m" },
  { name: "Boulogne-sur-Mer", type: "Vrac sec principal", flag: "🇫🇷", tirant: "11,5 m" },
  { name: "Calais", type: "Ro-Ro & Vrac", flag: "🇫🇷", tirant: "8,5 m" },
  { name: "Rouen", type: "Cerealier", flag: "🇫🇷", tirant: "9,5 m" },
  { name: "Bayonne", type: "Vrac & Chimique", flag: "🇫🇷", tirant: "10 m" },
  { name: "Gand", type: "Vrac sec & Acier", flag: "🇧🇪", tirant: "12,5 m" },
  { name: "Anvers", type: "Hub multimodal", flag: "🇧🇪", tirant: "13,5 m" },
  { name: "Rotterdam", type: "Hub europeen", flag: "🇳🇱", tirant: "23 m" },
];

export default function Terminal() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>

      {/* HERO */}
      <section style={{ position: "relative", height: "65vh", minHeight: "460px", overflow: "hidden" }}>
        <img src={HERO_IMG} alt="Port Terminal" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(11,31,58,0.9) 0%, rgba(11,31,58,0.55) 60%, rgba(11,31,58,0.25) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", padding: "0 0 5rem 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem", width: "100%" }}>
            <Reveal>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", color: "var(--eds-gold)", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 600, marginBottom: "0.75rem" }}>Infrastructure</div>
              <h1 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#fff", lineHeight: 1.05, margin: "0 0 1rem 0" }}>
                Terminaux Portuaires<br />
                <em style={{ fontStyle: "italic", color: "var(--eds-gold)" }}>& Manutention.</em>
              </h1>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.72)", maxWidth: "520px", lineHeight: 1.7, margin: 0 }}>
                Deux terminaux strategiques sur la facade maritime nord-ouest francaise. Boulogne-sur-Mer et Rouen, specialises dans le vrac sec et les cereales.
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
              { v: "2", l: "Terminaux" },
              { v: "4,5 Mt", l: "Capacite annuelle" },
              { v: "8 ports", l: "Reseau France-Benelux" },
            ].map((s) => (
              <div key={s.l} style={{ padding: "1.25rem 2rem", borderRight: "1px solid rgba(255,255,255,0.1)", textAlign: "center" }}>
                <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "1.75rem", color: "var(--eds-gold)", lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.68rem", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "0.35rem" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TERMINAUX DETAIL */}
      {TERMINALS.map((terminal, i) => {
        const isEven = i % 2 === 0;
        return (
          <section key={terminal.name} style={{ background: isEven ? "#fff" : "#f8f6f2", padding: "5rem 0", borderTop: "1px solid #e8e4dc" }}>
            <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>

                {/* IMAGE + STATS */}
                <Reveal delay={isEven ? 0 : 80}>
                  <div style={{ order: isEven ? 1 : 2 }}>
                    <div style={{ position: "relative", borderRadius: "1rem", overflow: "hidden", aspectRatio: "4/3", marginBottom: "1.5rem" }}>
                      <img src={terminal.img} alt={terminal.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <div style={{ position: "absolute", top: "1.25rem", left: "1.25rem", background: "var(--eds-navy)", borderRadius: "0.5rem", padding: "0.5rem 1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <Anchor size={14} color="var(--eds-gold)" />
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", color: "var(--eds-gold)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>{terminal.subtitle}</span>
                      </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "#e8e4dc", borderRadius: "0.75rem", overflow: "hidden" }}>
                      {terminal.stats.map((stat) => (
                        <div key={stat.l} style={{ background: "#fff", padding: "1.25rem 1.5rem" }}>
                          <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "1.3rem", color: "var(--eds-navy)", lineHeight: 1 }}>{stat.v}</div>
                          <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.68rem", color: "var(--eds-slate)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "0.3rem" }}>{stat.l}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>

                {/* CONTENT */}
                <div style={{ order: isEven ? 2 : 1 }}>
                  <Reveal delay={isEven ? 80 : 0}>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", color: "var(--eds-gold)", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 600, marginBottom: "0.75rem" }}>Terminal</div>
                    <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "var(--eds-navy)", lineHeight: 1.1, margin: "0 0 1.25rem 0" }}>
                      {terminal.name}
                    </h2>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem", color: "var(--eds-slate)", lineHeight: 1.8, marginBottom: "2rem" }}>
                      {terminal.desc}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "2rem" }}>
                      {terminal.services.map((s) => (
                        <div key={s} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                          <div style={{ width: "18px", height: "18px", background: "rgba(201,150,58,0.12)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <Check size={10} color="var(--eds-gold)" />
                          </div>
                          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", color: "var(--eds-slate)" }}>{s}</span>
                        </div>
                      ))}
                    </div>
                    <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "var(--eds-navy)", textDecoration: "none", borderBottom: "2px solid var(--eds-gold)", paddingBottom: "2px" }}>
                      Contacter ce terminal <ArrowRight size={14} />
                    </Link>
                  </Reveal>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* RESEAU DE PORTS */}
      <section style={{ background: "var(--eds-navy)", padding: "5rem 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <Reveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem" }}>
              <div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", color: "var(--eds-gold)", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 600, marginBottom: "0.75rem" }}>Reseau</div>
                <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "#fff", margin: 0 }}>
                  Notre reseau de ports
                </h2>
              </div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", textAlign: "right" }}>
                France · Belgique · Pays-Bas
              </div>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", background: "rgba(255,255,255,0.08)" }}>
            {PORTS_RESEAU.map((port, i) => (
              <Reveal key={port.name} delay={i * 50}>
                <div style={{ background: "rgba(11,31,58,0.6)", padding: "1.75rem", transition: "background 0.2s ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(201,150,58,0.1)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(11,31,58,0.6)"; }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "1.1rem" }}>{port.flag}</span>
                    <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#fff" }}>{port.name}</div>
                  </div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", color: "rgba(255,255,255,0.45)", marginBottom: "0.75rem" }}>{port.type}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <Anchor size={10} color="var(--eds-gold)" />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.68rem", color: "var(--eds-gold)", fontWeight: 600 }}>Tirant: {port.tirant}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ position: "relative", padding: "7rem 0", overflow: "hidden" }}>
        <img src={PORT_IMG} alt="Port" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(11,31,58,0.88)" }} />
        <div style={{ position: "relative", maxWidth: "1280px", margin: "0 auto", padding: "0 2rem", textAlign: "center" }}>
          <Reveal>
            <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff", margin: "0 0 0.5rem 0" }}>
              Planifier une escale ?
            </h2>
            <p style={{ fontFamily: "Outfit, sans-serif", fontStyle: "italic", fontSize: "clamp(1.4rem, 3vw, 2rem)", color: "var(--eds-gold)", margin: "0 0 2rem 0" }}>
              Nos agents portuaires repondent sous 2h.
            </p>
            <Link href="/contact" className="eds-btn-primary">
              Contacter un agent <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
