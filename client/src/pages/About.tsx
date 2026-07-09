/**
 * About — Euro Docks Service
 * Design: Deep Navy Editorial
 * Histoire, valeurs, équipe
 */

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowRight, Award, Globe, Shield, Clock } from "lucide-react";

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

const timeline = [
  { year: "1975", event: "Fondation d'Euro Docks Service à Dunkerque. Enregistrement comme courtier en douane maritime." },
  { year: "1985", event: "Développement des activités de chartering tramping sur les marchés Baltique et Continent." },
  { year: "1995", event: "Ouverture de l'agence de Boulogne-sur-Mer. Développement du terminal dédié avec 800m de quai." },
  { year: "2000", event: "Lancement des activités de Freight Forwarding multimodal — voies navigables, route, rail." },
  { year: "2008", event: "Certification GMP+ pour le transport de grains. Expansion à Rouen — premier port céréalier d'Europe Occidentale." },
  { year: "2015", event: "Manutention de 60 éoliennes offshore — démonstration de capacité en project cargo hors normes." },
  { year: "2024", event: "7 M€ de chiffre d'affaires, 800 escales/an, 200 navires affrétés. Présence dans 5 ports français." },
];

const values = [
  {
    icon: Award,
    title: "Expertise opérationnelle",
    desc: "Chaque membre de notre équipe est un spécialiste de son domaine. Pas de généralistes : des experts du tramping, de la douane, du survey et de la logistique multimodale.",
  },
  {
    icon: Globe,
    title: "Réseau international",
    desc: "Nos partenariats avec les armateurs, les chargeurs et les agents portuaires couvrent les marchés Baltique, Continent, Méditerranée et Mer Noire.",
  },
  {
    icon: Shield,
    title: "Fiabilité totale",
    desc: "Couverture d'assurance jusqu'à 9,5 M€. Enregistrés comme courtiers en douane depuis 1975. Une légitimité qui ne s'improvise pas.",
  },
  {
    icon: Clock,
    title: "Réactivité permanente",
    desc: "Le tramping ne s'arrête pas la nuit. Notre équipe est disponible à chaque phase de l'opération, avec une réponse garantie sous 24 heures.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen" style={{ background: "oklch(0.975 0.005 80)" }}>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: "oklch(0.14 0.04 240)" }}>
        <div className="absolute inset-0 opacity-20">
          <img src="/manus-storage/eds_hero_ship_5b197371.jpg" alt="" className="w-full h-full object-cover" style={{ objectPosition: "center 40%" }} />
          <div className="absolute inset-0" style={{ background: "oklch(0.14 0.04 240 / 0.85)" }} />
        </div>
        {/* Chiffre fantôme */}
        <div className="absolute -bottom-4 -right-4 pointer-events-none select-none" aria-hidden
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900,
            fontSize: "clamp(10rem, 22vw, 18rem)",
            color: "oklch(0.975 0.005 80 / 0.03)",
            lineHeight: 1,
            letterSpacing: "-0.04em",
          }}>
          1975
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="eds-label mb-4" style={{ color: "oklch(0.65 0.12 65)" }}>Notre histoire</div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            color: "oklch(0.975 0.005 80)",
            letterSpacing: "-0.025em",
            marginBottom: "1.25rem",
            maxWidth: "700px",
          }}>
            50 ans au service de la logistique maritime française.
          </h1>
          <p className="text-lg max-w-2xl" style={{ color: "oklch(0.72 0.02 240)" }}>
            Fondée en 1975 à Dunkerque, Euro Docks Service est devenue l'une des agences maritimes de référence du littoral français, spécialisée dans le tramping, l'affrètement et les terminaux portuaires.
          </p>
        </div>
      </section>

      {/* Histoire — timeline */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <RevealSection className="mb-16">
            <div className="eds-gold-rule" />
            <div className="eds-label mb-3">Chronologie</div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              color: "oklch(0.14 0.04 240)",
            }}>
              Cinq décennies d'excellence maritime.
            </h2>
          </RevealSection>

          <div className="relative">
            {/* Ligne verticale */}
            <div className="absolute left-[5.5rem] top-0 bottom-0 w-px hidden lg:block"
              style={{ background: "oklch(0.88 0.008 240)" }} />

            <div className="flex flex-col gap-8">
              {timeline.map(({ year, event }, i) => (
                <RevealSection key={year} style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="flex flex-col lg:flex-row gap-4 lg:gap-12 items-start">
                    <div className="flex items-center gap-4 lg:w-36 shrink-0">
                      <div style={{
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 900,
                        fontSize: "1.5rem",
                        color: "oklch(0.65 0.12 65)",
                        letterSpacing: "-0.02em",
                        minWidth: "4rem",
                      }}>
                        {year}
                      </div>
                      {/* Dot sur la timeline */}
                      <div className="hidden lg:block w-3 h-3 rounded-full border-2 shrink-0"
                        style={{
                          borderColor: "oklch(0.65 0.12 65)",
                          background: "oklch(0.975 0.005 80)",
                          marginLeft: "auto",
                        }} />
                    </div>
                    <div className="lg:pl-8 pb-4" style={{ borderBottom: "1px solid oklch(0.92 0.004 240)" }}>
                      <p className="text-base leading-relaxed" style={{ color: "oklch(0.45 0.02 240)" }}>
                        {event}
                      </p>
                    </div>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-20 lg:py-28" style={{ background: "oklch(0.14 0.04 240)" }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <RevealSection className="mb-16">
            <div className="eds-gold-rule" />
            <div className="eds-label mb-3" style={{ color: "oklch(0.65 0.12 65)" }}>Nos valeurs</div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              color: "oklch(0.975 0.005 80)",
            }}>
              Ce qui nous distingue, depuis 1975.
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <RevealSection key={title}>
                <div className="p-8 h-full" style={{ background: "oklch(1 0 0 / 0.04)", border: "1px solid oklch(1 0 0 / 0.07)", borderRadius: "2px" }}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded shrink-0"
                      style={{ background: "oklch(0.65 0.12 65 / 0.12)" }}>
                      <Icon size={18} style={{ color: "oklch(0.65 0.12 65)" }} />
                    </div>
                    <div>
                      <h3 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 600,
                        fontSize: "1.15rem",
                        color: "oklch(0.975 0.005 80)",
                        marginBottom: "0.75rem",
                      }}>
                        {title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "oklch(0.72 0.02 240)" }}>
                        {desc}
                      </p>
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Image pleine largeur avec citation */}
      <section className="relative min-h-[380px] flex items-center overflow-hidden">
        <img
          src="/manus-storage/eds_chartering_1f6cba1a.jpg"
          alt="Navigation maritime"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "oklch(0.09 0.03 240 / 0.78)" }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
          <RevealSection className="max-w-3xl">
            <div className="w-8 h-px mb-6" style={{ background: "oklch(0.65 0.12 65)" }} />
            <blockquote style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 400,
              fontStyle: "italic",
              fontSize: "clamp(1.25rem, 3vw, 2rem)",
              color: "oklch(0.975 0.005 80)",
              lineHeight: 1.5,
              marginBottom: "1.5rem",
            }}>
              "Notre force réside dans notre connaissance intime de chaque port, de chaque contrainte opérationnelle, et dans notre capacité à proposer des solutions créatives là où d'autres voient des obstacles."
            </blockquote>
            <div className="text-sm font-semibold uppercase tracking-widest" style={{ color: "oklch(0.65 0.12 65)" }}>
              Direction commerciale — Euro Docks Service
            </div>
          </RevealSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 eds-section-dark">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <RevealSection>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: "clamp(1.75rem, 4vw, 3rem)",
                color: "oklch(0.975 0.005 80)",
                marginBottom: "1.25rem",
              }}>
                Prêt à travailler avec les meilleurs ?
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "oklch(0.72 0.02 240)" }}>
                Découvrez nos services ou contactez directement notre équipe commerciale pour discuter de votre prochain projet.
              </p>
            </RevealSection>
            <RevealSection className="flex flex-wrap gap-4 lg:justify-end">
              <a href="/services" className="eds-btn-primary">
                Nos services <ArrowRight size={15} />
              </a>
              <a href="/contact" className="eds-btn-outline">
                Nous contacter
              </a>
            </RevealSection>
          </div>
        </div>
      </section>
    </div>
  );
}
