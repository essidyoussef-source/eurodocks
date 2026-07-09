/**
 * Port Terminal — Euro Docks Service v2
 * Design: Opérateur Maritime — photo-driven, B2B technique
 */

import { useEffect, useRef, useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";

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
  hero:     "/manus-storage/eds2_boulogne_terminal_718d1e0f.jpg",
  boulogne: "/manus-storage/eds2_boulogne_terminal_718d1e0f.jpg",
  rouen:    "/manus-storage/eds2_rouen_grain_087bf488.jpg",
  night:    "/manus-storage/eds2_stevedoring_night_f14f419a.jpg",
  hatch:    "/manus-storage/eds2_hatch_inspection_5a8b030b.jpg",
};

export default function Terminal() {
  return (
    <div className="min-h-screen" style={{ background: "oklch(0.08 0.015 240)" }}>

      {/* ── Hero : terminal Boulogne plein fond ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "520px", paddingTop: "7rem" }}>
        <img src={IMGS.hero} alt="Terminal Boulogne-sur-Mer" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 40%" }} />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, oklch(0.08 0.015 240 / 0.65) 0%, oklch(0.08 0.015 240 / 0.90) 100%)"
        }} />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to right, oklch(0.08 0.015 240 / 0.80) 0%, transparent 60%)"
        }} />
        <div className="relative z-10 max-w-[1440px] mx-auto px-5 lg:px-8 pb-16 flex flex-col justify-end" style={{ minHeight: "520px" }}>
          <div className="max-w-2xl">
            <div className="eds-tag mb-4">Port Terminal</div>
            <h1 className="eds-h1 mb-4" style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}>
              Terminal<br />
              <span className="eds-accent">Portuaire</span>
            </h1>
            <p className="text-base max-w-xl mb-8" style={{ color: "oklch(0.68 0.015 240)", lineHeight: 1.7 }}>
              800 mètres de quai à Boulogne-sur-Mer, 77 500 m² de stockage certifié GMP+, et une présence dans tous les terminaux grain du port de Rouen.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { v: "800 m", l: "Linéaire de quai" },
                { v: "4", l: "Postes à quai" },
                { v: "77 500 m²", l: "Stockage total" },
                { v: "4,5 Mt", l: "Capacité annuelle" },
              ].map(({ v, l }) => (
                <div key={l} className="eds-stat-pill">
                  <span className="eds-stat-pill-value" style={{ fontSize: "1.3rem" }}>{v}</span>
                  <span className="eds-stat-pill-label">{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Terminal Boulogne : image + données ── */}
      <section style={{ background: "oklch(0.10 0.015 240)" }}>
        <div className="max-w-[1440px] mx-auto px-5 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <Reveal dir="left">
              <div className="relative" style={{ height: "560px", borderRadius: "2px", overflow: "hidden" }}>
                <img src={IMGS.boulogne} alt="Terminal Boulogne-sur-Mer" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "oklch(0.08 0.015 240 / 0.20)" }} />
                <div className="absolute top-4 left-4 eds-badge-amber eds-badge">
                  <MapPin size={10} className="mr-1" /> Boulogne-sur-Mer
                </div>
                <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-2">
                  {[
                    { v: "800 m", l: "Linéaire de quai" },
                    { v: "4", l: "Postes à quai" },
                    { v: "20 000 m²", l: "Entrepôts GMP+" },
                    { v: "57 500 m²", l: "Stockage extérieur" },
                  ].map(({ v, l }) => (
                    <div key={l} className="eds-stat-pill" style={{ padding: "0.6rem 0.9rem" }}>
                      <span className="eds-stat-pill-value" style={{ fontSize: "1rem" }}>{v}</span>
                      <span className="eds-stat-pill-label">{l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={80} dir="right">
              <div className="eds-tag mb-4">Terminal Boulogne-sur-Mer</div>
              <h2 className="eds-h2 mb-6">
                Le terminal<br />
                <span className="eds-accent">de référence</span><br />
                de la Manche.
              </h2>
              <p className="text-base mb-6" style={{ color: "oklch(0.62 0.015 240)", lineHeight: 1.7 }}>
                Situé dans le port de Boulogne-sur-Mer, notre terminal dispose de 800 mètres de quai, 4 postes à quai, des entrepôts certifiés GMP+ et 57 500 m² de stockage extérieur.
              </p>

              <div className="mb-6" style={{
                background: "oklch(0.14 0.03 240)",
                padding: "1rem 1.25rem",
                border: "1px solid oklch(1 0 0 / 0.08)",
                borderLeft: "2px solid oklch(0.72 0.14 65)",
              }}>
                {[
                  { k: "Linéaire de quai", v: "800 mètres" },
                  { k: "Postes à quai", v: "4 postes" },
                  { k: "Entrepôts GMP+", v: "20 000 m²" },
                  { k: "Stockage extérieur", v: "57 500 m²" },
                  { k: "Tirant d'eau max", v: "10,5 mètres" },
                  { k: "Capacité annuelle", v: "2,5 Mt" },
                  { k: "Certification", v: "GMP+ Feed Safety" },
                ].map(({ k, v }) => (
                  <div key={k} className="eds-data-row">
                    <span className="eds-data-key">{k}</span>
                    <span className="eds-data-value" style={{ fontSize: "0.82rem" }}>{v}</span>
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <div className="eds-tag mb-3" style={{ fontSize: "0.58rem" }}>Cargaisons traitées</div>
                <div className="flex flex-wrap gap-1.5">
                  {["Céréales", "Engrais", "Acier", "Granulats", "Bois", "Sel", "Charbon", "Produits chimiques"].map((c) => (
                    <span key={c} className="eds-badge" style={{ fontSize: "0.6rem" }}>{c}</span>
                  ))}
                </div>
              </div>

              <a href="/contact" className="eds-btn eds-btn-amber">
                Demander un devis <ArrowRight size={14} />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Opérations nocturnes : plein fond ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "420px" }}>
        <img src={IMGS.night} alt="Opérations nocturnes" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 60%" }} />
        <div className="absolute inset-0" style={{ background: "oklch(0.08 0.015 240 / 0.82)" }} />
        <div className="relative z-10 max-w-[1440px] mx-auto px-5 lg:px-8 py-16 lg:py-20">
          <Reveal className="mb-10">
            <div className="eds-tag mb-4">Opérations de manutention</div>
            <h2 className="eds-h2">
              60 éoliennes.<br />
              <span className="eds-accent">Des opérations</span><br />
              hors normes.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { title: "Manutention vrac", items: ["Céréales & grains", "Engrais", "Granulats", "Charbon", "Sel"] },
              { title: "Breakbulk", items: ["Acier en bobines", "Tubes & profilés", "Bois & panneaux", "Colis industriels"] },
              { title: "Heavy Lift", items: ["Éoliennes (60 unités)", "Générateurs", "Équipements industriels", "Pièces hors gabarit"] },
              { title: "Liquides", items: ["Huiles végétales", "Mélasses", "Produits chimiques", "Bitume"] },
            ].map(({ title, items }, i) => (
              <Reveal key={title} delay={i * 60}>
                <div className="p-5" style={{
                  background: "oklch(0 0 0 / 0.55)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid oklch(1 0 0 / 0.10)",
                  borderTop: "2px solid oklch(0.72 0.14 65)",
                }}>
                  <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "oklch(0.72 0.14 65)" }}>{title}</div>
                  {items.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs mb-1.5" style={{ color: "oklch(0.72 0.01 240)" }}>
                      <div className="w-1 h-1 rounded-full shrink-0" style={{ background: "oklch(0.72 0.14 65)" }} />
                      {item}
                    </div>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Terminal Rouen : image + données ── */}
      <section style={{ background: "oklch(0.10 0.015 240)" }}>
        <div className="max-w-[1440px] mx-auto px-5 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <Reveal delay={80} dir="left">
              <div className="eds-tag mb-4">Terminal Rouen</div>
              <h2 className="eds-h2 mb-6">
                Premier port<br />
                <span className="eds-accent">céréalier</span><br />
                d'Europe.
              </h2>
              <p className="text-base mb-6" style={{ color: "oklch(0.62 0.015 240)", lineHeight: 1.7 }}>
                Présence dans tous les terminaux grain du port de Rouen, premier port céréalier d'Europe. Notre équipe locale gère l'ensemble des opérations d'agence maritime et de transit.
              </p>

              <div className="mb-6" style={{
                background: "oklch(0.14 0.03 240)",
                padding: "1rem 1.25rem",
                border: "1px solid oklch(1 0 0 / 0.08)",
                borderLeft: "2px solid oklch(0.72 0.14 65)",
              }}>
                {[
                  { k: "Capacité annuelle", v: "3,6 Mt / an" },
                  { k: "Spécialité", v: "Céréales & grains" },
                  { k: "Rang européen", v: "1er port céréalier d'Europe" },
                  { k: "Terminaux couverts", v: "Senalia · Soufflet · Beuzelin · Lustucru · Radicatel · Lecureur · Simarex" },
                  { k: "Services", v: "Agence · Transit · Survey" },
                ].map(({ k, v }) => (
                  <div key={k} className="eds-data-row">
                    <span className="eds-data-key">{k}</span>
                    <span className="eds-data-value" style={{ fontSize: "0.78rem" }}>{v}</span>
                  </div>
                ))}
              </div>

              <a href="/contact" className="eds-btn eds-btn-amber">
                Nous contacter <ArrowRight size={14} />
              </a>
            </Reveal>

            <Reveal dir="right">
              <div className="relative" style={{ height: "520px", borderRadius: "2px", overflow: "hidden" }}>
                <img src={IMGS.rouen} alt="Port de Rouen" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "oklch(0.08 0.015 240 / 0.20)" }} />
                <div className="absolute top-4 left-4 eds-badge-amber eds-badge">
                  <MapPin size={10} className="mr-1" /> Rouen
                </div>
                <div className="absolute bottom-4 right-4 eds-stat-pill">
                  <span className="eds-stat-pill-value">3,6 Mt</span>
                  <span className="eds-stat-pill-label">Capacité annuelle</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CTA : image hatch plein fond ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "360px" }}>
        <img src={IMGS.hatch} alt="Inspection cale" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 40%" }} />
        <div className="absolute inset-0" style={{ background: "oklch(0.08 0.015 240 / 0.85)" }} />
        <div className="relative z-10 max-w-[1440px] mx-auto px-5 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <Reveal>
              <div className="eds-tag mb-4">Prise de contact</div>
              <h2 className="eds-h2 mb-4">
                Un projet<br />
                <span className="eds-accent">de terminal ?</span>
              </h2>
              <p className="text-base mb-6 max-w-md" style={{ color: "oklch(0.68 0.015 240)", lineHeight: 1.7 }}>
                Notre équipe étudie votre besoin de stockage ou de manutention et vous propose une solution adaptée.
              </p>
              <a href="/contact" className="eds-btn eds-btn-amber">
                Demander un devis <ArrowRight size={14} />
              </a>
            </Reveal>
            <Reveal delay={120} dir="right">
              <div className="flex flex-col gap-3">
                {[
                  { stat: "24h", label: "Délai de réponse" },
                  { stat: "2 sites", label: "Boulogne + Rouen" },
                  { stat: "GMP+", label: "Certification qualité" },
                ].map(({ stat, label }) => (
                  <div key={stat} className="flex items-center gap-4 p-4" style={{
                    background: "oklch(0 0 0 / 0.55)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid oklch(1 0 0 / 0.10)",
                  }}>
                    <div style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 800,
                      fontSize: "1.8rem",
                      color: "oklch(0.72 0.14 65)",
                      letterSpacing: "-0.02em",
                      minWidth: "4.5rem",
                    }}>{stat}</div>
                    <div className="text-sm" style={{ color: "oklch(0.68 0.01 240)" }}>{label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
