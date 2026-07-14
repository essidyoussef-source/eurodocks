import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Users, Award, Globe, Clock } from "lucide-react";

const HERO_IMG  = "/manus-storage/eds2_chartering_bridge_e11c603a.jpg";
const TEAM_IMG  = "/manus-storage/eds2_survey_draught_9d86258e.jpg";
const PORT_IMG  = "/manus-storage/eds2_port_dunkerque_9fea8573.jpg";
const SHIP_IMG  = "/manus-storage/eds2_tramping_sea_fd8a56f5.jpg";
const GRAIN_IMG = "/manus-storage/eds2_grain_loading_6553e85f.jpg";
const CRANE_IMG = "/manus-storage/eds2_stevedoring_night_f14f419a.jpg";

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

const TIMELINE = [
  { year: "1975", title: "Fondation", desc: "Creation d'Euro Docks Service a Boulogne-sur-Mer. Premiers services d'agence maritime sur le port." },
  { year: "1985", title: "Expansion portuaire", desc: "Ouverture des operations sur le port de Dunkerque. Specialisation dans le tramping et le vrac sec." },
  { year: "1995", title: "Certification qualite", desc: "Obtention des certifications GMP+ et ISO. Developpement des activites de transit douanier." },
  { year: "2005", title: "Reseau Benelux", desc: "Extension du reseau vers Anvers, Gand et Rotterdam. 500 escales annuelles franchies." },
  { year: "2015", title: "Terminal Rouen", desc: "Implantation sur le terminal cerealier de Rouen. Premier port cerealier de France." },
  { year: "2024", title: "Aujourd'hui", desc: "+1 750 escales par an, 8 ports, 50 ans d'expertise maritime au service des armateurs et affreteurs." },
];

const VALUES = [
  { icon: Clock, title: "Reactivite 24h/24", desc: "Nos agents portuaires sont disponibles a toute heure pour repondre aux besoins operationnels urgents." },
  { icon: Award, title: "Excellence operationnelle", desc: "50 ans de savoir-faire dans la gestion des escales, la manutention et le transit douanier." },
  { icon: Globe, title: "Reseau international", desc: "Correspondants dans tous les grands ports europeens et connexions avec les marches Baltique, Med et Mer Noire." },
  { icon: Users, title: "Equipe specialisee", desc: "45 collaborateurs dont 12 agents portuaires certifies, experts en tramping et vrac sec." },
];

