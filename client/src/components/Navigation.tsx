/**
 * Navigation — Euro Docks Service
 * Design: Deep Navy Editorial
 * Comportement: transparent sur hero, opaque au scroll
 * Mobile: hamburger avec menu drawer
 */

import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, Mail } from "lucide-react";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/about", label: "À propos" },
  { href: "/services", label: "Shipping Services" },
  { href: "/freight", label: "Freight Forwarding" },
  { href: "/terminal", label: "Port Terminal" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 60);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* Barre de contact supérieure */}
      <div className="hidden lg:flex items-center justify-end gap-6 px-8 py-2 text-xs font-medium tracking-widest uppercase"
        style={{ background: "oklch(0.09 0.03 240)", color: "oklch(0.62 0.025 240)" }}>
        <a href="tel:+33328630000" className="flex items-center gap-2 hover:text-amber-400 transition-colors duration-200">
          <Phone size={11} />
          <span>+33 (0)3 28 63 00 00</span>
        </a>
        <a href="mailto:commercial@eurodocks.com" className="flex items-center gap-2 hover:text-amber-400 transition-colors duration-200">
          <Mail size={11} />
          <span>commercial@eurodocks.com</span>
        </a>
      </div>

      {/* Navigation principale */}
      <header
        className="fixed left-0 right-0 z-50 transition-all duration-300"
        style={{
          top: scrolled ? 0 : "2rem",
          background: scrolled
            ? "oklch(0.09 0.03 240 / 0.97)"
            : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid oklch(1 0 0 / 0.06)" : "none",
          padding: scrolled ? "0" : "0",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
          {/* Logo EDS — Monogramme distinctif */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* Monogramme SVG EDS */}
            <div className="relative flex-shrink-0" style={{ width: 44, height: 44 }}>
              <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" width="44" height="44">
                {/* Fond carré navy */}
                <rect width="44" height="44" fill="oklch(0.14 0.04 240)" rx="2" />
                {/* Ligne or horizontale */}
                <line x1="6" y1="22" x2="38" y2="22" stroke="oklch(0.65 0.12 65)" strokeWidth="0.75" />
                {/* Lettres EDS en Playfair-style */}
                <text x="22" y="18" textAnchor="middle" dominantBaseline="middle"
                  fontFamily="Georgia, serif" fontWeight="700" fontSize="10"
                  fill="oklch(0.975 0.005 80)" letterSpacing="2">
                  EDS
                </text>
                <text x="22" y="30" textAnchor="middle" dominantBaseline="middle"
                  fontFamily="Arial, sans-serif" fontWeight="400" fontSize="5.5"
                  fill="oklch(0.65 0.12 65)" letterSpacing="3">
                  MARITIME
                </text>
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: "1.05rem",
                color: "oklch(0.975 0.005 80)",
                letterSpacing: "-0.01em",
              }}>
                Euro Docks
              </span>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: "0.6rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "oklch(0.65 0.12 65)",
              }}>
                Service
              </span>
            </div>
          </Link>

          {/* Liens desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`eds-nav-link ${location === link.href ? "active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="/contact" className="eds-btn-primary text-xs py-2.5 px-5">
              Demander un devis
            </a>
          </div>

          {/* Hamburger mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded"
            style={{ color: "oklch(0.975 0.005 80)" }}
            aria-label="Menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Menu mobile overlay */}
      <div
        className="fixed inset-0 z-40 lg:hidden transition-all duration-300"
        style={{
          background: "oklch(0.09 0.03 240 / 0.98)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "all" : "none",
          backdropFilter: "blur(16px)",
        }}
      >
        <div className="flex flex-col justify-center h-full px-8 pt-20">
          <nav className="flex flex-col gap-6">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className="block transition-all duration-300"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.75rem, 6vw, 2.5rem)",
                  fontWeight: 600,
                  color: location === link.href ? "oklch(0.65 0.12 65)" : "oklch(0.975 0.005 80)",
                  textDecoration: "none",
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateX(0)" : "translateX(-20px)",
                  transitionDelay: `${i * 60}ms`,
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-12 pt-8 border-t" style={{ borderColor: "oklch(1 0 0 / 0.1)" }}>
            <a href="mailto:commercial@eurodocks.com"
              className="block text-sm mb-2"
              style={{ color: "oklch(0.62 0.025 240)", letterSpacing: "0.05em" }}>
              commercial@eurodocks.com
            </a>
            <a href="tel:+33328630000"
              className="block text-sm"
              style={{ color: "oklch(0.62 0.025 240)", letterSpacing: "0.05em" }}>
              +33 (0)3 28 63 00 00
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
