/**
 * Home — Euro Docks Service
 * Design: Deep Navy Editorial
 * Sections: Hero → Stats → Services → Marchés → Ports → Clients → CTA
 */

import { useScrollReveal, useCountUp } from "@/hooks/useScrollReveal";
import {
  Anchor, BarChart3, Ship, Truck, Warehouse, ArrowRight,
  ChevronDown, Globe, Shield, Clock, Award
} from "lucide-react";
import { Link } from "wouter";

// ─── Composant StatCard avec count-up ───────────────────────────────────────
function StatCard({ value, suffix, label, description }: {
  value: number;
  suffix: string;
  label: string;
  description: string;
}) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const count = useCountUp(value, 2000, isVisible);

  return (
    <div ref={ref} className="relative">
      <div className="eds-stat-number">
        {count.toLocaleString("fr-FR")}{suffix}
      </div>
      <div className="mt-2 mb-1 text-sm font-semibold uppercase tracking-widest"
        style={{ color: "oklch(0.975 0.005 80)", letterSpacing: "0.15em" }}>
        {label}
      </div>
      <div className="text-sm leading-relaxed" style={{ color: "oklch(0.62 0.025 240)" }}>
        {description}
      </div>
    </div>
  );
}

// ─── Composant ServiceCard ───────────────────────────────────────────────────
function ServiceCard({ icon: Icon, title, description, details, href }: {
  icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
  title: string;
  description: string;
  details: string[];
  href: string;
}) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="eds-service-card group"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1), transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
      }}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="shrink-0 w-10 h-10 flex items-center justify-center rounded"
          style={{ background: "oklch(0.65 0.12 65 / 0.12)" }}>
          <Icon size={18} style={{ color: "oklch(0.65 0.12 65)" }} />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-1" style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.14 0.04 240)" }}>
            {title}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: "oklch(0.45 0.02 240)" }}>
            {description}
          </p>
        </div>
      </div>
      <ul className="flex flex-col gap-1.5 mb-5">
        {details.map((d) => (
          <li key={d} className="text-xs flex items-center gap-2" style={{ color: "oklch(0.55 0.025 240)" }}>
            <span className="w-1 h-1 rounded-full shrink-0" style={{ background: "oklch(0.65 0.12 65)" }} />
            {d}
          </li>
        ))}
      </ul>
      <Link href={href}
        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest group-hover:gap-2.5 transition-all duration-200"
        style={{ color: "oklch(0.65 0.12 65)" }}>
        En savoir plus <ArrowRight size={13} />
      </Link>
    </div>
  );
}

// ─── Composant RevealSection ─────────────────────────────────────────────────
function RevealSection({ children, className, style }: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.7s cubic-bezier(0.23, 1, 0.32, 1), transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)",
      }}
    >
      {children}
    </div>
  );
}

