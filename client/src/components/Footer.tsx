/**
 * Footer — Euro Docks Service
 * DA : Maritime Prestige — Navy profond, or ambre, Cormorant Garamond + Inter
 */

import { Link } from "wouter";
import { ArrowRight, MapPin, Phone, Mail } from "lucide-react";

const SERVICES_LINKS = [
  { label: "Agence Maritime", href: "/services" },
  { label: "Affrètement Tramping", href: "/services" },
  { label: "Freight Forwarding", href: "/freight" },
  { label: "Transit & Douane", href: "/freight" },
  { label: "Terminal Portuaire", href: "/terminal" },
  { label: "Manutention", href: "/terminal" },
];

const OFFICES = [
  { city: "Boulogne-sur-Mer", address: "Port de Commerce, 62200", tel: "+33 (0)3 21 31 00 00" },
  { city: "Dunkerque",        address: "Terminal de Grande Bretagne", tel: "+33 (0)3 28 63 00 00" },
  { city: "Rouen",            address: "Port Autonome de Rouen",     tel: "+33 (0)2 35 52 00 00" },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--eds-navy)", color: "oklch(1 0 0 / 0.65)" }}>

      {/* Bande supérieure */}
      <div style={{ borderBottom: "1px solid oklch(1 0 0 / 0.08)", padding: "3rem 0" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem" }}>
            <div>
              <div style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 600, fontSize: "1.1rem",
                color: "var(--eds-white)", letterSpacing: "0.04em",
                marginBottom: "0.25rem",
              }}>EURO DOCKS SERVICE</div>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.62rem", letterSpacing: "0.2em",
                textTransform: "uppercase", color: "var(--eds-gold)",
              }}>Agence Maritime & Tramping depuis 1975</div>
            </div>
            <Link href="/contact" style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500, fontSize: "0.75rem",
              letterSpacing: "0.08em", textTransform: "uppercase",
              color: "var(--eds-gold)", textDecoration: "none",
              borderBottom: "1px solid var(--eds-gold)",
              paddingBottom: "0.2rem",
              transition: "opacity 0.2s ease",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "0.7"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
            >
              Demander un devis <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      {/* Corps */}
      <div style={{ padding: "4rem 0 3rem" }}>
        <div style={{
          maxWidth: "1400px", margin: "0 auto", padding: "0 2.5rem",
          display: "grid",
          gridTemplateColumns: "2fr 1.5fr 2fr",
          gap: "4rem",
        }} className="grid-cols-1 md:grid-cols-3">

          {/* Colonne 1 — À propos */}
          <div>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500, fontSize: "0.65rem",
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "var(--eds-gold)", marginBottom: "1.25rem",
            }}>À propos</div>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.85rem", lineHeight: 1.75,
              color: "oklch(1 0 0 / 0.45)",
              marginBottom: "1.5rem",
            }}>
              Euro Docks Service est une agence maritime indépendante spécialisée dans le tramping dry bulk depuis 1975. Nous opérons sur les principaux ports français de la façade Atlantique et Manche.
            </p>
            <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
              {["GMP+", "OVAM", "NIWO", "ISO"].map(cert => (
                <span key={cert} style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.6rem", letterSpacing: "0.06em",
                  color: "oklch(1 0 0 / 0.3)",
                  border: "1px solid oklch(1 0 0 / 0.12)",
                  padding: "0.2rem 0.5rem",
                }}>{cert}</span>
              ))}
            </div>
          </div>

          {/* Colonne 2 — Services */}
          <div>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500, fontSize: "0.65rem",
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "var(--eds-gold)", marginBottom: "1.25rem",
            }}>Services</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {SERVICES_LINKS.map(({ href, label }, i) => (
                <Link key={i} href={href} style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.82rem",
                  color: "oklch(1 0 0 / 0.45)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--eds-white)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "oklch(1 0 0 / 0.45)"}
                >{label}</Link>
              ))}
            </div>
          </div>

          {/* Colonne 3 — Agences */}
          <div>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500, fontSize: "0.65rem",
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "var(--eds-gold)", marginBottom: "1.25rem",
            }}>Nos agences</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {OFFICES.map((o, i) => (
                <div key={i}>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontWeight: 600, fontSize: "1rem",
                    color: "var(--eds-white)", marginBottom: "0.3rem",
                  }}>{o.city}</div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.4rem", marginBottom: "0.2rem" }}>
                    <MapPin size={11} style={{ marginTop: "0.15rem", flexShrink: 0, color: "oklch(1 0 0 / 0.25)" }} />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", color: "oklch(1 0 0 / 0.38)" }}>{o.address}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <Phone size={11} style={{ flexShrink: 0, color: "oklch(1 0 0 / 0.25)" }} />
                    <a href={`tel:${o.tel.replace(/\s/g, "")}`} style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.78rem", color: "oklch(1 0 0 / 0.38)",
                      textDecoration: "none", transition: "color 0.2s ease",
                    }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--eds-gold)"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "oklch(1 0 0 / 0.38)"}
                    >{o.tel}</a>
                  </div>
                </div>
              ))}
              <a href="mailto:commercial@eurodocks.com" style={{
                display: "flex", alignItems: "center", gap: "0.4rem",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.78rem", color: "oklch(1 0 0 / 0.38)",
                textDecoration: "none", transition: "color 0.2s ease",
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--eds-gold)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "oklch(1 0 0 / 0.38)"}
              >
                <Mail size={11} /> commercial@eurodocks.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bande basse */}
      <div style={{ borderTop: "1px solid oklch(1 0 0 / 0.06)", padding: "1.5rem 0" }}>
        <div style={{
          maxWidth: "1400px", margin: "0 auto", padding: "0 2.5rem",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: "0.75rem",
        }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", color: "oklch(1 0 0 / 0.22)" }}>
            © {new Date().getFullYear()} Euro Docks Service. Tous droits réservés.
          </span>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.62rem", color: "oklch(1 0 0 / 0.15)",
            letterSpacing: "0.06em",
          }}>
            AGENCE MARITIME · TRAMPING · DRY BULK
          </span>
        </div>
      </div>
    </footer>
  );
}
