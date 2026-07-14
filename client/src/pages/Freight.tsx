import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Truck, Ship, Train, Plane, Check } from "lucide-react";

const HERO_IMG   = "/manus-storage/eds2_tramping_sea_d4613c5f.jpg";
const GRAIN_IMG  = "/manus-storage/eds2_grain_loading_eac3a0ec.jpg";
const PORT_IMG   = "/manus-storage/eds2_boulogne_terminal_16129bed.jpg";
const ROUEN_IMG  = "/manus-storage/eds2_rouen_grain_7edf01b4.jpg";
const HATCH_IMG  = "/manus-storage/eds2_hatch_inspection_7b9b3cf3.jpg";

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

const MODES = [
  {
    icon: Ship, title: "Transport Maritime", subtitle: "Sea Freight",
    img: GRAIN_IMG, stat: "4,5 Mt", statLabel: "vrac / an",
    desc: "Specialistes du vrac sec (dry bulk) en tramping. Cereales, engrais, acier, project cargo. Negociation de chartes-parties voyage et time charter sur toutes les routes europeennes et mondiales.",
    features: ["Tramping dry bulk", "Voyage & time charter", "Cereales, engrais, acier", "Routes Baltique / Med / Mer Noire", "Suivi BDI en temps reel"],
    certs: ["GMP+", "OVAM", "NIWO"],
  },
  {
    icon: Truck, title: "Transport Routier", subtitle: "Road Freight",
    img: PORT_IMG, stat: "12 000+", statLabel: "camions / an",
    desc: "Organisation du transport routier de bout en bout pour les marchandises en vrac et conventionnelles. Reseau de transporteurs agrees couvrant la France et l'Europe.",
    features: ["FTL & LTL", "Vrac sec & liquide", "Temperature controlee", "Suivi GPS en temps reel", "ADR marchandises dangereuses"],
    certs: ["ISO 9001", "FMCSA"],
  },
  {
    icon: Train, title: "Transport Ferroviaire", subtitle: "Rail Freight",
    img: ROUEN_IMG, stat: "500+", statLabel: "wagons / an",
    desc: "Solutions ferroviaires pour les grands volumes de vrac. Connexion directe aux terminaux portuaires de Boulogne et Rouen avec les reseaux SNCF Fret et RFI.",
    features: ["Wagons vrac & citernes", "Connexion terminaux portuaires", "Intermodal rail-mer", "Grands volumes", "Optimisation CO2"],
    certs: ["RFI", "SNCF Fret"],
  },
  {
    icon: Plane, title: "Transport Aerien", subtitle: "Air Freight",
    img: HATCH_IMG, stat: "24h", statLabel: "livraison urgente",
    desc: "Solutions aeriennes pour les envois urgents et les marchandises a haute valeur. Partenariats avec les principales compagnies cargo et acces aux grands hubs europeens.",
    features: ["Fret urgent & express", "Marchandises haute valeur", "Produits periissables", "Dangerous goods IATA", "Door-to-door worldwide"],
    certs: ["IATA", "CASS"],
  },
];

const CARGOES = [
  { name: "Cereales", detail: "Ble, orge, mais, colza, tournesol", icon: "🌾" },
  { name: "Engrais", detail: "Uree, DAP, MAP, potasse, soufre", icon: "🧪" },
  { name: "Acier", detail: "Bobines, toles, profiles, tubes", icon: "⚙️" },
  { name: "Biomasse", detail: "Pellets, copeaux, granules", icon: "🌿" },
  { name: "Sel", detail: "Sel industriel, sel de degivrage", icon: "🧂" },
  { name: "Project Cargo", detail: "Pieces hors-gabarit, equipements", icon: "📦" },
];

