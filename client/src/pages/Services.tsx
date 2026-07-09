/**
 * Services — Shipping Services
 * Design: Deep Navy Editorial
 */

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Anchor, Ship, Shield, BarChart3, ArrowRight, MapPin } from "lucide-react";

function RevealSection({ children, className, style }: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={className} style={{
      ...style,
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(30px)",
      transition: "opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1), transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
    }}>
      {children}
    </div>
  );
}

// ─── Break éditorial entre groupes de services ──────────────────────────────
function EditorialBreak({ stat, label, quote }: { stat: string; label: string; quote: string }) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="relative overflow-hidden py-16 my-4"
      style={{
        background: "oklch(0.14 0.04 240)",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1), transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
      }}>
      {/* Chiffre fantôme */}
      <div className="absolute -top-4 -right-4 pointer-events-none select-none" aria-hidden
        style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 900,
          fontSize: "clamp(8rem, 18vw, 14rem)",
          color: "oklch(0.975 0.005 80 / 0.04)",
          lineHeight: 1,
          letterSpacing: "-0.04em",
        }}>
        {stat}
      </div>
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-start lg:items-center gap-8">
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 900,
          fontSize: "clamp(3.5rem, 8vw, 6rem)",
          color: "oklch(0.65 0.12 65)",
          lineHeight: 1,
          letterSpacing: "-0.03em",
          minWidth: "fit-content",
        }}>
          {stat}
        </div>
        <div style={{ borderLeft: "1px solid oklch(0.65 0.12 65 / 0.3)", paddingLeft: "2rem" }}>
          <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "oklch(0.65 0.12 65)" }}>
            {label}
          </div>
          <p className="text-base italic" style={{ color: "oklch(0.78 0.015 240)", fontFamily: "'Playfair Display', serif" }}>
            "{quote}"
          </p>
        </div>
      </div>
    </div>
  );
}

const services = [
  {
    icon: Anchor,
    title: "Shipping Agency",
    subtitle: "800 escales / an",
    description: "Représentation et assistance complète pour les navires en escale dans les ports français. Notre équipe assure la coordination entre le navire, les autorités portuaires, les chargeurs et les prestataires locaux.",
    ports: ["Dunkerque", "Boulogne-sur-Mer", "Calais", "Rouen", "Bayonne"],
    details: [
      "Husbandry & Protective services",
      "Dry and liquid bulk",
      "Liner & Container ship",
      "Breakbulk & Heavy lift",
      "Project cargo",
      "Coordination douanière",
    ],
  },
  {
    icon: Ship,
    title: "Chartering & Tramping",
    subtitle: "200 navires / an",
    description: "Affrètement de navires sur les marchés Baltique, Continent, Méditerranée et Mer Noire. Du coaster au Panamax, nous négocions les meilleures conditions pour chaque type de cargaison.",
    ports: ["Baltic", "Continent", "Méditerranée", "Mer Noire"],
    details: [
      "Coaster à Panamax vessels",
      "Dry bulk, Breakbulk",
      "Heavy lift & Project cargo",
      "Négociation charter-parties",
      "Suivi opérationnel complet",
      "Propositions créatives d'affrètement",
    ],
  },
  {
    icon: Shield,
    title: "Customs Ship Brokerage",
    subtitle: "Enregistré depuis 1975",
    description: "Courtage en douane maritime, enregistré dans les principaux ports français. Notre staff expérimenté gère l'ensemble des formalités douanières avec dépôt et garantie.",
    ports: ["Dunkerque", "Boulogne-sur-Mer", "Calais", "Rouen", "Bayonne", "Le Havre"],
    details: [
      "Registered customs broker",
      "Deposit & Garantee",
      "Staff expérimenté depuis 1975",
      "Formalités d'entrée/sortie",
      "Régimes douaniers spéciaux",
      "Assistance en cas de litige",
    ],
  },
  {
    icon: BarChart3,
    title: "Maritime Survey",
    subtitle: "Expertise technique",
    description: "Expertise maritime complète couvrant le tirant d'eau, les tests d'étanchéité, le suivi des opérations de chargement et déchargement, et les rapports d'assurance P&I.",
    ports: ["Dunkerque", "Boulogne-sur-Mer", "Calais", "Rouen"],
    details: [
      "Draught surveying",
      "Ultrasonic leak test (Hose test)",
      "Loading / unloading follow-up",
      "Consulting breakbulk",
      "On / Off-hire survey",
      "Bunkers & condition survey",
      "Holds cleaning",
      "Insurance / P&I report",
    ],
  },
];

