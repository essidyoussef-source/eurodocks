/**
 * Navigation — Euro Docks Service v2
 * Design: Opérateur Maritime — barre technique, transparente puis noire au scroll
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, ChevronRight } from "lucide-react";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/about", label: "À propos" },
  { href: "/services", label: "Shipping Services" },
  { href: "/freight", label: "Freight Forwarding" },
  { href: "/terminal", label: "Port Terminal" },
  { href: "/contact", label: "Contact" },
];

// Monogramme EDS SVG inline
function EDSMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Ancre stylisée */}
      <rect x="1" y="1" width="42" height="42" stroke="currentColor" strokeWidth="1.5" />
      {/* E */}
      <text
        x="6" y="30"
        fontFamily="Barlow Condensed, sans-serif"
        fontWeight="800"
        fontSize="22"
        fill="currentColor"
        letterSpacing="-1"
      >EDS</text>
      {/* Ligne ambre en bas */}
      <line x1="6" y1="36" x2="38" y2="36" stroke="#C9952A" strokeWidth="2" />
    </svg>
  );
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? location === "/" : location.startsWith(href);

  return (
    <>
      {/* Barre top — coordonnées */}
      <div
        className="fixed top-0 left-0 right-0 z-50 hidden lg:flex items-center justify-between px-8 py-1.5 text-xs font-medium tracking-widest uppercase transition-all duration-300"
        style={{
          background: scrolled ? "oklch(0.06 0.01 240 / 0.98)" : "oklch(0 0 0 / 0.55)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid oklch(1 0 0 / 0.06)",
          color: "oklch(0.60 0.01 240)",
          fontSize: "0.6rem",
          letterSpacing: "0.18em",
        }}
      >
        <div className="flex items-center gap-6">
          <span>Dunkerque · Boulogne · Rouen · Bayonne · Calais</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="tel:+33328630000" className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
            <Phone size={10} />
            +33 (0)3 28 63 00 00
          </a>
          <a href="mailto:commercial@eurodocks.com" className="hover:text-amber-400 transition-colors">
            commercial@eurodocks.com
          </a>
        </div>
      </div>

      {/* Navigation principale */}
      <header
        className="fixed left-0 right-0 z-40 transition-all duration-300"
        style={{
          top: scrolled ? "0" : "28px",
          background: scrolled
            ? "oklch(0.08 0.015 240 / 0.97)"
            : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid oklch(1 0 0 / 0.08)" : "none",
        }}
      >
        <div className="max-w-[1440px] mx-auto px-5 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <EDSMark className="w-9 h-9 text-white group-hover:text-amber-400 transition-colors" />
            <div className="hidden sm:flex flex-col leading-none">
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  fontSize: "1rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "oklch(0.97 0 0)",
                }}
              >
                Euro Docks Service
              </span>
              <span
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 500,
                  fontSize: "0.58rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "oklch(0.72 0.14 65)",
                }}
              >
                Maritime Excellence
              </span>
            </div>
          </Link>

          {/* Liens desktop */}
          <nav className="hidden lg:flex items-center gap-0">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.68rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  padding: "0.5rem 0.9rem",
                  color: isActive(href)
                    ? "oklch(0.72 0.14 65)"
                    : "oklch(0.80 0.01 240)",
                  borderBottom: isActive(href)
                    ? "2px solid oklch(0.72 0.14 65)"
                    : "2px solid transparent",
                  transition: "all 150ms ease",
                }}
                onMouseEnter={(e) => {
                  if (!isActive(href)) {
                    (e.currentTarget as HTMLElement).style.color = "oklch(0.97 0 0)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(href)) {
                    (e.currentTarget as HTMLElement).style.color = "oklch(0.80 0.01 240)";
                  }
                }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* CTA desktop */}
          <a
            href="/contact"
            className="hidden lg:flex eds-btn eds-btn-amber"
            style={{ padding: "0.6rem 1.4rem", fontSize: "0.65rem" }}
          >
            Demander un devis
            <ChevronRight size={13} />
          </a>

          {/* Burger mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10"
            style={{ color: "oklch(0.97 0 0)" }}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Menu mobile plein écran */}
      <div
        className="fixed inset-0 z-30 lg:hidden flex flex-col transition-all duration-400"
        style={{
          background: "oklch(0.08 0.015 240 / 0.98)",
          backdropFilter: "blur(20px)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transform: menuOpen ? "translateY(0)" : "translateY(-12px)",
          transition: "opacity 300ms ease, transform 300ms cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        <div className="flex flex-col justify-center h-full px-8 gap-1 mt-16">
          {navLinks.map(({ href, label }, i) => (
            <Link
              key={href}
              href={href}
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2rem, 8vw, 3rem)",
                textTransform: "uppercase",
                letterSpacing: "-0.01em",
                color: isActive(href) ? "oklch(0.72 0.14 65)" : "oklch(0.90 0.005 240)",
                borderBottom: "1px solid oklch(1 0 0 / 0.06)",
                paddingBottom: "0.75rem",
                paddingTop: "0.75rem",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateX(0)" : "translateX(-20px)",
                transition: `opacity 300ms ease ${i * 40}ms, transform 300ms cubic-bezier(0.23, 1, 0.32, 1) ${i * 40}ms`,
              }}
            >
              {label}
            </Link>
          ))}
          <a
            href="/contact"
            className="eds-btn eds-btn-amber self-start mt-6"
            style={{
              opacity: menuOpen ? 1 : 0,
              transition: `opacity 300ms ease ${navLinks.length * 40 + 60}ms`,
            }}
          >
            Demander un devis <ChevronRight size={14} />
          </a>
          <div className="mt-8 flex flex-col gap-2" style={{ color: "oklch(0.50 0.01 240)", fontSize: "0.75rem" }}>
            <a href="tel:+33328630000">+33 (0)3 28 63 00 00</a>
            <a href="mailto:commercial@eurodocks.com">commercial@eurodocks.com</a>
          </div>
        </div>
      </div>
    </>
  );
}