export default function About() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>

      {/* HERO */}
      <section style={{ position: "relative", height: "65vh", minHeight: "460px", overflow: "hidden" }}>
        <img src={HERO_IMG} alt="Euro Docks Service" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(11,31,58,0.9) 0%, rgba(11,31,58,0.55) 60%, rgba(11,31,58,0.2) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", padding: "0 0 5rem 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem", width: "100%" }}>
            <Reveal>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", color: "var(--eds-gold)", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 600, marginBottom: "0.75rem" }}>A propos</div>
              <h1 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#fff", lineHeight: 1.05, margin: "0 0 1rem 0" }}>
                50 ans au service<br />
                <em style={{ fontStyle: "italic", color: "var(--eds-gold)" }}>des armateurs.</em>
              </h1>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.72)", maxWidth: "520px", lineHeight: 1.7, margin: 0 }}>
                Depuis 1975, Euro Docks Service est l'agence maritime de reference sur la facade nord-ouest francaise. Specialistes du tramping et du vrac sec.
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
              { v: "1975", l: "Annee de fondation" },
              { v: "+1 750", l: "Escales / an" },
              { v: "45", l: "Collaborateurs" },
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

      {/* INTRO */}
      <section style={{ padding: "6rem 0", background: "#fff" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
            <Reveal>
              <div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", color: "var(--eds-gold)", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 600, marginBottom: "0.75rem" }}>Notre histoire</div>
                <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "var(--eds-navy)", lineHeight: 1.1, margin: "0 0 1.5rem 0" }}>
                  Une agence maritime de confiance depuis 50 ans
                </h2>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem", color: "var(--eds-slate)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                  Fondee en 1975 a Boulogne-sur-Mer, Euro Docks Service s'est impose comme l'agence maritime de reference sur la facade nord-ouest francaise. Notre specialisation dans le tramping et le vrac sec nous a permis de construire un reseau solide de partenaires armateurs et affreteurs en Europe et dans le monde.
                </p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem", color: "var(--eds-slate)", lineHeight: 1.8, marginBottom: "2rem" }}>
                  Avec plus de 1 750 escales gerees chaque annee sur 8 ports, notre equipe de 45 collaborateurs offre une expertise unique : disponibilite 24h/24, reactivite operationnelle, maitrise des procedures douanieres et phytosanitaires.
                </p>
                <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "var(--eds-navy)", textDecoration: "none", borderBottom: "2px solid var(--eds-gold)", paddingBottom: "2px" }}>
                  Nous contacter <ArrowRight size={14} />
                </Link>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div style={{ position: "relative" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  <div style={{ borderRadius: "1rem", overflow: "hidden", aspectRatio: "3/4" }}>
                    <img src={TEAM_IMG} alt="Equipe EDS" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", paddingTop: "2rem" }}>
                    <div style={{ borderRadius: "1rem", overflow: "hidden", flex: 1 }}>
                      <img src={GRAIN_IMG} alt="Grain" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div style={{ borderRadius: "1rem", overflow: "hidden", flex: 1 }}>
                      <img src={CRANE_IMG} alt="Terminal" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  </div>
                </div>
                <div style={{ position: "absolute", bottom: "-1.5rem", left: "1rem", background: "var(--eds-navy)", borderRadius: "0.75rem", padding: "1.25rem 1.75rem", boxShadow: "0 8px 32px rgba(11,31,58,0.25)" }}>
                  <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "1.75rem", color: "var(--eds-gold)", lineHeight: 1 }}>50 ans</div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "0.25rem" }}>D'expertise maritime</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* VALEURS */}
      <section style={{ background: "#f8f6f2", padding: "5rem 0", borderTop: "1px solid #e8e4dc" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", color: "var(--eds-gold)", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 600, marginBottom: "0.75rem" }}>Nos engagements</div>
              <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "var(--eds-navy)", margin: 0 }}>Ce qui nous distingue</h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem" }}>
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <Reveal key={v.title} delay={i * 80}>
                  <div style={{ background: "#fff", borderRadius: "1rem", padding: "2rem", border: "1px solid #e8e4dc", transition: "box-shadow 0.2s ease, transform 0.2s ease" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(11,31,58,0.1)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
                  >
                    <div style={{ width: "44px", height: "44px", background: "rgba(201,150,58,0.1)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                      <Icon size={20} color="var(--eds-gold)" />
                    </div>
                    <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1rem", color: "var(--eds-navy)", margin: "0 0 0.75rem 0" }}>{v.title}</h3>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", color: "var(--eds-slate)", lineHeight: 1.7, margin: 0 }}>{v.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section style={{ padding: "6rem 0", background: "#fff" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <Reveal>
            <div style={{ marginBottom: "3.5rem" }}>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", color: "var(--eds-gold)", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 600, marginBottom: "0.75rem" }}>Chronologie</div>
              <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "var(--eds-navy)", margin: 0 }}>50 ans d'histoire maritime</h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0" }}>
            {TIMELINE.map((item, i) => (
              <Reveal key={item.year} delay={i * 60}>
                <div style={{ padding: "2rem 2.5rem", borderLeft: i % 3 === 0 ? "3px solid var(--eds-gold)" : "1px solid #e8e4dc", borderBottom: i < 3 ? "1px solid #e8e4dc" : "none", background: i === 5 ? "var(--eds-navy)" : "#fff" }}>
                  <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "2rem", color: "var(--eds-gold)", lineHeight: 1, marginBottom: "0.5rem" }}>{item.year}</div>
                  <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1rem", color: i === 5 ? "#fff" : "var(--eds-navy)", marginBottom: "0.75rem" }}>{item.title}</div>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", color: i === 5 ? "rgba(255,255,255,0.65)" : "var(--eds-slate)", lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section style={{ position: "relative", padding: "6rem 0", overflow: "hidden" }}>
        <img src={PORT_IMG} alt="Port" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(11,31,58,0.88)" }} />
        <div style={{ position: "relative", maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <Reveal>
            <div style={{ maxWidth: "720px" }}>
              <div style={{ fontFamily: "Outfit, sans-serif", fontSize: "5rem", lineHeight: 0.7, color: "var(--eds-gold)", marginBottom: "1.5rem", fontWeight: 800 }}>"</div>
              <blockquote style={{ fontFamily: "Outfit, sans-serif", fontWeight: 400, fontStyle: "italic", fontSize: "clamp(1.3rem, 2.5vw, 2rem)", lineHeight: 1.5, color: "#fff", marginBottom: "2rem" }}>
                Dans le tramping, la reactivite n'est pas un avantage concurrentiel. C'est la condition de survie.
              </blockquote>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--eds-gold)" }}>Direction Generale — Euro Docks Service</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "5rem 0", background: "#fff" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem", textAlign: "center" }}>
          <Reveal>
            <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "var(--eds-navy)", margin: "0 0 0.5rem 0" }}>
              Travaillons ensemble
            </h2>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", color: "var(--eds-slate)", margin: "0 0 2rem 0" }}>
              50 ans d'expertise a votre service. Contactez nos agents portuaires.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" className="eds-btn-primary">
                Nous contacter <ArrowRight size={16} />
              </Link>
              <Link href="/services" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "var(--eds-navy)", textDecoration: "none", border: "2px solid var(--eds-navy)", borderRadius: "0.5rem", padding: "0.75rem 1.5rem", transition: "all 0.2s ease" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--eds-navy)"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--eds-navy)"; }}
              >
                Nos services <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
