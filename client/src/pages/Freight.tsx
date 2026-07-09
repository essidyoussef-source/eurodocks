/**
 * Freight Forwarding — Euro Docks Service
 * Design: Deep Navy Editorial
 */

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Truck, Ship, Train, Globe, Shield, ArrowRight, MapPin } from "lucide-react";

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

const waterways = [
  "Rhin (Rhine)", "Nord France", "Moselle (Mosel)",
  "Canal du Nord", "Oise", "Seine",
];

const certifications = [
  { code: "GMP+", label: "Feed Safety Assurance", desc: "Certification sécurité alimentaire pour le transport de grains" },
  { code: "OVAM", label: "Waste Transport", desc: "Accord de transport de déchets — Belgique" },
  { code: "OWD", label: "Waste Transport", desc: "Accord de transport de déchets — Pays-Bas" },
  { code: "NIWO", label: "Road Haulage", desc: "Autorisation transport routier international — Pays-Bas" },
  { code: "IBG", label: "Inland Waterways", desc: "Certification voies navigables intérieures" },
];

export default function Freight() {
  return (
    <div className="min-h-screen" style={{ background: "oklch(0.975 0.005 80)" }}>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: "oklch(0.14 0.04 240)" }}>
        <div className="absolute inset-0 opacity-20">
          <img src="/manus-storage/eds_port_aerial_f00f9d1d.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "oklch(0.14 0.04 240 / 0.85)" }} />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="eds-label mb-4" style={{ color: "oklch(0.65 0.12 65)" }}>Transit & Logistique</div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            color: "oklch(0.975 0.005 80)",
            letterSpacing: "-0.025em",
            marginBottom: "1.25rem",
          }}>
            Freight Forwarding
          </h1>
          <p className="text-lg max-w-2xl" style={{ color: "oklch(0.72 0.02 240)" }}>
            Transit multimodal spécialisé dans le vrac, les produits sidérurgiques et les cargaisons hors normes. Voies navigables, route, rail — nous connectons vos marchandises à leur destination finale.
          </p>
        </div>
      </section>

      {/* Chiffres */}
      <section className="py-12" style={{ background: "oklch(0.09 0.03 240)" }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: "2M€", label: "CA Freight Forwarding" },
              { value: "265 kt", label: "Produits transportés" },
              { value: "9,5M€", label: "Couverture assurance" },
              { value: "5 000t", label: "Navires grains GMP+" },
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

      {/* Modes de transport */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <RevealSection className="mb-16">
            <div className="eds-gold-rule" />
            <div className="eds-label mb-3">Modes de transport</div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              color: "oklch(0.14 0.04 240)",
            }}>
              Multimodal. Intégré. Certifié.
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: Ship,
                title: "Voies navigables intérieures",
                desc: "Courtage de transport fluvial sur les principaux axes européens. Solution économique et écologique pour les vrac et produits pondéreux.",
                routes: waterways,
              },
              {
                icon: Truck,
                title: "Transport routier",
                desc: "Tous produits, tous tonnages. Spécialisation dans le vrac, les produits sidérurgiques, les colis lourds et les marchandises dangereuses.",
                routes: ["Tous produits", "Vrac & Acier", "Break products", "Heavy lift", "Déchets (OVAM/OWD)"],
              },
              {
                icon: Train,
                title: "Transport ferroviaire",
                desc: "Solutions ferroviaires pour les flux massifiés. Connexion avec les terminaux portuaires et les zones industrielles.",
                routes: ["Flux massifiés", "Connexion terminaux", "Zones industrielles", "Intermodal"],
              },
            ].map(({ icon: Icon, title, desc, routes }) => (
              <RevealSection key={title}>
                <div className="eds-service-card h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded"
                      style={{ background: "oklch(0.65 0.12 65 / 0.12)" }}>
                      <Icon size={18} style={{ color: "oklch(0.65 0.12 65)" }} />
                    </div>
                    <h3 className="font-semibold text-base" style={{ color: "oklch(0.14 0.04 240)" }}>
                      {title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "oklch(0.45 0.02 240)" }}>
                    {desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {routes.map((r) => (
                      <span key={r} className="flex items-center gap-1 text-xs px-2 py-1 rounded-sm"
                        style={{ background: "oklch(0.94 0.005 240)", color: "oklch(0.45 0.02 240)" }}>
                        <MapPin size={9} />
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>

          {/* Certifications */}
          <RevealSection>
            <div className="p-8 rounded-sm" style={{ background: "oklch(0.14 0.04 240)" }}>
              <div className="flex items-center gap-3 mb-6">
                <Shield size={20} style={{ color: "oklch(0.65 0.12 65)" }} />
                <div className="eds-label" style={{ color: "oklch(0.65 0.12 65)" }}>
                  Certifications & Agréments
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {certifications.map((c) => (
                  <div key={c.code} className="p-4 rounded-sm" style={{ background: "oklch(1 0 0 / 0.05)" }}>
                    <div style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 700,
                      fontSize: "1.5rem",
                      color: "oklch(0.65 0.12 65)",
                    }}>
                      {c.code}
                    </div>
                    <div className="text-xs font-semibold mt-1 mb-1" style={{ color: "oklch(0.85 0.01 240)" }}>
                      {c.label}
                    </div>
                    <div className="text-xs leading-relaxed" style={{ color: "oklch(0.52 0.02 240)" }}>
                      {c.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Affrètement maritime grains */}
      <section className="py-20 lg:py-24" style={{ background: "oklch(0.22 0.05 240)" }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <RevealSection>
              <div className="eds-gold-rule" />
              <div className="eds-label mb-4" style={{ color: "oklch(0.65 0.12 65)" }}>
                Spécialité grains
              </div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
                color: "oklch(0.975 0.005 80)",
                marginBottom: "1.25rem",
              }}>
                Affrètement maritime de grains sous règles GMP+.
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "oklch(0.72 0.02 240)" }}>
                Nous gérons l'affrètement de navires jusqu'à 5 000 tonnes pour le transport de céréales sous certification GMP+ (Feed Safety Assurance). Une expertise rare qui garantit la traçabilité et la qualité de la chaîne d'approvisionnement alimentaire.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Navires jusqu'à 5 000t", "Certification GMP+", "Traçabilité complète", "Couverture 9,5M€"].map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1.5 rounded-sm font-medium"
                    style={{ background: "oklch(0.65 0.12 65 / 0.15)", color: "oklch(0.85 0.01 240)" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </RevealSection>

            <RevealSection>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Globe, title: "Réseau européen", desc: "Connexions fluviales sur les principaux axes : Rhin, Seine, Oise, Moselle" },
                  { icon: Shield, title: "Assurance étendue", desc: "Couverture jusqu'à 9,5 M€ pour tous types de marchandises" },
                  { icon: Truck, title: "Multimodal", desc: "Combinaison optimale voie d'eau / route / rail selon les contraintes" },
                  { icon: Ship, title: "Consulting logistique", desc: "Conception de projets logistiques complexes et solutions sur mesure" },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="p-5 rounded-sm" style={{ background: "oklch(1 0 0 / 0.05)" }}>
                    <Icon size={18} className="mb-3" style={{ color: "oklch(0.65 0.12 65)" }} />
                    <div className="text-sm font-semibold mb-1.5" style={{ color: "oklch(0.975 0.005 80)" }}>
                      {title}
                    </div>
                    <div className="text-xs leading-relaxed" style={{ color: "oklch(0.62 0.025 240)" }}>
                      {desc}
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
              Un besoin de transit multimodal ?
            </h2>
            <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: "oklch(0.72 0.02 240)" }}>
              Notre équipe étudie votre projet et vous propose la solution logistique la plus adaptée.
            </p>
            <a href="/contact" className="eds-btn-primary">
              Consulter nos capacités <ArrowRight size={15} />
            </a>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}
