/**
 * Freight Forwarding — Euro Docks Service v2
 * Design: Opérateur Maritime — photo-driven, B2B technique
 */

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronRight, Shield } from "lucide-react";

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

function Reveal({ children, className = "", delay = 0, dir = "up" }: {
  children: React.ReactNode; className?: string; delay?: number; dir?: "up" | "left" | "right";
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const t = dir === "left" ? "translateX(-28px)" : dir === "right" ? "translateX(28px)" : "translateY(24px)";
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : t,
      transition: `opacity 0.55s cubic-bezier(0.23,1,0.32,1) ${delay}ms, transform 0.55s cubic-bezier(0.23,1,0.32,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

const IMGS = {
  hero:   "/manus-storage/eds2_grain_loading_6553e85f.jpg",
  rouen:  "/manus-storage/eds2_rouen_grain_087bf488.jpg",
  night:  "/manus-storage/eds2_stevedoring_night_f14f419a.jpg",
  port:   "/manus-storage/eds2_port_dunkerque_9fea8573.jpg",
  bridge: "/manus-storage/eds2_chartering_bridge_e11c603a.jpg",
};

const modes = [
  {
    img: IMGS.port,
    tag: "Voie Navigable",
    title: "Fluvial",
    description: "Transport par voie navigable sur le Rhin, la Seine, la Moselle et le réseau Nord France.",
    routes: [
      { r: "Rhine (Rhin)", d: "Bâle → Rotterdam" },
      { r: "Seine", d: "Paris → Le Havre" },
      { r: "Moselle", d: "Metz → Coblence" },
      { r: "North France", d: "Dunkerque → Paris" },
    ],
    cargos: ["Céréales", "Engrais", "Granulats", "Produits chimiques"],
  },
  {
    img: IMGS.night,
    tag: "Transport Routier",
    title: "Route",
    description: "Réseau de transporteurs agréés pour la distribution nationale et internationale.",
    routes: [
      { r: "France nationale", d: "Tous départements" },
      { r: "Benelux", d: "Belgique · Pays-Bas · Luxembourg" },
      { r: "Allemagne", d: "Rhénanie · Bavière · Hambourg" },
      { r: "Péninsule ibérique", d: "Espagne · Portugal" },
    ],
    cargos: ["Vrac alimentaire", "Acier", "Produits industriels", "Breakbulk"],
  },
  {
    img: IMGS.rouen,
    tag: "Transport Ferroviaire",
    title: "Rail",
    description: "Solutions ferroviaires pour les grands volumes. Connexion directe aux terminaux portuaires.",
    routes: [
      { r: "Rouen → Paris", d: "Terminal grain" },
      { r: "Dunkerque → Lyon", d: "Axe Nord-Sud" },
      { r: "Calais → Strasbourg", d: "Axe Est" },
      { r: "International", d: "Via Eurotunnel" },
    ],
    cargos: ["Céréales", "Charbon", "Minerais", "Produits chimiques"],
  },
];

const certifications = [
  { code: "GMP+", name: "Good Manufacturing Practice", detail: "Certification transport et stockage de matières premières pour l'alimentation animale" },
  { code: "OVAM", name: "Organisme Vlaamse Afvalstoffen", detail: "Enregistrement pour le transport de déchets en Belgique" },
  { code: "OWD", name: "Overheidsdienst Wegverkeer", detail: "Accord de transport de déchets — Pays-Bas" },
  { code: "NIWO", name: "Nationale en Internationale Wegvervoer", detail: "Licence de transport international routier Pays-Bas" },
  { code: "IBG", name: "Inland Barge Group", detail: "Certification voies navigables intérieures européennes" },
];

export default function Freight() {
  return (
    <div className="min-h-screen" style={{ background: "oklch(0.08 0.015 240)" }}>

      {/* ── Hero : chargement grain plein fond ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "500px", paddingTop: "7rem" }}>
        <img src={IMGS.hero} alt="Chargement de grain" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 50%" }} />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to right, oklch(0.08 0.015 240 / 0.92) 0%, oklch(0.08 0.015 240 / 0.60) 55%, oklch(0.08 0.015 240 / 0.25) 100%)"
        }} />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to top, oklch(0.08 0.015 240) 0%, transparent 50%)"
        }} />
        <div className="relative z-10 max-w-[1440px] mx-auto px-5 lg:px-8 pb-16 flex flex-col justify-end" style={{ minHeight: "500px" }}>
          <div className="max-w-2xl">
            <div className="eds-tag mb-4">Freight Forwarding</div>
            <h1 className="eds-h1 mb-4" style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}>
              Transit<br />
              <span className="eds-accent">Multimodal</span>
            </h1>
            <p className="text-base max-w-xl mb-8" style={{ color: "oklch(0.68 0.015 240)", lineHeight: 1.7 }}>
              Spécialiste du transport de grains, céréales et produits agro-industriels par voie navigable, route et rail. Certifié GMP+. Couverture d'assurance jusqu'à 9,5 M€.
            </p>
            <div className="flex flex-wrap gap-2">
              {certifications.map((c) => (
                <span key={c.code} className="eds-badge-amber eds-badge">{c.code}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats rapides ── */}
      <section style={{ background: "oklch(0.12 0.02 240)", borderBottom: "1px solid oklch(1 0 0 / 0.06)" }}>
        <div className="max-w-[1440px] mx-auto px-5 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { v: "2 M€", l: "CA Freight Forwarding" },
              { v: "265 kt", l: "Produits transportés" },
              { v: "9,5 M€", l: "Couverture assurance" },
              { v: "5 000 t", l: "Navires grains GMP+" },
            ].map(({ v, l }) => (
              <div key={l} className="eds-stat-pill">
                <span className="eds-stat-pill-value" style={{ fontSize: "1.5rem" }}>{v}</span>
                <span className="eds-stat-pill-label">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3 modes de transport : cartes photo ── */}
      <section style={{ background: "oklch(0.10 0.015 240)" }}>
        <div className="max-w-[1440px] mx-auto px-5 lg:px-8 py-16 lg:py-20">
          <Reveal className="mb-10">
            <div className="eds-tag mb-4">Modes de transport</div>
            <h2 className="eds-h2">
              Fluvial · Route · Rail<br />
              <span className="eds-accent">Une couverture totale.</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {modes.map((mode, i) => (
              <Reveal key={mode.title} delay={i * 80}>
                <div className="relative overflow-hidden" style={{ height: "560px", borderRadius: "2px" }}>
                  <img
                    src={mode.img}
                    alt={mode.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ transition: "transform 6s ease-out" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.05)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
                  />
                  <div className="absolute inset-0" style={{
                    background: "linear-gradient(to top, oklch(0.06 0.015 240 / 0.96) 0%, oklch(0.06 0.015 240 / 0.60) 50%, oklch(0.06 0.015 240 / 0.20) 100%)"
                  }} />
                  <div className="absolute inset-0 flex flex-col justify-between p-6">
                    <div className="eds-badge-amber eds-badge self-start">{mode.tag}</div>
                    <div>
                      <h3 className="eds-h3 mb-3">{mode.title}</h3>
                      <p className="text-sm mb-4" style={{ color: "oklch(0.68 0.015 240)", lineHeight: 1.6 }}>
                        {mode.description}
                      </p>
                      <div className="mb-4" style={{
                        background: "oklch(0 0 0 / 0.50)",
                        backdropFilter: "blur(8px)",
                        padding: "0.75rem 1rem",
                        border: "1px solid oklch(1 0 0 / 0.08)",
                      }}>
                        {mode.routes.map(({ r, d }) => (
                          <div key={r} className="eds-data-row" style={{ padding: "0.5rem 0" }}>
                            <span className="eds-data-key" style={{ fontSize: "0.68rem" }}>{r}</span>
                            <span className="eds-data-value" style={{ fontSize: "0.72rem" }}>{d}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {mode.cargos.map((c) => (
                          <span key={c} className="eds-badge" style={{ fontSize: "0.55rem" }}>{c}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications : image Rouen + données ── */}
      <section style={{ background: "oklch(0.08 0.015 240)" }}>
        <div className="max-w-[1440px] mx-auto px-5 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <Reveal dir="left">
              <div className="relative" style={{ height: "520px", borderRadius: "2px", overflow: "hidden" }}>
                <img src={IMGS.rouen} alt="Port de Rouen" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "oklch(0.08 0.015 240 / 0.20)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-5" style={{
                  background: "linear-gradient(to top, oklch(0.06 0.015 240 / 0.95) 0%, transparent 100%)"
                }}>
                  <div className="eds-tag mb-2" style={{ fontSize: "0.58rem" }}>Couverture assurance</div>
                  <div style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 800,
                    fontSize: "2.5rem",
                    color: "oklch(0.72 0.14 65)",
                    letterSpacing: "-0.02em",
                  }}>9,5 M€</div>
                  <div className="eds-stat-pill-label">Par opération de transit</div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={80} dir="right">
              <div className="eds-tag mb-4">Certifications & Agréments</div>
              <h2 className="eds-h2 mb-6">
                La conformité<br />
                <span className="eds-accent">comme standard.</span>
              </h2>
              <p className="text-base mb-8" style={{ color: "oklch(0.62 0.015 240)", lineHeight: 1.7 }}>
                Euro Docks Service opère sous un cadre réglementaire strict, avec des certifications reconnues à l'échelle européenne pour le transport de matières premières agricoles et industrielles.
              </p>
              <div className="flex flex-col gap-3">
                {certifications.map((cert, i) => (
                  <Reveal key={cert.code} delay={i * 60}>
                    <div className="flex items-start gap-4 p-4" style={{
                      background: "oklch(0.14 0.03 240)",
                      border: "1px solid oklch(1 0 0 / 0.08)",
                      borderLeft: "2px solid oklch(0.72 0.14 65)",
                    }}>
                      <div className="flex items-center justify-center shrink-0 w-10 h-10" style={{
                        background: "oklch(0.72 0.14 65 / 0.10)",
                        border: "1px solid oklch(0.72 0.14 65 / 0.25)",
                      }}>
                        <Shield size={16} style={{ color: "oklch(0.72 0.14 65)" }} />
                      </div>
                      <div>
                        <div style={{
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontWeight: 700,
                          fontSize: "0.88rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          color: "oklch(0.90 0.01 240)",
                          marginBottom: "0.2rem",
                        }}>{cert.code} — {cert.name}</div>
                        <div className="text-xs" style={{ color: "oklch(0.55 0.015 240)", lineHeight: 1.5 }}>
                          {cert.detail}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Spécialités cargaison : image nuit ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "420px" }}>
        <img src={IMGS.night} alt="Opérations nocturnes" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 60%" }} />
        <div className="absolute inset-0" style={{ background: "oklch(0.08 0.015 240 / 0.85)" }} />
        <div className="relative z-10 max-w-[1440px] mx-auto px-5 lg:px-8 py-16 lg:py-20">
          <Reveal className="mb-10">
            <div className="eds-tag mb-4">Spécialités cargaison</div>
            <h2 className="eds-h2">
              Du grain à l'acier.<br />
              <span className="eds-accent">Chaque cargaison</span><br />
              a son expert.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { cat: "Céréales & Grains", items: ["Blé", "Orge", "Maïs", "Soja", "Colza", "Tournesol"] },
              { cat: "Produits Agro", items: ["Malt", "Farine", "Son", "Pulpe de betterave", "Drèches", "Aliments animaux"] },
              { cat: "Matériaux", items: ["Acier", "Fonte", "Aluminium", "Ciment", "Granulats", "Sable"] },
              { cat: "Produits Chimiques", items: ["Engrais", "Sel", "Soufre", "Kaolin", "Carbonate", "Produits miniers"] },
            ].map(({ cat, items }, i) => (
              <Reveal key={cat} delay={i * 60}>
                <div className="p-5" style={{
                  background: "oklch(0 0 0 / 0.55)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid oklch(1 0 0 / 0.10)",
                  borderTop: "2px solid oklch(0.72 0.14 65)",
                }}>
                  <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "oklch(0.72 0.14 65)" }}>{cat}</div>
                  <div className="flex flex-col gap-1.5">
                    {items.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs" style={{ color: "oklch(0.72 0.01 240)" }}>
                        <ChevronRight size={10} style={{ color: "oklch(0.72 0.14 65)" }} />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "oklch(0.10 0.015 240)" }}>
        <div className="max-w-[1440px] mx-auto px-5 lg:px-8 py-16 lg:py-20">
          <Reveal className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div>
              <div className="eds-tag mb-3">Demander un devis</div>
              <h2 className="eds-h2">
                Un besoin de transit<br />
                <span className="eds-accent">multimodal ?</span>
              </h2>
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              <a href="/contact" className="eds-btn eds-btn-amber">
                Demander un devis <ArrowRight size={14} />
              </a>
              <a href="mailto:commercial@eurodocks.com" className="eds-btn eds-btn-ghost">
                commercial@eurodocks.com
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
