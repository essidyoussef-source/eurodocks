/**
 * Home — Euro Docks Service
 * DA : Maritime Prestige — Ivoire chaud, navy profond, or ambre
 * Typographie : Cormorant Garamond (display) + Inter (corps)
 * Structure : Hero photo plein écran → Stats → Services → Clients → CTA
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Anchor, Ship, Package, FileText, MapPin, BarChart3, ChevronDown } from "lucide-react";

// ── Images générées ──────────────────────────────────────────
const HERO_VIDEO = "/manus-storage/eds_hero_vraquier_final_a8b3c2d1.mp4";
const IMG_PORT   = "/manus-storage/sonar_s3_quay_f39fa26f.jpg";
const IMG_GRAIN  = "/manus-storage/sonar_s2_grain_40b3b181.jpg";
const IMG_SHIP   = "/manus-storage/eds2_tramping_sea_31d23fff.jpg";
const IMG_ROUEN  = "/manus-storage/sonar_s3_crane_6f1240bf.jpg";
const IMG_HERO_FALLBACK  = "/manus-storage/eds2_hero_bulker_c6f31f54.jpg";
const IMG_DUNKERQUE      = "/manus-storage/eds2_port_dunkerque_3288e90d.jpg";
const IMG_BOULOGNE       = "/manus-storage/eds2_boulogne_terminal_a931710d.jpg";
const IMG_CHARTERING     = "/manus-storage/eds2_chartering_bridge_74fb5fb7.jpg";
const IMG_STEVEDORING    = "/manus-storage/eds2_stevedoring_night_6e625a18.jpg";

// ── Données ──────────────────────────────────────────────────
const STATS = [
  { value: "800+",  label: "Escales / an",       sub: "5 ports français" },
  { value: "200+",  label: "Navires affrétés",    sub: "Dry bulk & tramping" },
  { value: "4.5 Mt",label: "Vrac traité / an",    sub: "Céréales, engrais, acier" },
  { value: "1975",  label: "Année de fondation",  sub: "50 ans d'expertise" },
];

const SERVICES = [
  {
    icon: Anchor,
    title: "Agence Maritime",
    desc: "Représentation complète du navire et de l'armateur en escale. Coordination portuaire, formalités douanières, ravitaillement, équipage.",
    href: "/services",
    img: IMG_PORT,
  },
  {
    icon: Ship,
    title: "Affrètement Tramping",
    desc: "Courtage et négociation de chartes-parties. Spécialistes du tramping dry bulk sur les routes Baltique, Atlantique, Méditerranée.",
    href: "/services",
    img: IMG_SHIP,
  },
  {
    icon: Package,
    title: "Manutention & Terminal",
    desc: "Opérations de chargement et déchargement. Terminaux de Boulogne-sur-Mer (800 m de quai) et Rouen (3,6 Mt/an).",
    href: "/terminal",
    img: IMG_GRAIN,
  },
  {
    icon: FileText,
    title: "Transit & Douane",
    desc: "Commissionnaire agréé en douane. Dédouanement import/export, documents de transport, certifications phytosanitaires.",
    href: "/freight",
    img: IMG_ROUEN,
  },
];

const CLIENTS = [
  "Soufflet Négoce", "Groupe Avril", "Dreyfus", "Bunge", "Cargill",
  "Tereos", "InVivo", "Timab Industries", "Yara", "OCP Group",
  "ArcelorMittal", "Trafigura", "Glencore", "Viterra", "ADM",
];

const PORTS = [
  { name: "Dunkerque",       role: "Port principal",         detail: "Tirant d'eau : 17,5 m" },
  { name: "Boulogne-s-Mer",  role: "Terminal vrac",          detail: "800 m de quai" },
  { name: "Rouen",           role: "Céréales & agrobulk",    detail: "3,6 Mt / an" },
  { name: "Bayonne",         role: "Engrais & chimie",       detail: "Spécialité liquides" },
  { name: "Calais",          role: "Transit multimodal",     detail: "Ro-Ro & conteneurs" },
];

// ── Hook scroll reveal ────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ── Composants ───────────────────────────────────────────────
function RevealBlock({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className={`eds-reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function StatBlock({ value, label, sub, light = false }: {
  value: string; label: string; sub: string; light?: boolean;
}) {
  return (
    <div className="eds-stat-block" style={{ borderLeftColor: "var(--eds-gold)" }}>
      <div className={`eds-stat-number ${light ? "eds-stat-number-light" : ""}`}>{value}</div>
      <div style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 500, fontSize: "0.75rem",
        letterSpacing: "0.08em", textTransform: "uppercase",
        color: light ? "oklch(1 0 0 / 0.7)" : "var(--eds-steel)",
        marginTop: "0.35rem",
      }}>{label}</div>
      <div style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "0.7rem",
        color: light ? "oklch(1 0 0 / 0.4)" : "var(--eds-steel-lt)",
        marginTop: "0.2rem",
      }}>{sub}</div>
    </div>
  );
}

// ── Page principale ───────────────────────────────────────────
export default function Home() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
  }, []);

  return (
    <div style={{ background: "var(--eds-ivory)" }}>

      {/* ═══════════════════════════════════════════════════════
          HERO — Vidéo plein écran
      ═══════════════════════════════════════════════════════ */}
      <section style={{
        position: "relative",
        height: "100vh",
        minHeight: "600px",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-end",
        paddingBottom: "6rem",
        paddingTop: "94px",
      }}>
        {/* Vidéo */}
        <video
          ref={videoRef}
          autoPlay muted loop playsInline
          onLoadedData={() => setVideoLoaded(true)}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            opacity: videoLoaded ? 1 : 0,
            transition: "opacity 1s ease",
          }}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>

        {/* Fallback image */}
        {!videoLoaded && (
          <img
            src={IMG_HERO_FALLBACK}
            alt="Vraquier en mer"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}

        {/* Overlays */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, oklch(0.10 0.03 240 / 0.88) 0%, oklch(0.10 0.03 240 / 0.45) 50%, oklch(0.10 0.03 240 / 0.15) 100%)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, oklch(0.10 0.03 240 / 0.6) 0%, transparent 65%)",
        }} />

        {/* Contenu hero */}
        <div style={{ position: "relative", zIndex: 2, maxWidth: "1400px", margin: "0 auto", padding: "0 2.5rem", width: "100%" }}>
          <div style={{ maxWidth: "780px" }}>

            {/* Label */}
            <div className="eds-gold-rule" style={{ marginBottom: "1.5rem" }}>
              <span className="eds-label" style={{ color: "var(--eds-gold)" }}>
                Agence Maritime & Tramping — Depuis 1975
              </span>
            </div>

            {/* Titre */}
            <h1 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(3.5rem, 8vw, 7.5rem)",
              letterSpacing: "-0.02em",
              lineHeight: 0.95,
              color: "var(--eds-white)",
              textTransform: "uppercase",
              marginBottom: "1.75rem",
            }}>
              L'expertise maritime<br />
              <span style={{ color: "var(--eds-gold)", fontStyle: "italic", fontWeight: 300, textTransform: "none" }}>
                au service de votre cargo.
              </span>
            </h1>

            {/* Sous-titre */}
            <p style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: "1.05rem",
              lineHeight: 1.7,
              color: "oklch(1 0 0 / 0.7)",
              maxWidth: "520px",
              marginBottom: "2.5rem",
            }}>
              Spécialiste du tramping dry bulk, de l'affrètement et des terminaux portuaires.
              Dunkerque · Boulogne-sur-Mer · Rouen · Bayonne.
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/contact" className="eds-btn eds-btn-gold">
                Demander un devis <ArrowRight size={15} />
              </Link>
              <Link href="/services" className="eds-btn eds-btn-outline">
                Nos expertises
              </Link>
            </div>
          </div>

          {/* Stats en bas du hero */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "0",
            marginTop: "4rem",
            borderTop: "1px solid oklch(1 0 0 / 0.12)",
            paddingTop: "2rem",
          }} className="hidden lg:grid">
            {STATS.map((s, i) => (
              <StatBlock key={i} {...s} light />
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
          zIndex: 2,
        }}>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.6rem", letterSpacing: "0.18em",
            textTransform: "uppercase", color: "oklch(1 0 0 / 0.4)",
          }}>Défiler</span>
          <ChevronDown size={16} color="oklch(1 0 0 / 0.4)" className="eds-scroll-indicator" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          STATS MOBILE (visible uniquement < lg)
      ═══════════════════════════════════════════════════════ */}
      <section style={{ background: "var(--eds-navy)", padding: "3rem 0" }} className="lg:hidden">
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0" }}>
            {STATS.map((s, i) => (
              <StatBlock key={i} {...s} light />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          INTRO — Qui sommes-nous
      ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: "7rem 0", background: "var(--eds-ivory)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }} className="grid-cols-1 lg:grid-cols-2">

            {/* Texte */}
            <RevealBlock>
              <div className="eds-gold-rule">
                <span className="eds-label">Notre identité</span>
              </div>
              <h2 className="eds-h2" style={{ marginBottom: "1.5rem" }}>
                50 ans d'excellence<br />
                <span style={{ fontStyle: "italic", fontWeight: 300 }}>dans le tramping.</span>
              </h2>
              <p className="eds-body" style={{ marginBottom: "1.25rem" }}>
                Fondée en 1975, Euro Docks Service est une agence maritime indépendante spécialisée dans le tramping dry bulk. Depuis cinq décennies, nous assistons armateurs et affréteurs dans leurs opérations portuaires sur les grands ports français de la façade Atlantique et Manche.
              </p>
              <p className="eds-body" style={{ marginBottom: "2.5rem" }}>
                Notre expertise couvre l'intégralité de la chaîne logistique maritime : représentation du navire, affrètement, manutention, transit douanier et gestion de terminaux. Une offre intégrée, portée par des équipes opérationnelles disponibles 24h/24.
              </p>
              <Link href="/about" className="eds-btn eds-btn-outline-navy">
                Notre histoire <ArrowRight size={14} />
              </Link>
            </RevealBlock>

            {/* Image */}
            <RevealBlock delay={150}>
              <div style={{ position: "relative" }}>
                <img
                  src={IMG_PORT}
                  alt="Port de Boulogne-sur-Mer"
                  style={{
                    width: "100%",
                    height: "480px",
                    objectFit: "cover",
                    display: "block",
                    borderRadius: "1rem",
                  }}
                />
                {/* Badge flottant */}
                <div style={{
                  position: "absolute",
                  bottom: "-2rem",
                  left: "-2rem",
                  background: "var(--eds-navy)",
                  padding: "1.5rem 2rem",
                  borderLeft: "3px solid var(--eds-gold)",
                  borderRadius: "0.5rem",
                }}>
                  <div style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 800, fontSize: "2.8rem",
                    color: "var(--eds-white)", lineHeight: 1,
                  }}>50</div>
                  <div style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: "0.68rem", letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--eds-gold)", marginTop: "0.25rem",
                  }}>ans d'expertise</div>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SERVICES — Grille photo-driven
      ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: "7rem 0", background: "var(--eds-cream)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2.5rem" }}>

          <RevealBlock>
            <div className="eds-gold-rule">
              <span className="eds-label">Nos expertises</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3.5rem" }}>
              <h2 className="eds-h2" style={{ maxWidth: "480px" }}>
                Une offre intégrée<br />
                <span style={{ fontStyle: "italic", fontWeight: 300 }}>de bout en bout.</span>
              </h2>
              <Link href="/services" className="eds-btn eds-btn-outline-navy hidden lg:inline-flex">
                Toutes nos expertises <ArrowRight size={14} />
              </Link>
            </div>
          </RevealBlock>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }} className="grid-cols-1 md:grid-cols-2">
            {SERVICES.map((s, i) => {
              const Icon = s.icon;
              return (
                <RevealBlock key={i} delay={i * 80}>
                  <Link href={s.href} style={{ textDecoration: "none", display: "block" }}>
                    <div style={{
                      position: "relative",
                      height: "380px",
                      overflow: "hidden",
                      cursor: "pointer",
                    }}
                      className="eds-service-card"
                    >
                      {/* Image */}
                      <img
                        src={s.img}
                        alt={s.title}
                        style={{
                          position: "absolute", inset: 0,
                          width: "100%", height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
                        }}
                        className="service-img"
                      />
                      <style>{`.eds-service-card:hover .service-img { transform: scale(1.04); }`}</style>

                      {/* Overlay gradient */}
                      <div style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(to top, oklch(0.10 0.03 240 / 0.9) 0%, oklch(0.10 0.03 240 / 0.3) 60%, transparent 100%)",
                      }} />

                      {/* Contenu */}
                      <div style={{
                        position: "absolute", inset: 0,
                        padding: "2rem",
                        display: "flex", flexDirection: "column", justifyContent: "flex-end",
                      }}>
                        <div style={{
                          width: "40px", height: "40px",
                          background: "var(--eds-gold)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          marginBottom: "1rem",
                        }}>
                          <Icon size={18} color="var(--eds-navy)" />
                        </div>
                        <h3 style={{
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontWeight: 700, fontSize: "1.7rem",
                          color: "var(--eds-white)", lineHeight: 1.0,
                          marginBottom: "0.75rem",
                          letterSpacing: "0em",
                          textTransform: "uppercase",
                        }}>{s.title}</h3>
                        <p style={{
                          fontFamily: "'Barlow', sans-serif",
                          fontSize: "0.88rem", lineHeight: 1.65,
                          color: "oklch(1 0 0 / 0.7)",
                        }}>{s.desc}</p>
                        <div style={{
                          display: "flex", alignItems: "center", gap: "0.4rem",
                          marginTop: "1.25rem",
                          fontFamily: "'Barlow', sans-serif",
                          fontSize: "0.72rem", letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "var(--eds-gold)",
                        }}>
                          En savoir plus <ArrowRight size={12} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </RevealBlock>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          PORTS — Présence géographique
      ═══════════════════════════════════════════════════════ */}
      <section style={{ background: "var(--eds-navy)", padding: "7rem 0", position: "relative", overflow: "hidden" }}>
        {/* Image de fond subtile */}
        <img
          src={IMG_ROUEN}
          alt=""
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            opacity: 0.08,
          }}
        />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1400px", margin: "0 auto", padding: "0 2.5rem" }}>
          <RevealBlock>
            <div className="eds-gold-rule">
              <span className="eds-label">Présence portuaire</span>
            </div>
            <h2 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800, fontSize: "clamp(2.5rem, 5vw, 5rem)",
              letterSpacing: "-0.01em", lineHeight: 0.95,
              color: "var(--eds-white)",
              textTransform: "uppercase",
              marginBottom: "3.5rem",
            }}>
              5 ports,<br />
              <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--eds-gold)", textTransform: "none" }}>
                une couverture nationale.
              </span>
            </h2>
          </RevealBlock>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "0" }} className="grid-cols-1 sm:grid-cols-3 lg:grid-cols-5">
            {PORTS.map((p, i) => (
              <RevealBlock key={i} delay={i * 60}>
                <div style={{
                  padding: "2rem 1.5rem",
                  borderLeft: i === 0 ? "1px solid oklch(1 0 0 / 0.12)" : "none",
                  borderRight: "1px solid oklch(1 0 0 / 0.12)",
                  borderTop: "1px solid oklch(1 0 0 / 0.12)",
                  borderBottom: "1px solid oklch(1 0 0 / 0.12)",
                  transition: "background 0.25s ease",
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "oklch(1 0 0 / 0.04)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
                >
                  <MapPin size={16} color="var(--eds-gold)" style={{ marginBottom: "1rem" }} />
                  <div style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700, fontSize: "1.2rem",
                    color: "var(--eds-white)", marginBottom: "0.4rem",
                    textTransform: "uppercase",
                  }}>{p.name}</div>
                  <div style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: "0.72rem", letterSpacing: "0.05em",
                    color: "var(--eds-gold)", marginBottom: "0.5rem",
                    textTransform: "uppercase",
                  }}>{p.role}</div>
                  <div style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: "0.75rem",
                    color: "oklch(1 0 0 / 0.45)",
                  }}>{p.detail}</div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          BREAK ÉDITORIAL — Chiffres monumentaux
      ═══════════════════════════════════════════════════════ */}
      <section style={{ background: "var(--eds-navy)", padding: "5rem 0", position: "relative", overflow: "hidden" }}>
        {/* Numéral géant décoratif */}
        <div className="eds-bg-numeral eds-bg-numeral-light" style={{ right: "-2rem", top: "-3rem" }}>800</div>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2.5rem", position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "0" }} className="grid-cols-2 lg:grid-cols-4">
            {[
              { n: "800+", u: "escales", d: "par an" },
              { n: "200+", u: "navires", d: "affrétés" },
              { n: "4,5 Mt", u: "vrac", d: "traité / an" },
              { n: "50", u: "ans", d: "d'expertise" },
            ].map((s, i) => (
              <RevealBlock key={i} delay={i * 80}>
                <div style={{
                  padding: "3rem 2.5rem",
                  borderRight: i < 3 ? "1px solid oklch(1 0 0 / 0.08)" : "none",
                  borderLeft: i === 0 ? "3px solid var(--eds-gold)" : "none",
                }}>
                  <div style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(3.5rem, 6vw, 6.5rem)",
                    lineHeight: 0.9,
                    letterSpacing: "-0.02em",
                    color: i === 0 ? "var(--eds-gold)" : "var(--eds-white)",
                    marginBottom: "0.75rem",
                  }}>{s.n}</div>
                  <div style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: "0.7rem", letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--eds-gold)", marginBottom: "0.2rem",
                  }}>{s.u}</div>
                  <div style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: "0.72rem",
                    color: "oklch(1 0 0 / 0.4)",
                  }}>{s.d}</div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CLIENTS — Références
      ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: "6rem 0", background: "var(--eds-ivory)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2.5rem" }}>
          <RevealBlock>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3.5rem" }}>
              <div>
                <div className="eds-gold-rule">
                  <span className="eds-label">Ils nous font confiance</span>
                </div>
                <h2 className="eds-h2" style={{ marginTop: "0.75rem", maxWidth: "400px" }}>
                  15 acteurs
                  <span style={{ fontStyle: "italic", fontWeight: 300 }}> du négoce mondial.</span>
                </h2>
              </div>
              {/* Pull-quote éditorial */}
              <div style={{ maxWidth: "320px" }} className="hidden lg:block">
                <div className="eds-pull-quote" style={{ fontSize: "1.1rem" }}>
                  « De Cargill à ArcelorMittal, nos clients nous font confiance depuis des décennies. »
                </div>
              </div>
            </div>
          </RevealBlock>

          <RevealBlock delay={100}>
            <div style={{
              display: "flex", flexWrap: "wrap", gap: "0",
              border: "1px solid var(--border)",
            }}>
              {CLIENTS.map((client, i) => (
                <div key={i} style={{
                  flex: "1 1 180px",
                  padding: "1.25rem 1.75rem",
                  borderRight: "1px solid var(--border)",
                  borderBottom: "1px solid var(--border)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background 0.2s ease",
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--eds-cream)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
                >
                  <span style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 600, fontSize: "1rem",
                    color: "var(--eds-steel)",
                    letterSpacing: "0.04em",
                    textAlign: "center",
                    textTransform: "uppercase",
                  }}>{client}</span>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CTA FINAL — Asymétrique
      ═══════════════════════════════════════════════════════ */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: "520px", display: "flex", alignItems: "center" }}>
        <img
          src={IMG_SHIP}
          alt="Vraquier en mer"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, oklch(0.10 0.03 240 / 0.95) 0%, oklch(0.10 0.03 240 / 0.6) 60%, transparent 100%)",
        }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1400px", margin: "0 auto", padding: "6rem 2.5rem" }}>
          <RevealBlock>
            <div className="eds-gold-rule">
              <span className="eds-label">Travaillons ensemble</span>
            </div>
            <h2 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800, fontSize: "clamp(2.8rem, 5.5vw, 5.5rem)",
              letterSpacing: "-0.01em", lineHeight: 0.95,
              color: "var(--eds-white)", maxWidth: "600px",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
            }}>
              Un projet d'affrètement ?<br />
              <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--eds-gold)" }}>
                Parlons-en.
              </span>
            </h2>
            <p style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: "1rem", lineHeight: 1.7,
              color: "oklch(1 0 0 / 0.65)",
              maxWidth: "440px", marginBottom: "2.5rem",
            }}>
              Nos équipes opérationnelles répondent sous 24 heures. Devis gratuit, sans engagement.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/contact" className="eds-btn eds-btn-gold">
                Demander un devis <ArrowRight size={15} />
              </Link>
              <Link href="/services" className="eds-btn eds-btn-outline">
                Découvrir nos services
              </Link>
            </div>
          </RevealBlock>
        </div>
      </section>

    </div>
  );
}
