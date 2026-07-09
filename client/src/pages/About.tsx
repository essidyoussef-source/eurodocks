/**
 * À propos — Euro Docks Service v2
 * Design: Opérateur Maritime — photo-driven, B2B maritime, immersif
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
  hero:     "/manus-storage/eds2_hero_bulker_fe8bd601.jpg",
  port:     "/manus-storage/eds2_port_dunkerque_9fea8573.jpg",
  bridge:   "/manus-storage/eds2_chartering_bridge_e11c603a.jpg",
  night:    "/manus-storage/eds2_stevedoring_night_f14f419a.jpg",
  hatch:    "/manus-storage/eds2_hatch_inspection_5a8b030b.jpg",
  grain:    "/manus-storage/eds2_grain_loading_6553e85f.jpg",
};

const timeline = [
  { year: "1975", title: "Fondation", desc: "Création d'Euro Docks Service à Dunkerque. Enregistrement comme courtier en douane maritime sur les ports du Nord." },
  { year: "1985", title: "Expansion", desc: "Ouverture des agences de Boulogne-sur-Mer et Calais. Développement de l'activité d'agence maritime sur la Manche." },
  { year: "1995", title: "Terminal dédié", desc: "Construction du terminal dédié à Boulogne-sur-Mer : 800m de quai, 20 000 m² d'entrepôts GMP+, 57 500 m² de stockage extérieur." },
  { year: "2005", title: "Tramping international", desc: "Développement de l'affrètement tramping sur les marchés Baltic, Continent, Méditerranée et Mer Noire." },
  { year: "2015", title: "Certification GMP+", desc: "Obtention de la certification GMP+ Feed Safety pour le transport et le stockage de matières premières agricoles." },
  { year: "2024", title: "Aujourd'hui", desc: "800+ escales par an, 200+ navires affrétés, 7 M€ de chiffre d'affaires. Leader sur le littoral français." },
];

export default function About() {
  return (
    <div className="min-h-screen" style={{ background: "oklch(0.08 0.015 240)" }}>

      {/* ── Hero : navire plein fond ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "520px", paddingTop: "7rem" }}>
        <img src={IMGS.hero} alt="Euro Docks Service" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 30%" }} />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, oklch(0.08 0.015 240 / 0.55) 0%, oklch(0.08 0.015 240 / 0.90) 100%)"
        }} />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to right, oklch(0.08 0.015 240 / 0.85) 0%, transparent 65%)"
        }} />
        <div className="relative z-10 max-w-[1440px] mx-auto px-5 lg:px-8 pb-16 flex flex-col justify-end" style={{ minHeight: "520px" }}>
          <div className="max-w-2xl">
            <div className="eds-tag mb-4">À propos</div>
            <h1 className="eds-h1 mb-4" style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}>
              50 ans<br />
              <span className="eds-accent">d'expertise</span><br />
              maritime.
            </h1>
            <p className="text-base max-w-xl mb-8" style={{ color: "oklch(0.68 0.015 240)", lineHeight: 1.7 }}>
              Depuis 1975, Euro Docks Service est l'opérateur maritime de référence sur le littoral français. Agence maritime, affrètement tramping, courtage en douane, terminal portuaire — une expertise complète au service des armateurs et affréteurs.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { v: "1975", l: "Année de fondation" },
                { v: "800+", l: "Escales / an" },
                { v: "5", l: "Ports couverts" },
                { v: "7 M€", l: "Chiffre d'affaires" },
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

      {/* ── Portrait : image port + texte ── */}
      <section style={{ background: "oklch(0.10 0.015 240)" }}>
        <div className="max-w-[1440px] mx-auto px-5 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <Reveal dir="left">
              <div className="relative" style={{ height: "560px", borderRadius: "2px", overflow: "hidden" }}>
                <img src={IMGS.port} alt="Port de Dunkerque" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "oklch(0.08 0.015 240 / 0.15)" }} />
                <div className="absolute top-4 left-4 eds-badge-amber eds-badge">
                  <MapPin size={10} className="mr-1" /> Dunkerque — Siège social
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6" style={{
                  background: "linear-gradient(to top, oklch(0.06 0.015 240 / 0.95) 0%, transparent 100%)"
                }}>
                  <div className="text-xs italic mb-2" style={{ color: "oklch(0.72 0.14 65)" }}>
                    « Notre force, c'est la connaissance intime de chaque port, de chaque quai, de chaque opération. »
                  </div>
                  <div className="text-xs" style={{ color: "oklch(0.50 0.015 240)" }}>
                    Direction générale, Euro Docks Service
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={80} dir="right">
              <div className="eds-tag mb-4">Notre histoire</div>
              <h2 className="eds-h2 mb-6">
                L'opérateur<br />
                <span className="eds-accent">de référence</span><br />
                du littoral français.
              </h2>
              <p className="text-base mb-5" style={{ color: "oklch(0.62 0.015 240)", lineHeight: 1.7 }}>
                Fondée en 1975 à Dunkerque, Euro Docks Service s'est imposée comme l'opérateur maritime incontournable sur les principaux ports français. Notre expertise couvre l'ensemble de la chaîne maritime : de l'agence portuaire à l'affrètement tramping, en passant par le courtage en douane et la gestion de terminaux dédiés.
              </p>
              <p className="text-base mb-8" style={{ color: "oklch(0.62 0.015 240)", lineHeight: 1.7 }}>
                Avec 800 escales traitées par an, 200 navires affrétés et une présence dans 5 ports stratégiques, nous offrons à nos clients armateurs et affréteurs une réactivité et une expertise que seule une présence locale de 50 ans peut garantir.
              </p>
              <div className="mb-6" style={{
                background: "oklch(0.14 0.03 240)",
                padding: "1rem 1.25rem",
                border: "1px solid oklch(1 0 0 / 0.08)",
                borderLeft: "2px solid oklch(0.72 0.14 65)",
              }}>
                {[
                  { k: "Siège social", v: "Dunkerque (Nord, France)" },
                  { k: "Fondation", v: "1975" },
                  { k: "Secteur", v: "Agence maritime · Tramping · Logistique" },
                  { k: "Marchés", v: "Baltic · Continent · Méditerranée · Mer Noire" },
                  { k: "Certifications", v: "GMP+ · OVAM · NIWO · IBG" },
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
          </div>
        </div>
      </section>

      {/* ── Timeline : image passerelle plein fond ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "600px" }}>
        <img src={IMGS.bridge} alt="Passerelle de commandement" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 40%" }} />
        <div className="absolute inset-0" style={{ background: "oklch(0.08 0.015 240 / 0.88)" }} />
        <div className="relative z-10 max-w-[1440px] mx-auto px-5 lg:px-8 py-16 lg:py-20">
          <Reveal className="mb-12">
            <div className="eds-tag mb-4">Chronologie</div>
            <h2 className="eds-h2">
              50 ans de<br />
              <span className="eds-accent">présence maritime.</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {timeline.map((item, i) => (
              <Reveal key={item.year} delay={i * 70}>
                <div className="p-5" style={{
                  background: "oklch(0 0 0 / 0.55)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid oklch(1 0 0 / 0.10)",
                  borderTop: i === timeline.length - 1 ? "2px solid oklch(0.72 0.14 65)" : "1px solid oklch(1 0 0 / 0.10)",
                }}>
                  <div style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 800,
                    fontSize: "2.5rem",
                    color: i === timeline.length - 1 ? "oklch(0.72 0.14 65)" : "oklch(0.35 0.015 240)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                    marginBottom: "0.5rem",
                  }}>{item.year}</div>
                  <div className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: "oklch(0.88 0.01 240)" }}>
                    {item.title}
                  </div>
                  <div className="text-xs leading-relaxed" style={{ color: "oklch(0.58 0.015 240)" }}>
                    {item.desc}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Valeurs : image nuit + liste ── */}
      <section style={{ background: "oklch(0.10 0.015 240)" }}>
        <div className="max-w-[1440px] mx-auto px-5 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <Reveal delay={80} dir="left">
              <div className="eds-tag mb-4">Nos valeurs</div>
              <h2 className="eds-h2 mb-6">
                Réactivité.<br />
                <span className="eds-accent">Expertise.</span><br />
                Proximité.
              </h2>
              <p className="text-base mb-8" style={{ color: "oklch(0.62 0.015 240)", lineHeight: 1.7 }}>
                Dans un secteur où chaque heure d'immobilisation coûte, notre valeur ajoutée repose sur trois piliers : la réactivité opérationnelle 24h/24, l'expertise technique accumulée en 50 ans, et la proximité physique avec chaque port d'opération.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { n: "01", title: "Réactivité 24h/24", desc: "Équipes disponibles à toute heure pour les urgences portuaires, les changements d'ETA et les incidents de cargaison." },
                  { n: "02", title: "Expertise sectorielle", desc: "50 ans de présence sur les marchés du vrac sec, du breakbulk et du tramping. Connaissance intime de chaque terminal." },
                  { n: "03", title: "Réseau local", desc: "Présence physique dans 5 ports stratégiques. Relations établies avec toutes les autorités portuaires françaises." },
                  { n: "04", title: "Conformité réglementaire", desc: "Certifications GMP+, OVAM, NIWO, IBG. Courtier en douane enregistré depuis 1975." },
                ].map((v, i) => (
                  <Reveal key={v.n} delay={i * 60}>
                    <div className="flex items-start gap-4 p-4" style={{
                      background: "oklch(0.14 0.03 240)",
                      border: "1px solid oklch(1 0 0 / 0.08)",
                      borderLeft: "2px solid oklch(0.72 0.14 65)",
                    }}>
                      <div className="flex items-center justify-center shrink-0 w-8 h-8" style={{
                        background: "oklch(0.72 0.14 65 / 0.10)",
                        border: "1px solid oklch(0.72 0.14 65 / 0.25)",
                      }}>
                        <div style={{
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontWeight: 800,
                          fontSize: "0.75rem",
                          color: "oklch(0.72 0.14 65)",
                        }}>{v.n}</div>
                      </div>
                      <div>
                        <div className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: "oklch(0.90 0.01 240)" }}>
                          {v.title}
                        </div>
                        <div className="text-xs leading-relaxed" style={{ color: "oklch(0.55 0.015 240)" }}>
                          {v.desc}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            <Reveal dir="right">
              <div className="relative" style={{ height: "640px", borderRadius: "2px", overflow: "hidden" }}>
                <img src={IMGS.night} alt="Opérations nocturnes" className="w-full h-full object-cover" style={{ objectPosition: "center 50%" }} />
                <div className="absolute inset-0" style={{ background: "oklch(0.08 0.015 240 / 0.25)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-5" style={{
                  background: "linear-gradient(to top, oklch(0.06 0.015 240 / 0.95) 0%, transparent 100%)"
                }}>
                  <div className="eds-tag mb-3" style={{ fontSize: "0.58rem" }}>Zones d'opération</div>
                  <div className="flex flex-col gap-2">
                    {[
                      { port: "Dunkerque", role: "Siège social · Agence & Tramping" },
                      { port: "Boulogne-sur-Mer", role: "Terminal dédié · 800m de quai" },
                      { port: "Rouen", role: "Terminaux grain · 3,6 Mt/an" },
                      { port: "Bayonne", role: "Agence maritime & Transit" },
                      { port: "Calais", role: "Agence maritime" },
                    ].map(({ port, role }) => (
                      <div key={port} className="flex items-start gap-2">
                        <MapPin size={10} className="mt-0.5 shrink-0" style={{ color: "oklch(0.72 0.14 65)" }} />
                        <div>
                          <div className="text-xs font-semibold" style={{ color: "oklch(0.88 0.01 240)" }}>{port}</div>
                          <div style={{ fontSize: "0.6rem", color: "oklch(0.50 0.015 240)" }}>{role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Clients : image grain plein fond ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "400px" }}>
        <img src={IMGS.grain} alt="Chargement de grain" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 50%" }} />
        <div className="absolute inset-0" style={{ background: "oklch(0.08 0.015 240 / 0.88)" }} />
        <div className="relative z-10 max-w-[1440px] mx-auto px-5 lg:px-8 py-16 lg:py-20">
          <Reveal className="mb-10">
            <div className="eds-tag mb-4">Clients de référence</div>
            <h2 className="eds-h2">
              Les plus grands<br />
              <span className="eds-accent">nous font confiance.</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { name: "Glencore", sector: "Trading" },
              { name: "Bunge", sector: "Agri-commodities" },
              { name: "Soufflet", sector: "Céréales" },
              { name: "Louis Dreyfus", sector: "Trading" },
              { name: "Cargill", sector: "Agri-commodities" },
              { name: "ArcelorMittal", sector: "Sidérurgie" },
              { name: "Lafarge", sector: "Matériaux" },
              { name: "Roquette", sector: "Agroalimentaire" },
              { name: "Tereos", sector: "Sucre & Amidon" },
              { name: "Eqiom", sector: "Matériaux" },
            ].map(({ name, sector }, i) => (
              <Reveal key={name} delay={i * 40}>
                <div className="p-4 text-center" style={{
                  background: "oklch(0 0 0 / 0.55)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid oklch(1 0 0 / 0.10)",
                }}>
                  <div className="text-sm font-bold" style={{ color: "oklch(0.90 0.01 240)" }}>{name}</div>
                  <div style={{ fontSize: "0.6rem", color: "oklch(0.50 0.015 240)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "0.25rem" }}>
                    {sector}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "340px" }}>
        <img src={IMGS.hatch} alt="Inspection cale" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 40%" }} />
        <div className="absolute inset-0" style={{ background: "oklch(0.08 0.015 240 / 0.85)" }} />
        <div className="relative z-10 max-w-[1440px] mx-auto px-5 lg:px-8 py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <Reveal>
              <div className="eds-tag mb-3">Travailler avec nous</div>
              <h2 className="eds-h2">
                Un projet maritime ?<br />
                <span className="eds-accent">Parlons-en.</span>
              </h2>
            </Reveal>
            <Reveal delay={100} dir="right">
              <div className="flex flex-col gap-3">
                <a href="/contact" className="eds-btn eds-btn-amber">
                  Nous contacter <ArrowRight size={14} />
                </a>
                <a href="/services" className="eds-btn eds-btn-ghost">
                  Voir nos services
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
