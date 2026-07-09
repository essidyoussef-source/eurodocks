/**
 * Home — Euro Docks Service v2
 * Design: Opérateur Maritime — photo-driven, B2B, immersif
 * Chaque section = une image cinématique plein fond + contenu technique superposé
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "wouter";
import {
  Anchor, Ship, Truck, Warehouse, BarChart3, Shield,
  ArrowRight, ChevronDown, ChevronRight, MapPin, Globe
} from "lucide-react";

// ─── Hook scroll reveal ──────────────────────────────────────
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

// ─── Hook count-up ──────────────────────────────────────────
function useCountUp(target: number, duration = 1800, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return count;
}

// ─── Composant Reveal ───────────────────────────────────────
function Reveal({ children, className = "", delay = 0, direction = "up" }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const transforms: Record<string, string> = {
    up: "translateY(28px)",
    left: "translateX(-28px)",
    right: "translateX(28px)",
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : transforms[direction],
        transition: `opacity 0.6s cubic-bezier(0.23,1,0.32,1) ${delay}ms, transform 0.6s cubic-bezier(0.23,1,0.32,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Composant StatPill ─────────────────────────────────────
function StatPill({ value, suffix, label, active }: {
  value: number; suffix: string; label: string; active: boolean;
}) {
  const count = useCountUp(value, 1600, active);
  return (
    <div className="eds-stat-pill">
      <span className="eds-stat-pill-value">{count.toLocaleString("fr-FR")}{suffix}</span>
      <span className="eds-stat-pill-label">{label}</span>
    </div>
  );
}

// ─── Composant ServiceCard photo ────────────────────────────
function ServiceCard({ img, tag, title, details, href, tall = false }: {
  img: string; tag: string; title: string; details: string[];
  href: string; tall?: boolean;
}) {
  return (
    <Link href={href}>
      <div
        className="eds-service-card"
        style={{ height: tall ? "480px" : "360px", borderRadius: "2px" }}
      >
        <img src={img} alt={title} className="eds-photo-bg" />
        <div className="eds-service-card-overlay" />
        <div className="eds-service-card-content">
          <div className="eds-tag mb-3" style={{ fontSize: "0.6rem" }}>{tag}</div>
          <h3 className="eds-h3 mb-2">{title}</h3>
          <div className="eds-service-card-details">
            <div className="eds-rule mb-3" style={{ marginTop: "0.75rem" }} />
            <ul className="flex flex-col gap-1.5">
              {details.map((d) => (
                <li key={d} className="flex items-start gap-2 text-xs" style={{ color: "oklch(0.72 0.01 240)" }}>
                  <ChevronRight size={11} className="mt-0.5 shrink-0" style={{ color: "oklch(0.72 0.14 65)" }} />
                  {d}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest" style={{ color: "oklch(0.72 0.14 65)" }}>
              En savoir plus <ArrowRight size={11} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Images ─────────────────────────────────────────────────
const IMGS = {
  hero:        "/manus-storage/eds2_hero_bulker_fe8bd601.jpg",
  port:        "/manus-storage/eds2_port_dunkerque_9fea8573.jpg",
  bridge:      "/manus-storage/eds2_chartering_bridge_e11c603a.jpg",
  grain:       "/manus-storage/eds2_grain_loading_6553e85f.jpg",
  survey:      "/manus-storage/eds2_survey_draught_9d86258e.jpg",
  night:       "/manus-storage/eds2_stevedoring_night_f14f419a.jpg",
  boulogne:    "/manus-storage/eds2_boulogne_terminal_718d1e0f.jpg",
  tramping:    "/manus-storage/eds2_tramping_sea_fd8a56f5.jpg",
  rouen:       "/manus-storage/eds2_rouen_grain_087bf488.jpg",
  hatch:       "/manus-storage/eds2_hatch_inspection_5a8b030b.jpg",
  // Fallbacks anciens
  heroOld:     "/manus-storage/eds_hero_ship_5b197371.jpg",
  chartering:  "/manus-storage/eds_chartering_1f6cba1a.jpg",
  stevedoring: "/manus-storage/eds_stevedoring_5289e3b9.jpg",
};

// ─── PAGE ────────────────────────────────────────────────────
export default function Home() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStatsVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.08 0.015 240)" }}>

      {/* ══════════════════════════════════════════════════════
          HERO — Plein écran, navire Panamax, stats superposées
      ══════════════════════════════════════════════════════ */}
      <section className="eds-photo-section" style={{ height: "100vh", minHeight: "700px" }}>
        <img src={IMGS.hero} alt="Bulk carrier en mer" className="eds-photo-bg" style={{ objectPosition: "center 35%" }} />
        {/* Overlay gradient bas */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to top, oklch(0.08 0.015 240) 0%, oklch(0.08 0.015 240 / 0.65) 35%, oklch(0.08 0.015 240 / 0.20) 70%, transparent 100%)"
        }} />
        {/* Overlay gauche */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to right, oklch(0.08 0.015 240 / 0.80) 0%, oklch(0.08 0.015 240 / 0.30) 50%, transparent 100%)"
        }} />

        {/* Contenu hero */}
        <div className="absolute inset-0 flex flex-col justify-end pb-16 lg:pb-20">
          <div className="max-w-[1440px] mx-auto px-5 lg:px-8 w-full">
            <div className="max-w-3xl">
              <div className="eds-tag mb-5">Agence Maritime & Tramping — Depuis 1975</div>
              <h1 className="eds-h1 mb-6">
                L'intelligence<br />
                opérationnelle<br />
                <span className="eds-accent">au service</span><br />
                de votre cargo.
              </h1>
              <p className="text-base lg:text-lg mb-8 max-w-xl" style={{
                color: "oklch(0.75 0.01 240)",
                fontWeight: 400,
                lineHeight: 1.65,
              }}>
                Spécialiste du tramping, de l'affrètement dry bulk et des terminaux portuaires sur les ports de Dunkerque, Boulogne-sur-Mer, Rouen et Bayonne.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="/contact" className="eds-btn eds-btn-amber">
                  Demander un devis <ArrowRight size={14} />
                </a>
                <a href="/services" className="eds-btn eds-btn-ghost">
                  Nos expertises
                </a>
              </div>
            </div>

            {/* Stats superposées en bas à droite */}
            <div ref={statsRef} className="hidden lg:flex gap-3 absolute bottom-16 right-8">
              <StatPill value={800} suffix="" label="Escales / an" active={statsVisible} />
              <StatPill value={200} suffix="" label="Navires affrétés" active={statsVisible} />
              <StatPill value={4500} suffix=" kt" label="Vrac traité" active={statsVisible} />
              <StatPill value={7} suffix=" M€" label="Chiffre d'affaires" active={statsVisible} />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
          <ChevronDown size={18} style={{ color: "oklch(0.72 0.14 65)" }} />
        </div>
      </section>

      {/* Stats mobile */}
      <div className="lg:hidden grid grid-cols-2 gap-2 px-4 py-6" style={{ background: "oklch(0.10 0.015 240)" }}>
        <StatPill value={800} suffix="" label="Escales / an" active={true} />
        <StatPill value={200} suffix="" label="Navires affrétés" active={true} />
        <StatPill value={4500} suffix=" kt" label="Vrac traité" active={true} />
        <StatPill value={7} suffix=" M€" label="Chiffre d'affaires" active={true} />
      </div>

      {/* ══════════════════════════════════════════════════════
          SECTION 2 — SERVICES : grille de cartes photo
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24" style={{ background: "oklch(0.10 0.015 240)" }}>
        <div className="max-w-[1440px] mx-auto px-5 lg:px-8">
          <Reveal className="mb-10">
            <div className="eds-tag mb-4">Nos expertises</div>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <h2 className="eds-h2" style={{ maxWidth: "600px" }}>
                Une gamme complète<br />
                <span className="eds-accent">de services maritimes</span>
              </h2>
              <p className="text-sm max-w-sm" style={{ color: "oklch(0.60 0.015 240)", lineHeight: 1.7 }}>
                De l'agence maritime au transit multimodal, en passant par l'affrètement tramping et les opérations de terminal — EDS couvre l'intégralité de la chaîne logistique maritime.
              </p>
            </div>
          </Reveal>

          {/* Grille de cartes photo */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <Reveal delay={0}>
              <ServiceCard
                img={IMGS.heroOld}
                tag="Shipping Agency"
                title="Agence Maritime"
                details={[
                  "Husbandry & Protective services",
                  "Dry/liquid bulk, Liner, Breakbulk",
                  "Heavy lift & Project cargo",
                  "Dunkirk, Boulogne, Calais, Rouen, Bayonne",
                ]}
                href="/services"
                tall
              />
            </Reveal>
            <Reveal delay={60}>
              <ServiceCard
                img={IMGS.tramping}
                tag="Chartering & Tramping"
                title="Affrètement Tramping"
                details={[
                  "Coaster à Panamax vessels",
                  "Dry bulk, Breakbulk, Heavy lift",
                  "Baltic, Continent, Med, Black Sea",
                  "200 navires affrétés / an",
                ]}
                href="/services"
                tall
              />
            </Reveal>
            <Reveal delay={120}>
              <div className="flex flex-col gap-3">
                <ServiceCard
                  img={IMGS.survey}
                  tag="Maritime Survey"
                  title="Expertise Maritime"
                  details={[
                    "Draught surveying",
                    "Ultrasonic leak test (Hose test)",
                    "On/Off-hire survey",
                    "Insurance / P&I reports",
                  ]}
                  href="/services"
                />
                <ServiceCard
                  img={IMGS.grain}
                  tag="Customs Brokerage"
                  title="Courtage en Douane"
                  details={[
                    "Registered customs broker depuis 1975",
                    "Deposit & Garantee",
                    "Dunkirk, Boulogne, Calais, Rouen",
                  ]}
                  href="/services"
                />
              </div>
            </Reveal>
          </div>

          {/* Ligne 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            <Reveal delay={0}>
              <ServiceCard
                img={IMGS.night}
                tag="Freight Forwarding"
                title="Transit Multimodal"
                details={[
                  "Rhine, North France, Mosel, Seine",
                  "Bulk, steel, break products",
                  "GMP+ certified (grains)",
                  "Couverture assurance 9,5 M€",
                ]}
                href="/freight"
              />
            </Reveal>
            <Reveal delay={60}>
              <ServiceCard
                img={IMGS.boulogne}
                tag="Port Terminal"
                title="Terminal Portuaire"
                details={[
                  "800m de quai — Boulogne-sur-Mer",
                  "Entrepôts 20 000 m² GMP+",
                  "Stockage extérieur 57 500 m²",
                  "3,6 Mt/an — Rouen",
                ]}
                href="/terminal"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 3 — CHARTERING : image plein fond + contenu technique gauche
      ══════════════════════════════════════════════════════ */}
      <section className="eds-photo-section" style={{ minHeight: "600px" }}>
        <img src={IMGS.bridge} alt="Passerelle de navigation" className="eds-photo-bg" />
        <div className="eds-overlay-right" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-5 lg:px-8 py-20 lg:py-28">
          <div className="max-w-xl">
            <Reveal>
              <div className="eds-tag mb-5">Chartering & Tramping</div>
              <h2 className="eds-h2 mb-6">
                800 escales.<br />
                <span className="eds-accent">Zéro surprise.</span>
              </h2>
              <p className="text-base mb-8" style={{ color: "oklch(0.72 0.01 240)", lineHeight: 1.7 }}>
                Notre équipe d'affrètement opère sur les marchés Baltique, Continent, Méditerranée et Mer Noire. Du coaster au Panamax, nous négocions et gérons chaque opération avec la précision d'un partenaire de confiance.
              </p>

              {/* Tableau technique */}
              <div className="mb-8" style={{ background: "oklch(0 0 0 / 0.55)", backdropFilter: "blur(12px)", padding: "1.25rem", border: "1px solid oklch(1 0 0 / 0.10)" }}>
                {[
                  { k: "Marchés couverts", v: "Baltic · Continent · Med · Black Sea" },
                  { k: "Types de navires", v: "Coaster · Handysize · Supramax · Panamax" },
                  { k: "Cargaisons", v: "Dry Bulk · Breakbulk · Heavy Lift · Project" },
                  { k: "Navires affrétés / an", v: "200+" },
                ].map(({ k, v }) => (
                  <div key={k} className="eds-data-row">
                    <span className="eds-data-key">{k}</span>
                    <span className="eds-data-value" style={{ fontSize: "0.82rem" }}>{v}</span>
                  </div>
                ))}
              </div>

              <a href="/services" className="eds-btn eds-btn-amber">
                Consulter nos capacités <ArrowRight size={14} />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 4 — TERMINAL : image droite + données gauche
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "oklch(0.10 0.015 240)" }}>
        <div className="max-w-[1440px] mx-auto px-5 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Contenu */}
            <Reveal direction="left">
              <div className="eds-tag mb-5">Port Terminal</div>
              <h2 className="eds-h2 mb-6">
                Des terminaux dédiés.<br />
                <span className="eds-accent">Une infrastructure</span><br />
                de premier rang.
              </h2>
              <p className="text-base mb-8" style={{ color: "oklch(0.62 0.015 240)", lineHeight: 1.7 }}>
                À Boulogne-sur-Mer, 800 mètres de quai, 4 postes à quai, des entrepôts certifiés GMP+ et 57 500 m² de stockage extérieur. À Rouen, une présence dans tous les terminaux grain du port.
              </p>

              {/* Grille de capacités */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { value: "800 m", label: "Linéaire de quai" },
                  { value: "20 000 m²", label: "Entrepôts GMP+" },
                  { value: "57 500 m²", label: "Stockage extérieur" },
                  { value: "4,5 Mt", label: "Capacité annuelle" },
                ].map(({ value, label }) => (
                  <div key={label} className="eds-stat-pill">
                    <span className="eds-stat-pill-value" style={{ fontSize: "1.4rem" }}>{value}</span>
                    <span className="eds-stat-pill-label">{label}</span>
                  </div>
                ))}
              </div>

              <a href="/terminal" className="eds-btn eds-btn-outline-amber">
                Voir le terminal <ArrowRight size={14} />
              </a>
            </Reveal>

            {/* Image */}
            <Reveal direction="right">
              <div className="relative" style={{ height: "520px", borderRadius: "2px", overflow: "hidden" }}>
                <img src={IMGS.boulogne} alt="Terminal Boulogne-sur-Mer" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "oklch(0.08 0.015 240 / 0.25)" }} />
                {/* Badge port */}
                <div className="absolute top-4 left-4 eds-badge-amber eds-badge">
                  <MapPin size={10} className="mr-1" /> Boulogne-sur-Mer
                </div>
                {/* Stat overlay */}
                <div className="absolute bottom-4 right-4 eds-stat-pill">
                  <span className="eds-stat-pill-value">4</span>
                  <span className="eds-stat-pill-label">Postes à quai</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 5 — OPÉRATIONS NOCTURNES : plein fond
      ══════════════════════════════════════════════════════ */}
      <section className="eds-photo-section" style={{ minHeight: "520px" }}>
        <img src={IMGS.night} alt="Opérations nocturnes" className="eds-photo-bg" style={{ objectPosition: "center 60%" }} />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, oklch(0.08 0.015 240 / 0.55) 0%, oklch(0.08 0.015 240 / 0.80) 100%)"
        }} />
        <div className="relative z-10 max-w-[1440px] mx-auto px-5 lg:px-8 py-20 lg:py-28 flex flex-col items-center text-center">
          <Reveal>
            <div className="eds-tag mb-5" style={{ justifyContent: "center" }}>Stevedoring & Manutention</div>
            <h2 className="eds-h2 mb-4" style={{ maxWidth: "700px", margin: "0 auto 1.5rem" }}>
              60 éoliennes manutentionnées.<br />
              <span className="eds-accent">Des projets hors normes.</span>
            </h2>
            <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: "oklch(0.72 0.01 240)", lineHeight: 1.7 }}>
              De la céréale en vrac aux générateurs industriels, notre équipe dédiée maîtrise chaque type de cargaison avec des solutions sur mesure.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {["Dry Bulk", "Breakbulk", "Heavy Lift", "Project Cargo", "Tanker", "Liquid Bulk"].map((m) => (
                <span key={m} className="eds-badge">{m}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 6 — FREIGHT : image + données techniques
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "oklch(0.10 0.015 240)" }}>
        <div className="max-w-[1440px] mx-auto px-5 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image */}
            <Reveal direction="left">
              <div className="relative" style={{ height: "480px", borderRadius: "2px", overflow: "hidden" }}>
                <img src={IMGS.grain} alt="Chargement de grain" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "oklch(0.08 0.015 240 / 0.20)" }} />
                {/* Badge certification */}
                <div className="absolute bottom-4 left-4 flex flex-col gap-2">
                  {["GMP+ Certified", "OVAM Registered", "NIWO Licensed"].map((cert) => (
                    <span key={cert} className="eds-badge-amber eds-badge" style={{ fontSize: "0.58rem" }}>{cert}</span>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Contenu */}
            <Reveal direction="right">
              <div className="eds-tag mb-5">Freight Forwarding</div>
              <h2 className="eds-h2 mb-6">
                Transit multimodal<br />
                <span className="eds-accent">certifié GMP+</span>
              </h2>
              <p className="text-base mb-6" style={{ color: "oklch(0.62 0.015 240)", lineHeight: 1.7 }}>
                Spécialiste du transport de grains, céréales et produits agro-industriels par voie navigable, route et rail. Couverture d'assurance jusqu'à 9,5 M€.
              </p>

              {/* Routes couvertes */}
              <div className="mb-6" style={{ background: "oklch(0.14 0.03 240)", padding: "1.25rem", border: "1px solid oklch(1 0 0 / 0.08)" }}>
                <div className="eds-tag mb-3" style={{ fontSize: "0.58rem" }}>Voies navigables couvertes</div>
                {[
                  { route: "Rhine (Rhin)", detail: "Bâle → Rotterdam" },
                  { route: "Seine", detail: "Paris → Le Havre" },
                  { route: "Mosel (Moselle)", detail: "Metz → Coblence" },
                  { route: "North France", detail: "Dunkerque → Paris" },
                ].map(({ route, detail }) => (
                  <div key={route} className="eds-data-row">
                    <span className="eds-data-key">{route}</span>
                    <span className="eds-data-value" style={{ fontSize: "0.78rem" }}>{detail}</span>
                  </div>
                ))}
              </div>

              <a href="/freight" className="eds-btn eds-btn-amber">
                Voir le service <ArrowRight size={14} />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 7 — PORTS : image Rouen plein fond
      ══════════════════════════════════════════════════════ */}
      <section className="eds-photo-section" style={{ minHeight: "500px" }}>
        <img src={IMGS.rouen} alt="Port de Rouen" className="eds-photo-bg" />
        <div className="eds-overlay-dark" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-5 lg:px-8 py-20 lg:py-28">
          <Reveal className="mb-10">
            <div className="eds-tag mb-4">Zones d'opération</div>
            <h2 className="eds-h2" style={{ maxWidth: "600px" }}>
              5 ports.<br />
              <span className="eds-accent">Une présence totale</span><br />
              sur le littoral français.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {[
              { port: "Dunkerque", role: "Siège social", detail: "Agence maritime principale · Tramping" },
              { port: "Boulogne-sur-Mer", role: "Terminal dédié", detail: "800m quai · 77 500 m² stockage" },
              { port: "Rouen", role: "Terminaux grain", detail: "3,6 Mt/an · Premier port céréalier" },
              { port: "Bayonne", role: "Agence maritime", detail: "Transit & Shipping" },
              { port: "Calais", role: "Agence maritime", detail: "Courtage en douane" },
            ].map(({ port, role, detail }, i) => (
              <Reveal key={port} delay={i * 60}>
                <div
                  style={{
                    background: "oklch(0 0 0 / 0.60)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid oklch(1 0 0 / 0.10)",
                    borderTop: "2px solid oklch(0.72 0.14 65)",
                    padding: "1.25rem",
                  }}
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    <MapPin size={11} style={{ color: "oklch(0.72 0.14 65)" }} />
                    <span style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      fontSize: "1rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      color: "oklch(0.97 0 0)",
                    }}>{port}</span>
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "oklch(0.72 0.14 65)" }}>{role}</div>
                  <div className="text-xs" style={{ color: "oklch(0.62 0.01 240)", lineHeight: 1.5 }}>{detail}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 8 — CLIENTS : fond sombre + grille
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "oklch(0.12 0.02 240)" }}>
        <div className="max-w-[1440px] mx-auto px-5 lg:px-8 py-16 lg:py-24">
          <Reveal className="mb-10">
            <div className="eds-tag mb-4">Clients de référence</div>
            <h2 className="eds-h2" style={{ maxWidth: "600px" }}>
              Les leaders mondiaux<br />
              <span className="eds-accent">de l'agro-industrie</span><br />
              et de la sidérurgie.
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {[
              { name: "Glencore", sector: "Négoce matières premières" },
              { name: "Bunge", sector: "Agro-industrie mondiale" },
              { name: "Soufflet", sector: "Céréales & Malt" },
              { name: "Louis Dreyfus", sector: "Commerce de grains" },
              { name: "Cargill", sector: "Agro-industrie" },
              { name: "ArcelorMittal", sector: "Sidérurgie mondiale" },
              { name: "Lafarge", sector: "Matériaux de construction" },
              { name: "Roquette", sector: "Chimie végétale" },
              { name: "Tereos", sector: "Sucre & Amidon" },
              { name: "Eqiom", sector: "Ciment & Granulats" },
              { name: "Transgrains", sector: "Négoce céréales" },
              { name: "Lecureur", sector: "Meunerie" },
              { name: "Lhoist", sector: "Chaux & Minéraux" },
              { name: "Liberty Alu", sector: "Aluminium primaire" },
              { name: "Desialis", sector: "Coopérative céréalière" },
            ].map(({ name, sector }, i) => (
              <Reveal key={name} delay={i * 25}>
                <div
                  className="p-4 transition-all duration-200 hover:scale-[1.02]"
                  style={{
                    background: "oklch(1 0 0 / 0.04)",
                    border: "1px solid oklch(1 0 0 / 0.07)",
                    borderRadius: "1px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      color: "oklch(0.90 0.01 240)",
                      marginBottom: "0.2rem",
                    }}
                  >{name}</div>
                  <div className="text-xs" style={{ color: "oklch(0.48 0.015 240)" }}>{sector}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 9 — SURVEY : image hatch + contenu technique
      ══════════════════════════════════════════════════════ */}
      <section className="eds-photo-section" style={{ minHeight: "480px" }}>
        <img src={IMGS.hatch} alt="Inspection cale navire" className="eds-photo-bg" style={{ objectPosition: "center 40%" }} />
        <div className="eds-overlay-left" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-5 lg:px-8 py-20 lg:py-28">
          <div className="max-w-lg ml-auto">
            <Reveal>
              <div className="eds-tag mb-5">Maritime Survey</div>
              <h2 className="eds-h2 mb-6">
                Expertise technique.<br />
                <span className="eds-accent">Rapports P&I.</span>
              </h2>
              <p className="text-base mb-6" style={{ color: "oklch(0.72 0.01 240)", lineHeight: 1.7 }}>
                Notre équipe d'experts réalise toutes les opérations de survey : tirant d'eau, tests d'étanchéité, expertise on/off-hire et rapports d'assurance P&I.
              </p>
              <div className="grid grid-cols-2 gap-2 mb-8">
                {[
                  "Draught surveying",
                  "Ultrasonic leak test",
                  "On/Off-hire survey",
                  "Holds cleaning",
                  "Bunkers & condition",
                  "Insurance / P&I report",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs" style={{ color: "oklch(0.72 0.01 240)" }}>
                    <div className="w-1 h-1 rounded-full shrink-0" style={{ background: "oklch(0.72 0.14 65)" }} />
                    {item}
                  </div>
                ))}
              </div>
              <a href="/services" className="eds-btn eds-btn-amber">
                Voir les prestations <ArrowRight size={14} />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 10 — CTA FINAL : port aérien plein fond
      ══════════════════════════════════════════════════════ */}
      <section className="eds-photo-section" style={{ minHeight: "500px" }}>
        <img src={IMGS.port} alt="Port de Dunkerque" className="eds-photo-bg" />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(135deg, oklch(0.08 0.015 240 / 0.92) 0%, oklch(0.08 0.015 240 / 0.75) 100%)"
        }} />
        <div className="relative z-10 max-w-[1440px] mx-auto px-5 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 items-center" style={{ minHeight: "360px" }}>
            {/* Titre */}
            <Reveal className="lg:col-span-3 lg:pr-16">
              <div className="eds-tag mb-5">Prise de contact</div>
              <h2 className="eds-h2 mb-6">
                Une opération<br />
                à planifier ?<br />
                <span className="eds-accent">Parlons-en.</span>
              </h2>
              <p className="text-base mb-8 max-w-md" style={{ color: "oklch(0.72 0.01 240)", lineHeight: 1.7 }}>
                Notre équipe répond sous 24 heures pour tout projet d'affrètement, d'agence maritime ou de transit multimodal.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="/contact" className="eds-btn eds-btn-amber">
                  Demander un devis <ArrowRight size={14} />
                </a>
                <a href="mailto:commercial@eurodocks.com" className="eds-btn eds-btn-ghost">
                  commercial@eurodocks.com
                </a>
              </div>
            </Reveal>

            {/* Données verticales */}
            <Reveal
              className="lg:col-span-2 flex flex-col gap-6 lg:pl-12 mt-10 lg:mt-0"
              direction="right"
              delay={150}
            >
              <div style={{ borderLeft: "2px solid oklch(0.72 0.14 65 / 0.30)", paddingLeft: "1.5rem" }}>
                {[
                  { stat: "24h", label: "Délai de réponse garanti" },
                  { stat: "50 ans", label: "D'expertise maritime" },
                  { stat: "9,5 M€", label: "Couverture assurance transit" },
                ].map(({ stat, label }) => (
                  <div key={stat} className="flex items-center gap-4 mb-6 last:mb-0">
                    <div style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 800,
                      fontSize: "2.2rem",
                      color: "oklch(0.72 0.14 65)",
                      letterSpacing: "-0.02em",
                      minWidth: "5rem",
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
