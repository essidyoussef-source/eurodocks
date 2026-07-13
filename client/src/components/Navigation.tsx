/**
 * Navigation — Euro Docks Service
 * DA : Maritime Prestige — Navy profond, or ambre, Cormorant Garamond + Inter
 * Fond transparent sur hero → navy solide au scroll
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, Mail } from "lucide-react";

const NAV_LINKS = [
  { href: "/",         label: "Accueil" },
  { href: "/about",    label: "À propos" },
  { href: "/services", label: "Shipping" },
  { href: "/freight",  label: "Freight" },
  { href: "/terminal", label: "Terminal" },
  { href: "/contact",  label: "Contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? location === "/" : location.startsWith(href);

  const isHome = location === "/";
  const navBg = scrolled || !isHome ? "var(--eds-navy)" : "transparent";

  return (
    <>
      {/* Barre info top */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0,
        height: "30px",
        background: "var(--eds-navy)",
        borderBottom: "1px solid oklch(1 0 0 / 0.06)",
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        padding: "0 2.5rem",
        zIndex: 101,
      }} className="hidden md:flex">
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.62rem",
          letterSpacing: "0.12em",
          color: "oklch(1 0 0 / 0.35)",
          textTransform: "uppercase",
        }}>
          Dunkerque · Boulogne-sur-Mer · Rouen · Bayonne · Calais
        </span>
        <div style={{ display: "flex", gap: "1.75rem", alignItems: "center" }}>
          <a href="tel:+33328630000" style={{
            display: "flex", alignItems: "center", gap: "0.4rem",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.62rem", letterSpacing: "0.05em",
            color: "oklch(1 0 0 / 0.45)", textDecoration: "none",
            transition: "color 0.2s ease",
          }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--eds-gold)")}
            onMouseLeave={e => (e.currentTarget.style.color = "oklch(1 0 0 / 0.45)")}
          >
            <Phone size={10} /> +33 (0)3 28 63 00 00
          </a>
          <a href="mailto:commercial@eurodocks.com" style={{
            display: "flex", alignItems: "center", gap: "0.4rem",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.62rem", letterSpacing: "0.05em",
            color: "oklch(1 0 0 / 0.45)", textDecoration: "none",
            transition: "color 0.2s ease",
          }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--eds-gold)")}
            onMouseLeave={e => (e.currentTarget.style.color = "oklch(1 0 0 / 0.45)")}
          >
            <Mail size={10} /> commercial@eurodocks.com
          </a>
        </div>
      </div>

      {/* Navigation principale */}
      <header style={{
        position: "fixed",
        top: "30px", left: 0, right: 0,
        height: "64px",
        background: navBg,
        backdropFilter: scrolled || !isHome ? "none" : "none",
        borderBottom: scrolled || !isHome ? "1px solid oklch(1 0 0 / 0.08)" : "none",
        transition: "background 0.35s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.35s ease",
        zIndex: 100,
        display: "flex", alignItems: "center",
        padding: "0 2.5rem",
        justifyContent: "space-between",
      }}>
        {/* Logo — Monogramme EDS */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "1rem" }}>
          {/* Marque graphique EDS — ancre stylisée + lettres */}
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Fond navy avec bordure or */}
            <rect width="44" height="44" fill="var(--eds-navy)" />
            <rect x="0" y="0" width="44" height="3" fill="var(--eds-gold)" />
            <rect x="0" y="41" width="44" height="3" fill="var(--eds-gold)" />
            {/* Ligne verticale or gauche */}
            <rect x="0" y="0" width="3" height="44" fill="var(--eds-gold)" />
            {/* Lettres EDS */}
            <text x="23" y="29"
              textAnchor="middle"
              fill="var(--eds-white)"
              fontFamily="'Cormorant Garamond', Georgia, serif"
              fontWeight="700"
              fontSize="17"
              letterSpacing="1"
            >EDS</text>
          </svg>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 700, fontSize: "1.05rem",
              letterSpacing: "0.12em",
              color: "var(--eds-white)", lineHeight: 1.0,
              textTransform: "uppercase",
            }}>Euro Docks Service</div>
            <div style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              marginTop: "0.25rem",
            }}>
              <div style={{ width: "18px", height: "1px", background: "var(--eds-gold)" }} />
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.52rem", letterSpacing: "0.22em",
                color: "var(--eds-gold)", textTransform: "uppercase",
              }}>Agence Maritime · Tramping</div>
            </div>
          </div>
        </Link>

        {/* Liens desktop */}
        <nav style={{ display: "flex", gap: "0", alignItems: "center" }} className="hidden lg:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.75rem", fontWeight: 400,
              letterSpacing: "0.05em",
              color: isActive(href) ? "var(--eds-gold)" : "oklch(1 0 0 / 0.7)",
              textDecoration: "none",
              padding: "0.5rem 0.9rem",
              borderBottom: isActive(href) ? "1px solid var(--eds-gold)" : "1px solid transparent",
              transition: "color 0.2s ease, border-color 0.2s ease",
            }}
              onMouseEnter={e => {
                if (!isActive(href)) (e.currentTarget as HTMLElement).style.color = "var(--eds-white)";
              }}
              onMouseLeave={e => {
                if (!isActive(href)) (e.currentTarget as HTMLElement).style.color = "oklch(1 0 0 / 0.7)";
              }}
            >{label}</Link>
          ))}
        </nav>

        {/* CTA + Burger */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Link href="/contact"
            className="hidden lg:inline-flex eds-btn eds-btn-gold"
            style={{ padding: "0.55rem 1.4rem", fontSize: "0.72rem" }}
          >
            Demander un devis
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden"
            style={{
              background: "none", border: "1px solid oklch(1 0 0 / 0.2)",
              color: "var(--eds-white)", padding: "0.4rem 0.5rem", cursor: "pointer",
              display: "flex", alignItems: "center",
            }}>
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Menu mobile */}
      <div style={{
        position: "fixed", top: "94px", left: 0, right: 0, bottom: 0,
        background: "var(--eds-navy)",
        zIndex: 99,
        display: "flex", flexDirection: "column",
        padding: "2.5rem 2rem",
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? "auto" : "none",
        transform: menuOpen ? "translateY(0)" : "translateY(-8px)",
        transition: "opacity 0.3s ease, transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
      }}>
        {NAV_LINKS.map(({ href, label }, i) => (
          <Link key={href} href={href} style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 600, fontSize: "clamp(2rem, 8vw, 3rem)",
            letterSpacing: "-0.01em",
            color: isActive(href) ? "var(--eds-gold)" : "oklch(1 0 0 / 0.85)",
            textDecoration: "none",
            padding: "0.6rem 0",
            borderBottom: "1px solid oklch(1 0 0 / 0.06)",
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "translateX(0)" : "translateX(-16px)",
            transition: `opacity 0.3s ease ${i * 40}ms, transform 0.3s cubic-bezier(0.23, 1, 0.32, 1) ${i * 40}ms`,
          }}>{label}</Link>
        ))}
        <Link href="/contact"
          className="eds-btn eds-btn-gold"
          style={{ marginTop: "2rem", width: "100%", justifyContent: "center" }}
        >
          Demander un devis
        </Link>
      </div>
    </>
  );
}
