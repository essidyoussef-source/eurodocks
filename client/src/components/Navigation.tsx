/**
 * Navigation SONAR — Euro Docks Service v3
 * DA : Ink abyssal + Signal vert-lime + IBM Plex Mono
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, Mail, ArrowRight } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "ACCUEIL" },
  { href: "/about", label: "À PROPOS" },
  { href: "/services", label: "SHIPPING" },
  { href: "/freight", label: "FREIGHT" },
  { href: "/terminal", label: "TERMINAL" },
  { href: "/contact", label: "CONTACT" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? location === "/" : location.startsWith(href);

  return (
    <>
      {/* Barre supérieure contact */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0,
        height: "28px",
        background: "oklch(0.06 0.02 200)",
        borderBottom: "1px solid oklch(1 0 0 / 0.05)",
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        padding: "0 2rem",
        zIndex: 101,
      }}>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "0.55rem",
          letterSpacing: "0.12em",
          color: "oklch(0.38 0.02 200)",
          textTransform: "uppercase",
        }}>
          {["DUNKERQUE", "BOULOGNE", "ROUEN", "BAYONNE", "CALAIS"].join(" · ")}
        </div>
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <a href="tel:+33328630000" style={{
            display: "flex", alignItems: "center", gap: "0.35rem",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.55rem", letterSpacing: "0.08em",
            color: "oklch(0.50 0.025 200)", textDecoration: "none",
            transition: "color 0.2s ease",
          }}
            onMouseEnter={e => (e.currentTarget.style.color = "oklch(0.82 0.18 145)")}
            onMouseLeave={e => (e.currentTarget.style.color = "oklch(0.50 0.025 200)")}
          >
            <Phone size={8} /> +33 (0)3 28 63 00 00
          </a>
          <a href="mailto:commercial@eurodocks.com" style={{
            display: "flex", alignItems: "center", gap: "0.35rem",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.55rem", letterSpacing: "0.08em",
            color: "oklch(0.50 0.025 200)", textDecoration: "none",
            transition: "color 0.2s ease",
          }}
            onMouseEnter={e => (e.currentTarget.style.color = "oklch(0.82 0.18 145)")}
            onMouseLeave={e => (e.currentTarget.style.color = "oklch(0.50 0.025 200)")}
          >
            <Mail size={8} /> COMMERCIAL@EURODOCKS.COM
          </a>
        </div>
      </div>

      {/* Navigation principale */}
      <header style={{
        position: "fixed",
        top: "28px", left: 0, right: 0,
        height: "60px",
        background: scrolled ? "oklch(0.08 0.025 200 / 0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid oklch(1 0 0 / 0.06)" : "none",
        transition: "background 0.3s ease, backdrop-filter 0.3s ease",
        zIndex: 100,
        display: "flex", alignItems: "center",
        padding: "0 2rem",
        justifyContent: "space-between",
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
            <rect width="34" height="34" fill="oklch(0.82 0.18 145 / 0.08)" />
            <rect x="0.5" y="0.5" width="33" height="33" stroke="oklch(0.82 0.18 145 / 0.35)" strokeWidth="1" />
            <path d="M0 7 L0 0 L7 0" stroke="oklch(0.82 0.18 145)" strokeWidth="1.5" fill="none" />
            <path d="M34 27 L34 34 L27 34" stroke="oklch(0.82 0.18 145)" strokeWidth="1.5" fill="none" />
            <text x="17" y="21" textAnchor="middle"
              fill="oklch(0.97 0.005 200)"
              fontFamily="'Archivo', sans-serif"
              fontWeight="900" fontSize="12" letterSpacing="-0.5">
              EDS
            </text>
          </svg>
          <div>
            <div style={{
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 800, fontSize: "0.82rem",
              letterSpacing: "0.06em", textTransform: "uppercase",
              color: "oklch(0.97 0.005 200)", lineHeight: 1,
            }}>EURO DOCKS SERVICE</div>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.50rem", letterSpacing: "0.18em",
              color: "oklch(0.82 0.18 145)", textTransform: "uppercase",
              marginTop: "0.12rem",
            }}>MARITIME EXCELLENCE</div>
          </div>
        </Link>

        {/* Liens desktop */}
        <nav style={{ display: "flex", gap: "0", alignItems: "center" }} className="hidden lg:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.60rem", fontWeight: 500,
              letterSpacing: "0.10em", textTransform: "uppercase",
              color: isActive(href) ? "oklch(0.82 0.18 145)" : "oklch(0.60 0.025 200)",
              textDecoration: "none",
              padding: "0.5rem 0.85rem",
              borderBottom: isActive(href) ? "1.5px solid oklch(0.82 0.18 145)" : "1.5px solid transparent",
              transition: "color 0.2s ease, border-color 0.2s ease",
            }}
              onMouseEnter={e => {
                if (!isActive(href)) (e.currentTarget as HTMLElement).style.color = "oklch(0.82 0.18 145)";
              }}
              onMouseLeave={e => {
                if (!isActive(href)) (e.currentTarget as HTMLElement).style.color = "oklch(0.60 0.025 200)";
              }}
            >{label}</Link>
          ))}
        </nav>

        {/* CTA + Burger */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Link href="/contact" className="sonar-btn sonar-btn-signal hidden lg:inline-flex"
            style={{ padding: "0.5rem 1.25rem", fontSize: "0.60rem" }}>
            DEVIS <ArrowRight size={12} />
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden"
            style={{
              background: "none", border: "1px solid oklch(1 0 0 / 0.15)",
              color: "oklch(0.82 0.18 145)", padding: "0.4rem", cursor: "pointer",
            }}>
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Menu mobile */}
      <div style={{
        position: "fixed", top: "88px", left: 0, right: 0, bottom: 0,
        background: "oklch(0.07 0.025 200 / 0.98)",
        backdropFilter: "blur(24px)",
        zIndex: 99,
        display: "flex", flexDirection: "column",
        padding: "2rem",
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? "auto" : "none",
        transform: menuOpen ? "translateY(0)" : "translateY(-8px)",
        transition: "opacity 0.3s ease, transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
      }}>
        {NAV_LINKS.map(({ href, label }, i) => (
          <Link key={href} href={href} style={{
            fontFamily: "'Archivo', sans-serif",
            fontWeight: 900, fontSize: "clamp(1.8rem, 7vw, 2.8rem)",
            letterSpacing: "-0.02em", textTransform: "uppercase",
            color: isActive(href) ? "oklch(0.82 0.18 145)" : "oklch(0.85 0.01 200)",
            textDecoration: "none",
            padding: "0.75rem 0",
            borderBottom: "1px solid oklch(1 0 0 / 0.06)",
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "translateX(0)" : "translateX(-20px)",
            transition: `opacity 0.3s ease ${i * 40}ms, transform 0.3s cubic-bezier(0.23, 1, 0.32, 1) ${i * 40}ms`,
          }}>{label}</Link>
        ))}
      </div>
    </>
  );
}