// ─── Page principale ─────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "oklch(0.975 0.005 80)" }}>

      {/* ══════════════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex flex-col justify-end overflow-hidden"
        style={{ background: "oklch(0.14 0.04 240)" }}
      >
        {/* Image de fond */}
        <div className="absolute inset-0">
          <img
            src="/manus-storage/eds_hero_ship_5b197371.jpg"
            alt="Navire bulk carrier en mer"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 40%" }}
          />
          {/* Gradient overlay cinématographique */}
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to bottom right, oklch(0.09 0.03 240 / 0.88) 0%, oklch(0.14 0.04 240 / 0.55) 50%, oklch(0.09 0.03 240 / 0.75) 100%)"
          }} />
          {/* Gradient bas pour le texte */}
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to top, oklch(0.09 0.03 240 / 0.95) 0%, transparent 50%)"
          }} />
        </div>

        {/* Chiffre fantôme décoratif */}
        <div className="absolute top-1/4 right-8 lg:right-20 pointer-events-none select-none hidden lg:block"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900,
            fontSize: "clamp(12rem, 25vw, 22rem)",
            color: "oklch(0.975 0.005 80 / 0.03)",
            lineHeight: 1,
            letterSpacing: "-0.05em",
          }}>
          1975
        </div>

        {/* Contenu hero — positionné en bas-gauche */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pb-20 lg:pb-28 w-full">
          <div className="max-w-3xl">
            {/* Label */}
            <div className="eds-label mb-6" style={{ color: "oklch(0.65 0.12 65)" }}>
              Agence Maritime & Tramping — Depuis 1975
            </div>

            {/* Titre principal */}
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              color: "oklch(0.975 0.005 80)",
              lineHeight: 1.08,
              letterSpacing: "-0.025em",
              marginBottom: "1.5rem",
            }}>
              L'intelligence maritime<br />
              <em style={{ color: "oklch(0.65 0.12 65)", fontStyle: "italic" }}>au service</em><br />
              de votre cargo.
            </h1>

            {/* Sous-titre */}
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1.125rem",
              color: "oklch(0.78 0.015 240)",
              lineHeight: 1.65,
              maxWidth: "540px",
              marginBottom: "2.5rem",
            }}>
              Spécialiste du tramping, de l'affrètement et des terminaux portuaires sur les ports de Dunkerque, Boulogne-sur-Mer, Rouen et Bayonne.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <a href="/contact" className="eds-btn-primary">
                Demander un devis <ArrowRight size={15} />
              </a>
              <a href="/services" className="eds-btn-outline">
                Nos services
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
          <ChevronDown size={20} style={{ color: "oklch(0.65 0.12 65)" }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 2 — STATS MONUMENTALES
      ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 lg:py-28" style={{ background: "oklch(0.14 0.04 240)" }}>
        {/* Chiffre fantôme décoratif */}
        <div className="absolute -top-8 -left-4 pointer-events-none select-none" aria-hidden>
          <span className="eds-ghost-number">50</span>
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          <RevealSection className="mb-16">
            <div className="eds-gold-rule" />
            <div className="eds-label mb-3" style={{ color: "oklch(0.65 0.12 65)" }}>
              Euro Docks Service en chiffres
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              color: "oklch(0.975 0.005 80)",
            }}>
              50 ans d'expertise maritime.<br />
              Des résultats qui parlent.
            </h2>
          </RevealSection>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <StatCard value={800} suffix="" label="Escales / an" description="Appels de navires traités annuellement dans les ports français" />
            <StatCard value={200} suffix="" label="Navires affrétés" description="Opérations de tramping et d'affrètement par an" />
            <StatCard value={45} suffix="00 kt" label="Vrac traité" description="Tonnes de vrac, céréales et produits de construction" />
            <StatCard value={7} suffix="M€" label="Chiffre d'affaires" description="Volume d'affaires consolidé — Shipping & Freight Forwarding" />
          </div>

          {/* Ligne de séparation avec ports */}
          <div className="mt-16 pt-12" style={{ borderTop: "1px solid oklch(1 0 0 / 0.08)" }}>
            <div className="flex flex-wrap gap-x-8 gap-y-3 items-center">
              <span className="eds-label" style={{ color: "oklch(0.62 0.025 240)" }}>Présence portuaire :</span>
              {["Dunkerque", "Boulogne-sur-Mer", "Calais", "Rouen", "Bayonne", "Le Havre"].map((port) => (
                <span key={port} className="text-sm font-medium" style={{ color: "oklch(0.85 0.01 240)" }}>
                  {port}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 3 — SERVICES
      ══════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 eds-section-light">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <RevealSection className="mb-16 max-w-2xl">
            <div className="eds-gold-rule" />
            <div className="eds-label mb-3">Nos expertises</div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              color: "oklch(0.14 0.04 240)",
            }}>
              Une gamme complète de services maritimes intégrés.
            </h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: "oklch(0.45 0.02 240)" }}>
              De l'agence maritime au transit multimodal, en passant par l'affrètement tramping et les opérations de terminal, Euro Docks Service couvre l'intégralité de la chaîne logistique maritime.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard
              icon={Anchor}
              title="Shipping Agency"
              description="Représentation et assistance complète pour les navires en escale dans les ports français."
              details={[
                "Dunkirk, Boulogne, Calais, Rouen, Bayonne",
                "Husbandry & Protective services",
                "Dry/liquid bulk, Liner, Breakbulk",
                "Heavy lift & Project cargo",
              ]}
              href="/services"
            />
            <ServiceCard
              icon={Ship}
              title="Chartering & Tramping"
              description="Affrètement de navires sur les marchés Baltique, Continent, Méditerranée et Mer Noire."
              details={[
                "Coaster à Panamax vessels",
                "Dry bulk, Breakbulk, Heavy lift",
                "Baltic, Continent, Med, Black Sea",
                "200 navires affrétés par an",
              ]}
              href="/services"
            />
            <ServiceCard
              icon={Shield}
              title="Customs Ship Brokerage"
              description="Courtage en douane maritime, enregistré dans les principaux ports français depuis 1975."
              details={[
                "Dunkirk, Boulogne, Calais, Rouen",
                "Bayonne, Le Havre",
                "Deposit & Garantee",
                "Staff expérimenté depuis 1975",
              ]}
              href="/services"
            />
            <ServiceCard
              icon={BarChart3}
              title="Maritime Survey"
              description="Expertise maritime complète : tirant d'eau, chargement/déchargement, assurance P&I."
              details={[
                "Draught surveying",
                "Ultrasonic leak test (Hose test)",
                "On/Off-hire survey",
                "Insurance / P&I reports",
              ]}
              href="/services"
            />
            <ServiceCard
              icon={Truck}
              title="Freight Forwarding"
              description="Transit multimodal spécialisé : voies navigables, route, rail — tous produits."
              details={[
                "Rhine, North France, Mosel, Seine",
                "Bulk, steel, break products",
                "GMP+ certified (grains)",
                "Couverture assurance 9,5M€",
              ]}
              href="/freight"
            />
            <ServiceCard
              icon={Warehouse}
              title="Port Terminal"
              description="Exploitation de terminaux dédiés à Boulogne-sur-Mer et Rouen avec capacités de stockage."
              details={[
                "800m de quai à Boulogne",
                "Entrepôts 20 000m² (GMP+)",
                "Stockage extérieur 57 500m²",
                "3,6 Mt/an à Rouen",
              ]}
              href="/terminal"
            />
            <ServiceCard
              icon={Globe}
              title="Marchés Spécialisés"
              description="Expertise reconnue sur les marchés les plus exigeants du transport maritime international."
              details={[
                "Dry & Liquid Bulk",
                "Breakbulk & Heavy Lift",
                "Project Cargo",
                "Tanker",
              ]}
              href="/services"
            />
            <ServiceCard
              icon={Clock}
              title="Disponibilité 24/7"
              description="Réactivité et disponibilité permanente pour répondre aux exigences opérationnelles du tramping."
              details={[
                "Équipe dédiée par opération",
                "Réponse rapide garantie",
                "Solutions sur mesure",
                "Suivi en temps réel",
              ]}
              href="/contact"
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 4 — IMAGE + TEXTE (Chartering)
      ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ background: "oklch(0.22 0.05 240)" }}>
        <div className="max-w-[1400px] mx-auto px-0 lg:px-0 grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">
          {/* Image */}
          <div className="relative min-h-[320px] lg:min-h-0 overflow-hidden">
            <img
              src="/manus-storage/eds_chartering_1f6cba1a.jpg"
              alt="Navigation et affrètement maritime"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{
              background: "linear-gradient(to right, transparent 60%, oklch(0.22 0.05 240) 100%)"
            }} />
          </div>

          {/* Contenu */}
          <RevealSection className="flex flex-col justify-center px-8 lg:px-16 py-16 lg:py-20">
            <div className="eds-gold-rule" />
            <div className="eds-label mb-4" style={{ color: "oklch(0.65 0.12 65)" }}>
              Chartering & Tramping
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
              color: "oklch(0.975 0.005 80)",
              marginBottom: "1.25rem",
            }}>
              800 escales. Une seule promesse : zéro surprise.
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: "oklch(0.72 0.02 240)" }}>
              Notre équipe d'affrètement opère sur les marchés Baltique, Continent, Méditerranée et Mer Noire. Du coaster au Panamax, nous négocions et gérons chaque opération avec la précision d'un partenaire de confiance.
            </p>
            <ul className="flex flex-col gap-3 mb-8">
              {[
                "Partenariats solides avec les armateurs et les chargeurs",
                "Utilisation précise des réseaux d'information et de connaissance",
                "Propositions d'affrètement créatives et adaptées",
                "Disponibilité et réponse rapide à chaque demande",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "oklch(0.78 0.015 240)" }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "oklch(0.65 0.12 65)" }} />
                  {item}
                </li>
              ))}
            </ul>
            <a href="/services" className="eds-btn-primary self-start">
              Consulter nos capacités <ArrowRight size={15} />
            </a>
          </RevealSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 5 — TERMINAL PORTUAIRE
      ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ background: "oklch(0.975 0.005 80)" }}>
        <div className="max-w-[1400px] mx-auto px-0 lg:px-0 grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">
          {/* Contenu — à gauche */}
          <RevealSection className="flex flex-col justify-center px-8 lg:px-16 py-16 lg:py-20 order-2 lg:order-1">
            <div className="eds-gold-rule" />
            <div className="eds-label mb-4">Terminal Portuaire</div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
              color: "oklch(0.14 0.04 240)",
              marginBottom: "1.25rem",
            }}>
              Des terminaux dédiés.<br />Une infrastructure de premier rang.
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: "oklch(0.45 0.02 240)" }}>
              À Boulogne-sur-Mer, 800 mètres de quai, 4 postes à quai, des entrepôts certifiés GMP+ et 57 500 m² de stockage extérieur. À Rouen, une présence dans tous les terminaux grain du port.
            </p>

            {/* Grille de capacités */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { value: "800m", label: "Linéaire de quai" },
                { value: "20 000m²", label: "Entrepôts GMP+" },
                { value: "57 500m²", label: "Stockage extérieur" },
                { value: "4,5 Mt", label: "Capacité annuelle" },
              ].map((item) => (
                <div key={item.label} className="p-4 rounded-sm" style={{ background: "oklch(0.94 0.005 240)" }}>
                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    fontSize: "1.5rem",
                    color: "oklch(0.14 0.04 240)",
                    letterSpacing: "-0.02em",
                  }}>
                    {item.value}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "oklch(0.55 0.025 240)", letterSpacing: "0.05em" }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            <a href="/terminal" className="eds-btn-primary self-start">
              Voir le terminal <ArrowRight size={15} />
            </a>
          </RevealSection>

          {/* Image — à droite */}
          <div className="relative min-h-[320px] lg:min-h-0 overflow-hidden order-1 lg:order-2">
            <img
              src="/manus-storage/eds_port_aerial_f00f9d1d.jpg"
              alt="Terminal portuaire Euro Docks Service"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{
              background: "linear-gradient(to left, transparent 60%, oklch(0.975 0.005 80) 100%)"
            }} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 6 — OPÉRATIONS NOCTURNES (image pleine largeur)
      ══════════════════════════════════════════════════ */}
      <section className="relative min-h-[400px] lg:min-h-[500px] overflow-hidden flex items-center">
        <img
          src="/manus-storage/eds_stevedoring_5289e3b9.jpg"
          alt="Opérations de manutention portuaire nocturne"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{
          background: "oklch(0.09 0.03 240 / 0.72)"
        }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
          <RevealSection className="max-w-2xl">
            <div className="eds-label mb-4" style={{ color: "oklch(0.65 0.12 65)" }}>
              Stevedoring & Manutention
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(1.75rem, 4vw, 3.25rem)",
              color: "oklch(0.975 0.005 80)",
              marginBottom: "1.25rem",
            }}>
              60 éoliennes manutentionnées.<br />
              <em style={{ color: "oklch(0.65 0.12 65)", fontStyle: "italic" }}>Des projets hors normes.</em>
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: "oklch(0.78 0.015 240)" }}>
              De la céréale en vrac aux générateurs industriels, en passant par les éoliennes offshore, notre équipe dédiée maîtrise chaque type de cargaison avec des solutions sur mesure.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Dry Bulk", "Breakbulk", "Heavy Lift", "Project Cargo", "Tanker"].map((m) => (
                <span key={m}
                  className="px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
                  style={{
                    border: "1px solid oklch(0.65 0.12 65 / 0.4)",
                    color: "oklch(0.85 0.01 240)",
                    borderRadius: "2px",
                  }}>
                  {m}
                </span>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 7 — CLIENTS DE RÉFÉRENCE
      ══════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 eds-section-dark">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <RevealSection className="mb-14 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-px" style={{ background: "oklch(0.65 0.12 65)" }} />
            </div>
            <div className="eds-label mb-3" style={{ color: "oklch(0.65 0.12 65)" }}>
              Ils nous font confiance
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
              color: "oklch(0.975 0.005 80)",
            }}>
              Les leaders mondiaux de l'agro-industrie,<br />
              de la sidérurgie et des matériaux.
            </h2>
          </RevealSection>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { name: "Glencore", sector: "Négoce de matières premières" },
              { name: "Bunge", sector: "Agro-industrie mondiale" },
              { name: "Soufflet", sector: "Céréales & Malt" },
              { name: "Dreyfus", sector: "Commerce de grains" },
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
            ].map((client) => (
              <div key={client.name}
                className="p-4 text-center transition-all duration-200 hover:scale-105"
                style={{
                  background: "oklch(1 0 0 / 0.04)",
                  border: "1px solid oklch(1 0 0 / 0.07)",
                  borderRadius: "2px",
                }}>
                <div className="text-sm font-semibold mb-0.5" style={{ color: "oklch(0.9 0.01 240)" }}>
                  {client.name}
                </div>
                <div className="text-xs" style={{ color: "oklch(0.52 0.02 240)" }}>
                  {client.sector}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 8 — ATOUTS DIFFÉRENCIANTS
      ══════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 eds-section-light">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealSection>
              <div className="eds-gold-rule" />
              <div className="eds-label mb-4">Pourquoi Euro Docks Service</div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: "clamp(1.75rem, 4vw, 3rem)",
                color: "oklch(0.14 0.04 240)",
                marginBottom: "1.5rem",
              }}>
                Si vous choisissez EDS, vous obtenez bien plus qu'un agent.
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "oklch(0.45 0.02 240)" }}>
                Un partenaire opérationnel qui connaît chaque quai, chaque capitaine de port, chaque contrainte réglementaire. Une équipe qui répond présente à 3h du matin quand votre navire arrive avec du retard.
              </p>
            </RevealSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Award,
                  title: "Expertise depuis 1975",
                  desc: "Enregistrés comme courtiers en douane dans les ports français depuis près de 50 ans.",
                },
                {
                  icon: Globe,
                  title: "Réseau international",
                  desc: "Partenariats avec les principaux armateurs et chargeurs sur les marchés Baltique, Continent, Med et Mer Noire.",
                },
                {
                  icon: Shield,
                  title: "Couverture assurance",
                  desc: "Couverture d'assurance jusqu'à 9,5 M€ pour le transit de marchandises.",
                },
                {
                  icon: Clock,
                  title: "Réactivité totale",
                  desc: "Disponibilité et réponse rapide garanties — chaque phase de l'opération est suivie par un expert dédié.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <RevealSection key={title}>
                  <div className="p-5 rounded-sm h-full" style={{ background: "oklch(0.94 0.005 240)" }}>
                    <div className="w-9 h-9 flex items-center justify-center rounded mb-3"
                      style={{ background: "oklch(0.65 0.12 65 / 0.15)" }}>
                      <Icon size={16} style={{ color: "oklch(0.65 0.12 65)" }} />
                    </div>
                    <h4 className="font-semibold text-sm mb-2" style={{ color: "oklch(0.14 0.04 240)" }}>
                      {title}
                    </h4>
                    <p className="text-sm leading-relaxed" style={{ color: "oklch(0.5 0.02 240)" }}>
                      {desc}
                    </p>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 9 — CTA FINAL
      ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ background: "oklch(0.14 0.04 240)", minHeight: "520px" }}>
        {/* Chiffre fantôme EDS — ancre de marque */}
        <div className="absolute -bottom-8 -left-8 pointer-events-none select-none" aria-hidden
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900,
            fontSize: "clamp(12rem, 28vw, 22rem)",
            color: "oklch(0.975 0.005 80 / 0.025)",
            lineHeight: 1,
            letterSpacing: "-0.06em",
          }}>
          EDS
        </div>
        {/* Ligne diagonale décorative */}
        <div className="absolute top-0 right-0 w-px h-full" style={{ background: "oklch(0.65 0.12 65 / 0.12)" }} />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 items-stretch" style={{ minHeight: "520px" }}>
            {/* Colonne gauche — titre éditorial */}
            <RevealSection className="lg:col-span-3 flex flex-col justify-center py-20 lg:py-28 lg:pr-16">
              <div className="eds-gold-rule" />
              <div className="eds-label mb-5" style={{ color: "oklch(0.65 0.12 65)" }}>Prise de contact</div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: "clamp(2rem, 5vw, 4rem)",
                color: "oklch(0.975 0.005 80)",
                marginBottom: "1.5rem",
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
              }}>
                Une opération à planifier ?<br />
                <em style={{ color: "oklch(0.65 0.12 65)", fontStyle: "italic" }}>Parlons-en.</em>
              </h2>
              <p className="text-lg mb-10 max-w-lg" style={{ color: "oklch(0.72 0.02 240)" }}>
                Notre équipe répond sous 24 heures pour tout projet d'affrètement, d'agence maritime ou de transit multimodal.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/contact" className="eds-btn-primary text-sm px-8 py-4">
                  Demander un devis <ArrowRight size={16} />
                </a>
                <a href="mailto:commercial@eurodocks.com" className="eds-btn-outline text-sm px-8 py-4">
                  commercial@eurodocks.com
                </a>
              </div>
            </RevealSection>

            {/* Colonne droite — données clés en colonne verticale */}
            <RevealSection className="lg:col-span-2 flex flex-col justify-center py-20 lg:py-28 lg:pl-12"
              style={{ borderLeft: "1px solid oklch(1 0 0 / 0.08)" }}>
              <div className="flex flex-col gap-8">
                {[
                  { stat: "24h", label: "Délai de réponse garanti" },
                  { stat: "50 ans", label: "D'expertise maritime en France" },
                  { stat: "7M€", label: "De chiffre d'affaires annuel" },
                ].map(({ stat, label }) => (
                  <div key={stat} className="flex items-center gap-5">
                    <div style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 900,
                      fontSize: "2.5rem",
                      color: "oklch(0.65 0.12 65)",
                      letterSpacing: "-0.03em",
                      minWidth: "5rem",
                    }}>
                      {stat}
                    </div>
                    <div style={{ borderLeft: "1px solid oklch(0.65 0.12 65 / 0.3)", paddingLeft: "1.25rem" }}>
                      <div className="text-sm" style={{ color: "oklch(0.78 0.015 240)" }}>{label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </RevealSection>
          </div>
        </div>
      </section>
    </div>
  );
}