export default function Freight() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>

      {/* HERO */}
      <section style={{ position: "relative", height: "65vh", minHeight: "460px", overflow: "hidden" }}>
        <img src={HERO_IMG} alt="Freight Forwarding" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 50%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(11,31,58,0.9) 0%, rgba(11,31,58,0.55) 60%, rgba(11,31,58,0.25) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", padding: "0 0 5rem 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem", width: "100%" }}>
            <Reveal>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", color: "var(--eds-gold)", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 600, marginBottom: "0.75rem" }}>Logistique</div>
              <h1 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#fff", lineHeight: 1.05, margin: "0 0 1rem 0" }}>
                Freight Forwarding<br />
                <em style={{ fontStyle: "italic", color: "var(--eds-gold)" }}>& Transport Multimodal.</em>
              </h1>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.72)", maxWidth: "520px", lineHeight: 1.7, margin: 0 }}>
                Organisation complete du transport de vos marchandises en vrac, de l'origine a la destination finale, par tous modes de transport.
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
              { v: "4 modes", l: "De transport" },
              { v: "50 pays", l: "Couverts" },
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

      {/* MODES DE TRANSPORT */}
      {MODES.map((mode, i) => {
        const isEven = i % 2 === 0;
        const Icon = mode.icon;
        return (
          <section key={mode.title} style={{ background: isEven ? "#fff" : "#f8f6f2", padding: "5rem 0", borderTop: "1px solid #e8e4dc" }}>
            <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
                <Reveal delay={isEven ? 0 : 80}>
                  <div style={{ order: isEven ? 1 : 2, position: "relative", borderRadius: "1rem", overflow: "hidden", aspectRatio: "4/3" }}>
                    <img src={mode.img} alt={mode.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
                    />
                    <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem", background: "var(--eds-gold)", borderRadius: "0.75rem", padding: "0.75rem 1.25rem" }}>
                      <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "#fff", lineHeight: 1 }}>{mode.stat}</div>
                      <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.62rem", color: "rgba(255,255,255,0.85)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "2px" }}>{mode.statLabel}</div>
                    </div>
                  </div>
                </Reveal>
                <div style={{ order: isEven ? 2 : 1 }}>
                  <Reveal delay={isEven ? 80 : 0}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                      <div style={{ width: "40px", height: "40px", background: "var(--eds-navy)", borderRadius: "0.6rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon size={18} color="var(--eds-gold)" />
                      </div>
                      <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.62rem", color: "var(--eds-gold)", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 600 }}>{mode.subtitle}</div>
                    </div>
                    <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", color: "var(--eds-navy)", lineHeight: 1.15, margin: "0 0 1rem 0" }}>
                      {mode.title}
                    </h2>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem", color: "var(--eds-slate)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                      {mode.desc}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem", marginBottom: "1.5rem" }}>
                      {mode.features.map((f) => (
                        <div key={f} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                          <div style={{ width: "18px", height: "18px", background: "rgba(201,150,58,0.12)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <Check size={10} color="var(--eds-gold)" />
                          </div>
                          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", color: "var(--eds-slate)" }}>{f}</span>
                        </div>
                      ))}
                    </div>
                    {mode.certs.length > 0 && (
                      <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                        {mode.certs.map((c) => (
                          <span key={c} style={{ fontFamily: "Inter, sans-serif", fontSize: "0.68rem", color: "var(--eds-navy)", background: "rgba(11,31,58,0.06)", padding: "0.2rem 0.6rem", borderRadius: "2rem", border: "1px solid rgba(11,31,58,0.1)", fontWeight: 600 }}>{c}</span>
                        ))}
                      </div>
                    )}
                  </Reveal>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* CARGAISONS */}
      <section style={{ background: "var(--eds-navy)", padding: "5rem 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", color: "var(--eds-gold)", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 600, marginBottom: "0.75rem" }}>Specialites</div>
              <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "#fff", margin: 0 }}>
                Nos cargaisons de reference
              </h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "rgba(255,255,255,0.08)" }}>
            {CARGOES.map((cargo, i) => (
              <Reveal key={cargo.name} delay={i * 60}>
                <div style={{ background: "rgba(11,31,58,0.6)", padding: "2rem", transition: "background 0.2s ease", cursor: "default" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(201,150,58,0.12)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(11,31,58,0.6)"; }}
                >
                  <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{cargo.icon}</div>
                  <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1rem", color: "#fff", marginBottom: "0.4rem" }}>{cargo.name}</div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>{cargo.detail}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ position: "relative", padding: "7rem 0", overflow: "hidden" }}>
        <img src={GRAIN_IMG} alt="Grain" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(11,31,58,0.88)" }} />
        <div style={{ position: "relative", maxWidth: "1280px", margin: "0 auto", padding: "0 2rem", textAlign: "center" }}>
          <Reveal>
            <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff", margin: "0 0 0.5rem 0" }}>
              Un projet de transport ?
            </h2>
            <p style={{ fontFamily: "Outfit, sans-serif", fontStyle: "italic", fontSize: "clamp(1.4rem, 3vw, 2rem)", color: "var(--eds-gold)", margin: "0 0 2rem 0" }}>
              Reponse sous 24h.
            </p>
            <Link href="/contact" className="eds-btn-primary">
              Demander un devis <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
