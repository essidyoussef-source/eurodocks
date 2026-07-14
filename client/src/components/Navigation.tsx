import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, Mail, ChevronDown, ArrowRight } from "lucide-react";

const NAV_LINKS = [
  { href: "/",         label: "Accueil", sub: null },
  { href: "/services", label: "Services", sub: [
    { label: "Agence Maritime", href: "/services" },
    { label: "Affrètement Tramping", href: "/services" },
    { label: "Manutention & Stevedoring", href: "/services" },
    { label: "Survey & Inspection", href: "/services" },
  ]},
  { href: "/freight",  label: "Freight & Transit", sub: null },
  { href: "/terminal", label: "Terminaux", sub: null },
  { href: "/about",    label: "Le Groupe", sub: null },
  { href: "/contact",  label: "Contact", sub: null },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [location] = useLocation();
  const isHome = location === "/";

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

  const isActive = (href: string) => href === "/" ? location === "/" : location.startsWith(href);
  const navBg = scrolled || !isHome ? "rgba(11,31,58,0.97)" : "transparent";
  const showTopbar = scrolled || !isHome;

  return (
    <>
      {/* TOPBAR */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0,
        height: "30px",
        background: "rgba(8,22,42,0.98)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        padding: "0 2rem",
        zIndex: 101,
        opacity: showTopbar ? 1 : 0,
        pointerEvents: showTopbar ? "auto" : "none",
        transition: "opacity 0.3s ease",
      }}>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {["DUNKERQUE", "BOULOGNE-SUR-MER", "ROUEN", "BAYONNE", "CALAIS"].map(p => (
            <span key={p} style={{ fontFamily: "Inter, sans-serif", fontSize: "0.62rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>{p}</span>
          ))}
        </div>
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <a href="tel:+33321317400" style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontFamily: "Inter, sans-serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>
            <Phone size={10} /> +33 (0)3 21 31 74 00
          </a>
          <a href="mailto:contact@eurodocks.fr" style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontFamily: "Inter, sans-serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>
            <Mail size={10} /> contact@eurodocks.fr
          </a>
        </div>
      </div>

      {/* MAIN NAV */}
      <header style={{
        position: "fixed",
        top: showTopbar ? "30px" : "0",
        left: 0, right: 0,
        height: "64px",
        background: navBg,
        backdropFilter: scrolled || !isHome ? "blur(16px)" : "none",
        borderBottom: scrolled || !isHome ? "1px solid rgba(255,255,255,0.08)" : "none",
        transition: "all 0.35s cubic-bezier(0.23, 1, 0.32, 1)",
        zIndex: 100,
        display: "flex", alignItems: "center",
        padding: "0 2rem",
        justifyContent: "space-between",
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.25)" : "none",
      }}>

        {/* LOGO */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.65rem" }}>
          {/* Icône globe+navire */}
          <img
            src="https://eurodocks-qgd8wezm.manus.space/manus-storage/eds_logo_icon_86bd3046.png"
            alt="Euro Docks Services icon"
            style={{ height: "46px", width: "46px", objectFit: "contain", flexShrink: 0 }}
          />
          {/* Wordmark sur fond sombre — filtre pour blanc */}
          <img
            src="https://eurodocks-qgd8wezm.manus.space/manus-storage/eds_logo_wordmark_3e09404a.png"
            alt="Euro Docks Services"
            style={{ height: "42px", objectFit: "contain", filter: "brightness(0) invert(1)", flexShrink: 0 }}
          />
        </Link>

        {/* DESKTOP LINKS */}
        <nav style={{ display: "flex", alignItems: "center", gap: "0.1rem" }}>
          {NAV_LINKS.map((link) => (
            <div key={link.href} style={{ position: "relative" }}
              onMouseEnter={() => link.sub && setDropdown(link.label)}
              onMouseLeave={() => setDropdown(null)}
            >
              <Link href={link.href} style={{
                display: "flex", alignItems: "center", gap: "0.2rem",
                padding: "0.45rem 0.8rem",
                fontFamily: "Outfit, sans-serif", fontWeight: 500,
                fontSize: "0.8rem", letterSpacing: "0.03em",
                color: isActive(link.href) ? "var(--eds-gold)" : "rgba(255,255,255,0.8)",
                textDecoration: "none",
                borderRadius: "0.4rem",
                background: isActive(link.href) ? "rgba(201,150,58,0.1)" : "transparent",
                transition: "all 0.18s ease",
              }}
                onMouseEnter={(e) => { if (!isActive(link.href)) { (e.currentTarget as HTMLElement).style.color = "#fff"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)"; } }}
                onMouseLeave={(e) => { if (!isActive(link.href)) { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.8)"; (e.currentTarget as HTMLElement).style.background = "transparent"; } }}
              >
                {link.label}
                {link.sub && <ChevronDown size={11} />}
              </Link>

              {/* Dropdown */}
              {link.sub && dropdown === link.label && (
                <div style={{
                  position: "absolute", top: "calc(100% + 4px)", left: 0,
                  background: "rgba(11,31,58,0.98)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "0.75rem",
                  padding: "0.5rem",
                  minWidth: "220px",
                  boxShadow: "0 16px 48px rgba(0,0,0,0.45)",
                  backdropFilter: "blur(16px)",
                  animation: "fadeIn 0.15s ease",
                }}>
                  {link.sub.map((s) => (
                    <Link key={s.label} href={s.href} style={{
                      display: "block", padding: "0.55rem 0.85rem",
                      fontFamily: "Inter, sans-serif", fontSize: "0.8rem",
                      color: "rgba(255,255,255,0.7)", textDecoration: "none",
                      borderRadius: "0.5rem",
                      transition: "all 0.15s ease",
                    }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(201,150,58,0.1)"; (e.currentTarget as HTMLElement).style.color = "var(--eds-gold)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)"; }}
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* CTA + Burger */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Link href="/contact" className="eds-btn-primary" style={{ padding: "0.5rem 1.2rem", fontSize: "0.75rem" }}>
            Devis rapide <ArrowRight size={13} />
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", padding: "0.4rem 0.5rem", cursor: "pointer", borderRadius: "0.4rem", display: "flex", alignItems: "center" }}
            aria-label="Menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div style={{
        position: "fixed", inset: 0, background: "var(--eds-navy)",
        zIndex: 200, display: "flex", flexDirection: "column",
        padding: "5.5rem 2rem 2rem",
        transform: menuOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.35s cubic-bezier(0.23, 1, 0.32, 1)",
      }}>
        <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "transparent", border: "none", color: "#fff", cursor: "pointer" }}>
          <X size={24} />
        </button>
        {NAV_LINKS.map((link, i) => (
          <Link key={link.href} href={link.href} style={{
            fontFamily: "Outfit, sans-serif", fontWeight: 700,
            fontSize: "1.6rem", color: isActive(link.href) ? "var(--eds-gold)" : "#fff",
            textDecoration: "none", padding: "0.8rem 0",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            textTransform: "uppercase", letterSpacing: "0.04em",
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "translateX(0)" : "translateX(-20px)",
            transition: `opacity 0.3s ease ${i * 45}ms, transform 0.3s cubic-bezier(0.23,1,0.32,1) ${i * 45}ms`,
          }}>
            {link.label}
          </Link>
        ))}
        <div style={{ marginTop: "2rem" }}>
          <Link href="/contact" className="eds-btn-primary" style={{ width: "100%", justifyContent: "center" }}>
            Demander un devis <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </>
  );
}
