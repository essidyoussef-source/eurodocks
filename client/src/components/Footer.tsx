/**
 * Footer SONAR — Euro Docks Service v3
 * DA : Ink abyssal + Signal vert-lime + IBM Plex Mono
 */

import { Link } from "wouter";
import { ArrowRight, MapPin, Phone, Mail, ExternalLink } from "lucide-react";

const PORTS = [
  { city: "DUNKERQUE", role: "Port principal — Agence & Tramping" },
  { city: "BOULOGNE-SUR-MER", role: "Terminal portuaire — GMP+" },
  { city: "ROUEN", role: "Terminal céréalier — 3,6 Mt/an" },
  { city: "BAYONNE", role: "Agence maritime" },
  { city: "CALAIS", role: "Agence maritime & Douane" },
];

const SERVICES = [
  { label: "Agence Maritime", href: "/services" },
  { label: "Affrètement Tramping", href: "/services" },
  { label: "Expertise Maritime", href: "/services" },
  { label: "Courtage en Douane", href: "/services" },
  { label: "Freight Forwarding", href: "/freight" },
  { label: "Port Terminal", href: "/terminal" },
];

export default function Footer() {
  return (
    <footer style={{
      background: "oklch(0.06 0.02 200)",
      borderTop: "1px solid oklch(1 0 0 / 0.06)",
    }}>
      {/* Bande supérieure CTA */}
      <div style={{ borderBottom: "1px solid oklch(1 0 0 / 0.06)", padding: "2.5rem 0" }}>
        <div className="container" style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: "2rem", flexWrap: "wrap",
        }}>
          <div>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.60rem", letterSpacing: "0.15em",
              textTransform: "uppercase", color: "oklch(0.82 0.18 145)",
              marginBottom: "0.5rem",
            }}>PRISE DE CONTACT</div>
            <div style={{
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 800, fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
              letterSpacing: "-0.02em", textTransform: "uppercase",
              color: "oklch(0.97 0.005 200)",
            }}>UNE OPÉRATION À PLANIFIER ?</div>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link href="/contact" className="sonar-btn sonar-btn-signal">
              DEMANDER UN DEVIS <ArrowRight size={13} />
            </Link>
            <a href="mailto:commercial@eurodocks.com" className="sonar-btn sonar-btn-ghost">
              NOUS ÉCRIRE
            </a>
          </div>
        </div>
      </div>

      {/* Corps du footer */}
      <div className="container" style={{ padding: "3.5rem 2rem 2.5rem" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr 1fr 1.2fr",
          gap: "3rem",
        }} className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

          {/* Colonne 1 — Identité */}
          <div>
            <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" fill="oklch(0.82 0.18 145 / 0.08)" />
                <rect x="0.5" y="0.5" width="31" height="31" stroke="oklch(0.82 0.18 145 / 0.35)" strokeWidth="1" />
                <path d="M0 6 L0 0 L6 0" stroke="oklch(0.82 0.18 145)" strokeWidth="1.5" fill="none" />
                <path d="M32 26 L32 32 L26 32" stroke="oklch(0.82 0.18 145)" strokeWidth="1.5" fill="none" />
                <text x="16" y="20" textAnchor="middle"
                  fill="oklch(0.97 0.005 200)"
                  fontFamily="'Archivo', sans-serif"
                  fontWeight="900" fontSize="11" letterSpacing="-0.5">EDS</text>
              </svg>
              <div>
                <div style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 800, fontSize: "0.78rem",
                  letterSpacing: "0.06em", textTransform: "uppercase",
                  color: "oklch(0.97 0.005 200)", lineHeight: 1,
                }}>EURO DOCKS SERVICE</div>
                <div style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.48rem", letterSpacing: "0.18em",
                  color: "oklch(0.82 0.18 145)", textTransform: "uppercase",
                  marginTop: "0.12rem",
                }}>MARITIME EXCELLENCE</div>
              </div>
            </Link>
            <p style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.68rem", color: "oklch(0.42 0.025 200)",
              lineHeight: 1.7, marginBottom: "1.5rem",
            }}>
              Spécialiste du tramping, de l'affrètement dry bulk et des terminaux portuaires depuis 1975.
              Présent sur 5 ports du littoral français.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                { href: "tel:+33328630000", icon: <Phone size={11} />, label: "+33 (0)3 28 63 00 00" },
                { href: "mailto:commercial@eurodocks.com", icon: <Mail size={11} />, label: "commercial@eurodocks.com" },
                { href: "https://eurodocks.fr", icon: <ExternalLink size={11} />, label: "eurodocks.fr" },
              ].map(({ href, icon, label }) => (
                <a key={label} href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  style={{
                    display: "flex", alignItems: "center", gap: "0.5rem",
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.65rem", color: "oklch(0.50 0.025 200)",
                    textDecoration: "none", transition: "color 0.2s ease",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "oklch(0.82 0.18 145)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "oklch(0.50 0.025 200)")}
                >
                  {icon} {label}
                </a>
              ))}
            </div>
          </div>

          {/* Colonne 2 — Services */}
          <div>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.58rem", letterSpacing: "0.15em",
              textTransform: "uppercase", color: "oklch(0.82 0.18 145)",
              marginBottom: "1.25rem", paddingBottom: "0.75rem",
              borderBottom: "1px solid oklch(1 0 0 / 0.08)",
            }}>EXPERTISES</div>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.6rem", listStyle: "none", padding: 0, margin: 0 }}>
              {SERVICES.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.65rem", color: "oklch(0.45 0.025 200)",
                    textDecoration: "none", transition: "color 0.2s ease",
                    display: "flex", alignItems: "center", gap: "0.4rem",
                  }}
                    onMouseEnter={e => (e.currentTarget.style.color = "oklch(0.82 0.18 145)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "oklch(0.45 0.025 200)")}
                  >
                    <span style={{ width: "12px", height: "1px", background: "oklch(0.82 0.18 145 / 0.40)", flexShrink: 0 }} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 — Navigation */}
          <div>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.58rem", letterSpacing: "0.15em",
              textTransform: "uppercase", color: "oklch(0.82 0.18 145)",
              marginBottom: "1.25rem", paddingBottom: "0.75rem",
              borderBottom: "1px solid oklch(1 0 0 / 0.08)",
            }}>NAVIGATION</div>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.6rem", listStyle: "none", padding: 0, margin: 0 }}>
              {[
                { label: "Accueil", href: "/" },
                { label: "À propos", href: "/about" },
                { label: "Shipping Services", href: "/services" },
                { label: "Freight Forwarding", href: "/freight" },
                { label: "Port Terminal", href: "/terminal" },
                { label: "Contact", href: "/contact" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.65rem", color: "oklch(0.45 0.025 200)",
                    textDecoration: "none", transition: "color 0.2s ease",
                    display: "flex", alignItems: "center", gap: "0.4rem",
                  }}
                    onMouseEnter={e => (e.currentTarget.style.color = "oklch(0.82 0.18 145)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "oklch(0.45 0.025 200)")}
                  >
                    <span style={{ width: "12px", height: "1px", background: "oklch(0.82 0.18 145 / 0.40)", flexShrink: 0 }} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 — Ports */}
          <div>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.58rem", letterSpacing: "0.15em",
              textTransform: "uppercase", color: "oklch(0.82 0.18 145)",
              marginBottom: "1.25rem", paddingBottom: "0.75rem",
              borderBottom: "1px solid oklch(1 0 0 / 0.08)",
            }}>ZONES D'OPÉRATION</div>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem", listStyle: "none", padding: 0, margin: 0 }}>
              {PORTS.map(({ city, role }) => (
                <li key={city} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                  <MapPin size={10} style={{ color: "oklch(0.82 0.18 145)", marginTop: "2px", flexShrink: 0 }} />
                  <div>
                    <div style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "0.62rem", fontWeight: 600,
                      color: "oklch(0.72 0.025 200)", letterSpacing: "0.06em",
                    }}>{city}</div>
                    <div style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "0.58rem", color: "oklch(0.38 0.02 200)",
                      marginTop: "0.1rem",
                    }}>{role}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Barre légale */}
      <div style={{ borderTop: "1px solid oklch(1 0 0 / 0.06)", padding: "1.25rem 0" }}>
        <div className="container" style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: "1rem", flexWrap: "wrap",
        }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.58rem", color: "oklch(0.32 0.02 200)", letterSpacing: "0.06em",
          }}>
            © {new Date().getFullYear()} EURO DOCKS SERVICE SAS — TOUS DROITS RÉSERVÉS
          </div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["MENTIONS LÉGALES", "POLITIQUE DE CONFIDENTIALITÉ"].map(label => (
              <span key={label} style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.55rem", color: "oklch(0.32 0.02 200)",
                letterSpacing: "0.08em", cursor: "pointer",
                transition: "color 0.2s ease",
              }}
                onMouseEnter={e => (e.currentTarget.style.color = "oklch(0.82 0.18 145)")}
                onMouseLeave={e => (e.currentTarget.style.color = "oklch(0.32 0.02 200)")}
              >{label}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
