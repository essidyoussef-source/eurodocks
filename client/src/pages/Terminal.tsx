/**
 * Port Terminal — Euro Docks Service
 * Design: Deep Navy Editorial
 */

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Warehouse, ArrowRight, Anchor, BarChart3 } from "lucide-react";

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

export default function Terminal() {
  return (
    <div className="min-h-screen" style={{ background: "oklch(0.975 0.005 80)" }}>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: "oklch(0.14 0.04 240)" }}>
        <div className="absolute inset-0 opacity-25">
          <img src="/manus-storage/eds_port_aerial_f00f9d1d.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "oklch(0.14 0.04 240 / 0.8)" }} />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="eds-label mb-4" style={{ color: "oklch(0.65 0.12 65)" }}>Infrastructure portuaire</div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            color: "oklch(0.975 0.005 80)",
            letterSpacing: "-0.025em",
            marginBottom: "1.25rem",
          }}>
            Port Terminal
          </h1>
          <p className="text-lg max-w-2xl" style={{ color: "oklch(0.72 0.02 240)" }}>
            Des terminaux dédiés à Boulogne-sur-Mer et Rouen, avec des capacités de manutention et de stockage parmi les plus importantes du littoral français.
          </p>
        </div>
      </section>

      {/* Chiffres globaux */}
      <section className="py-12" style={{ background: "oklch(0.09 0.03 240)" }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: "4,5 Mt", label: "Capacité annuelle totale" },
              { value: "800m", label: "Linéaire de quai Boulogne" },
              { value: "77 500m²", label: "Surface de stockage totale" },
              { value: "120t", label: "Capacité max grue Rouen" },
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

      {/* Terminal Boulogne */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <RevealSection className="mb-12">
            <div className="eds-gold-rule" />
            <div className="eds-label mb-3">Terminal EDS Boulogne-sur-Mer</div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              color: "oklch(0.14 0.04 240)",
            }}>
              Un terminal dédié au cœur du port de Boulogne.
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <RevealSection>
              <div className="relative overflow-hidden rounded-sm" style={{ aspectRatio: "16/10" }}>
                <img
                  src="/manus-storage/eds_stevedoring_5289e3b9.jpg"
                  alt="Terminal portuaire Boulogne-sur-Mer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{
                  background: "linear-gradient(to top, oklch(0.09 0.03 240 / 0.6) 0%, transparent 60%)"
                }} />
                <div className="absolute bottom-4 left-4">
                  <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: "oklch(0.65 0.12 65)" }}>
                    Boulogne-sur-Mer
                  </div>
                  <div className="text-sm font-medium" style={{ color: "oklch(0.975 0.005 80)" }}>
                    850 kt/an — Produits de construction & vrac
                  </div>
                </div>
              </div>
            </RevealSection>

            <RevealSection>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: Anchor,
                    title: "Infrastructure nautique",
                    items: [
                      "800m de quai",
                      "4 postes à quai",
                      "Tirant d'eau max 10,5m SW",
                      "Navires jusqu'à 180m × 26m",
                    ],
                  },
                  {
                    icon: BarChart3,
                    title: "Équipements de manutention",
                    items: [
                      "Grues 7m³",
                      "Convoyeurs couverts",
                      "Grue mobile heavy lift",
                      "Convoyeurs mobiles 200t/h",
                      "Trémies pesées",
                      "Chargeurs pressurisés",
                    ],
                  },
                  {
                    icon: Warehouse,
                    title: "Stockage couvert",
                    items: [
                      "Entrepôt 20 000m²",
                      "Zones GMP+ (sécurité alimentaire)",
                      "Stuffing & unstuffing containers",
                      "Chargement camions-citernes",
                    ],
                  },
                  {
                    icon: Warehouse,
                    title: "Stockage extérieur",
                    items: [
                      "Zone 1 : 17 500m² (30m du quai)",
                      "Zone 2 : 40 000m² (150m du quai)",
                      "Pont-bascule commercial",
                      "Circuits courts quai-stockage",
                    ],
                  },
                ].map(({ icon: Icon, title, items }) => (
                  <div key={title} className="p-5 rounded-sm" style={{ background: "oklch(0.94 0.005 240)" }}>
                    <div className="flex items-center gap-2 mb-3">
                      <Icon size={15} style={{ color: "oklch(0.65 0.12 65)" }} />
                      <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "oklch(0.35 0.04 240)" }}>
                        {title}
                      </span>
                    </div>
                    <ul className="flex flex-col gap-1.5">
                      {items.map((item) => (
                        <li key={item} className="text-xs flex items-center gap-2" style={{ color: "oklch(0.45 0.02 240)" }}>
                          <span className="w-1 h-1 rounded-full shrink-0" style={{ background: "oklch(0.65 0.12 65)" }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Terminal Rouen */}
      <section className="py-20 lg:py-28" style={{ background: "oklch(0.22 0.05 240)" }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <RevealSection className="mb-12">
            <div className="eds-gold-rule" />
            <div className="eds-label mb-3" style={{ color: "oklch(0.65 0.12 65)" }}>Terminal EDS Rouen</div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              color: "oklch(0.975 0.005 80)",
            }}>
              Le premier port céréalier d'Europe Occidentale.
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <RevealSection>
              <p className="text-base leading-relaxed mb-6" style={{ color: "oklch(0.72 0.02 240)" }}>
                Euro Docks Service opère dans l'ensemble des terminaux du port de Rouen, traitant 3,6 millions de tonnes de céréales par an. Notre équipe dédiée maîtrise tous les types de produits et assure des solutions sur mesure pour chaque client.
              </p>

              <div className="flex flex-col gap-3 mb-8">
                {[
                  "Senalia", "Soufflet", "Beuzelin", "Lustucru",
                  "Radicatel", "Lecureur", "Simarex (NATUP)",
                ].map((terminal) => (
                  <div key={terminal} className="flex items-center gap-3 text-sm"
                    style={{ color: "oklch(0.78 0.015 240)" }}>
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "oklch(0.65 0.12 65)" }} />
                    {terminal}
                  </div>
                ))}
              </div>

              <a href="/contact" className="eds-btn-primary self-start inline-flex">
                Demander un devis terminal <ArrowRight size={15} />
              </a>
            </RevealSection>

            <RevealSection>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { value: "3,6 Mt", label: "Céréales / an", desc: "Volume annuel traité dans les terminaux de Rouen" },
                  { value: "120t", label: "Capacité grue max", desc: "Manutention de tous types de produits, toutes dimensions" },
                  { value: "100%", label: "Terminaux couverts", desc: "Présence dans tous les terminaux grain du port de Rouen" },
                  { value: "EDS", label: "Staff dédié", desc: "Équipe dédiée pour chaque opération de stevedoring" },
                ].map((item) => (
                  <div key={item.label} className="p-5 rounded-sm" style={{ background: "oklch(1 0 0 / 0.06)" }}>
                    <div style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 700,
                      fontSize: "1.75rem",
                      color: "oklch(0.65 0.12 65)",
                      letterSpacing: "-0.02em",
                    }}>
                      {item.value}
                    </div>
                    <div className="text-xs font-semibold uppercase tracking-wider mt-1 mb-2"
                      style={{ color: "oklch(0.85 0.01 240)" }}>
                      {item.label}
                    </div>
                    <div className="text-xs leading-relaxed" style={{ color: "oklch(0.62 0.025 240)" }}>
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </RevealSection>
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
              Besoin de capacités de stockage ou de manutention ?
            </h2>
            <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: "oklch(0.72 0.02 240)" }}>
              Contactez notre équipe pour discuter de vos besoins en terminal portuaire.
            </p>
            <a href="/contact" className="eds-btn-primary">
              Consulter nos disponibilités <ArrowRight size={15} />
            </a>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}