export default function Services() {
  return (
    <div className="min-h-screen" style={{ background: "oklch(0.975 0.005 80)" }}>
      {/* Hero de page */}
      <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: "oklch(0.14 0.04 240)" }}>
        <div className="absolute inset-0 opacity-30">
          <img
            src="/manus-storage/eds_hero_ship_5b197371.jpg"
            alt=""
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 60%" }}
          />
          <div className="absolute inset-0" style={{ background: "oklch(0.14 0.04 240 / 0.8)" }} />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="eds-label mb-4" style={{ color: "oklch(0.65 0.12 65)" }}>Nos expertises</div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            color: "oklch(0.975 0.005 80)",
            letterSpacing: "-0.025em",
            marginBottom: "1.25rem",
          }}>
            Shipping Services
          </h1>
          <p className="text-lg max-w-2xl" style={{ color: "oklch(0.72 0.02 240)" }}>
            Agence maritime, affrètement tramping, courtage en douane et expertise maritime — une gamme complète de services opérés par des experts reconnus dans les ports français.
          </p>
        </div>
      </section>

      {/* Chiffres clés */}
      <section className="py-12" style={{ background: "oklch(0.09 0.03 240)" }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: "800", label: "Escales traitées / an" },
              { value: "200", label: "Navires affrétés / an" },
              { value: "7M€", label: "Chiffre d'affaires" },
              { value: "1975", label: "Année de création" },
            ].map((s) => (
              <div key={s.label} className="text-center py-4">
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 900,
                  fontSize: "2.25rem",
                  color: "oklch(0.65 0.12 65)",
                  letterSpacing: "-0.02em",
                }}>
                  {s.value}
                </div>
                <div className="text-xs mt-1 uppercase tracking-widest" style={{ color: "oklch(0.62 0.025 240)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services détaillés */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col gap-16">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <RevealSection key={service.title}>
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-start ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                    {/* Contenu principal */}
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 flex items-center justify-center rounded"
                          style={{ background: "oklch(0.65 0.12 65 / 0.12)" }}>
                          <Icon size={22} style={{ color: "oklch(0.65 0.12 65)" }} />
                        </div>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-widest mb-0.5"
                            style={{ color: "oklch(0.65 0.12 65)" }}>
                            {service.subtitle}
                          </div>
                          <h2 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontWeight: 700,
                            fontSize: "1.75rem",
                            color: "oklch(0.14 0.04 240)",
                            letterSpacing: "-0.02em",
                          }}>
                            {service.title}
                          </h2>
                        </div>
                      </div>

                      <div className="w-8 h-px mb-5" style={{ background: "oklch(0.65 0.12 65)" }} />

                      <p className="text-base leading-relaxed mb-6" style={{ color: "oklch(0.45 0.02 240)" }}>
                        {service.description}
                      </p>

                      {/* Ports */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {service.ports.map((p) => (
                          <span key={p} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-sm"
                            style={{
                              background: "oklch(0.94 0.005 240)",
                              color: "oklch(0.35 0.04 240)",
                            }}>
                            <MapPin size={10} />
                            {p}
                          </span>
                        ))}
                      </div>

                      <a href="/contact" className="eds-btn-primary self-start inline-flex">
                        Demander un devis <ArrowRight size={15} />
                      </a>
                    </div>

                    {/* Liste des prestations */}
                    <div className="p-8 rounded-sm" style={{ background: "oklch(0.14 0.04 240)" }}>
                      <div className="eds-label mb-5" style={{ color: "oklch(0.65 0.12 65)" }}>
                        Prestations incluses
                      </div>
                      <ul className="flex flex-col gap-3">
                        {service.details.map((d) => (
                          <li key={d} className="flex items-center gap-3 text-sm"
                            style={{ color: "oklch(0.78 0.015 240)" }}>
                            <span className="w-1.5 h-1.5 rounded-full shrink-0"
                              style={{ background: "oklch(0.65 0.12 65)" }} />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {i === 1 && (
                    <EditorialBreak
                      stat="800"
                      label="Escales traitées par an"
                      quote="Chaque escale est une opération unique. Notre équipe dédiée assure la coordination complète entre le navire, les autorités portuaires et les chargeurs."
                    />
                  )}
                  {i === 3 && (
                    <EditorialBreak
                      stat="1975"
                      label="Année d'enregistrement comme courtier en douane"
                      quote="Près de 50 ans d'expertise douanière maritime dans les ports français. Une légitimité qui ne s'improvise pas."
                    />
                  )}
                  {i !== 1 && i !== 3 && i < services.length - 1 && (
                    <div className="mt-16 h-px" style={{ background: "oklch(0.88 0.008 240)" }} />
                  )}
                </RevealSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 eds-section-dark text-center">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <RevealSection>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              color: "oklch(0.975 0.005 80)",
              marginBottom: "1.25rem",
            }}>
              Un projet d'affrètement ou d'agence maritime ?
            </h2>
            <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: "oklch(0.72 0.02 240)" }}>
              Contactez notre équipe commerciale pour un devis personnalisé sous 24 heures.
            </p>
            <a href="/contact" className="eds-btn-primary">
              Nous contacter <ArrowRight size={15} />
            </a>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}
